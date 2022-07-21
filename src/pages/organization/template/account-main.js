import React, {useCallback, useEffect} from 'react'
import {useStore} from 'effector-react'
import {OrgContent} from '../organisms'
import {useHistory, useParams} from 'react-router-dom'
import {useOrganization} from '../../../hooks/org'
import {getMenuData} from '../../../utils/accountUtils'
import {AccountMenu} from '../../../components/account-menu'
import {AccountHeader} from '../../../components/account-header'
import {AccountWireframe} from '../../../UIComponents/wireframe'
import {$organizationModel} from '../../../models/organization-models'
import {useProfilePermission} from '../../../hooks/profile'
import {$appModel} from '../../../models/app'
import {PERMISSIONS} from '../../../constants'

export const OrgMainAccount = () => {
    const {organization} = useParams()
    const {dropMenu} = useOrganization()
    const {$orgDetailStore: {data, skeleton}} = useStore($organizationModel)
    const {isMyAccount} = useProfilePermission({slug_name: organization})
    const {location: {pathname}, push} = useHistory()
    const {$app: {allow}} = useStore($appModel)

    const getData = (data) => ({
        name: `${data.name}`,
        is_official: data.is_official,
        subs: data.subs,
        category: data.category,
        image: data.logo,
        slug: data.slug_name,
        rating: data.rating
    })

    useEffect(() => {
        if (organization && organization === pathname.substring(1)) {
            push(`/${organization}/offerings`)
        }
    }, [pathname, organization, push])

    const generateAccountMainMenu = useCallback(() => {
        if (allow[PERMISSIONS.GRAND]) {
            return getMenuData(['tape', 'offerings', 'statistics'])
        } else {
            return getMenuData(['tape', 'offerings'])
        }
    }, [allow])


    return (
        <AccountWireframe
            header={<AccountHeader skeleton={skeleton} showDetail={!isMyAccount} data={getData(data)}/>}
            menu={
                <AccountMenu
                    dropdownMenu={dropMenu}
                    path={organization}
                    menuData={generateAccountMainMenu()}
                />
            }
            content={<OrgContent/>}
        />
    )
}