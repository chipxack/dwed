import React, {useState} from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../models/app'
import {useUserProfileSettings} from '../../../hooks/settings/use-user-profile-settings'
import {Col, Row, Spin} from 'antd'
import {InputUI} from '../../../UIComponents/inputs'
import {useTranslation} from 'react-i18next'
import {AvatarUpload} from '../../../components/image-upload'
import {ButtonUI} from '../../../ui/atoms'
import {Modal} from '../../../components/modal'
import {SelectionList} from '../../../components/selection-list'
import {LISTS} from '../../../constants/lists'
import {AccountVerifyingInfo} from './account-veririfying-info'
import {langOptions} from '../../../data/lang'
import {$accountModel} from '../../../models/accountModel'
import {AlertCircleSvg, CheckMarkCircleSvg} from '../../../media'
import {debounce} from '../../../utils/debounceUtils'
import {Alert} from '@material-ui/lab'
import {Text, Title} from '../../../UIComponents/typography'
import {Link} from 'react-router-dom'

export const UserProfile = () => {
    const {t} = useTranslation()
    const {formik, onAvatarChange, usernameStatus, validateUsername, loading} = useUserProfileSettings()
    const {$currencyList: {data: currencyData}} = useStore($appModel)
    const {$accountInfo: {data}} = useStore($accountModel)
    const [list, setList] = useState(undefined)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const currencyOptions = currencyData.map(item => ({
        label: item.code.toUpperCase(),
        value: item.id,
    }))

    const showForm = currentProfile && currentProfile.status !== 5

    const renderIcon = () => {
        switch (usernameStatus) {
            case 1:
                return <CheckMarkCircleSvg style={{color: '#00E096'}} />
            case 0:
                return <AlertCircleSvg style={{color: '#FF3D71'}} />
            default:
                return <></>
        }
    }

    return (
        <>
            <Modal
                modalIsOpen={!!list}
                setModalIsOpen={() => setList(undefined)}
                component={(
                    <SelectionList
                        handleChange={(value) => formik.setFieldValue(list.name, value)}
                        onClose={() => setList(undefined)}
                        type={list && list.type}
                    />
                )}
            />
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[32, 16]}>
                    <Col span={24}
                         style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 24}}
                    >
                        <AvatarUpload
                            handleChange={onAvatarChange}
                            imgUrl={formik.values.avatar}
                        />
                        <AccountVerifyingInfo />
                    </Col>
                    {
                        data && !data.has_usable_password && Object.values(data).length > 0 && (
                            <Col span={24}>
                                <Alert variant="outlined" severity="error">
                                    <Title>
                                        {t('set_up_password_for_your_account')}
                                    </Title>
                                    <Text>
                                        {t('set_password_sentence')}
                                    </Text>

                                    <Link className="set-up-password" to="/settings/security">
                                        {t('set_up_password')}
                                    </Link>
                                </Alert>
                            </Col>
                        )
                    }
                    <Col span={12}>
                        <InputUI
                            variant="filled"
                            name="username"
                            value={formik.values.username}
                            onChange={(e) => debounce(validateUsername(e.target.value), 300)}
                            label={t('login')}
                            icon={loading ? <Spin size="small" /> : renderIcon()}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && formik.errors.username}
                        />
                    </Col>
                    {
                        showForm && (
                            <>
                                <Col span={12}>
                                    <InputUI
                                        variant="filled"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        label={t('name')}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputUI
                                        name="lastname"
                                        variant="filled"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        label={t('lastname')}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputUI
                                        inputType="keyboardDate"
                                        variant="filled"
                                        onChange={(value) => formik.setFieldValue('birthday', value)}
                                        value={formik.values.birthday}
                                        label={t('birthday')}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputUI
                                        label={t('gender')}
                                        variant="filled"
                                        inputType="select"
                                        value={formik.values.gender}
                                        options={[{value: 'm', label: t('male')}, {value: 'f', label: t('female')}]}
                                        onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                                    />
                                </Col>
                            </>
                        )
                    }

                    <Col span={12}>
                        <InputUI
                            label={t('currency')}
                            variant="filled"
                            inputType="select"
                            value={formik.values.currency}
                            options={currencyOptions}
                            onChange={(e) => formik.setFieldValue('currency', e.target.value)}
                            error={formik.touched.currency && formik.errors.currency}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            label={t('lang')}
                            variant="filled"
                            inputType="select"
                            value={formik.values.lang}
                            options={langOptions}
                            onChange={(e) => formik.setFieldValue('lang', e.target.value)}
                            error={formik.touched.currency && formik.errors.lang}
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            onClick={() => setList({
                                type: LISTS.USER_CATEGORY,
                                name: 'category',
                                title: 'select_category',
                            })}
                            variant="filled"
                            value={formik.values.category ? formik.values.category.name : ''}
                            label={t('speciality')}
                            error={formik.touched.category && formik.errors.category}
                            readOnly
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            onClick={() => setList({type: LISTS.REGION, name: 'region', title: 'select_region'})}
                            variant="filled"
                            value={formik.values.region ? formik.values.region.name : ''}
                            label={t('region')}
                            error={formik.touched.region && formik.errors.region}
                            readOnly
                        />
                    </Col>
                    <Col span={24} style={{marginTop: 24}}>
                        <ButtonUI
                            disabled={
                                formik.isSubmitting
                                || (formik.touched.username && !!formik.errors.username)
                                || (formik.touched.currency && !!formik.errors.currency)
                                || (formik.touched.category && !!formik.errors.category)
                                || (formik.touched.region && !!formik.errors.region)
                            }
                            style={{marginLeft: 'auto'}}
                            size="lg"
                            htmlType="submit"
                        >
                            {t('save')}
                        </ButtonUI>
                    </Col>
                </Row>
            </form>
        </>
    )
}
