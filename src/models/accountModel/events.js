import {createEvent} from "effector";
import {
    fetchAccountAvatars,
    fetchAccountInfo,
    fetchAccountNewAvatar,
    fetchAccountNewPData,
    fetchAccountNewVideoVerify,
    fetchAccountPData,
    fetchAccountUpdate,
    fetchAccountVideoVerify, fetchCreateOrganization, fetchOrgUpdate, fetchRemovedLinkedUser,
} from "./effects";

export const accountInfoMount = createEvent()
export const accountPDataMount = createEvent()
export const getCurrentProfile = createEvent()
export const updateAccountInfo = createEvent()
export const updateAccountPData = createEvent()
export const accountAvatarsMount = createEvent()
export const createAccountAvatar = createEvent()
export const accountVideoVerifyMount = createEvent()
export const createAccountVideoVerify = createEvent()
export const resetCurrentProfile = createEvent()
export const updateOrgInfo = createEvent()
export const createOrganization = createEvent()
export const removeLinkedUser = createEvent()
export const accountSpecPanelEvent = createEvent()

accountInfoMount.watch(fetchAccountInfo)
accountPDataMount.watch(fetchAccountPData)
updateAccountInfo.watch(fetchAccountUpdate)
accountAvatarsMount.watch(fetchAccountAvatars)
updateAccountPData.watch(fetchAccountNewPData)
createAccountAvatar.watch(fetchAccountNewAvatar)
accountVideoVerifyMount.watch(fetchAccountVideoVerify)
createAccountVideoVerify.watch(fetchAccountNewVideoVerify)
updateOrgInfo.watch(fetchOrgUpdate)
createOrganization.watch(fetchCreateOrganization)
removeLinkedUser.watch(fetchRemovedLinkedUser)

