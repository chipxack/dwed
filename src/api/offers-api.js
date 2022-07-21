import {httpGet, httpPost} from "../api";


export const getOffersList = ({params}) => httpGet({
    url: '/offerings/', params
})

export const getGalleryOffer = (id) => httpGet({
    url: `/offerings/${id}/gallery/`
})

export const getOfferData = (id) => httpGet({
    url: `/offerings/${id}/`
})

export const getOfferCharacter = (id) => httpGet({
    url: `/offerings/${id}/characs/`
})

export const getCurrencyList = (params) => httpGet({
    url: '/currencies/', params
})

export const getOfferInfo = (id) => httpGet({
    url: `/offerings/${id}/`
})

export const createOfferGallery = ({offerId, data}) => httpPost({
    url: `/offerings/${offerId}/gallery/`, data
})

export const createCharactersOffer = ({offerId, data}) => httpPost({
    url: `/offerings/${offerId}/characs/`, data
})

export const getOfferGallery = (offerId) => httpGet({
    url: `/offerings/${offerId}/gallery/`
})

export const getOfferingParams = (offerId) => httpGet({
    url: `/offerings/${offerId}/characs/`,
    headers: {
        notAuth: true
    }
})