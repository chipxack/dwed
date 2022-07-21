import {createEvent} from 'effector'
import {
    fetchAllOfferings,
    fetchOfferingDetail,
    fetchOfferingGallery,
    fetchOfferingParams,
    fetchOfferingTranslate,
    fetchOrgOfferingInfo,
    fetchOrgOfferings,
    fetchUserOfferingGroup,
    fetchUserOfferingInfo,
    fetchUserOfferings,
    getOfferEffect, getOfferGalleryEffect, getOfferParamsEffect,
    getOrgOfferGroupListEffect,
    getOrgOfferGroupListEffectInfo,
    getOrgOfferListEffect, removeOfferingEffect, removeOrgOfferingGroupEffect,
} from './effects'

/*New events*/
export const getOrgOfferListEvent = createEvent()
export const getOrgOfferGroupListEvent = createEvent()
export const removeOfferingEvent = createEvent()
export const getOfferEvent = createEvent()
export const resetOffering = createEvent()
export const getOfferGalleryEvent = createEvent()
export const getOfferParamsEvent = createEvent()
export const removeOrgOfferingGroupEvent = createEvent()

/* New getFromIDB */
export const getOrgOfferListFromIDBEvent = createEvent()
export const getOrgOfferGroupListFromIDBEvent = createEvent()
export const getOfferFromIDBEvent = createEvent()
export const getOfferGalleryFromIDBEvent = createEvent()
export const getOfferParamsFromIDBEvent = createEvent()

/*Old events*/
export const allOfferingsMount = createEvent()
export const orgOfferingsListMount = createEvent()
export const userOfferingsMount = createEvent()
export const offeringDetailMount = createEvent()
export const orgOfferingDetailMount = createEvent()
export const userOfferingDetailMount = createEvent()
export const offeringParamsMount = createEvent()
export const offeringGalleryMount = createEvent()
export const offeringModelForceLoading = createEvent()
export const userOfferingGroupMount = createEvent()
export const orgOfferingGroupInfoMount = createEvent()
export const offeringTranslateMount = createEvent()
export const resetOfferingInfoStore = createEvent()
export const resetOfferingListStore = createEvent()
export const changeOfferingCartPosition = createEvent()
export const orgOfferInfoMount = createEvent()

/*New watches*/
getOrgOfferListEvent.watch(getOrgOfferListEffect)
getOrgOfferGroupListEvent.watch(getOrgOfferGroupListEffect)
getOfferEvent.watch(getOfferEffect)
getOfferGalleryEvent.watch(getOfferGalleryEffect)
getOfferParamsEvent.watch(getOfferParamsEffect)
removeOfferingEvent.watch(removeOfferingEffect)
removeOrgOfferingGroupEvent.watch(removeOrgOfferingGroupEffect)


/*Old watches*/
allOfferingsMount.watch(fetchAllOfferings)
orgOfferingsListMount.watch(fetchOrgOfferings)
userOfferingsMount.watch(fetchUserOfferings)
offeringDetailMount.watch(fetchOfferingDetail)
offeringParamsMount.watch(fetchOfferingParams)
offeringGalleryMount.watch(fetchOfferingGallery)
userOfferingGroupMount.watch(fetchUserOfferingGroup)
orgOfferingGroupInfoMount.watch(getOrgOfferGroupListEffectInfo)
orgOfferingDetailMount.watch(fetchOrgOfferingInfo)
userOfferingDetailMount.watch(fetchUserOfferingInfo)
offeringTranslateMount.watch(fetchOfferingTranslate)

