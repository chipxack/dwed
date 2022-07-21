import React, {Fragment, useCallback} from 'react'
import {AccountItem, AccountList, AccountListHeading} from '../atoms'
import {ShortAccountCard} from '../../card'
import {useStore} from 'effector-react'
import {$accountModel, getCurrentProfile, removeLinkedUser} from '../../../models/accountModel'
import {IconBox} from '../../../UIComponents/global-styles'
import {ExitSvg} from '../../../media/exit'
import Cookies from 'js-cookie'
import {$appModel, tokenMount} from '../../../models/app'
import jwtDecode from 'jwt-decode'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'

export const AuthUserList = ({changeAccount}) => {
    const {$profiles: {linkedUsers, currentProfile}} = useStore($accountModel)
    const {$app: {token}} = useStore($appModel)
    const {t} = useTranslation()
    const {push} = useHistory()

    const handleExit = useCallback((username) => {
        if(currentProfile && currentProfile.slug_name === username) {
            Cookies.remove('token')
            Cookies.remove('refresh-token')
            Cookies.remove('users')
            getCurrentProfile(null)
            tokenMount(null)
            push('/')
        }else {
            const appTokenUsername = jwtDecode(token).username
            if (appTokenUsername === username) {
                Cookies.remove('token')
                Cookies.remove('refresh-token')
                Cookies.remove('users')
                getCurrentProfile(null)
                tokenMount(null)
                push('/')
            } else {
                const tokens = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : {}
                if (tokens[username]) {
                    delete tokens[username]
                    Cookies.set('users', JSON.stringify(tokens))
                }
                removeLinkedUser({username})
            }
        }

    }, [token, currentProfile, push])

    const renderItem = (item) => (
        <AccountItem>
            <div onClick={() => changeAccount(item.slug_name)}>
                <ShortAccountCard
                    imgSize={50}
                    truncateLength={20}
                    imgUrl={item.avatar}
                    name={item.name}
                    text={item.category && item.category.name}
                />
            </div>
            <IconBox color='var(--danger-dwed)' onClick={() => handleExit(item.slug_name)}>
                <ExitSvg/>
            </IconBox>
        </AccountItem>
    )

    return (
        <>
            {
                linkedUsers && linkedUsers.length > 0
                && (
                    <AccountList>
                        <AccountListHeading>
                            <Title color='#939393'>
                                {t('private')}
                            </Title>
                            <div className='line'/>
                        </AccountListHeading>
                        {
                            linkedUsers.map((item, idx) => (
                                <Fragment key={`${idx + 1}`}>
                                    {renderItem(item)}
                                </Fragment>
                            ))
                        }
                    </AccountList>
                )
            }
        </>
    )
}