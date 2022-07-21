import React from 'react'
import {AuthButton, AuthButtonGroup, AuthTextLink} from '../atoms'
import {BottomText} from '../../../ui/atoms'
import {Title} from '../../../UIComponents/typography'
import {Trans, useTranslation} from 'react-i18next'
import {useSignIn} from '../../../hooks/auth'
import {Link} from 'react-router-dom'
import {InputUI} from '../../../UIComponents/inputs'
import {Col, Row} from 'antd'

export const SignInForm = ({closeAuthModal}) => {
    const {t} = useTranslation()
    const {formik, disabled} = useSignIn(closeAuthModal)

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Title level={4}>
                            {t('entrance')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            type='text'
                            name='username'
                            label={t('login')}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            onChange={(e) => formik.setFieldValue('username', e.target.value.toLowerCase())}
                            error={formik.touched.username && formik.errors.username}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            name='password'
                            type='password'
                            inputType='password'
                            onBlur={formik.handleBlur}
                            label={t('password')}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && formik.errors.password}
                        />
                    </Col>
                    <Col span={24}>
                        <AuthButtonGroup>
                            <AuthTextLink to='/recovery'>
                                {t('forgot_password')}
                            </AuthTextLink>
                            <AuthButton
                                htmlType='submit'
                                size='lg'
                                disabled={disabled()}
                                loading={formik.isSubmitting}
                            >
                                {t('enter')}
                            </AuthButton>
                        </AuthButtonGroup>
                    </Col>
                </Row>
            </form>
            <BottomText>
                <Trans i18nKey="i_don't_have_an_account_register_now">
                    <Link to='/sign-up'/>
                </Trans>
            </BottomText>
        </>
    )
}
