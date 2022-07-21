import React from 'react'
import {ModalCustom} from "../atoms";
import {useStore} from "effector-react";
import {$widgets, hideModal} from "../../../models/widgets";

export const CustomModal = () => {
    const {$modal} = useStore($widgets)

    const {open, title, props, component} = $modal
    return (
        <ModalCustom
            title={title || false}
            visible={open}
            footer={null}
            onCancel={() => props && props.onCancel !== undefined ? props.onCancel() : hideModal()}
            destroyOnClose
            {...props}
        >
            {component && component}
        </ModalCustom>
    )
}