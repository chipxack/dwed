import React from 'react'
import {BottomText} from '../../../ui/atoms'
import {Link} from 'react-router-dom'
import {AlertCircleSvg, CheckMarkCircleSvg} from '../../../media'
import {Checkbox, Col, Row} from 'antd'
import {AuthButton} from '../atoms'
import {useCreateAccount} from '../../../hooks/auth'
import {Title} from '../../../UIComponents/typography'
import {Trans, useTranslation} from 'react-i18next'
import {InputUI} from '../../../UIComponents/inputs'
import {debounce} from '../../../utils/debounceUtils'

export const CreateAccount = () => {
    const {usernameStatus, formik, validateUsername, handleChange} = useCreateAccount({})
    const {t} = useTranslation()

    const renderIcon = () => {
        switch (usernameStatus) {
            case 1:
                return <CheckMarkCircleSvg style={{color: '#00E096'}}/>
            case 0:
                return <AlertCircleSvg style={{color: '#FF3D71'}}/>
            default:
                return <></>
        }
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Title level={4}>
                            {t('registration')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            type='text'
                            name='username'
                            icon={renderIcon()}
                            label={t('login')}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            onChange={(e) => debounce(validateUsername(e.target.value))}
                            error={formik.touched.username && formik.errors.username}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            type='text'
                            name='name'
                            label={t('name')}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            type='text'
                            name='lastname'
                            label={t('lastname')}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && formik.errors.lastname}
                        />
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
                        <InputUI
                            variant='filled'
                            inputType='password'
                            type='password'
                            name='password'
                            label={t('password')}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            error={formik.touched.password && formik.errors.password}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            variant='filled'
                            inputType='password'
                            type='password'
                            name='confirmPassword'
                            label={t('confirm_password')}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </Col>
                    <Col span={24}>
                        <Checkbox
                            name='accept'
                            checked={formik.values.accept}
                            onChange={(e) => {
                                formik.setFieldTouched('accept', true, true)
                                handleChange('accept', e.target.checked)
                            }}
                        >
                            <Trans i18nKey='i_accept_the_user_agreement'>
                                <Link to='/'/>
                            </Trans>
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <AuthButton
                            disabled={!formik.values.accept}
                            size='lg'
                            htmlType='submit'
                            style={{marginLeft: 'auto'}}
                        >
                            {t('register')}
                        </AuthButton>
                    </Col>
                </Row>
            </form>
            <BottomText>
                <Trans i18nKey='already_have_an_account_sign_in'>
                    <Link to='/sign-in'/>
                </Trans>
            </BottomText>
        </>
    )
}
