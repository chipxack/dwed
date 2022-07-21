import {theme} from './theme';
import {notification} from "antd";
import { PERMISSIONS } from './constants'

const color = theme.main;

export const getColor = (type) => {
    return {
        'default': color.themeColor[400],
        'primary': color.brandColor[500],
        'success': color.semanticColor.success[500],
        'danger': color.semanticColor.danger[400]
    }[type];
};

export const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
    });
};

export const isEmptyObject = (obj) => {
    for(let key in obj) {
        return false;
    }
    return true;
}

export const PERMS_LIST = [
    {
        id: 1,
        value: PERMISSIONS.GRAND,
        label: 'full_access'
    },
    {
        id: 2,
        value: PERMISSIONS.SPECIALISTS,
        label: 'human_resources'
    },
    {
        id: 3,
        value: PERMISSIONS.OFFERINGS,
        label: 'content'
    },
    {
        id: 5,
        value: PERMISSIONS.MEDIA,
        label: 'media'
    },
    {
        id: 6,
        value: PERMISSIONS.CHAT,
        label: 'chat'
    },
    {
        id: 7,
        value: PERMISSIONS.POSTS,
        label: 'posts'
    },
    {
        id: 8,
        value: PERMISSIONS.STATISTICS_CLIENTS,
        label: 'statistics_client'
    },
    {
        id: 9,
        value: PERMISSIONS.STATISTICS_SPECS,
        label: 'statistics_spec'
    },
    {
        id: 10,
        value: PERMISSIONS.STATISTICS_FINANCE,
        label: 'statistics_finance'
    }
]

export const UNITS_OF_MEASUREMENT = [
    {
        id: 0,
        value: 0,
        label: 'peaces'
    },
    {
        id: 1,
        value: 1,
        label: 'kg'
    },
    {
        id: 2,
        value: 2,
        label: 'm'
    },
    {
        id: 3,
        value: 3,
        label: 'hour'
    },
    {
        id: 4,
        value: 4,
        label: 'set'
    },
    {
        id: 5,
        value: 5,
        label: 'm2'
    },
    {
        id: 6,
        value: 6,
        label: 'm3'
    },
    {
        id: 7,
        value: 7,
        label: 'appointment'
    },
    {
        id: 8,
        value: 8,
        label: 'gramm'
    },
    {
        id: 9,
        value: 9,
        label: 'litre'
    },
    {
        id: 10,
        value: 10,
        label: 'day'
    }
]