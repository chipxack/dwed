import React, {useCallback, useRef} from 'react'
import {AvatarUploadBox, AvatarUploadWrapper} from "../atoms";
import {useTranslation} from "react-i18next";
import {showImageEditor, showModal} from "../../../models/widgets";
import {IconBox} from "../../../UIComponents/global-styles";
import {CameraProfSvg} from "../../../media/camera-proffesional";
import {ImageSvg} from '../../../media';
import {Popconfirm} from "antd";
import {PhotoVerifying} from "../../video-recorder";
import {base64StringtoFile, fileToBase64} from "../../../utils/cropUtils";

export const AvatarUpload = ({imgUrl, handleChange}) => {
    const {t} = useTranslation()
    const uploadInput = useRef(null)

    const renderPhotoVerifyingModal = () => ({
        open: true,
        component: <PhotoVerifying handleChange={handleChange}/>,
        title: t('photo_verifying'),
        props: {width: 776}
    })

    const onCompleted = useCallback((base64Url) => {
        const stringUrl = base64Url
        const file = base64StringtoFile(base64Url, 'filename.png')
        handleChange({stringUrl, file})
    }, [handleChange])

    const renderImageEditor = useCallback((url) => ({
        open: true,
        imgUrl: url,
        methods: {onCompleted}
    }), [onCompleted])

    const onChange = async (file) => {
        try {
            const stringUrl = await fileToBase64(file)
            showImageEditor(renderImageEditor(stringUrl))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <AvatarUploadWrapper imgUrl={imgUrl}>
                {
                    !imgUrl && <ImageSvg/>
                }

                <Popconfirm
                    title={t('select_type_upload')}
                    cancelText={t('upload_photo')}
                    okText={t('take_a_photo')}
                    okButtonProps={{size: 'middle', type: "primary"}}
                    cancelButtonProps={{size: 'middle', type: "primary"}}
                    onConfirm={() => showModal(renderPhotoVerifyingModal())}
                    onCancel={() => uploadInput.current.click()}
                    overlayClassName='upload-confirm'
                    icon={false}
                    placement='bottom'
                >
                    <AvatarUploadBox>
                        <IconBox>
                            <CameraProfSvg/>
                        </IconBox>
                    </AvatarUploadBox>
                </Popconfirm>
            </AvatarUploadWrapper>

            <input
                type="file"
                ref={uploadInput}
                readOnly
                onChange={(e) => onChange(e.target.files[0])}
                accept='.jpg, .png, .jpeg'
                style={{display: "none"}}
            />
        </>
    )
}