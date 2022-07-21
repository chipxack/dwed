import React from 'react'
import {AuthButton, VerifyNumberInfo} from '../atoms'
import {useHistory} from 'react-router-dom'
import {usePhoneVerify} from '../../../hooks/auth'
import {Text, Title} from '../../../UIComponents/typography'
import {Trans, useTranslation} from 'react-i18next'
import {InputUI} from '../../../UIComponents/inputs'
import {CountdownWrapper, IconBox, StyledCountdown} from '../../../UIComponents/global-styles'
import {Col, Row} from 'antd'
import {AsYouType} from 'libphonenumber-js'
import {EditSquareIcon} from '../../../icons/edit'
import {URL_KEYS, URL_VALUES} from '../../../constants'

export const PhoneVerifyForm = () => {
    const {formik, deadline, phone, showResend, onFinish, resend} = usePhoneVerify()
    const {push, location: {state}} = useHistory()
    const {t} = useTranslation()

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <Title level={4}>
                        {t('sms_verification')}
                    </Title>
                </Col>
                <Col span={24}>
                    {
                        phone?.value
                        && (
                            <VerifyNumberInfo>
                                <p>
                                    <Trans
                                        i18nKey="verification_code_sent_sentence"
                                        values={{n: new AsYouType(phone?.countryCode).input(phone?.value)}}
                                    >
                                        <span />
                                    </Trans>
                                </p>
                                <IconBox onClick={() => push({
                                    pathname: '/sign-up',
                                    search: `${URL_KEYS.STEP}=${URL_VALUES.CHANGE_PHONE}`,
                                    state: {...state},
                                })}>
                                    <EditSquareIcon />
                                </IconBox>
                            </VerifyNumberInfo>
                        )
                    }
                </Col>
                <Col span={24}>
                    <InputUI
                        variant="filled"
                        inputType="masked"
                        maskChar="-"
                        mask="9 9 9 9 9 9"
                        values={formik.values.activation_code}
                        name="activation_code"
                        onChange={formik.handleChange}
                        label={t('activation_code')}
                        onBlur={formik.handleBlur}
                        error={formik.touched.activation_code && formik.errors.activation_code}
                    />
                </Col>
                <Col span={24}>
                    <CountdownWrapper>
                        {
                            showResend
                                ? (
                                    <Text onClick={resend}>
                                        {t('resend_code_again')}
                                    </Text>
                                )
                                : (
                                    <Trans i18nKey="you_can_get_the_code_again_in_seconds">
                                        <StyledCountdown value={deadline} format="s" onFinish={onFinish} />
                                    </Trans>
                                )
                        }
                    </CountdownWrapper>
                </Col>
                <Col span={24}>
                    <AuthButton
                        size="lg"
                        htmlType="submit"
                        disabled={
                            (formik.touched.activation_code && !!formik.errors.activation_code)
                            || !formik.values.activation_code.match(/^(\d\s*){6}$/)
                        }
                    >
                        {t('continue')}
                    </AuthButton>
                </Col>
            </Row>
        </form>
    )
}
