import {createEvent} from 'effector'
import {
    fetchAllStreams,
    fetchUserSubscribe,
    fetchUserSubsMe,
    fetchUserSubsMy,
    getUserEffect,
    getUserListEffect
} from './effects'

/*New events*/
export const getUserEvent = createEvent()
export const getUserListEvent = createEvent()
export const updateCouponCheckedEvent = createEvent()

/* New getFromIDB */
export const getUserFromIDBEvent = createEvent()
export const resetUser = createEvent()

/*Old events*/
export const allStreamMount = createEvent()
export const resetUserModelListStore = createEvent()
export const getUserSubscribe = createEvent()
export const getOrgSubscribe = createEvent()
export const userSubsMeMount = createEvent()
export const userSubsMyMount = createEvent()
export const onlineUserMount = createEvent()
export const onlineUserMountFromIDB = createEvent()

/*New watches*/
getUserEvent.watch(getUserEffect)
getUserListEvent.watch(getUserListEffect)


/*Old watches*/
allStreamMount.watch(fetchAllStreams)
getUserSubscribe.watch(fetchUserSubscribe)
getOrgSubscribe.watch(fetchUserSubscribe)
userSubsMeMount.watch(fetchUserSubsMe)
userSubsMyMount.watch(fetchUserSubsMy)

