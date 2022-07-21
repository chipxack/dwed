import {createEvent} from 'effector'
import {
    fetchAllOrganization,
    getOrgEffect,
    getOrgSpecsListEffect,
    fetchSpecialist,
    fetchSpecialistCategory,
    fetchSpecialistCategoryInfo,
    getSpecCatListEffect,
    fetchSpecialistInfo,
    fetchSpecialistPerms,
    getOrgCouponListEffect,
    removeOrgCouponEffect,
    updateOrgCouponEffect,
    getOrgCouponEffect,
    getOrgCouponReceiversListEffect,
    createOrgCouponReceiverEffect,
    removeOrgCouponReceiverEffect,
    getOrgPaymentMethodListEffect, updateOrgPaymentMethodEffect, removeOrgSpecCatEffect, removeOrgSpecEffect,
} from './effects'

/*New events*/
export const getOrgEvent = createEvent()
export const getOrgCouponEvent = createEvent()
export const getOrgSpecListEvent = createEvent()
export const removeOrgCouponEvent = createEvent()
export const updateOrgCouponEvent = createEvent()
export const getOrgCouponListEvent = createEvent()
export const getOrgSpecCatListEvent = createEvent()
export const getOrgCouponReceiversListEvent = createEvent()
export const createOrgCouponReceiverEvent = createEvent()
export const removeOrgCouponReceiverEvent = createEvent()
export const getOrgPaymentMethodListEvent = createEvent()
export const updateOrgPaymentMethodEvent = createEvent()
export const resetOrgSpecPerms = createEvent()

/* New getFromIDB */
export const resetOrg = createEvent()
export const getOrgFromIDBEvent = createEvent()
export const getOrgSpecListFromIDBEvent = createEvent()
export const getOrgSpecCatListFromIDBEvent = createEvent()

/*Old events*/
export const allOrganizationMount = createEvent()
export const specialistCategoryMount = createEvent()
export const specialistMount = createEvent()
export const specialistCategoryInfoMount = createEvent()
export const specialistInfoMount = createEvent()
export const specialistPermsMount = createEvent()
export const resetOrganizationInfoStore = createEvent()
export const resetOrganizationListStore = createEvent()
export const orgModelForceLoading = createEvent()
export const removeOrgSpecEvent = createEvent()
export const removeOrgSpecCatEvent = createEvent()

/*New watches*/
getOrgEvent.watch(getOrgEffect)
getOrgCouponEvent.watch(getOrgCouponEffect)
getOrgSpecListEvent.watch(getOrgSpecsListEffect)
removeOrgCouponEvent.watch(removeOrgCouponEffect)
updateOrgCouponEvent.watch(updateOrgCouponEffect)
getOrgSpecCatListEvent.watch(getSpecCatListEffect)
getOrgCouponListEvent.watch(getOrgCouponListEffect)
getOrgCouponReceiversListEvent.watch(getOrgCouponReceiversListEffect)
createOrgCouponReceiverEvent.watch(createOrgCouponReceiverEffect)
removeOrgCouponReceiverEvent.watch(removeOrgCouponReceiverEffect)
getOrgPaymentMethodListEvent.watch(getOrgPaymentMethodListEffect)
updateOrgPaymentMethodEvent.watch(updateOrgPaymentMethodEffect)
removeOrgSpecCatEvent.watch(removeOrgSpecCatEffect)
removeOrgSpecEvent.watch(removeOrgSpecEffect)

/*Old watches*/
specialistMount.watch(fetchSpecialist)
allOrganizationMount.watch(fetchAllOrganization)
specialistCategoryMount.watch(fetchSpecialistCategory)
specialistCategoryInfoMount.watch(fetchSpecialistCategoryInfo)
specialistInfoMount.watch(fetchSpecialistInfo)
specialistPermsMount.watch(fetchSpecialistPerms)
