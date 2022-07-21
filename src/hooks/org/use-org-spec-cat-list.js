import {useEffect} from 'react'
import {useOrgBasic} from './use-org-basic'
import {getCommonApiParams} from '../../utils/app-utils'
import {useParams} from 'react-router-dom'

export function useOrgSpecCatList() {
    const {organization} = useParams()
    const {getOrgSpecCatListSideEffect} = useOrgBasic(organization)

    useEffect(() => {
        getOrgSpecCatListSideEffect({params: {...getCommonApiParams().params}})
    }, [getOrgSpecCatListSideEffect])
}