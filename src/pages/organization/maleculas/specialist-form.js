import React, { useCallback } from 'react'
import { AccountSectionHeading, ButtonGroup, ButtonUI, CommonForm, GridBasic, GridItem, Title } from '../../../ui/atoms'
import { useTranslation } from 'react-i18next'
import { useOrgSpecForm } from '../../../hooks/org'
import { useStore } from 'effector-react'
import { $userModel } from '../../../models/user-models'
import { SelectionList } from '../../../components/selection-list'
import { LISTS } from '../../../constants/lists'
import { showModal } from '../../../models/widgets'
import { $organizationModel } from '../../../models/organization-models'
import { PERMS_LIST } from '../../../helpers'
import { useParams } from 'react-router-dom'
import { InputUI } from '../../../UIComponents/inputs'
import moment from 'moment'

export const OrgSpecialistForm = () => {
  const {t} = useTranslation()
  const {spec_id} = useParams()
  const {$userList} = useStore($userModel)
  const {$specialistCategoryList} = useStore($organizationModel)
  const {formik, setUserSearch, disabledButton, loadMoreSpecialistCategory, setSpecCatSearch, handleChangePerms} = useOrgSpecForm()

  const userList = $userList.data.map(item => ({
    value: item.username,
    label: item.full_name.trim().length > 0 ? item.full_name : `@${item.username}`,
    image: item.avatar,
    permissions: item.permissions
  }))
  const specCatList = $specialistCategoryList.data.map(item => ({label: item.name, value: item.id}))
  const perm_list = PERMS_LIST.map(item => ({...item, label: t(item.label)}))

  const renderModal = (type) => {
    return {
      component:
        <SelectionList
          handleChange={(value) => formik.setFieldValue('job_id', value)}
          type={type}
        />,
      open: true,
      props: {width: 432}
    }
  }

  const disabledPerms = useCallback(() => {
    if (formik.values.user_id) {
      return formik.values.user_id.permissions && formik.values.user_id.permissions.length !== 0
    } else {
      return true
    }
  }, [formik.values.user_id])

  return (
    <>
      <AccountSectionHeading>
        <Title weight='black' size={20}>
          {t(spec_id ? 'edit_specialist' : 'add_specialist')}
        </Title>
      </AccountSectionHeading>
      <CommonForm onSubmit={formik.handleSubmit}>
        <GridBasic perColumn={2}>
          <InputUI
            name='group_id'
            options={userList}
            value={formik.values.user_id}
            loading={$userList.loading}
            inputType='autocomplete-select'
            label={t('select_specialist')}
            onSearch={setUserSearch}
            error={formik.touched.user_id && formik.errors.user_id}
            onChange={(e) => formik.setFieldValue('user_id', e)}
            onBlur={() => formik.setFieldTouched('user_id', true, true)}
          />
          <InputUI
            readOnly
            name='job_id'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label={t('category')}
            onClick={() => showModal(renderModal(LISTS.USER_CATEGORY))}
            error={formik.touched.job_id && formik.errors.job_id}
            value={formik.values.job_id ? formik.values.job_id.name : ''}
          />
          <InputUI
            inputType='autocomplete-select'
            options={specCatList}
            onSearch={setSpecCatSearch}
            value={formik.values.spec_cat_id}
            loading={$specialistCategoryList.loading}
            onLoadMore={loadMoreSpecialistCategory}
            label={t('select_specialist_category')}
            onChange={(e) => formik.setFieldValue('spec_cat_id', e)}
            error={formik.touched.spec_cat_id && formik.errors.spec_cat_id}
            onBlur={() => formik.setFieldTouched('spec_cat_id', true, true)}
          />
          <InputUI
            inputType='date'
            name='contract_expire'
            label={t('contract_end_date')}
            onChange={(value) => formik.setFieldValue('contract_expire', moment(value).format('YYYY-MM-DD'))}
            value={formik.values.contract_expire ? new Date(formik.values.contract_expire) : undefined}
            onBlur={formik.handleBlur}
            error={formik.touched.contract_expire && formik.errors.contract_expire}
          />
          <InputUI
            multiple
            name='perms'
            inputType='autocomplete-select'
            options={perm_list}
            value={formik.values.perms}
            label={t('select_access')}
            onSearch={(e) => e}
            onChange={handleChangePerms}
            error={formik.touched.perms && formik.errors.perms}
            onBlur={() => formik.setFieldTouched('perms', true, true)}
            disabled={disabledPerms()}
          />
          <GridItem gridColumn='1/3'>
            <ButtonGroup style={{justifyContent: 'flex-end'}}>
              <ButtonUI
                size='lg'
                htmlType='submit'
                disabled={disabledButton()}
              >
                {t('save')}
              </ButtonUI>
            </ButtonGroup>
          </GridItem>
        </GridBasic>
      </CommonForm>
    </>
  )
}