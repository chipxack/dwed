import React, {Fragment} from 'react'
import {accountSettingsMenu} from '../../../data/account-settings'
import {SettingsNavLink} from '../atoms'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {PROFILE_TYPE} from '../../../constants'

export const ProfileSettingsNav = () => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const renderItem = (item) => {
        const Icon = item.icon
        return (
            <SettingsNavLink to={`/settings/${item.id}`}>
                <Icon />
                {t(item.id)}
            </SettingsNavLink>
        )
    }

    return (
        <>
            {
                accountSettingsMenu.map(item => {
                    return (
                        <Fragment key={item.id}>
                            {
                                currentProfile?.type === PROFILE_TYPE.USER && (
                                    <>
                                        {
                                            item.id !== 'coupon' && renderItem(item)
                                        }
                                    </>
                                )
                            }
                            {
                                currentProfile?.type === PROFILE_TYPE.ORGANIZATION && (
                                    <>
                                        {
                                            item.id !== 'security' && renderItem(item)
                                        }
                                    </>
                                )
                            }
                        </Fragment>
                    )
                })
            }
        </>
    )
}
