import React from 'react'
import {AlertCircleSvg} from "../../../media";
import i18next from "i18next";
import {Modal} from 'antd'
const { confirm } = Modal;

export const deleteConfirm = (action, content) => {
    confirm({
        title: i18next.t('are_you_sure_delete'),
        icon: <AlertCircleSvg />,
        okText: i18next.t('yes'),
        okType: 'danger',
        cancelText: i18next.t('no'),
        content: content && content.message ? content.message : '',
        onOk() {
            action()
        },
        onCancel() {
        },
    });
}