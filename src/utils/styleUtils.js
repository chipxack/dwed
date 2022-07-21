/*Button style utilities*/

import {COLOR_TYPE, HEIGHT, SIZE, TEXT_SIZE} from '../constants';

export const getButtonStyle = (data, type) => {
    return data[type] ? data[type] : data[COLOR_TYPE.PRIMARY]
}

export const getButtonHeight = ({size}) => {
    const defaultValue = size || SIZE.MD
    switch (defaultValue) {
        case SIZE.LG:
            return HEIGHT.LG
        case SIZE.MD:
            return HEIGHT.MD
        case SIZE.SM:
            return HEIGHT.SM
        default:
            return HEIGHT.LG
    }
}

export const getButtonPadding = ({size}) => {
    const defaultValue = size || SIZE.MD
    switch (defaultValue) {
        case SIZE.LG:
            return (HEIGHT.LG - 10)/2
        case SIZE.MD:
            return (HEIGHT.LG - 10)/3
        case SIZE.SM:
            return (HEIGHT.LG - 10)/8
        default:
            return (HEIGHT.LG)/2
    }
}

export const getButtonFontSize = ({size}) => {
    const defaultValue = size || SIZE.MD
    switch (defaultValue) {
        case SIZE.LG:
            return TEXT_SIZE.LG
        case SIZE.MD:
            return TEXT_SIZE.MD
        case SIZE.SM:
            return TEXT_SIZE.SM
        default:
            return TEXT_SIZE.LG
    }
}


/**/