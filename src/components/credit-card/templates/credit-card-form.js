import React from 'react'
import {Col, Row} from 'antd'
import {InputUI} from '../../../UIComponents/inputs'
import {Text, Title} from '../../../UIComponents/typography'
import {Trans, useTranslation} from 'react-i18next'
import {useUserCardForm} from '../../../hooks/user'
import {ButtonUI} from '../../../ui/atoms'
import {ReactComponent as PoweredByPayme} from '../../../assets/images/powered_by_payme.svg'
import {CountdownWrapper, StyledCountdown} from '../../../UIComponents/global-styles'

export const CreditCardForm = ({cardId, onClose, isVerifying}) => {
    const {t} = useTranslation()
    const {
        cardFormik,
        id,
        cardVerifyFormik,
        removeCard,
        resendVerify,
        showResend,
        deadline,
        onFinish,
    } = useUserCardForm({cardId, onClose, isVerifying})

    return (
        <>
            {
                id
                    ? (
                        <form onSubmit={cardVerifyFormik.handleSubmit}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <Title level={5}>
                                        {t('code_for_activating')}
                                    </Title>
                                </Col>
                                <Col span={24} style={{textAlign: 'center'}}>
                                    {t('verification_code_sent')}
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        variant="filled"
                                        inputType="masked"
                                        mask="9 9 9 9 9 9"
                                        name="code"
                                        label={t('activation_code')}
                                        values={cardVerifyFormik.values.code}
                                        onChange={cardVerifyFormik.handleChange}
                                        error={cardVerifyFormik.touched.code && cardVerifyFormik.errors.code}
                                        onBlur={cardVerifyFormik.handleBlur}
                                    />
                                </Col>
                                <Col span={24}>
                                    <CountdownWrapper>
                                        {
                                            showResend
                                                ? (
                                                    <Text onClick={resendVerify}>
                                                        {t('resend_code_again')}
                                                    </Text>
                                                ) : (
                                                    <Trans i18nKey="you_can_get_the_code_again_in_seconds">
                                                        <StyledCountdown value={deadline} format="s" onFinish={onFinish} />
                                                    </Trans>
                                                )
                                        }
                                    </CountdownWrapper>
                                </Col>
                                <Col span={24}>
                                    <ButtonUI size="lg" htmlType="submit" style={{width: '100%', justifyContent: 'center'}}>
                                        {t('add')}
                                    </ButtonUI>
                                </Col>
                            </Row>
                        </form>
                    )
                    : (
                        <form onSubmit={cardFormik.handleSubmit}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <Title level={5}>
                                        {t(cardId ? 'editing_card_details' : 'enter_your_bank_card_details')}
                                    </Title>
                                </Col>
                                <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                                    <PoweredByPayme />
                                </Col>
                                <Col span={24}>
                                    {
                                        !cardId
                                            ? (
                                                <InputUI
                                                    name="card_number"
                                                    values={cardFormik.values.card_number}
                                                    maskChar="-"
                                                    placeholder="- - - - - -"
                                                    onChange={cardFormik.handleChange}
                                                    label={t('card_number')}
                                                    variant="filled"
                                                    inputType="masked"
                                                    mask="9999 9999 9999 9999"
                                                    onBlur={cardFormik.handleBlur}
                                                    error={cardFormik.touched.card_number && cardFormik.errors.card_number}
                                                />
                                            )
                                            : (
                                                <InputUI
                                                    name="card_number"
                                                    value={cardFormik.values.card_number}
                                                    label={t('card_number')}
                                                    variant="filled"
                                                    disabled
                                                    readOnly
                                                />
                                            )
                                    }


                                </Col>
                                <Col span={24}>
                                    {
                                        !cardId
                                            ? (
                                                <InputUI
                                                    className='custom-keyboard-picker'
                                                    inputType="keyboardDate"
                                                    name="expire"
                                                    value={cardFormik.values.expire}
                                                    onChange={(value) => cardFormik.setFieldValue('expire', value)}
                                                    label={t('card_expire_date')}
                                                    variant="filled"
                                                    placeholder="--/--"
                                                    format="MM/YY"
                                                    onBlur={cardFormik.handleBlur}
                                                    error={cardFormik.touched.expire && cardFormik.errors.expire}
                                                />
                                            )
                                            : (
                                                <InputUI
                                                    name="expire"
                                                    value={cardFormik.values.expire || ''}
                                                    disabled
                                                    readOnly
                                                    variant="filled"
                                                    label={t('card_expire_date')}
                                                />
                                            )
                                    }

                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        name="name"
                                        value={cardFormik.values.name}
                                        onChange={cardFormik.handleChange}
                                        label={t('card_name')}
                                        variant="filled"
                                        onBlur={cardFormik.handleBlur}
                                        error={cardFormik.touched.name && cardFormik.errors.name}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Row gutter={16}>
                                        {
                                            cardId && (
                                                <Col span={12}>
                                                    <ButtonUI
                                                        size="lg"
                                                        htmlType="button"
                                                        buttonstyle="danger"
                                                        onClick={removeCard}
                                                        style={{justifyContent: 'center', width: '100%'}}>
                                                        {t('remove')}
                                                    </ButtonUI>
                                                </Col>
                                            )
                                        }
                                        <Col span={cardId ? 12 : 24}>
                                            <ButtonUI
                                                size="lg"
                                                htmlType="submit"
                                                style={{justifyContent: 'center', width: '100%'}}
                                            >
                                                {t(cardId ? 'change' : 'add')}
                                            </ButtonUI>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </form>
                    )
            }
        </>
    )
}
