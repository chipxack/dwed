import {InputUI} from "../../../UIComponents/inputs";
import {Col, Row} from "antd";
import {SecondSimpleImageUpload} from "../../image-upload/organisms";
import {ChannelBlock, StreamControl} from "../atoms";
import Clipboard from "react-clipboard.js";
import {AlertCircleSvg, CopySvg} from "../../../media";
import {InputSystem, RadioGroupSystem} from "../../../ui/molecules";
import {showModal} from "../../../models/widgets";
import {LISTS} from "../../../constants/lists";
import {ButtonUi} from "../../../ui/atoms";
import React, {useState} from "react";
import {useStore} from "effector-react";
import {$isDataPending} from "../../../models/stream";
import {StreamConfigHook} from "../../../hooks/stream";
import {SelectionList} from "../../selection-list";
import {useTranslation} from "react-i18next";
import {ModalCustom} from "../../modal/atoms";
import {useHistory} from "react-router-dom";
import stream from "../../../service/stream";


export const EditChannel = () => {
    const isDataPending = useStore($isDataPending)
    const channelInfo = isDataPending.$myStreamInfo.result
    const {t} = useTranslation()
    const history = useHistory();

    const [modalVisible, setModalVisible] = useState(false);


    const {
        handleChange,
        formik
    } = StreamConfigHook(channelInfo)

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

    const deleteChannel = () => {
        if (channelInfo && channelInfo.channel_slug){
            stream.deleteChannel(channelInfo.channel_slug)
                .then(response => {
                    if (response.status === 204){
                        history.push(history.location.pathname.split(`/${channelInfo.channel_slug}`)[0])
                    }
                })
                .catch(error => console.error(error.response))
        }
    }

    return(
        <ChannelBlock onSubmit={formik.handleSubmit}>
            <ModalCustom
                title={t('are-you-sure')}
                visible={modalVisible}
                footer={false}
                onCancel={() => setModalVisible(false)}
            >
                <Row>
                    <Col span={24}>
                        <Row style={{paddingTop: 46}} justify={'space-between'}>
                            <ButtonUi onClick={() => setModalVisible(false)}>{t('cancel')}</ButtonUi>
                            <ButtonUi onClick={() => deleteChannel()} buttonType={'danger'}>{t('delete_channel')}</ButtonUi>
                        </Row>
                    </Col>
                </Row>
            </ModalCustom>
            <InputUI
                style={{width: 380, flexDirection: 'column'}}
                label={t('channel_name')}
                onChange={(e) => handleChange(e.target.value, 'channel_name')}
                value={formik.values.channel_name}
            />
            <Row style={{marginTop: 24}} gutter={40}>
                <Col span={12}>
                    <h3>{t('channel_cover')}</h3>
                    <SecondSimpleImageUpload
                        onBlur={() => formik.setFieldTouched('thumbnail', true, true)}
                        error={formik.touched.thumbnail && formik.errors.thumbnail}
                        value={formik.values.thumbnail}
                        onChange={(value) => handleChange(value, 'thumbnail')}
                        uploadButtonText={t('edit_cover')}
                        size='middle'
                        dropZoneText={t('move_photo_to_upload')}
                    />
                    {/*<img src={channelInfo.thumbnail} alt={channelInfo.channel_name}/>*/}
                </Col>
                <Col span={12}>
                    <h3>{t('channel_logo')}</h3>
                    <SecondSimpleImageUpload
                        onBlur={() => formik.setFieldTouched('logo', true, true)}
                        error={formik.touched.logo && formik.errors.logo}
                        value={formik.values.logo}
                        onChange={(value) => handleChange(value, 'logo')}
                        uploadButtonText={t('edit_logo')}
                        size='middle'
                        dropZoneText={t('move_photo_to_upload')}
                    />
                </Col>
            </Row>
            <Row gutter={40}>
                <Col span={24}>
                    <h3 style={{marginTop: 24}}>{t('stream_key')}</h3>
                </Col>
                <Col span={12}>
                    <StreamControl>
                        <InputUI
                            label={t('stream_link')}
                            style={{width: 300}}
                            value='rtmp://dwed.biz/live'
                            disabled
                        />
                    </StreamControl>
                </Col>
                <Col span={12}>
                    <StreamControl>
                        <InputUI
                            label={t('stream_key')}
                            style={{width: 300}}
                            type='password'
                            value={channelInfo.stream_key || ''}
                            disabled
                        />
                        <Clipboard data-clipboard-text={channelInfo.stream_key}>
                            <CopySvg/>
                        </Clipboard>
                    </StreamControl>
                </Col>
            </Row>
            <Row gutter={40}>
                <Col span={12}>
                    <h3 style={{marginTop: 24}}>{t('description')}</h3>
                </Col>
                <Col span={12}>
                    <h3 style={{marginTop: 24}}>{t('age_restriction')}</h3>
                </Col>
                <Col span={12}>
                    <StreamControl>
                        <InputUI
                            inputType={'textarea'}
                            label={t('channel_description')}
                            style={{width: 300}}
                            value={formik.values.channel_description}
                            onChange={(e) => handleChange(e.target.value, 'channel_description')}
                        />
                    </StreamControl>
                    <h3 style={{marginTop: 24}}>{t('channel_category')}</h3>
                    <h4>
                        <AlertCircleSvg/>
                        <span>
                                {t('for_a_quick_search')}
                            </span>
                    </h4>
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
                </Col>
                <Col span={12}>
                    <h4>
                        <AlertCircleSvg/>
                        <span>
                                {t('age_restriction_info')}
                            </span>
                    </h4>
                    <RadioGroupSystem
                        value={formik.values.age_restrictions}
                        change={(value) => handleChange(value, 'age_restrictions')}
                        error={formik.touched.age_restrictions && formik.errors.age_restrictions}
                        onBlur={formik.handleBlur}
                        style={{flexDirection: 'row'}}
                        options={[{name: '+0', value: 0}, {name: '+3', value: 3}, {
                            name: '+6',
                            value: 6
                        }, {name: '+12', value: 12}, {name: '+18', value: 18}, {name: '+21', value: 21}]}
                    />
                    <h3 style={{marginTop: 24}}>{t('regions')}</h3>
                    <h4>
                        <AlertCircleSvg/>
                        <span>
                                {t('regions_info')}
                            </span>
                    </h4>
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
                    <Row style={{paddingTop: 46}} justify={'space-between'}>
                        <ButtonUi onClick={() => setModalVisible(true)} buttonType={'danger'}>{t('delete_channel')}</ButtonUi>
                        <ButtonUi htmlType='submit'>{t('save')}</ButtonUi>
                    </Row>
                </Col>
            </Row>


        </ChannelBlock>
    )
}