import {createEffect} from "effector";
import org from "../../service/org";

/*New effects*/
export const getOrgSpecsListEffect = createEffect({
    handler: org.getSpecialist
})

export const getSpecCatListEffect = createEffect({
    handler: org.getSpecCatList
})

export const getOrgEffect = createEffect({
    handler: org.getOrgDetail
});

export const removeOrgSpecEffect = createEffect({
    handler: org.removeSpecialist
})

export const removeOrgSpecCatEffect = createEffect({
    handler: org.removeSpecialistCategory
})

export const getOrgCouponListEffect = createEffect({
    handler: org.getOrgCouponList
})

export const removeOrgCouponEffect = createEffect({
    handler: org.removeOrgCoupon
})

export const updateOrgCouponEffect = createEffect({
    handler: org.updateOrgCoupon
})

export const getOrgCouponEffect = createEffect({
    handler: org.getOrgCoupon
})

export const getOrgCouponReceiversListEffect = createEffect({
    handler: org.getOrgCouponReceiversList
})

export const createOrgCouponReceiverEffect = createEffect({
    handler: org.createOrgCouponReceiver
})

export const removeOrgCouponReceiverEffect = createEffect({
    handler: org.removeOrgCouponReceiver
})

export const getOrgPaymentMethodListEffect = createEffect({
    handler: org.getOrgPaymentMethodList
})

export const updateOrgPaymentMethodEffect = createEffect({
    handler: org.updateOrgPaymentMethod
})

    /*Old effects*/
export const fetchAllOrganization = createEffect({
    handler: org.getAllOrganization
});

export const fetchSpecialistCategory = createEffect({
    handler: org.getSpecCatList
})

export const fetchSpecialist = createEffect({
    handler: org.getSpecialist
})

export const fetchSpecialistCategoryInfo = createEffect({
    handler: org.getSpecCatListInfo
})

export const fetchSpecialistInfo = createEffect({
    handler: org.getOrgSpecDetail
})

export const fetchSpecialistPerms = createEffect({
    handler: org.getOrgSpecPermsList
})

