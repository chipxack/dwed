import React, {useState} from 'react'
import {useOrgProfileSettings} from '../../../hooks/settings'
import {Col, Row} from 'antd'
import {AvatarUpload} from '../../../components/image-upload'
import {AccountVerifyingInfo} from './account-veririfying-info'
import {LISTS} from '../../../constants/lists'
import {InputUI} from '../../../UIComponents/inputs'
import {SelectionList} from '../../../components/selection-list'
import {Modal} from '../../../components/modal'
import {useTranslation} from 'react-i18next'
import {ButtonUI} from '../../../ui/atoms'

export const OrgProfile = () => {
    const {formik} = useOrgProfileSettings()
    const [list, setList] = useState(undefined)
    const {t} = useTranslation()

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
                            handleChange={(value) => formik.setFieldValue('logo', value)}
                            imgUrl={formik.values.logo?.stringUrl}
                        />
                        <AccountVerifyingInfo/>
                    </Col>
                    <Col span={12}>
                        <InputUI
                            name='name'
                            label={t('name')}
                            variant='filled'
                            value={formik.values.slug_name}
                            readOnly
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            onClick={() => setList({
                                type: LISTS.ORG_CATEGORY,
                                name: 'category',
                                title: 'select_category'
                            })}
                            variant='filled'
                            value={formik.values.category ? formik.values.category.name : ''}
                            label={t('speciality')}
                            error={formik.touched.category && formik.errors.category}
                            readOnly
                        />
                    </Col>
                    <Col span={12}>
                        <InputUI
                            onClick={() => setList({type: LISTS.REGION, name: 'region', title: 'select_region'})}
                            variant='filled'
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
                                || (formik.touched.region && !!formik.errors.region)
                                || (formik.touched.category && !!formik.errors.category)
                            }
                            style={{marginLeft: 'auto'}}
                            size='lg'
                            htmlType='submit'
                        >
                            {t('save')}
                        </ButtonUI>
                    </Col>
                </Row>
            </form>
        </>
    )
}
