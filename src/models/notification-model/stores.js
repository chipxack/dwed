import {combine, createStore} from 'effector'
import {notificationCountFromSocket} from './events'

const $notificationCount = createStore({not_seen: 0})
    .on(notificationCountFromSocket, (state, payload) => ({...state, ...payload}))

export const $notificationModel = combine({
    $notificationCount
})