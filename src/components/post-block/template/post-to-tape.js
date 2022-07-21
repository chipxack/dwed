import {ButtonUI, ButtonUi} from "../../../ui/atoms";
import {
    CloseSvg,
    SmallEditPen
} from "../../../media";
import {
    PostButton,
    PostToTapeSection,
    PostUploadImage,
    TapeForm, TapeFormActionBlock,
    TapeFormImageBlock
} from "../atoms";
import {ModalCustom} from "../../modal/atoms";
import {useTranslation} from "react-i18next";
import {TextAreaSystem} from "../../../ui/molecules";
import {PostToTapeHook} from "../../../hooks/tape";
import {AddOfferToPost} from "../organisms";
import {useStore} from "effector-react";
import {$isDataPending} from "../../../models/tape";
import {changeTextForm} from "../../../models/tape/events";
import {NoImageSvg} from "../../../media/image";
import {NewTrashSvg} from "../../../media/trash";
import {Progress, Row, Col} from "antd";


export const PostToTape = ({visible, setVisible}) => {
    const {t} = useTranslation()
    const formData = useStore($isDataPending).$postForm


    const {
        createPost,
        setImageArr,
        setOfferStatus,
        offerStatus,
        loading,
        setSelectSpecId,
        selectSpecId,
        setSelectOffer,
        selectOffer,
        closeModal,
        postForm,
        editImage,
        removeItem
    } = PostToTapeHook(visible, setVisible)


    return (
        <PostToTapeSection>
            <ModalCustom
                closeIcon={<CloseSvg/>}
                width={700}
                visible={visible}
                title={offerStatus ? t('select_offer') : t('create_post')}
                footer={null}
                onCancel={() => closeModal()}
            >
                <TapeForm onSubmit={createPost}>
                    {
                        offerStatus ?
                            <AddOfferToPost
                                setSelectSpecId={setSelectSpecId}
                                selectSpecId={selectSpecId}
                                back={setOfferStatus}
                                setSelectOffer={setSelectOffer}
                                selectOffer={selectOffer}
                            /> :
                            <Row gutter={[12, 12]}>
                                {
                                    postForm?.file?.length > 0 && postForm.file.map((item, key) =>
                                        <Col span={8} key={key}>
                                            <TapeFormImageBlock width={170}>
                                                {
                                                    item.loading !== 100 ?
                                                        <Progress type="circle" percent={item.loading} width={80}/> :
                                                        <TapeFormActionBlock>
                                                            {
                                                                item.type === 'image' &&
                                                                <ButtonUI
                                                                    className='effects'
                                                                    onClick={() => editImage(item.value, key)}
                                                                >
                                                                    <SmallEditPen/>
                                                                    {/*<MagicWindSvg/>{t('effects')}*/}
                                                                </ButtonUI>
                                                            }
                                                            <ButtonUI className='trash' onClick={() => removeItem(key)}><NewTrashSvg/></ButtonUI>
                                                        </TapeFormActionBlock>
                                                }
                                                {
                                                    item.type === 'image' ?
                                                        <img src={item.value} alt={'slide'}/> :
                                                        <video src={item.value} controls='hidden'/>
                                                }
                                            </TapeFormImageBlock>
                                        </Col>
                                    )
                                    // <ImageGallery
                                    //     renderLeftNav={(onClick, disabled) =>
                                    //         <button
                                    //             type='button'
                                    //             className='image-gallery-left-nav nav-buttons'
                                    //             disabled={disabled}
                                    //             onClick={onClick}
                                    //         >
                                    //             <ChevronLeftSvg/>
                                    //         </button>
                                    //     }
                                    //     renderRightNav={(onClick, disabled) =>
                                    //         <button
                                    //             type='button'
                                    //             className='image-gallery-right-nav nav-buttons'
                                    //             disabled={disabled}
                                    //             onClick={onClick}
                                    //         >
                                    //             <ChevronRightSvg/>
                                    //         </button>
                                    //     }
                                    //     style={{marginBottom: 24}}
                                    //     items={fileArr}
                                    //     showPlayButton={false}
                                    //     showFullscreenButton={false}
                                    // />
                                    // <Carousel autoplay>
                                    //     {file.map((item, key) =>
                                    //         <TapeFormImageBlock>
                                    //             <ButtonUI onClick={() => editImage(item.value, key)}>Edit</ButtonUI>
                                    //             <img key={key} src={item.value} alt={'slide'}/>
                                    //         </TapeFormImageBlock>
                                    //     )}
                                    // </Carousel>
                                }
                                {
                                    postForm?.file?.length < 6 &&
                                    <Col span={8}>
                                        <PostUploadImage htmlFor="image">
                                            <input
                                                multiple={true}
                                                onChange={(e) => setImageArr(e)}
                                                hidden
                                                type='file'
                                                id={'image'}
                                                accept="image/png, image/jpeg, video/*"
                                            />
                                            <NoImageSvg/>{t('photo&video')}
                                        </PostUploadImage>
                                    </Col>
                                }


                                {/*<InputSystem*/}
                                {/*    style={{marginBottom: 16}}*/}
                                {/*    value={title}*/}
                                {/*    change={setTitle}*/}
                                {/*    placeholder={t('post_name')}*/}
                                {/*/>*/}
                                <TextAreaSystem
                                    value={formData.text}
                                    change={(e) => changeTextForm(e)}
                                    placeholder={t('post_description')}
                                />
                                {/*<TapeFormContent>*/}
                                {/*    /!*<span>*!/*/}
                                {/*    /!*    {t('adding_to_post')}*!/*/}
                                {/*    /!*</span>*!/*/}
                                {/*    <span>*/}
                                {/*        <label htmlFor="image">*/}
                                {/*            <input*/}
                                {/*                multiple={true}*/}
                                {/*                onChange={(e) => setImageArr(e)}*/}
                                {/*                hidden*/}
                                {/*                type='file'*/}
                                {/*                id={'image'}*/}
                                {/*                accept="image/png, image/jpeg, video/*"*/}
                                {/*            />*/}
                                {/*            <ImageSvg/>{t('photo&video')}*/}
                                {/*        </label>*/}
                                {/*        /!*<label onClick={() => setOfferStatus(true)}>*!/*/}
                                {/*        /!*    <ShoppingBagSvg/>{t('offer')}*!/*/}
                                {/*        /!*</label>*!/*/}
                                {/*        /!*<ButtonUi></ButtonUi>*!/*/}
                                {/*    </span>*/}
                                {/*</TapeFormContent>*/}
                            </Row>
                    }

                    <ButtonUi
                        loading={loading}
                        disabled={!formData.text || loading}
                        style={{margin: ' 28px 0 0 auto'}}
                        htmlType='submit'
                    >
                        {t('publish')}
                    </ButtonUi>
                </TapeForm>

            </ModalCustom>
            <PostButton onClick={() => setVisible(true)}>{t('whats-news')}</PostButton>
            {/*<FastPost*/}
            {/*    focus={(inputFocus || (formData.text && formData.text.length > 0))}*/}
            {/*    onFocus={() => setInputFocus(true)}*/}
            {/*    onBlur={() => setInputFocus(false)}*/}
            {/*>*/}
            {/*    <TextAreaSystem*/}
            {/*        onClick={() => !token && toggleAuthModal(true)}*/}
            {/*        minRows={1}*/}
            {/*        rows={(inputFocus || (formData.text && formData.text.length > 0)) ? 4 : 1}*/}
            {/*        value={formData.text}*/}
            {/*        change={(e) => changeTextForm(e)}*/}
            {/*        placeholder={t('whats-news')}*/}
            {/*    />*/}
            {/*    {*/}
            {/*        (inputFocus || (formData.text && formData.text.length > 0)) &&*/}
            {/*        <FastPostBottom>*/}
            {/*            <button className={'upload-button'} onClick={() => token && setVisible(true)}>*/}
            {/*                <AttachSvg/>*/}
            {/*            </button>*/}
            {/*            <ButtonUI*/}
            {/*                onClick={() => createPost()}*/}
            {/*                loading={loading}*/}
            {/*                disabled={token && (!formData.text || loading)}*/}
            {/*            >*/}
            {/*                {t('post')}*/}
            {/*            </ButtonUI>*/}
            {/*        </FastPostBottom>*/}
            {/*    }*/}
            {/*</FastPost>*/}
            {/*<ButtonUi onClick={() => setVisible(true)}><PeopleSvg/></ButtonUi>*/}
            {/*<ButtonUi onClick={() => setVisible(true)}><PinSvg/></ButtonUi>*/}
            {/*<ButtonUi onClick={() => setVisible(true)}><GlobeFillSvg/></ButtonUi>*/}

        </PostToTapeSection>
    )
}