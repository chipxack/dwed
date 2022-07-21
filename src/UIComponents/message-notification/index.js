import React from 'react'
import {CheckMarkSquareCheckedSvg} from "../../media";
import {message} from 'antd'
import {AlertCircleSvg} from "../../media";
import i18n from '../../config/i18n'

const getIcon = (type) => {
    switch (type) {
        case 'danger':
            return <AlertCircleSvg style={{color: '#FF3D71'}}/>
        default:
            return <CheckMarkSquareCheckedSvg style={{color: '#2BCBBA'}}/>
    }
}

export const showMessage = (content, type = 'success', translate = true) => {
    const config = {
        content: translate ? i18n.t(content) : content,
        icon: getIcon(type),
        duration: 2
    }
    switch (type) {
        default:
            message.success({...config})
    }
}