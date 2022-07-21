import {useEffect, useState} from "react";
import {specialistCategoryMount, specialistMount} from "../../models/organization-models";
import {
    getOrgOfferGroupListEvent,
    orgOfferingsListMount,
    userOfferingGroupMount,
    userOfferingsMount
} from '../../models/offering-model'


export const OfferToPostHooks = (slugName, profileType, selectOffer, selectSpecId, setSelectSpecId, setSelectOffer) => {
    const [offersCatsOffset, setOfferCatsOffset] = useState(0)
    const [specialistCatsOffset, setSpecialistCatsOffset] = useState(0)
    const [orgSpecialistsOffset, setOrgSpecialistsOffset] = useState(0)
    const [offersOffset] = useState(0)
    const [selectOfferCat, setSelectOfferCat] = useState(undefined)
    const [selectSpecCatId] = useState(undefined)
    const [more, setMore] = useState(false)

    useEffect(() => {
        if (profileType === 'organization' && slugName) {
            const params = {
                parent: 0,
                params: {
                    offset: offersCatsOffset,
                    limit: 5
                }
            }
            getOrgOfferGroupListEvent({organization: slugName, params})
        } else if (profileType === 'user' && slugName) {
            const params = {
                parent: 0,
                params: {
                    offset: offersCatsOffset,
                    limit: 5
                }
            }
            userOfferingGroupMount({username: slugName, params})
        }


    }, [offersCatsOffset, profileType, slugName])


    useEffect(() => {
        if (profileType === 'organization' && slugName) {
            const params = {
                offset: orgSpecialistsOffset,
                limit: 5,
                spec_cat: selectSpecCatId
            }
            specialistMount({organization: slugName, params})
        }

    }, [orgSpecialistsOffset, slugName, profileType])

    useEffect(() => {
        if (profileType === 'organization' && slugName) {
            const params = {
                offset: specialistCatsOffset,
                limit: 5,
            }
            specialistCategoryMount({organization: slugName, params})
        }

    }, [specialistCatsOffset, slugName, profileType])

    useEffect(() => {
        if (profileType === 'organization' && slugName) {
            const params = {
                offset: offersOffset,
                clear: offersOffset === 0,
                limit: 10,
                group: selectOfferCat
            }
            orgOfferingsListMount({organization: slugName, params})
        } else if (profileType === 'user' && slugName) {
            const params = {
                offset: offersOffset,
                clear: offersOffset === 0,
                limit: 10,
                group: selectOfferCat
            }
            userOfferingsMount({username: slugName, params})
        }
    }, [slugName, profileType, offersOffset])

    const handleScrollOffersCats = (e) => {
        setOfferCatsOffset(e.length)
    }

    const handleScrollSpecialistsCats = (e) => {
        setSpecialistCatsOffset(e.length)
    }

    const handleScrollSpecialists = (e) => {
        setOrgSpecialistsOffset(e.length)
    }

    const selectCategory = (id) => {
        setSelectOfferCat(id)
        if (profileType === 'organization' && slugName) {
            const params = {
                offset: 0,
                limit: 10,
                group: id
            }
            orgOfferingsListMount({organization: slugName, params, clear: true})
        } else if (profileType === 'user' && slugName) {
            const params = {
                offset: 0,
                limit: 10,
                group: id
            }
            userOfferingsMount({username: slugName, params, clear: true})
        }
    }

    const changeSpecCatId = () => {

    }

    const changeSpecId = (id) => {
        setSelectSpecId(id)
        setSelectOffer([])
        if (profileType === 'organization' && slugName) {
            const params = {
                offset: 0,
                limit: 10,
                responsible: id
            }
            orgOfferingsListMount({organization: slugName, params, clear: true})
        } else if (profileType === 'user' && slugName) {
            const params = {
                offset: 0,
                limit: 10,
                responsible: id
            }
            userOfferingsMount({username: slugName, params, clear: true})
        }
    }

    const changeOfferId = (id) => {
        const data = [...selectOffer]
        if (selectOffer.indexOf(id) !== -1) {
            delete data[id]
        } else {
            data.push(id)
        }
        console.log('data', data)
        setSelectOffer(data)
    }

    return {
        handleScrollOffersCats,
        more,
        setMore,
        selectOfferCat,
        selectCategory,
        handleScrollSpecialistsCats,
        handleScrollSpecialists,
        changeSpecCatId,
        changeSpecId,
        changeOfferId,
        selectSpecId,
        selectOffer
    }

}