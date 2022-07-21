import {createEvent} from "effector";
import {fetchGetOrgTapeList, fetchGetTapeList, fetchGetUserTapeList} from "./effects";


export const getTapeListEvent = createEvent()
export const getUserTapeListEvent = createEvent()
export const getOrgTapeListEvent = createEvent()
export const removePost = createEvent()
export const removeMyPost = createEvent()
export const editFileForm = createEvent()
export const createFileForm = createEvent()
export const resetFileForm = createEvent()
export const changeTextForm = createEvent()
export const removePostFile = createEvent()


getTapeListEvent.watch(fetchGetTapeList)
getUserTapeListEvent.watch(fetchGetUserTapeList)
getOrgTapeListEvent.watch(fetchGetOrgTapeList)