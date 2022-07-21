import React, {useCallback, useEffect, useState} from 'react'
import {AccountHeader} from '../../../components/account-header'
import {useAccount} from '../../../hooks/account'
import {useStore} from 'effector-react'
import {AccountMenu} from '../../../components/account-menu'
import {useHistory, useParams} from 'react-router-dom'
import {UserContent} from '../organisms'
import {AccountWireframe} from '../../../UIComponents/wireframe'
import {$userModel} from '../../../models/user-models'
import {getMenuData} from '../../../utils/accountUtils'
import {useProfilePermission} from '../../../hooks/profile'
import {$accountModel} from '../../../models/accountModel'
import {UserSubscriptions} from '../../../components/subscription'
import {useTranslation} from 'react-i18next'
import {Modal} from '../../../components/modal'

const menuData = ['tape', 'jobs']

export const UserMainAccount = () => {
    const {t} = useTranslation()
    const {account} = useParams()
    useAccount()
    const {$userInfo: {data, skeleton}} = useStore($userModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {isMyAccount} = useProfilePermission({slug_name: account})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [subsType, setSubsType] = useState(null)
    const {location: {pathname}, push} = useHistory()

    const params = {
        name: `${data.name} ${data.lastname}`,
        is_official: data.is_official,
        subs: data.subs,
        category: data.main_cat,
        image: data.avatar,
        slug: `@${data.username}`
    }

    const generateAccountMainMenu = useCallback(() => {
        let tmp = []
        if (currentProfile) {
            if (currentProfile.slug_name === account && (account === 'mukhsinjon' || account === 'ravshan' || account === 'chipxack' || account === 'kabulov' || account === 'fayz' || account === 'xurshid' || account === 'yodgor')) {
                tmp = getMenuData(['tape', 'media', 'jobs'])
            } else if (currentProfile.slug_name === account) {
                tmp = getMenuData(menuData)
            } else {
                tmp = getMenuData(menuData.filter(item => item !== 'jobs'))
            }
        } else {
            tmp = getMenuData(menuData.filter(item => item !== 'jobs'))
        }
        return tmp
    }, [currentProfile, account])

    // const generateDropdownMenu = useCallback(() => {
    //     let tmp = []
    //     if (account && token && jwtDecode(token).username === account) {
    //         tmp = dropdownMenu(`@${account}`, 'user')
    //     }
    //     return tmp
    // }, [account, token])

    const handleOpenModal = (type) => {
        setSubsType(type)
        setModalIsOpen(true)
    }

    useEffect(() => {
        if (account && account === pathname.substring(2)) {
            push(`/@${account}/tape`)
        }
    }, [pathname, account, push])

    return (
        <>
            <Modal
                component={<UserSubscriptions username={account} type={subsType}/>}
                title={subsType ? t(subsType === 'me' ? 'subscribers' : 'subscriptions') : ''}
                width={700}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
            <AccountWireframe
                header={(
                    <AccountHeader
                        skeleton={skeleton}
                        data={params}
                        showDetail={!isMyAccount}
                        showSubscriptions={handleOpenModal}
                    />
                )}
                menu={
                    <AccountMenu
                        path={`@${account}`}
                        menuData={generateAccountMainMenu()}
                        dropdownMenu={[]}
                    />
                }
                content={<UserContent/>}
            />
        </>
    )
}