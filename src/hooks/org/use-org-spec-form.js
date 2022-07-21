import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { getUserListEvent, resetUserModelListStore } from '../../models/user-models'
import {
  $organizationModel,
  specialistCategoryMount,
  specialistInfoMount,
  specialistPermsMount
} from '../../models/organization-models'
import org from '../../service/org'
import { FETCHING_STATUS, MESSAGES } from '../../constants'
import { showMessage } from '../../UIComponents/message-notification'
import { useStore } from 'effector-react'
import moment from 'moment'
import { PERMS_LIST } from '../../helpers'

const defaultValues = {
  user_id: null,
  spec_cat_id: null,
  job_id: undefined,
  contract_expire: moment(new Date()).format('YYYY-MM-DD'),
  perms: []
}

const initialParams = {
  limit: 10,
  offset: 0
}

export function useOrgSpecForm() {
  const {push} = useHistory()
  const {t} = useTranslation()
  const {organization, spec_id} = useParams()
  const [userSearch, setUserSearch] = useState('')
  const [specCatSearch, setSpecCatSearch] = useState('')
  const [initialValues, setInitialValues] = useState(defaultValues)
  const [removePerms, setRemovedPerms] = useState([])
  const {$specialistInfo, $specialistPerms, $specialistCategoryList} = useStore($organizationModel)

  const validationSchema = Yup.object().shape({
    user_id: Yup.mixed().required(t('required_field')),
    spec_cat_id: Yup.mixed().required(t('required_field')),
    job_id: Yup.mixed().required(t('required_field')),
    contract_expire: Yup.string().required(t('required_field'))
  })

  const createSpecialist = (formData, {setSubmitting, resetForm}) => {
    setSubmitting(true)
    org.createOrgSpecialist(formData)
      .then((res) => {
        if (res) {
          resetForm()
          showMessage(MESSAGES.SPECIALIST_ADDED, 'success')
        }
      })
      .finally(() => setSubmitting(false))
      .catch(() => {
        setSubmitting(false)
      })
  }

  const updateSpecialist = useCallback(async (formData, {setSubmitting}) => {
    try {
      const specRes = await org.updateSpecialist(formData)
      const perms = formData.data.perms
      if (perms && perms.length > 0) {
        for (let item of perms) {
          await org.createOrgSpecPerms({
            organization: organization,
            id: formData.id,
            data: {permission: item}
          })
        }
      }

      if (removePerms.length > 0) {
        for(let item of removePerms) {
          await org.removeOrgSpecPerms({
            organization: organization,
            id: formData.id,
            perm_id: item.id
          })
        }
      }

      if (specRes) {
        showMessage('specialist_edited', 'success')
        push(`/${organization}/offerings`)
      }
      setSubmitting(false)
    } catch (e) {
      console.log(e)
      setSubmitting(false)
    }
  }, [push, organization, removePerms])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit(values, actions) {
      if (organization) {
        const params = {
          organization,
          data: {
            user_id: values.user_id.value,
            spec_cat_id: values.spec_cat_id.value,
            job_id: values.job_id.id,
            perms: values.perms.map(item => item.value),
            contract_expire: values.contract_expire
          }
        }

        if (spec_id) {
          params['id'] = spec_id
          updateSpecialist(params, actions)
        } else {
          createSpecialist(params, actions)
        }
      }

    }
  })

  const handleChangePerms = useCallback((arr2) => {
    if (spec_id) {
      const tmp = [...removePerms]
      const arr1 = formik.values.perms
      const intersection1 = arr1.filter(x => !arr2.includes(x))
      const intersection2 = arr1.filter(x => arr2.includes(x))
      for (let item of intersection2) {
        tmp.filter(item => item.permission !== item.value)
      }

      for (let item of intersection1) {
        tmp.push($specialistPerms.data.find(item => item.permission))
      }

      setRemovedPerms(tmp)
    }
    formik.setFieldValue('perms', arr2)
  }, [formik, spec_id])

  const getUserList = useCallback((data) => {
    getUserListEvent(data)
  }, [])

  const getSpecCatList = useCallback((params) => {
    if (organization) {
      const data = {
        organization,
        ...params
      }
      specialistCategoryMount(data)
    }
  }, [organization])

  const loadMoreSpecialistCategory = useCallback((e) => {
    const {result: {next, nextOffset}, loading} = $specialistCategoryList
    e.persist()
    const {target} = e
    if (target.scrollWidth === target.scrollLeft + target.offsetWidth && !loading && !!next) {
      const data = {
        params: {
          ...initialParams,
          offset: nextOffset
        }
      }

      getSpecCatList(data)
    }
  }, [getSpecCatList, $specialistCategoryList])


  const disabledButton = useCallback(() => {
    return formik.isSubmitting
      || (formik.touched.spec_cat_id && !!formik.errors.spec_cat_id)
      || (formik.touched.user_id && !!formik.errors.user_id)
      || (formik.touched.job_id && !!formik.errors.job_id)
      || (formik.touched.contract_expire && !!formik.errors.contract_expire)
  }, [formik])

  useEffect(() => {
    let timeout = null

    timeout = setTimeout(() => {
      const data = {
        clear: true,
        params: {...initialParams}
      }
      if (specCatSearch.length > 2) {
        data['params']['search'] = specCatSearch
      } else {
        delete data['params']['search']
      }
      getSpecCatList(data)
    }, 200)

    return () => {
      clearTimeout(timeout)
      timeout = null
    }
  }, [getSpecCatList, specCatSearch])

  useEffect(() => {
    if (spec_id && organization) {
      specialistInfoMount({organization, id: spec_id})
      specialistPermsMount({organization, id: spec_id})
    }
  }, [spec_id, organization])

  useEffect(() => {
    if (spec_id) {
      if (Object.values($specialistInfo.data).length > 0 && $specialistPerms.data) {
        const {user, job, spec_cat, contract_expire} = $specialistInfo.data
        const permData = $specialistPerms.data.map(item => ({
          value: item.permission, label: t(PERMS_LIST.find(x => x.value === item.permission).label),
          id: item.id
        }))
        setInitialValues({
          user_id: {label: user.full_name, value: user.username, image: user.avatar},
          spec_cat_id: {label: spec_cat.name, value: spec_cat.id},
          job_id: job,
          contract_expire: contract_expire,
          perms: permData
        })
      }
    } else {
      setInitialValues(defaultValues)
    }
  }, [$specialistInfo.data, $specialistPerms.data, spec_id, getUserList, t])

  useEffect(() => {
    if (userSearch.length > 2) {
      const data = {
        status: FETCHING_STATUS.FILTER,
        params: {
          ...initialParams,
          search: userSearch,
          show_perms_for: organization
        }
      }
      getUserList(data)
    } else {
      resetUserModelListStore()
    }
  }, [getUserList, userSearch, organization])

  return {formik, disabledButton, setUserSearch, loadMoreSpecialistCategory, setSpecCatSearch, handleChangePerms}
}