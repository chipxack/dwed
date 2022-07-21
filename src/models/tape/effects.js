import {createEffect} from "effector/effector.cjs";
import offering from "../../service/offering";
import tape from "../../service/tape";


export const fetchGetTapeList = createEffect({
    handler: tape.getTapeList
})

export const fetchGetUserTapeList = createEffect({
    handler: tape.getUserTapeList
})

export const fetchGetOrgTapeList = createEffect({
    handler: tape.getOrgTapeList
})

export const fetchGetOffersToPost = createEffect({
    handler: offering.getAllOfferings
})