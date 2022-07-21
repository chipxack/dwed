import React from 'react'
import {Text, Title} from '../../../UIComponents/typography'
import {AuthButton, VerifyNumberInfo} from '../atoms'
import {BottomText} from '../../../ui/atoms'
import {Trans, useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'
import {InputUI} from '../../../UIComponents/inputs'
import {CountdownWrapper, IconBox, StyledCountdown} from '../../../UIComponents/global-styles'
import {AsYouType} from 'libphonenumber-js'
import {EditSquareIcon} from '../../../icons/edit'

export const FastAuthActivate = ({formik, showResend, deadline, onFinish, onResend, setNextStep}) => {
    const {t} = useTranslation()

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Title level={4}>
                            {t('sms_verification')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        {
                            formik.values.phone.value
                            && (
                                <VerifyNumberInfo>
                                    <p>
                                        <Trans
                                            i18nKey="verification_code_sent_sentence"
                                            values={{n: new AsYouType(formik.values.phone.countryCode).input(formik.values.phone.value)}}
                                        >
                                            <span />
                                        </Trans>
                                    </p>
                                    <IconBox onClick={() => setNextStep(false)}>
                                        <EditSquareIcon />
                                    </IconBox>
                                </VerifyNumberInfo>
                            )
                        }
                    </Col>
                    <Col span={24}>
                        <InputUI
                            maskChar="-"
                            variant="filled"
                            inputType="masked"
                            mask="9 9 9 9 9 9"
                            values={formik.values.activation_code}
                            name="activation_code"
                            onChange={formik.handleChange}
                            label={t('activation_code')}
                        />
                    </Col>
                    <Col span={24}>
                        <CountdownWrapper>
                            {
                                showResend
                                    ? (
                                        <Text onClick={onResend}>
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
                            disabled={formik.isSubmitting || !formik.values.activation_code.match(/^(\d\s*){6}$/)}
                        >
                            {t('enter')}
                        </AuthButton>
                    </Col>
                </Row>
            </form>
            <BottomText>

            </BottomText>
        </>
    )
}
