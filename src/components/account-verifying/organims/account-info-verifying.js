import React from 'react'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {useAccountInfoVerifying} from '../../../hooks/settings'
import {Col, Row} from 'antd'
import {InputUI} from '../../../UIComponents/inputs'
import {EditPenSvg} from '../../../media'
import moment from 'moment'
import {LISTS} from '../../../constants/lists'
import {hideModal, showModal} from '../../../models/widgets'
import {SelectionList} from '../../selection-list'
import {ButtonGroup, ButtonUI} from '../../../ui/atoms'
import {useHistory} from 'react-router-dom'

export const AccountInfoVerifying = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {formik, disabled} = useAccountInfoVerifying()

    const renderList = (id) => {
        switch (id) {
            case 'category':
                return LISTS.USER_CATEGORY
            default:
                return LISTS.REGION
        }
    }

    const onCloseModal = (id) => {
        formik.setFieldTouched(id)
        hideModal()
    }

    const renderModal = (id) => {
        return {
            open: true,
            component: (
                <SelectionList
                    type={renderList(id)}
                    handleChange={(value) => formik.setFieldValue(id, value)}
                    onClose={() => onCloseModal(id)}
                />
            ),
            props: {
                width: 432,
                onCancel() {
                    onCloseModal(id)
                },
            },
        }
    }

    return (
        <>
            <Title>
                {t('personal_data')}
            </Title>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[24, 10]}>
                    <Col span={12}>
                        <InputUI
                            name="name"
                            hideErrorText
                            label={t('name')}
                            icon={<EditPenSvg />}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name}
                            helperText={t('enter_strictly_according_to_your_passport')}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            hideErrorText
                            name="lastname"
                            icon={<EditPenSvg />}
                            label={t('lastname')}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                            error={formik.touched.lastname && formik.errors.lastname}
                            helperText={t('enter_strictly_according_to_your_passport')}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            hideErrorText
                            name="surname"
                            label={t('surname')}
                            icon={<EditPenSvg />}
                            onBlur={formik.handleBlur}
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            error={formik.touched.surname && formik.errors.surname}
                            helperText={t('enter_strictly_according_to_your_passport')}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            disabled
                            name="username"
                            label={t('login')}
                            onChange={() => false}
                            value={formik.values.username}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            hideErrorText
                            inputType="date"
                            name="birthday"
                            label={t('birthday')}
                            onBlur={formik.handleBlur}
                            error={formik.touched.birthday && formik.errors.birthday}
                            helperText={t('enter_strictly_according_to_your_passport')}
                            value={formik.values.birthday ? new Date(formik.values.birthday) : undefined}
                            onChange={(value) => formik.setFieldValue('birthday', moment(value).format('YYYY-MM-DD'))}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            name="gender"
                            hideErrorText
                            inputType="select"
                            label={t('gender')}
                            value={formik.values.gender}
                            error={formik.touched.gender && formik.errors.gender}
                            onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                            options={[{value: 'm', label: t('male')}, {value: 'f', label: t('female')}]}
                            onBlur={() => formik.setFieldTouched('gender', true, true)}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            readOnly
                            hideErrorText
                            name="category"
                            label={t('category')}
                            icon={<EditPenSvg />}
                            onBlur={formik.handleBlur}
                            onClick={() => showModal(renderModal('category'))}
                            error={formik.touched.category && formik.errors.category}
                            value={formik.values.category ? formik.values.category.name : ''}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            readOnly
                            name="region"
                            hideErrorText
                            label={t('region')}
                            icon={<EditPenSvg />}
                            onBlur={formik.handleBlur}
                            onClick={() => showModal(renderModal('region'))}
                            error={formik.touched.region && formik.errors.region}
                            value={formik.values.region ? formik.values.region.name : ''}
                        />
                    </Col>
                    <Col span={24}>
                        <ButtonGroup style={{marginTop: 24, justifyContent: 'flex-end'}}>
                            <ButtonUI buttonstyle="link" size="lg" onClick={() => push('/settings/profile')}>
                                {t('cancel')}
                            </ButtonUI>
                            <ButtonUI size="lg" htmlType="submit" loading={formik.isSubmitting} disabled={disabled()}>
                                {t('continue')}
                            </ButtonUI>
                        </ButtonGroup>
                    </Col>
                </Row>
            </form>
        </>
    )
}
