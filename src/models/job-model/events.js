import {createEvent} from "effector";
import {
    fetchAccountSpec,
    fetchAccountSpecUpdate,
    fetchJobRequestDetail,
    fetchJobRequestOffer, fetchOrgSpecRecords, fetchOrgSpecSavedComments, fetchOrgSpecSavedCommentsList,
    fetchSelfJob,
    fetchSelfRequest,
    fetchSelfRequestDetail,
    fetchSelfRequestOffer,
    fetchSpecRequests, fetchUpdatedOrgSpecRequestDetail, fetchUpdatedSelfRequestDetail, fetchUpdateOrgSpecOrder,
    fetchUpdateSelfempl,
} from './effects'

export const updateSpec = createEvent()
export const specJobMount = createEvent()
export const selfJobMount = createEvent()
export const updateSelfJob = createEvent()
export const showSpecCalendar = createEvent()
export const showSpecSchedule = createEvent()
export const specRequestsMount = createEvent()
export const jobRequestOfferMount = createEvent()
export const updateSpecOrderMount = createEvent()
export const addRequestFromSocket = createEvent()
export const selfJobRequestMount = createEvent()
export const jobRequestDetailMount = createEvent()
export const selfRequestOfferMount = createEvent()
export const specOrderForceLoading = createEvent()
export const selfRequestDetailMount = createEvent()
export const updateSelfRequestDetail = createEvent()
export const updateOrgSpecRequestDetail = createEvent()
export const orgSpecRecordsMount = createEvent()
export const orgSpecSavedCommentsListMount = createEvent()
export const orgSpecSavedCommentsMount = createEvent()



specJobMount.watch(fetchAccountSpec)
updateSpec.watch(fetchAccountSpecUpdate)
specRequestsMount.watch(fetchSpecRequests)
jobRequestOfferMount.watch(fetchJobRequestOffer)
jobRequestDetailMount.watch(fetchJobRequestDetail)
selfJobMount.watch(fetchSelfJob)
updateSelfJob.watch(fetchUpdateSelfempl)
selfJobRequestMount.watch(fetchSelfRequest)
selfRequestOfferMount.watch(fetchSelfRequestOffer)
selfRequestDetailMount.watch(fetchSelfRequestDetail)
updateSelfRequestDetail.watch(fetchUpdatedSelfRequestDetail)
updateOrgSpecRequestDetail.watch(fetchUpdatedOrgSpecRequestDetail)
updateSpecOrderMount.watch(fetchUpdateOrgSpecOrder)
orgSpecRecordsMount.watch(fetchOrgSpecRecords)
orgSpecSavedCommentsListMount.watch(fetchOrgSpecSavedCommentsList)
orgSpecSavedCommentsMount.watch(fetchOrgSpecSavedComments)
