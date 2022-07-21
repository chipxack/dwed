import {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$accountModel} from '../../models/accountModel'
import {PERMISSIONS} from '../../constants'
import {dropdownMenu} from '../../data/account-dropdown-menu'
import {useOrgBasic} from './use-org-basic'

export const useOrganization = () => {
    const {organization} = useParams()
    const [dropMenu, setDropMenu] = useState([])
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {getOrgSideEffect} = useOrgBasic(organization)

    const generateDropdownMenu = useCallback(() => {
        let tmp = []
        if (currentProfile && currentProfile.slug_name === organization) {
            const profilePerms = currentProfile.perms
            if (profilePerms && profilePerms.length > 0) {
                if (profilePerms.indexOf(PERMISSIONS.GRAND) !== -1) {
                    tmp = dropdownMenu(organization, 'organization')
                } else {
                    const dMenu = dropdownMenu(organization, 'organization')
                    for (let perms of profilePerms) {
                        for (let item of dMenu) {
                            if (perms === item.type) {
                                tmp.push(item)
                            }
                        }
                    }
                }
            }
        }
        setDropMenu(tmp)
    }, [currentProfile, organization])


    useEffect(() => {
        generateDropdownMenu()
    }, [generateDropdownMenu])

    useEffect(() => {
        getOrgSideEffect()
    }, [getOrgSideEffect])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return {dropMenu}
}