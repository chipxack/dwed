import {httpPost} from "../api";


export const uploadVideo = (data) => httpPost({
    headers: { "Content-Type": "multipart/form-data" }, url: '/account/video_verify/', data
});