import {createEvent} from "effector";
import {fetchOrgPersonalInfo, fetchUserAvatar, fetchUserPersonalInfo} from "./effects";

export const userPersonalInfoMount = createEvent()
export const orgPersonalInfoMount = createEvent()
export const userBusinessAvatarMount = createEvent()

userPersonalInfoMount.watch(fetchUserPersonalInfo)
orgPersonalInfoMount.watch(fetchOrgPersonalInfo)
userBusinessAvatarMount.watch(fetchUserAvatar)