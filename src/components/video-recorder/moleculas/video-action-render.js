import React, {useRef} from "react";
import {ButtonUI} from "../../../ui/atoms";
import Countdown from 'react-video-recorder/lib/defaults/countdown';
import Timer from 'react-video-recorder/lib/defaults/timer';
import {RecActionWrapper, RecCircle, RecStop, VideoActionWrapper} from "../atoms";
import {useTranslation} from "react-i18next";
import {hideModal} from "../../../models/widgets";
import {VideoFileSvg, VideoSvg} from "../../../media/video-fill";
import {RefreshSvg} from "../../../media/refresh";
import {CloudUploadSvg} from "../../../media";
import {fileToBase64} from "../../../utils/cropUtils";


export const VideoActionsRender = (props) => {
    const {
        isVideoInputSupported,
        isInlineRecordingSupported,
        thereWasAnError,
        isRecording,
        isCameraOn,
        streamIsReady,
        isConnecting,
        isRunningCountdown,
        isReplayingVideo,
        countdownTime,
        timeLimit,
        sendVideo,
        onTurnOnCamera,
        onStartRecording,
        onStopRecording,
        onStopReplaying,
        closeVideo,
        setShowUploadVideo,
        setVideoFile,
        videoFile,
        showUploadVideo
    } = props;
    
    const inputRef = useRef()
    const {t} = useTranslation()

    const handleSend = () => {
        sendVideo()
        if (closeVideo) {
            onStopReplaying()
        }
        hideModal()
    }

    const handleUploadFile = async (file) => {
        try {
            const stringUrl = await fileToBase64(file)
            setVideoFile({file, stringUrl})
            setShowUploadVideo(true)
        }catch (e) {
            console.log(e);
        }
    }

    const renderContent = () => {
        if ((!isInlineRecordingSupported && !isVideoInputSupported) || thereWasAnError || isConnecting || isRunningCountdown) {
            return null
        }

        if(showUploadVideo && !!videoFile) {
            return (
                <>
                    <ButtonUI
                        buttonstyle='danger'
                        size='md'
                        onClick={() => setShowUploadVideo(false)}
                    >
                        <RefreshSvg/>
                        {t('reset')}
                    </ButtonUI>
                    <ButtonUI
                        size='md'
                        onClick={handleSend}
                    >
                        <CloudUploadSvg/>
                        {t('upload')}
                    </ButtonUI>
                </>
            )
        }

        if (isReplayingVideo) {
            return (
                <>
                    <ButtonUI
                        buttonstyle='danger'
                        size='md'
                        onClick={onStopReplaying}
                    >
                        <RefreshSvg/>
                        {t('reset')}
                    </ButtonUI>
                    <ButtonUI
                        size='md'
                        onClick={handleSend}
                    >
                        <CloudUploadSvg/>
                        {t('upload')}
                    </ButtonUI>
                </>
            )
        }

        if (isRecording) {
            return (
                <ButtonUI
                    onClick={onStopRecording}
                    size='md'
                >
                    <RecStop/>
                    {t('stop')}
                </ButtonUI>
            )
        }

        if (isCameraOn && streamIsReady) {
            return (
                <ButtonUI
                    buttonstyle='danger'
                    onClick={onStartRecording}
                    size='md'
                >
                    <RecCircle/>
                    {t('record')}
                </ButtonUI>
            )
        }

        return (
            <>
                <ButtonUI
                    onClick={onTurnOnCamera}
                    size='md'
                >
                    <VideoSvg/>
                    {t('turn_on_camera')}
                </ButtonUI>
                <ButtonUI
                    onClick={() => inputRef.current.click()}
                    size='md'
                >
                    <VideoFileSvg/>
                    {t('upload')}
                    <input
                        type="file"
                        style={{display: 'none'}}
                        ref={inputRef}
                        onChange={(e) => handleUploadFile(e.target.files[0])}
                        readOnly
                    />
                </ButtonUI>
            </>
        )
    };

    return (
        <>
            {
                showUploadVideo && videoFile
                && (
                    <video src={videoFile.stringUrl} loop autoPlay />
                )
            }
            <VideoActionWrapper>
                {isRecording && <Timer timeLimit={timeLimit}/>}
                {isRunningCountdown && <Countdown countdownTime={countdownTime}/>}
                <RecActionWrapper>
                    {renderContent()}
                </RecActionWrapper>
            </VideoActionWrapper>
        </>
    )

};