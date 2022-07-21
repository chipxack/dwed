import React from 'react'
import FilerobotImageEditor from "filerobot-image-editor";
import {useStore} from "effector-react";
import {$widgets, hideImageEditor} from "../../../models/widgets";
import {imageEditorConfig} from "../config";

export const ImageEditor = () => {
    const {$imageEditor: {imgUrl, open, methods}} = useStore($widgets)

    const onBeforeComplete = (e) => {
        methods.onCompleted(e.canvas.toDataURL('image/png'))
        return false
    }

    return (
        <FilerobotImageEditor
            className='image-editor'
            config={imageEditorConfig}
            show={open}
            src={imgUrl}
            onBeforeComplete={onBeforeComplete}
            onClose={() => hideImageEditor()}
        />
    )
}