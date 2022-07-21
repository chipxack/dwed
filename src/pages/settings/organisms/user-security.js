import React from 'react'
import {Col, Row} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {InputUI} from '../../../UIComponents/inputs'
import {useUserSecurity} from '../../../hooks/settings'
import {ButtonUI} from '../../../ui/atoms'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'

export const UserSecuritySettings = () => {
    const {$accountInfo: {data}} = useStore($accountModel)
    const {t} = useTranslation()
    const {formik} = useUserSecurity()

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[0, 16]}>
                <Col span={24}>
                    <Title level={5}>
                        {t('change_password')}
                    </Title>
                </Col>
                <Col span={24}>
                    <Row gutter={24} wrap={false}>
                        {
                            data?.has_usable_password && (
                                <Col span={8}>
                                    <InputUI
                                        label={t('old_password')}
                                        inputType="password"
                                        variant="filled"
                                        name="old_password"
                                        value={formik.values.old_password || ''}
                                        onChange={formik.handleChange}
                                    />
                                </Col>
                            )
                        }

                        <Col span={!data?.has_usable_password ? 12 : 8}>
                            <InputUI
                                label={t('new_password')}
                                inputType="password"
                                variant="filled"
                                name="new_password"
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.new_password && formik.errors.new_password}
                            />
                        </Col>
                        <Col span={!data?.has_usable_password ? 12 : 8}>
                            <InputUI
                                label={t('confirm_password')}
                                inputType="password"
                                variant="filled"
                                name="confirm_password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirm_password && formik.errors.confirm_password}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{marginTop: 24}}>
                    <ButtonUI
                        size="lg"
                        htmlType="submit"
                        style={{marginLeft: 'auto'}}
                        disabled={formik.isSubmitting
                        || (formik.touched.new_password && !!formik.errors.new_password)
                        || (formik.touched.confirm_password && !!formik.errors.confirm_password)
                        }
                    >
                        {t('save')}
                    </ButtonUI>
                </Col>
            </Row>
        </form>
    )
}
