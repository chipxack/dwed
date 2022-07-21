import React from "react";
import {Row, Col} from 'antd'
import {InputSystem, RadioGroupSystem} from "../../../ui/molecules";
import {useTranslation} from "react-i18next";
import {StreamFormTitle} from "../atoms";
import {SecondSimpleImageUpload} from "../../image-upload/organisms";
import {ButtonUi} from "../../../ui/atoms";
import {AlertCircleSvg, CheckMarkCircleSvg} from "../../../media";
import {LISTS} from "../../../constants/lists";
import {SelectionList} from "../../selection-list";
import {showModal} from "../../../models/widgets";

export const CreateChannel = ({formik, handleChange, slugNameStatus}) => {
    const {t} = useTranslation()


    const getComponent = (type) => {
        switch (type) {
            case LISTS.REGION:
                return <SelectionList
                    handleChange={(value) => handleChange(value, 'region_id')}
                    type={type}
                />
            case LISTS.ORG_CATEGORY:
                return <SelectionList
                    handleChange={(value) => handleChange(value, 'category_id')}
                    type={type}
                />
            case LISTS.MEDIA_CATEGORY:
                return <SelectionList
                    handleChange={(value) => handleChange(value, 'category')}
                    type={type}
                />
            default:
                return 'category_id'
        }
    }

    const renderModal = (type) => {
        return {
            component: getComponent(type),
            open: true,
            props: {width: 432}
        }
    }

    const renderIcon = () => {
        switch (slugNameStatus) {
            case 1:
                return <CheckMarkCircleSvg style={{color: '#00E096'}}/>
            case 0:
                return <AlertCircleSvg style={{color: '#FF3D71'}}/>
            default:
                return undefined
        }
    }

    return  (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={70}>
                <Col span={12}>
                    <StreamFormTitle>
                        <h1>{t('channel_cover')}</h1>
                        <span>{t('image_use_to_cover')}</span>
                    </StreamFormTitle>
                    <SecondSimpleImageUpload
                        onBlur={() => formik.setFieldTouched('thumbnail', true, true)}
                        error={formik.touched.thumbnail && formik.errors.thumbnail}
                        onChange={(value) => handleChange(value, 'thumbnail')}
                        uploadButtonText={t('upload_cover')}
                        size='middle'
                        dropZoneText={t('move_photo_to_upload')}
                    />
                    <StreamFormTitle style={{marginTop: 72}}>
                        <h1>{t('upload_logo_channel')}</h1>
                        <span>{t('upload_logo_channel_description')}</span>
                    </StreamFormTitle>
                    <SecondSimpleImageUpload
                        onBlur={() => formik.setFieldTouched('logo', true, true)}
                        error={formik.touched.logo && formik.errors.logo}
                        onChange={(value) => handleChange(value, 'logo')}
                        uploadButtonText={t('upload_logo')}
                        size='small'
                    />
                </Col>
                <Col span={12}>
                    <StreamFormTitle>
                        <h1>{t('channel_info')}</h1>
                    </StreamFormTitle>
                    <InputSystem
                        style={{marginBottom: 16}}
                        placeholder={t('channel_name')}
                        name='channel_name'
                        value={formik.values.channel_name}
                        change={(value) => handleChange(value, 'channel_name')}
                        error={formik.touched.channel_name && formik.errors.channel_name}
                        onBlur={formik.handleBlur}
                    />
                    <InputSystem
                        style={{marginBottom: 16}}
                        placeholder={t('channel_slug')}
                        name='channel_slug'
                        value={formik.values.channel_slug}
                        change={(value) => handleChange(value, 'channel_slug')}
                        error={formik.touched.channel_slug && formik.errors.channel_slug}
                        onBlur={formik.handleBlur}
                        icon={renderIcon()}
                    />
                    <InputSystem
                        type='textarea'
                        style={{marginTop: 16}}
                        placeholder={t('channel_description')}
                        name='channel_description'
                        value={formik.values.channel_description}
                        change={(value) => handleChange(value, 'channel_description')}
                        error={formik.touched.channel_description && formik.errors.channel_description}
                        onBlur={formik.handleBlur}
                    />
                    <StreamFormTitle
                        style={{marginTop: 24}}
                    >
                        <h1>{t('channel_category')}</h1>
                        <span>{t('for_a_quick_search')}</span>
                    </StreamFormTitle>
                    <InputSystem
                        onClick={() => showModal(renderModal(LISTS.MEDIA_CATEGORY))}
                        placeholder={t('category_channel')}
                        name='category'
                        value={formik.values.category ? formik.values.category.name : ''}
                        change={(value) => handleChange(value, 'category')}
                        onBlur={formik.handleBlur}
                        error={formik.touched.category && formik.errors.category}
                        readOnly
                        // icon={<EditPenFillSvg/>}
                    />
                    <StreamFormTitle
                        style={{marginTop: 24}}
                    >
                        <h1>{t('age_restriction')}</h1>
                        <span>{t('age_restriction_info')}</span>
                    </StreamFormTitle>
                    <RadioGroupSystem
                        value={formik.values.age_restrictions}
                        change={(value) => handleChange(value, 'age_restrictions')}
                        error={formik.touched.age_restrictions && formik.errors.age_restrictions}
                        onBlur={formik.handleBlur}
                        style={{flexDirection: 'row'}}
                        options={[{name: '+0', value: 0}, {name: '+3', value: 3}, {name: '+6', value: 6}, {name: '+12', value: 12}, {name: '+18', value: 18}, {name: '+21', value: 21}]}
                    />
                    <StreamFormTitle
                        style={{marginTop: 24}}
                    >
                        <h1>{t('regions')}</h1>
                        <span>{t('fast_search')}</span>
                    </StreamFormTitle>
                    <InputSystem
                        onClick={() => showModal(renderModal(LISTS.REGION))}
                        placeholder={t('region')}
                        name='region_id'
                        value={formik.values.region_id ? formik.values.region_id.name : ''}
                        change={(value) => handleChange(value, 'region_id')}
                        onBlur={formik.handleBlur}
                        error={formik.touched.region_id && formik.errors.region_id}
                        readOnly
                        // icon={<EditPenFillSvg/>}
                    />
                </Col>
                <Col span={24}>
                    <Row justify={'end'}>
                        <ButtonUi style={{marginTop: 46}} htmlType='submit'>{t('create_channel')}</ButtonUi>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}