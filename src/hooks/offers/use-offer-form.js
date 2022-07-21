import {useCallback, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import {useHistory, useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {UNITS_OF_MEASUREMENT} from '../../helpers'
import {MESSAGES, URL_KEYS} from '../../constants'
import {createUserOffers} from '../../api/user-api'
import {
    $offeringModel,
    getOrgOfferGroupListEvent,
    offeringGalleryMount,
    offeringTranslateMount,
    orgOfferingDetailMount,
    userOfferingDetailMount,
    userOfferingGroupMount
} from '../../models/offering-model'
import {$organizationModel, specialistMount} from '../../models/organization-models'
import org from '../../service/org'
import offering from '../../service/offering'
import {showMessage} from '../../UIComponents/message-notification'
import {debounce} from '../../utils/debounceUtils'
import {$accountModel} from '../../models/accountModel'
import {langList, langObj} from '../../data/lang'

const initialParams = {
    limit: 10,
    offset: 0
}


const errorField = {
    max_qty: true,
    min_qty: true
}

const defaultValues = {
    name: langObj,
    description: langObj,
    cost: '',
    qty: 1,
    min_qty: 1,
    max_qty: '',
    responsible_ids: [],
    measurement: '',
    group_id: null,
    currency_id: '',
    category_id: undefined,
    gallery: [],
    reload: true,
    bar_code: ''
}

export function useOfferForm() {
    const {$accountInfo} = useStore($accountModel)
    const {$specialistsOrganization} = useStore($organizationModel)
    const {organization, account, offering_id} = useParams()
    const {$offeringGroupList, $offeringInfo, $offeringGallery, $offeringTranslate} = useStore($offeringModel)

    const {t} = useTranslation()
    const {push, location: {pathname, state}} = useHistory()
    const [error, setError] = useState(errorField)
    const [type, setType] = useState('')
    const [lang, setLang] = useState(null)
    const [free, setFree] = useState(false)
    const [unlimit, setUnlimit] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [initialValues, setInitialValues] = useState(defaultValues)
    const [isCategoryChanged, setIsCategoryChanged] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.object().test('langTest', t('required_field'), (value) => {
            return lang && value[lang]
        }),
        description: Yup.object().test('langTest', t('required_field'), (value) => {
            return lang && value[lang]
        }),
        cost: Yup.string().required(t('required_field')),
        qty: Yup.mixed().required(t('required_field')),
        min_qty: Yup.string().required(t('required_field')).test('test', t('main_amount_exceeded'), (value) => {
            return !value ? true : error['min_qty']
        }),
        max_qty: Yup.string().test('test', t('main_amount_exceeded'), (value) => {
            return !value ? true : error['max_qty']
        }),
        responsible_ids: Yup.array().test('testArray', t('required_field'), (arr) => arr.length > 0),
        group_id: Yup.mixed().required(t('required_field')),
        currency_id: Yup.mixed().required(t('required_field')),
        category_id: Yup.mixed().required(t('required_field')),
        measurement: Yup.mixed().required(t('required_field')),
        gallery: Yup.array().test('testArray', t('required_field'), (arr) => arr.length > 0),
    })

    const redirectToOfferingList = useCallback(() => {
        let pathname = ''
        if (organization) {
            pathname = `/${organization}/offerings`
        }

        if (account) {
            pathname = `/${account}/offerings`
        }
        push({
            pathname,
            search: state && state.urlParams ? state.urlParams : ''
        })
    }, [organization, account, push, state])

    const redirectToOfferingParamForm = useCallback((id) => {
        push({
            pathname,
            search: `${URL_KEYS.OFFERING_PARAM_ID}=${id}`
        })
    }, [pathname, push])

    const createOfferingTranslate = useCallback((data) => {
        offering.createOfferingTranslate(data)
    }, [])

    const updateOfferingTranslate = useCallback((data) => {
        offering.updateOfferingTranslate(data)
    }, [])


    const createGallery = useCallback((data, {setSubmitting, resetForm, redirect, redirectType, reload}) => {
        offering.createOfferingGallery(data)
            .then(res => {
                if (res) {
                    if (redirect) {
                        resetForm()
                        setSubmitting(false)
                        if (offering_id) {
                            showMessage(MESSAGES.OFFERING_EDITED, 'success')
                        } else {
                            showMessage(MESSAGES.OFFERING_ADDED, 'success')
                        }
                        if (reload) {
                            if (redirectType === 'params') {
                                debounce(redirectToOfferingParamForm(data.offering_id), 300)
                            }

                            if (redirectType === 'list') {
                                redirectToOfferingList()
                            }
                        }
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [redirectToOfferingParamForm, redirectToOfferingList, offering_id])

    const createOrgOffer = useCallback((data, actions, values) => {
        const {setSubmitting} = actions
        const {name, description, gallery} = values
        setSubmitting(true)
        org.createOrgOffering({organization, data})
            .then((res) => {
                if (res) {
                    const offering_id = res.data.id
                    for (let i = 0; i < gallery.length; i++) {
                        const formData = new FormData()
                        const redirect = (i + 1) === gallery.length
                        formData.append('media', gallery[i].file)
                        formData.append('main', gallery[i].main)
                        createGallery(
                            {data: formData, offering_id},
                            {...actions, redirect, reload: values.reload, redirectType: 'params'}
                        )
                    }

                    for (let i = 0; i < langList.length; i++) {
                        if ((name[langList[i]].trim().length > 0 || description[langList[i]].trim().length > 0) && lang !== langList[i]) {
                            const params = {
                                offering_id,
                                data: {
                                    name: name[langList[i]],
                                    description: description[langList[i]],
                                    lang: langList[i]
                                }
                            }
                            createOfferingTranslate(params)
                        }
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [organization, createGallery, createOfferingTranslate, lang])

    const createUserOffer = useCallback((data, actions, values) => {
        const {setSubmitting} = actions
        const {name, description, gallery} = values
        setSubmitting(true)
        createUserOffers({username: account, data})
            .then((res) => {
                if (res) {
                    const offering_id = res.data.id
                    for (let i = 0; i < gallery.length; i++) {
                        const formData = new FormData()
                        const redirect = (i + 1) === gallery.length
                        formData.append('media', gallery[i].file)
                        formData.append('main', gallery[i].main)
                        createGallery(
                            {data: formData, offering_id},
                            {...actions, redirect}
                        )
                    }

                    for (let i = 0; i < langList.length; i++) {
                        if ((name[langList[i]].trim().length > 0 || description[langList[i]].trim().length > 0) && lang !== langList[i]) {
                            const params = {
                                offering_id,
                                data: {
                                    name: name[langList[i]],
                                    description: description[langList[i]],
                                    lang: langList[i]
                                }
                            }
                            createOfferingTranslate(params)
                        }
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [account, createGallery, createOfferingTranslate, lang])

    const updateOffering = useCallback((data, actions, values) => {
        const {setSubmitting} = actions
        const {gallery, name, description} = values
        setSubmitting(true)
        offering.updateOffering({offering_id, data})
            .then((res) => {
                if (res) {
                    const offering_id = res.data.id
                    const fetchedTranslate = $offeringTranslate.result
                    if (fetchedTranslate) {
                        for (let i = 0; i < langList.length; i++) {
                            const translate = fetchedTranslate.find(item => item.lang === langList[i])
                            if (translate) {
                                const params = {
                                    id: translate.id,
                                    offering_id,
                                    data: {
                                        name: name[langList[i]],
                                        description: description[langList[i]]
                                    }
                                }
                                updateOfferingTranslate(params)
                            } else {
                                if (name[langList[i]].trim().length > 0 || description[langList[i]].trim().length > 0) {
                                    const params = {
                                        offering_id,
                                        data: {
                                            name: name[langList[i]],
                                            description: description[langList[i]],
                                            lang: langList[i]
                                        }
                                    }
                                    createOfferingTranslate(params)
                                }

                            }
                        }
                    }
                    const galleryData = gallery.filter(item => !!item.file)
                    if (galleryData.length > 0) {
                        for (let i = 0; i < galleryData.length; i++) {
                            const formData = new FormData()
                            const redirect = (i + 1) === galleryData.length
                            formData.append('media', galleryData[i].file)
                            formData.append('main', galleryData[i].main)
                            createGallery(
                                {data: formData, offering_id},
                                {
                                    ...actions,
                                    reload: values.reload,
                                    redirect,
                                    redirectType: isCategoryChanged ? 'params' : 'list'
                                }
                            )
                        }
                    } else {
                        if (values.reload) {
                            if (isCategoryChanged) {
                                debounce(redirectToOfferingParamForm(offering_id), 300)
                            } else {
                                debounce(redirectToOfferingList(), 300)
                            }
                            setSubmitting(false)
                            showMessage(MESSAGES.OFFERING_EDITED, 'success')
                        }
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [
        offering_id,
        isCategoryChanged,
        redirectToOfferingParamForm,
        redirectToOfferingList,
        createGallery,
        $offeringTranslate.result,
        createOfferingTranslate,
        updateOfferingTranslate
    ])

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, actions) {
            const data = {
                name: values.name[lang],
                description: values.description[lang],
                cost: Number(values.cost),
                qty: Number(values.qty) === -1 ? null : Number(values.qty),
                min_qty: Number(values.min_qty) === 0 ? 1 : Number(values.min_qty),
                max_qty: Number(values.max_qty) ? Number(values.max_qty) : 0,
                measurement: values.measurement,
                group_id: values.group_id.value,
                currency_id: values.currency_id,
                category_id: values.category_id.id,
                lang: lang
            }

            if (type === 'organization') {
                data.responsible_ids = values.responsible_ids.map(item => Number(item.value))
                if (offering_id) {
                    delete data['name']
                    delete data['description']
                    updateOffering(data, actions, values)
                } else {
                    createOrgOffer(data, actions, values)
                }
            }

            if (type === 'user') {
                createUserOffer(data, actions, values)
            }
        }
    })

    const galleryChange = useCallback((value, id) => {
        const data = formik.values.gallery
        if (id !== undefined) {
            const tmp = []
            let matches = false
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === id) {
                        matches = true
                        tmp.push({...data[i], ...value})
                    } else {
                        tmp.push(data[i])
                    }
                }
                if (!matches) {
                    tmp.push({...value, id, main: false})
                }
            } else {
                tmp.push({...value, id, main: true})
            }
            formik.setFieldValue('gallery', tmp)
        } else {
            formik.setFieldValue('gallery', value)
        }
    }, [formik])

    const getOrgSpecialist = useCallback((params) => {
        if (organization) {
            const data = {
                organization,
                ...params
            }
            specialistMount(data)
        }
    }, [organization])

    const getOffersGroup = useCallback((params) => {
        if (organization) {
            const data = {
                organization,
                ...params
            }
            getOrgOfferGroupListEvent(data)
        }
        if (account) {
            userOfferingGroupMount({username: account})
        }
    }, [organization, account])

    const loadOfferingGroup = useCallback((e) => {
        const {loading, result: {next, nextOffset}} = $offeringGroupList
        e.persist()
        const {target} = e
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loading && !!next) {
            const data = {
                params: {
                    ...initialParams,
                    offset: nextOffset
                }
            }
            getOffersGroup(data)
        }
    }, [$offeringGroupList, getOffersGroup])

    const loadSpecialist = useCallback((e) => {
        const {loading, result: {next, nextOffset}} = $specialistsOrganization
        e.persist()
        const {target} = e
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loading && !!next) {
            const data = {
                params: {
                    ...initialParams,
                    offset: nextOffset
                }
            }
            getOrgSpecialist(data)
        }
    }, [$specialistsOrganization, getOrgSpecialist])

    const changeMainGalleryImage = useCallback((value) => {
        const data = formik.values.gallery.map(item => ({...item, main: false}))
        const idx = data.findIndex(item => item.id === value.id)
        const currentData = data.find(item => item.id === value.id)
        const newData = [...data.slice(0, idx), {...currentData, main: true}, ...data.slice(idx + 1)]
        if (value.file) {
            if (idx !== -1) {
                formik.setFieldValue('gallery', newData)
            }
        } else {
            const mainData = formik.values.gallery.find(item => item.main)
            const arr = [
                {
                    offering_id, id: mainData.id, data: {main: false}
                },
                {
                    offering_id, id: value.id, data: {main: true}
                }
            ]

            for (let i = 0; i < arr.length; i++) {
                offering.updateOfferingGallery(arr[i])
                    .then((res) => {
                        if (res) {
                            if (arr.length === (i + 1)) {
                                if (idx !== -1) {
                                    formik.setFieldValue('gallery', newData)
                                }
                            }
                        }
                    })
            }
        }
    }, [formik, offering_id])

    const removeGalleryImageFromServer = (data) => {
        offering.removeOfferingGallery({id: data.id, offering_id})
            .then((res) => {
                if (res) {
                    let newData = formik.values.gallery.filter(item => item.id !== data.id)
                    if (data.main && data.length > 0) {
                        newData = [{...newData[0], main: true}, ...newData.slice(1)]
                    }
                    formik.setFieldValue('gallery', newData)
                    showMessage('information_successfully_removed', 'success')
                }
            })
    }

    const deleteGalleryImage = (data) => {
        if (!data.file) {
            removeGalleryImageFromServer(data)
        } else {
            let newData = formik.values.gallery.filter(item => item.id !== data.id)
            if (data.main && data.length > 0) {
                newData = [{...newData[0], main: true}, ...newData.slice(1)]
            }
            formik.setFieldValue('gallery', newData)
        }
    }

    const changePriceType = (value) => {
        setFree(value)
        if (value) {
            formik.setFieldValue('cost', 0)
            formik.setFieldValue('currency_id', 1)
        } else {
            formik.setFieldValue('cost', '')
            formik.setFieldValue('currency_id', 1)
        }
    }

    const changeQtyType = (value) => {
        setUnlimit(value)
        if (value) {
            formik.setFieldValue('qty', -1)
        } else {
            formik.setFieldValue('qty', '')
        }
    }

    const searchSpecialist = useCallback((value) => {
        const data = {
            clear: true,
            params: {
                ...initialParams,
                accepted: true
            }
        }
        if (value.length > 2) {
            data['params']['search'] = value
        } else {
            delete data['params']['search']
        }

        getOrgSpecialist(data)
    }, [getOrgSpecialist])

    const searchOfferingGroup = useCallback((value) => {
        const data = {
            clear: true,
            params: {...initialParams}
        }
        if (value.length > 2) {
            data['params']['search'] = value
        } else {
            delete data['params']['search']
        }
        getOffersGroup(data)
    }, [getOffersGroup])

    useEffect(() => {
        const data = {
            clear: true,
            params: {
                ...initialParams,
                accepted: true
            }
        }
        getOrgSpecialist(data)
    }, [getOrgSpecialist])

    useEffect(() => {
        const data = {
            clear: true,
            params: {...initialParams}
        }
        getOffersGroup(data)
    }, [getOffersGroup])

    useEffect(() => {
        if (!!organization) {
            setType('organization')
        } else {
            setType('user')
        }
    }, [organization])

    useEffect(() => {
        if (!offering_id && $offeringGroupList.data.length > 0 && !mounted) {
            setInitialValues(
                {
                    ...defaultValues,
                    group_id: {label: $offeringGroupList.data[0].name, value: $offeringGroupList.data[0].id},
                    measurement: UNITS_OF_MEASUREMENT[0].value,
                }
            )
            setMounted(true)
        }
    }, [$offeringGroupList.data, mounted, t, offering_id, $accountInfo.data])

    const getData = (value) => value || ''

    useEffect(() => {
        const offeringInfo = $offeringInfo.data
        const offeringGallery = $offeringGallery.result
        const offeringTranslate = $offeringTranslate.data
        const accountInfo = $accountInfo.data
        const condition = offering_id
            && offeringInfo
            && Object.values(offeringInfo).length > 0
            && offeringGallery
            && !mounted
            && offeringTranslate
            && accountInfo
        if (condition) {
            if (offeringInfo.qty === null) {
                setUnlimit(true)
            }
            if (offeringInfo.cost === 0) {
                setFree(true)
            }

            const tranlateList = $offeringTranslate.result
            let $lang = null

            if (tranlateList.length > 0) {
                if (tranlateList.findIndex(item => item.lang === accountInfo.user_lang) !== -1) {
                    $lang = accountInfo.user_lang
                } else {
                    $lang = tranlateList[0].lang
                }
            } else {
                $lang = accountInfo.user_lang
            }

            setLang($lang)

            const name = Object.values(offeringTranslate).length > 0
                ? {...defaultValues.name, ...offeringTranslate.name}

                : {...defaultValues.name, [$lang]: getData(offeringInfo.name)}
            const description = Object.values(offeringTranslate).length > 0
                ? {...defaultValues.description, ...offeringTranslate.description}
                : {...defaultValues.description, [$lang]: getData(offeringInfo.description)}

            const isMainImage = offeringGallery.length && offeringGallery.find(item => item.main)

            setInitialValues({
                reload: true,
                name,
                description,
                cost: offeringInfo.cost,
                qty: !!offeringInfo.qty ? getData(offeringInfo.qty) : -1,
                min_qty: offeringInfo.min_qty,
                max_qty: offeringInfo.max_qty === 0 ? '' : offeringInfo.max_qty,
                responsible_ids: offeringInfo.responsible.map(item => ({
                    label: item.user.full_name,
                    image: item.user.avatar,
                    value: String(item.id)
                })),
                measurement: offeringInfo.measurement,
                group_id: {label: offeringInfo.group.name, value: offeringInfo.group.id},
                currency_id: 1,
                category_id: offeringInfo.category,
                gallery: offeringGallery.length > 0 ? offeringGallery.map((item, idx) => ({
                    stringUrl: item.image,
                    main: isMainImage ? item.main : idx === 0,
                    id: item.id,
                    file: null
                })) : [],
            })
        }
    }, [offering_id, $offeringInfo.data, $offeringGallery.result, mounted, $accountInfo.data, $offeringTranslate])


    useEffect(() => {
        if (offering_id) {
            if (organization) {
                orgOfferingDetailMount({organization, id: offering_id})
            }

            if (account) {
                userOfferingDetailMount({username: account, id: offering_id})
            }

            offeringGalleryMount(offering_id)
            offeringTranslateMount(offering_id)
        }
    }, [offering_id, organization, account])

    const handleChangeCategory = useCallback((value) => {
        if ($offeringInfo.data && $offeringInfo.data.category && $offeringInfo.data.category.id !== value.id && offering_id) {
            setIsCategoryChanged(true)
        }
        formik.setFieldValue('category_id', value)
    }, [$offeringInfo, offering_id, formik])

    const handleChangeLang = useCallback((value) => {
        const errors = {...formik.errors}
        const touched = {...formik.touched}
        delete errors['name']
        delete errors['description']
        delete touched['name']
        delete touched['description']
        setLang(value)
        formik.setTouched({...touched})
        formik.setErrors({...errors})
    }, [formik])

    const handleChange = useCallback((field, value) => {
        let data
        if (field === 'name' || field === 'description') {
            data = {
                ...formik.values[field],
                [lang]: value
            }
        } else if (field === 'min_qty' || field === 'max_qty') {
            data = Number(value)
            const qty = Number(formik.values.qty)
            if (data > qty && qty !== -1) {
                setError({
                    ...error,
                    [field]: false
                })
            }
        } else {
            data = value
        }
        formik.setFieldValue(field, data)
    }, [formik, lang, error])

    useEffect(() => {
        if ($accountInfo.data && !offering_id) {
            setLang($accountInfo.data.user_lang)
        }
    }, [$accountInfo.data, offering_id])

    return {
        formik,
        galleryChange,
        changeMainGalleryImage,
        deleteGalleryImage,
        loadOfferingGroup,
        loadSpecialist,
        searchSpecialist,
        free,
        unlimit,
        changePriceType,
        changeQtyType,
        handleChangeCategory,
        isCategoryChanged,
        searchOfferingGroup,
        lang,
        handleChangeLang,
        handleChange
    }
}