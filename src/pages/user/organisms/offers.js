import React from 'react'
import {AccountContentSection} from "../../../ui/atoms";
import {useOfferingList} from "../../../hooks/offers";
import {UserOffersGroupList, UserOffersList} from "../maleculas";
import {useParams} from 'react-router-dom'

export const UserOffers = () => {
    const {account} = useParams()
    const {loadOffers} = useOfferingList({id: account})
    return (
        <AccountContentSection>
            <UserOffersGroupList />
            <UserOffersList loadOffers={loadOffers}/>
        </AccountContentSection>
    )
}