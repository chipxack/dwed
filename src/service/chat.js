import {httpDelete, httpGet, httpPost} from "../api";


export default {
    createGroup: (data) => httpPost({url: '/chats/groups/my/', data}),
    getMyGroupList: (data) => httpGet({url: '/chats/groups/my/', data}),
    getGroupList: (data) => httpGet({url: '/chats/groups/', data}),
    getChatUsersList: (params) => httpGet({url: '/chats/', params}),
    getGroupChatList: (params) => httpGet({url: `/chats/groups/${params.group_id}/chats/`, params}),
    getChatList: (params) => httpGet({url: `/chats/${params.username}/`, params}),
    sendMessage: (username, data) => httpPost({url: `/chats/${username}/`, data}),
    sendImageMessage: (username, data, onUploadProgress) => httpPost({
        url: `/chats/${username}/`,
        headers: {"Content-Type": "multipart/form-data"},
        data,
        onUploadProgress
    }),
    sendMessageToGroup: (groups_id, data) => httpPost({url: `/chats/groups/${groups_id}/chats/`, data}),
    addMembersToGroup: (group_id, data) => httpPost({url: `/chats/groups/${group_id}/members/`, data}),
    deleteUserMessage: (username, id, params) => httpDelete({url: `/chats/${username}/${id}/`, params})
}