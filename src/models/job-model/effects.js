import {createEffect} from "effector";
import specialism from "../../service/specialism";

export const fetchAccountSpec = createEffect({
    handler: specialism.getOrgSpecInfo
})

export const fetchAccountSpecUpdate = createEffect({
    handler: specialism.updateOrgSpec
})

export const fetchSpecRequests = createEffect({
    handler: specialism.getOrgSpecRequests
})

export const fetchJobRequestOffer = createEffect({
    handler: specialism.getOrgSpecRequestOffer
})

export const fetchJobRequestDetail = createEffect({
    handler: specialism.getOrgSpecRequestDetail
})

export const fetchSelfJob = createEffect({
    handler: specialism.getSelfSpecInfo
})

export const fetchUpdateSelfempl = createEffect({
    handler: specialism.updateSelfSpec
})

export const fetchSelfRequest = createEffect({
    handler: specialism.getSelfSpecRequest
})

export const fetchSelfRequestOffer = createEffect({
    handler: specialism.getSelfSpecRequestOffer
})

export const fetchSelfRequestDetail = createEffect({
    handler: specialism.getSelfSpecRequestDetail
})

export const fetchUpdatedSelfRequestDetail = createEffect({
    handler: specialism.updateSelfSpecRequestDetail
})

export const fetchUpdatedOrgSpecRequestDetail = createEffect({
    handler: specialism.updateOrgSpecRequestDetail
})

export const fetchUpdateOrgSpecOrder = createEffect({
    handler: specialism.updateOrgSpecOrder
})

export const fetchOrgSpecRecords = createEffect({
    handler: specialism.getOrgSpecRecords
})

export const fetchOrgSpecSavedCommentsList = createEffect({
    handler: specialism.getOrgSpecSavedCommentsList
})

export const fetchOrgSpecSavedComments = createEffect({
    handler: specialism.getOrgSpecSavedComments
})
