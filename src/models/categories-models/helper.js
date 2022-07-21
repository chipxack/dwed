import {characterForceLoading, colorsMount, offerCatCustomPrepsMount, offerCatPrepsMount} from "./events";
import {OFFERING_CAT_CHARACTER} from "../../constants";

export const getParamsPreparedValues = (arr, id) => {
    characterForceLoading({type: OFFERING_CAT_CHARACTER.SELECT_FIELD, status: true})
    for (let i = 0; i < arr.length; i++) {
        const data = {
            cat_id: id,
            charac_id: arr[i].id,
            clear: true,
            params: {
                limit: 10,
                offset: 0,
                only_used: '1'
            }
        }
        offerCatPrepsMount(data)
        if (i + 1 === arr.length) {
            characterForceLoading({type: OFFERING_CAT_CHARACTER.SELECT_FIELD, status: false})
        }
    }
}

export const getParamsCustomValues = (arr, id) => {
    characterForceLoading({type: 'custom', status: true})
    for (let i = 0; i < arr.length; i++) {
        const data = {
            cat_id: id,
            charac_id: arr[i].id,
            type: arr[i].character_type,
            clear: true,
            params: {
                limit: 10,
                offset: 0,
            }
        }
        offerCatCustomPrepsMount(data)
        if (i + 1 === arr.length) {
            characterForceLoading({type: 'custom', status: false})
        }
    }
}

export const getParamsPreparedColors = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const data = {
            charac_id: arr[i].id,
            clear: true,
            params: {
                limit: 10,
                offset: 0,
                charac_id: arr[i].id
            }
        }
        colorsMount(data)
        if (i + 1 === arr.length) {
            characterForceLoading({type: OFFERING_CAT_CHARACTER.COLOUR_FIELD, status: false})
        }
    }
}