import {createEffect} from "effector";
import offering from "../../service/offering";
import org from "../../service/org";
import user from "../../service/user";

/*New Effects*/
export const getOrgOfferListEffect = createEffect({
    handler: org.getOrgAllOfferings
})

export const getOrgOfferGroupListEffect = createEffect({
    handler: org.getOrgOfferingGroup
})

export const getOfferEffect = createEffect({
    handler: offering.getOfferInfo
})

export const getOfferGalleryEffect = createEffect({
    handler: offering.getOfferGallery
})

export const getOfferParamsEffect = createEffect({
    handler: offering.getOfferParams
})

export const removeOfferingEffect = createEffect({
    handler: offering.removeOffering
})

export const removeOrgOfferingGroupEffect = createEffect({
    handler: org.removeOfferingGroup
})

/*Old Effects*/
export const fetchAllOfferings = createEffect({
    handler: offering.getAllOfferings
})

export const fetchOrgOfferings = createEffect({
    handler: org.getOrgAllOfferings
})

export const fetchUserOfferings = createEffect({
    handler: user.getUserAllOfferings
})

export const fetchOfferingDetail = createEffect({
    handler: offering.getOffering
})

export const fetchOrgOfferingInfo = createEffect({
    handler: org.getOrgOffering
})

export const fetchUserOfferingInfo = createEffect({
    handler: user.getUserOffering
})

export const fetchOfferingGallery = createEffect({
    handler: offering.getOfferingGallery
})

export const fetchOfferingParams = createEffect({
    handler: offering.getOfferingParams
})

export const fetchUserOfferingGroup = createEffect({
    handler: user.getUserOfferingGroup
})

export const getOrgOfferGroupListEffectInfo = createEffect({
    handler: org.getOrgOfferingGroupInfo
})

export const fetchOfferingTranslate = createEffect({
    handler: offering.getOfferingTranslate
})

export const fetchOrgOffer = createEffect({
    handler: org.getOrgOffering
})

