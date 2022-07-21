import React from 'react'
import {OfferBasicForm, OfferParamsForm} from "../maleculas";
import {useUrlParams} from "../../../hooks/common";
import {URL_KEYS} from '../../../constants';

export const OfferForm = () => {
    const {urlData} = useUrlParams()

    return (
        <>
            {
                urlData[URL_KEYS.OFFERING_PARAM_ID]
                ? <OfferParamsForm />
                : <OfferBasicForm/>
            }
        </>
    )
}