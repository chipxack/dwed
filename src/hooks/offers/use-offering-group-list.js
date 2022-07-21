import {useOfferingBasic} from './use-offering-basic'
import {PARAM_KEYS, PROFILE_TYPE, URL_KEYS} from '../../constants'
import {useEffect, useState} from 'react'
import {getCommonApiParams} from '../../utils/app-utils'
import {useUrlParams} from '../common'

export function useOfferingGroupList({slug, limit}) {
    const {urlData} = useUrlParams()
    const {getOfferingGroupListSideEffect} = useOfferingBasic({type: PROFILE_TYPE.ORGANIZATION, slug})
    const [search, setSearch] = useState(undefined)

    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const _search = urlData[URL_KEYS.SEARCH]
    const page = urlData[URL_KEYS.PAGE]

    useEffect(() => {
        let timeout  = null
        timeout = setTimeout(() => {
            if(!search && _search) {
                setSearch(_search)
            }
        }, 300)
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [search, _search])

    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            const data = {
                params: {
                    ...getCommonApiParams().params
                }
            }

            if(limit) {
                data.params.limit = limit
            }

            if (page && limit) {
                const p = Number(page)
                data.params.offset = p === 1 ? 0 : (p - 1) * limit
            }

            if (specId) {
                data.params[PARAM_KEYS.SPECIALIST] = specId
            }else {
                delete data.params[PARAM_KEYS.SPECIALIST]
            }
            getOfferingGroupListSideEffect(data)
        }, 100)


        return () => {
            clearTimeout(timeout)
        }
    }, [specId, getOfferingGroupListSideEffect, page, limit])

    return {search}
}