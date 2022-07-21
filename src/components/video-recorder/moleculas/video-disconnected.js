import {VideoFill} from "../../../media";
import React from "react";
import {VideoDisconnectedView} from "../atoms";
import {CameraProfSvg} from "../../../media/camera-proffesional";
import {useTranslation} from "react-i18next";

export const VideoDisconnected = ({type, show}) => {
    const {t} = useTranslation()
    return (
        <>
            {
                !show
                && (
                    <VideoDisconnectedView>
                        {
                            type === 'photo'
                                ? (
                                    <>
                                        <CameraProfSvg/>
                                        <span>{t('take_photo_sentence')}</span>
                                    </>
                                )
                                : (
                                    <>
                                        <VideoFill/>
                                        <span>{t('rec_video_sentence')}</span>
                                    </>
                                )
                        }
                    </VideoDisconnectedView>
                )
            }
        </>
    )
};