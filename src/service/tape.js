import {httpDelete, httpGet, httpPost, httpPut} from '../api'


export default {
    createPost: (slug_name, data) => httpPost({
        headers: slug_name && {'org-slug-name': slug_name},
        url: `/posts/`,
        data
    }),
    editPost: (slug_name, id, data) => httpPut({
        headers: slug_name && {'org-slug-name': slug_name},
        url: `/posts/${id}/`,
        data
    }),
    getPostList: (params) => httpGet({url: '/posts/', params}),
    setMediaForPost: (id, data) => httpPost({url: `/posts/${id}/medias/`, data}),
    deleteMediaForPost: (id, imageId) => httpDelete({url: `/posts/${id}/medias/${imageId}/`}),
    createMediaForPost: (data, onUploadProgress) => httpPost({
        headers: {'Content-Type': 'multipart/form-data'},
        url: `/posts/0/medias/`,
        data,
        onUploadProgress
    }),
    sendCommentToPost: (data) => httpPost({url: `/posts/${data.post_id}/comments/`, data}),
    commentLike: (postId, commentId) => httpPost({url: `/posts/${postId}/comments/${commentId}/likes/`}),
    deleteCommentLike: (postId, commentId) => httpDelete({url: `/posts/${postId}/comments/${commentId}/likes/`}),
    getCommentsPost: (post_id, params) => httpGet({url: `/posts/${post_id}/comments/`, params}),
    getTapeList: (paramsData) => httpGet({
        url: '/tape/',
        params: paramsData.params,
        headers: paramsData.headers
    }),
    getUserTapeList: (params) => httpGet({url: `/tape/@${params.author}/`, params}),
    getOrgTapeList: (params) => httpGet({url: `/tape/${params.author}/`, params}),
    postLike: (posts_id) => httpPost({url: `/posts/${posts_id}/likes/`}),
    deletePostLike: (posts_id) => httpDelete({url: `/posts/${posts_id}/likes/`}),
    deletePost: (id) => httpDelete({url: `/posts/${id}/`})
}