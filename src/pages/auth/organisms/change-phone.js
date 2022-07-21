import React from 'react'
import {AuthButton} from '../atoms'
import {useCreateAccount} from '../../../hooks/auth'
import {useTranslation} from 'react-i18next'
import {Title} from '../../../UIComponents/typography'
import {InputUI} from '../../../UIComponents/inputs'
import {Col, Row} from 'antd'

export const ChangePhone = () => {
    const {formik, disabledButton} = useCreateAccount()
    const {t} = useTranslation()
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Title level={4}>
                            {t('change_phone_number')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            label={t('phone_number')}
                            inputType='phone'
                            name='phone'
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            onChange={(value, {countryCode}) => formik.setFieldValue('phone', {value, countryCode})}
                            error={formik.touched.phone && formik.errors.phone}
                        />
                    </Col>
                    <Col span={24}>
                        <AuthButton
                            size='lg'
                            disabled={disabledButton()}
                            htmlType='submit'
                        >
                            {t('change')}
                        </AuthButton>
                    </Col>
                </Row>
            </form>
        </>
    )
}
