import React from 'react'
import {Text, Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'
import {InputUI} from '../../../UIComponents/inputs'
import {AuthButton} from '../atoms'
import {Link} from 'react-router-dom'
import {BottomText} from '../../../ui/atoms'

export const FastAuthForm = ({formik, onClose}) => {
    const {t} = useTranslation()

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Title level={4}>
                            {t('entrance_registration')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        <Text size={14}>
                            {t('enter_your_phone_for_enter')}
                        </Text>
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant="filled"
                            label={t('phone_number')}
                            inputType="phone"
                            name="phone"
                            onBlur={formik.handleBlur}
                            value={formik.values.phone ? formik.values.phone.value : ''}
                            onChange={(value, {countryCode}) => formik.setFieldValue('phone', {value, countryCode})}
                            error={formik.touched.phone && formik.errors.phone}
                        />
                    </Col>
                    <Col span={24}>
                        <AuthButton
                            htmlType="submit"
                            size="lg"
                            disabled={formik.isSubmitting || (formik.touched.phone && !!formik.errors.phone)}
                            loading={formik.isSubmitting}
                        >
                            {t('get_code')}
                        </AuthButton>
                    </Col>
                </Row>
            </form>
            <BottomText>
                <Link
                    onClick={onClose}
                    to="/sign-in"
                >
                    {t('enter_via_login')}
                </Link>
            </BottomText>
        </>
    )
}
