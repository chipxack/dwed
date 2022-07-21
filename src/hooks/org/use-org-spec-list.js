import {useCallback, useEffect, useState} from 'react'
import {useUrlParams} from '../common'
import {FETCHING_STATUS, PARAM_KEYS, URL_KEYS} from '../../constants'
import {useOrgBasic} from './use-org-basic'
import {getCommonApiParams} from '../../utils/app-utils'
import {useStore} from 'effector-react'
import {$organizationModel} from '../../models/organization-models'

export const useOrgSpecialist = (slug_name) => {
    const {$orgSpecsLists: {result, loading}} = useStore($organizationModel)
    const [search, setSearch] = useState('')
    const {urlData} = useUrlParams()
    const {getOrgSpecListSideEffect, getOrgSpecList} = useOrgBasic(slug_name)
    const spec_cat_id = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]

    const onSpecSearch = useCallback((value) => {
        setSearch(value)
    }, [])

    const loadMoreSpec = useCallback((e) => {
        e.persist()
        const {target} = e
        console.log(result)
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loading && !!result.next && result.nextOffset) {
            const data = {
                status: FETCHING_STATUS.NEXT,
                params: {
                    ...getCommonApiParams().params,
                    offset: result.nextOffset
                }
            }

            if (search.length > 2) {
                data['params']['search'] = search
                data['status'] = FETCHING_STATUS.NEXT_FILTER``
            } else {
                delete data['params']['search']
            }
            getOrgSpecList(data)
        }
    }, [search, getOrgSpecList, result, loading])

    useEffect(() => {
        const data = {
            params: {
                ...getCommonApiParams().params
            }
        }

        if (spec_cat_id) {
            data['params'][PARAM_KEYS.SPEC_CAT] = spec_cat_id
        } else {
            delete data['params'][PARAM_KEYS.SPEC_CAT]
        }

        if (search.length > 2) {
            data['params']['search'] = search
        } else {
            delete data['params']['search']
        }

        getOrgSpecListSideEffect(data)
    }, [getOrgSpecListSideEffect, spec_cat_id, search])

    return {onSpecSearch, loadMoreSpec}
}