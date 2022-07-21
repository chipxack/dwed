import React, {useState} from 'react'
import VideoRecorder from "react-video-recorder";
import {VideoActionsRender, VideoDisconnected, VideoInstruction} from "../moleculas";
import {VideoRecorderUi} from "../atoms";
import moment from 'moment'
import {blobToBase64} from "../../../utils/cropUtils";
import {Col, Row} from "antd";

export const VideoVerifying = ({handleChange, closeVideo, instruction}) => {
    const [customUpload, setCustomUpload] = useState(false)
    const [videoFile, setVideoFile] = useState(null)

    const onRecordingComplete = async (blob) => {
        try {
            let file = new File([blob],
                `video-message-${moment(new Date()).format('YYYY-MM-DD-HH:mm:ss')}.${blob.type.split('/')[1].split(';')[0]}`,
                {type: blob.type}
            );
            const stringUrl = await blobToBase64(blob)
            const data = {
                stringUrl,
                file
            }
            setVideoFile(data)
        } catch (e) {
            console.log(e);
        }
    }

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

    return (
        <Row gutter={24}>
            <Col span={12}>
                <VideoRecorderUi>
                    <VideoRecorder
                        onRecordingComplete={onRecordingComplete}
                        timeLimit={4000}
                        mimeType={isSafari ? 'video/mp4' : 'video/webm'}
                        renderDisconnectedView={() => <VideoDisconnected show={customUpload}/>}
                        renderActions={(props) => <VideoActionsRender
                            {...props}
                            closeVideo={closeVideo}
                            sendVideo={() => handleChange(videoFile)}
                            setShowUploadVideo={setCustomUpload}
                            showUploadVideo={customUpload}
                            videoFile={videoFile}
                            setVideoFile={setVideoFile}
                        />
                        }
                    />
                </VideoRecorderUi>
            </Col>
            <Col span={12}>
                <VideoInstruction instruction={instruction}/>
            </Col>
        </Row>
    )

}
