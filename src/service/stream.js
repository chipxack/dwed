import {httpDelete, httpGet, httpPatch, httpPost, httpPut} from "../api";


export default {
    createChannel: (data) => httpPost({url: '/streaming/my/', data}),
    deleteChannel: (channel_slug) => httpDelete({url: `/streaming/my/${channel_slug}/`}),
    validateSlugName: (data) => httpPost({url: '/streaming/validate/', data}),
    getMyStreamList: (data) => httpGet({url: '/streaming/my/', data}),
    getMyStreamInfo: (data) => httpGet({url: `/streaming/my/${data.chennel_slug}/`}),
    getAllStreamList: ({params}) => httpGet({url: '/streaming/', params}),
    getStreamInfo: (data) => httpGet({url: `/streaming/${data.channel_slug}/`}),
    sendMessageStreamChat: (data) => httpPost({url: `/streaming/${data.channel_slug}/chat/`, data}),
    getStreamChatList: (params) => httpGet({url: `/streaming/${params.channel_slug}/chat/`, params}),
    editChannel: (channel_slug, data) => httpPut({url: `/streaming/my/${channel_slug}/`, data}),
    addAnnouncementChannel: (channel_slug, data) => httpPost({
        headers: {"Content-Type": "multipart/form-data"},
        url: `/streaming/${channel_slug}/schedule/`,
        data
    }),
    editAnnouncementChannel: (channel_slug, id, data) => httpPatch({
        headers: {"Content-Type": "multipart/form-data"},
        url: `/streaming/${channel_slug}/schedule/${id}/`,
        data
    }),
    getAnnouncementList: (params) => httpGet({url: `/streaming/${params.channel_slug}/schedule/`, params}),
    deleteAnnouncementChannel: (channel_slug, id) => httpDelete({url: `/streaming/${channel_slug}/schedule/${id}/`})
}