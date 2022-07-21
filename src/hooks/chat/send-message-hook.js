import {useState} from "react";
import {useStore} from "effector-react";
import {userChatListSocket} from "../../models/chat";
import chat from '../../service/chat'
import {$accountModel} from "../../models/accountModel";
import {v4 as uuidv4} from 'uuid';
import {userEditChatListSocket} from "../../models/chat/events";
import {fileToBase64} from "../../utils/cropUtils";


export const SendMessageHooks = (username, groupId, scrollbarsRef, replyMessage, setReplyMessage) => {

    const accountModel = useStore($accountModel)
    const userInfo = accountModel.$profiles && accountModel.$profiles.currentProfile
    const profileSlugName = userInfo && userInfo.slug_name

    const [message, setMessage] = useState(undefined)

    const sendFunction = () => {
        if (message && message.length > 3) {
            const uuid = uuidv4()
            const data = {
                text: message,
                reply_to_id: replyMessage ? replyMessage.id : undefined
            }
            let dataMessage = {
                counters: {
                    unread_count: 0
                },
                object: {
                    uuid,
                    date: Date.now(),
                    reply_to: null,
                    sender: {
                        username: profileSlugName,
                        full_name: userInfo.name,
                        avatar: userInfo.avatar,
                    },
                    text: message,
                    updated: null,
                    is_read: false,
                    loading: true
                },

            }
            userChatListSocket(dataMessage)
            setMessage('')
            groupId ?
                chat.sendMessageToGroup(groupId, data)
                    .then(response => {
                        if (response.status === 201) {
                            console.log('responseMessage', response)
                            dataMessage = {
                                ...dataMessage,
                                object: {
                                    ...dataMessage.object,
                                    ...response.data
                                }
                            }
                            userEditChatListSocket(dataMessage)
                            setReplyMessage(undefined)
                        }
                    })
                    .catch(error => {
                        console.error(error.response.data)
                    }) :
                chat.sendMessage(username, data)
                    .then(response => {
                        if (response.status === 201) {
                            console.log('responseMessage', response)
                            dataMessage = {
                                ...dataMessage,
                                object: {
                                    ...dataMessage.object,
                                    id: response.id,
                                    loading: undefined
                                }
                            }
                            userEditChatListSocket(dataMessage)
                            setReplyMessage(undefined)
                        }
                    })
                    .catch(error => {
                        console.error(error.response.data)
                    })
        }

    }

    // const toBase64 = file => new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () =>resolve(reader.result);
    //     reader.onerror = error =>reject(error);
    // });

    const sendImage = (file) => {
        const uuid = uuidv4()


        let dataMessage = {
            counters: {
                unread_count: 0
            },
            object: {
                uuid,
                date: Date.now(),
                reply_to: null,
                sender: {
                    username: profileSlugName,
                    full_name: userInfo.name,
                    avatar: userInfo.avatar,
                },
                updated: null,
                is_read: false,
                loading: true,
                loadingPercent: 0
            },

        }
        fileToBase64(file).then(response => {
            dataMessage = {
                ...dataMessage,
                object: {
                    ...dataMessage.object,
                    file: response
                }
            }
            userChatListSocket(dataMessage)
        })


        const formData = new FormData()
        formData.append('file', file)

        const onUploadProgress = (e) => {
            const onePercentSize = e.total / 100
            dataMessage = {
                ...dataMessage,
                object: {
                    ...dataMessage.object,
                    loadingPercent: Math.round(e.loaded / onePercentSize)
                }
            }

            userEditChatListSocket(dataMessage)
        }

        chat.sendImageMessage(username, formData, onUploadProgress)
            .then(response => {
                if (response.status === 201) {
                    dataMessage = {
                        ...dataMessage,
                        object: {
                            ...dataMessage.object,
                            ...response.data,
                            loading: false
                        }
                    }

                    userEditChatListSocket(dataMessage)
                }
            })
            .catch(error => console.error(error.response))
    }

    return {
        message,
        sendFunction,
        setMessage,
        sendImage
    }

}