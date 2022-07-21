import React from 'react'
import {OfferDetail} from "../../../components/offers";
import {useParams} from "react-router-dom";

export const OrgOfferDetail = () => {
    const {offering_id} = useParams()

    return (
        <OfferDetail id={offering_id} />
    )
}