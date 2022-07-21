import {combine, createStore} from "effector";
import {
    fetchChatUserList,
    fetchGetChatList,
    fetchGetGroupChatList,
    fetchGetGroupList,
    fetchGetRestChatList, fetchNewUserList
} from "./effects";
import {
    chatListSocketEvent,
    chatModalStatusEvent, checkGroupChatEvent,
    checkUserChatEvent, resetChat,
    userActionSocketEvent,
    userChatListSocket, userEditChatListSocket
} from "./events";


const $chatModalStatus = createStore({status: false})
    .on(chatModalStatusEvent, (state, response) => {
        return {
            ...state,
            status: response
        }
    })

const $chatUsersList = createStore({loading: false, data: [], error: false})
    .on(fetchChatUserList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchChatUserList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                data: {
                    ...response.result.data,
                    results: response.params.offset > 0 ? [
                        ...state.data.results,
                        ...response.result.data.results
                    ] : response.result.data.results

                }
            }
        }
    })
    .on(fetchNewUserList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            console.log('response', state, response.result.data)
            return {
                ...state,
                data: {
                    ...state.data,
                    results: response.result.data.results.map(item => ({
                        receiver_type: "user",
                        unread_count: 0,
                        is_muted: false,
                        receiver: item
                    }))
                }
                // error: false,
                // data: {
                //     ...response.result.data,
                //     results: response.params.offset > 0 ? [
                //         ...state.data.results,
                //         ...response.result.data.results
                //     ] : response.result.data.results
                //
                // }
            }
        }
    })
    .on(chatListSocketEvent, (state, response) => {
        let data = []
        const filteredUser = state.data.results.filter(item => item.receiver.username === response.object.sender.username)
        data.push({
            ...filteredUser[0],
            unread_count: response.counters.unread_count,
            last_message: {
                date: response.object.date,
                sender: response.object.sender,
                text: response.object.text
            }
        })
        state.data.results.map(item => item.receiver.username !== response.object.sender.username && data.push(item))
        return {
            ...state,
            error: false,
            data: {
                ...state.data,
                results: data
            }
        }
    })
    .on(userActionSocketEvent, (state, response) => {

        console.log('response_state: ', state, response)

        return {
            ...state,
            error: false,
            data: {
                ...state.data,
                results: state.data.results.map(item =>
                    item.receiver.username === response.username ?
                        {
                            ...item,
                            action: response.action,
                            unread_count: response.unread_count
                        } : item
                )
            }
        }
    });

const $groupList = createStore({loading: false, data: [], error: false})
    .on(fetchGetGroupList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetGroupList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                data: response.result.data
            }
        }
    })
// .on(chatListSocketEvent, (state, response) => {
//     let data = []
//     const filteredUser = state.data.results.filter(item => item.receiver.username === response.object.sender.username)
//     data.push({
//         ...filteredUser[0],
//         unread_count: response.counters.unread_count,
//         last_message: {
//             date: response.object.date,
//             sender: response.object.sender,
//             text: response.object.text
//         }
//     })
//     state.data.results.map(item => item.receiver.username !== response.object.sender.username && data.push(item))
//     return {
//         ...state,
//         error: false,
//         data: {
//             ...state.data,
//             results: data
//         }
//     }
// })
// .on(userActionSocketEvent, (state, response) => {
//     return {
//         ...state,
//         error: false,
//         data: {
//             ...state.data,
//             results: state.data.results.map(item =>
//                 item.receiver.username === response.username ?
//                     {
//                         ...item,
//                         action: 'typing'
//                     } : item
//             )
//         }
//     }
// });

const $checkedUser = createStore({username: null, userData: null})
    .on(checkUserChatEvent, (state, response) => {
        return {
            username: response.username,
            userData: response
        }
    })
    .on(userActionSocketEvent, (state, response) => {
        return {
            ...state,
            userData: {
                ...state.userData,
                action: response.action
            }
        }
    });

const $checkedGroup = createStore({id: null, groupData: null})
    .on(checkGroupChatEvent, (state, response) => {
        return {
            id: response.receiver.id,
            groupData: response
        }
    })
    .on(userActionSocketEvent, (state, response) => {
        return {
            ...state,
            userData: {
                ...state.userData,
                action: response.action
            }
        }
    });

const $chatList = createStore({loading: false, data: [], error: false, next: undefined})
    .on(resetChat, (state) => {
        return {
            ...state,
            data: []
        }
    })
    .on(fetchGetChatList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetChatList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            const data = response.params && response.params.offset && response.params.offset > 0 ? state.data : []
            response.result.data.results.map(item => data.push({
                ...item,
                loading: false
            }))

            return {
                ...state,
                error: false,
                next: response.result.data.next,
                data
            }
        }
    })
    .on(fetchGetRestChatList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetRestChatList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                next: response.result.data.next,
                data: response.result.data.results.map(item => ({
                    ...item,
                    loading: false
                }))
            }
        }
    })
    .on(fetchGetRestChatList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetRestChatList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                next: response.result.data.next,
                data: [
                    ...state.data,
                    ...response.result.data.results.map(item => ({
                        ...item,
                        loading: false
                    }))
                ]
            }
        }
    })
    .on(userChatListSocket, (state, response) => {
        return {
            ...state,
            data: [
                response.object,
                ...state.data
            ]
        }
    })
    .on(userEditChatListSocket, (state, response) => {
        const data = []

        state.data.map(item =>
            item && item.uuid && item.uuid === response.object.uuid ? data.push(response.object) : data.push(item)
        )

        return {
            ...state,
            data
        }
    });

const $groupChatList = createStore({loading: false, data: [], error: false, next: undefined})
    .on(fetchGetGroupChatList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetGroupChatList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                next: response.result.data.next,
                data: response.result.data.results.map(item => ({
                    ...item,
                    loading: false
                }))
            }
        }
    })
    .on(fetchGetRestChatList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetRestChatList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                next: response.result.data.next,
                data: response.result.data.results.map(item => ({
                    ...item,
                    loading: false
                }))
            }
        }
    })
    .on(fetchGetRestChatList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchGetRestChatList.finally, (state, response) => {
        if (response.error) {
            return {
                ...state,
                error: response.error.response
            }
        } else {
            return {
                ...state,
                error: false,
                next: response.result.data.next,
                data: [
                    ...state.data,
                    ...response.result.data.results.map(item => ({
                        ...item,
                        loading: false
                    }))
                ]
            }
        }
    })
    .on(userChatListSocket, (state, response) => {

        return {
            ...state,
            data: [
                {
                    ...response.object
                },
                ...state.data
            ]
        }
    });

export const $isDataPending = combine({
    $chatUsersList,
    $checkedUser,
    $chatList,
    $chatModalStatus,
    $groupList,
    $checkedGroup,
    $groupChatList
})