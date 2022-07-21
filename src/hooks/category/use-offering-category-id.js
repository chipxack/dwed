import {useUrlParams} from '../common'
import {useEffect, useState} from 'react'
import {URL_KEYS} from '../../constants'

export function useOfferingCategoryId() {
    const [offeringCatId, setOfferingCatId] = useState(null)
    const [categoryParamId, setCategoryParamId] = useState(null)
    const {urlData} = useUrlParams()
    const categoryId = urlData[URL_KEYS.CATEGORY_ID]

    useEffect(() => {
        if(categoryId) {
            if(categoryId.indexOf('|') !== -1) {
                setOfferingCatId(categoryId.split('|')[1])
                setCategoryParamId(categoryId.split('|')[0])
            }else {
                setOfferingCatId(categoryId)
                setCategoryParamId(null)
            }
        }else {
            setOfferingCatId(null)
        }
    }, [categoryId])

    return {offeringCatId, categoryParamId}
}