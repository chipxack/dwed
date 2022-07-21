import React, {useEffect, useState} from 'react'
import Camera from "react-html5-camera-photo";
import {VideoDisconnected} from "./video-disconnected";
import {CameraWrapper, UploadedImage, VideoActionWrapper} from "../atoms";
import {ButtonUI} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";
import {base64StringtoFile, fileToBase64} from "../../../utils/cropUtils";
import {$widgets, hideModal} from "../../../models/widgets";
import {CameraSvg} from "../../../media/camera";
import {CloudUploadSvg} from "../../../media";
import {RefreshSvg} from "../../../media/refresh";
import {useStore} from "effector-react";

export const PhotoActionRender = ({sendPhoto, onlyTakePhoto}) => {
    const {$modal: {open}} = useStore($widgets)
    const [webCamOn, setWebCamOn] = useState(true)
    const [data, setData] = useState(null);
    const {t} = useTranslation()

    async function handleChange(dataUri, type) {
        let file, stringUrl
        try {
            if (type === 'file') {
                stringUrl = await fileToBase64(dataUri)
                file = dataUri
            } else {
                stringUrl = dataUri
                file = base64StringtoFile(dataUri, 'filename.jpeg')
            }
            setWebCamOn(false)
            setData({stringUrl, file})
        } catch (e) {
            console.log(e);
        }
    }

    const handleActiveCamera = () => {
        setWebCamOn(true)
    }

    const handleSend = () => {
        sendPhoto(data)
        setWebCamOn(false)
        hideModal()
    }

    const handleReset = () => {
        setWebCamOn(true)
        setData(null)
    }

    useEffect(() =>{
        if(open) {
            setWebCamOn(true)
        }else {
            setWebCamOn(false)
        }
    }, [open])

    return (
        <CameraWrapper shape={onlyTakePhoto ? 'square' : 'round'}>
            {
                data && (
                    <UploadedImage imgUrl={data.stringUrl}/>
                )
            }

            {
                webCamOn && (
                    <Camera
                        onTakePhoto={handleChange}
                        idealResolution={{width: 300, height: 300}}
                        imageType='jpg'
                    />
                )
            }


            {
                !data && !webCamOn
                && (
                    <VideoDisconnected type='photo'/>
                )
            }

            <VideoActionWrapper>
                {
                    data
                    && (
                        <>
                            <ButtonUI onClick={handleSend}>
                                <CloudUploadSvg/>
                                {t('upload')}
                            </ButtonUI>
                            <ButtonUI onClick={handleReset} style={{marginLeft: 12}}>
                                <RefreshSvg/>
                                {t('reset')}
                            </ButtonUI>
                        </>
                    )
                }
                {
                    !data && !webCamOn
                    && (
                        <>
                            <ButtonUI onClick={handleActiveCamera}>
                                <CameraSvg/>
                                {t('take_a_photo')}
                            </ButtonUI>
                        </>
                    )
                }
            </VideoActionWrapper>
        </CameraWrapper>
    )
}