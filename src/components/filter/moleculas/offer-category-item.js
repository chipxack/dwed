import React from 'react'
import {OfferCatItemContent, OfferCatItemImg, OfferCatItemTitle} from "../atoms";

export const OfferCatItem = ({data, onClick}) => {
    return (
        <OfferCatItemContent
            onClick={onClick}
        >
            <OfferCatItemImg dangerouslySetInnerHTML={{__html: data.image}} />
            <OfferCatItemTitle>
                {data.name}
            </OfferCatItemTitle>
        </OfferCatItemContent>
    )
}