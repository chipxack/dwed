import React, {useEffect, useRef, useState} from 'react'
import {CurrentProfile, CurrentProfileWrapper, ExitFromProfile, ProfileSettings} from '../atoms'
import {SettingsOutlineSvg} from '../../../media'
import {useStore} from 'effector-react'
import {$accountModel, getCurrentProfile} from '../../../models/accountModel'
import {getStatus} from '../../../utils/accountUtils'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {DropdownActionMenu, IconBox} from '../../../UIComponents/global-styles'
import {useOutsideClicker} from '../../../hooks/common'
import {AnimateOnChange} from 'react-animation'
import jwtDecode from 'jwt-decode'
import {$appModel} from '../../../models/app'
import {CommonAvatar} from '../../../UIComponents/avatar'
import {PersonAddSvg} from '../../../media/person'
import {PROFILE_TYPE} from '../../../constants'

export const ActiveProfile = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$app: {token}} = useStore($appModel)
    const {t} = useTranslation()
    const {push} = useHistory()
    const ref = useRef()
    const {clicked} = useOutsideClicker(ref)
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        if (clicked) {
            setShowMore(false)
        }
    }, [clicked])

    const addNewOrganization = () => {
        getCurrentProfile({slug_name: jwtDecode(token).username, type: 'user'})
        push('/create-organization')
    }

    const getUrl = () => {
        let tmp = currentProfile.url
        if(currentProfile.type === PROFILE_TYPE.ORGANIZATION) {
            tmp = `${currentProfile.url}/offerings`
        }

        return tmp
    }

    return (
        <CurrentProfile>
            <ProfileSettings to='/settings/profile'>
                <SettingsOutlineSvg/>
            </ProfileSettings>
            <ExitFromProfile>
                <IconBox className='main-box' ref={ref} onClick={() => setShowMore(!showMore)}>
                    <PersonAddSvg/>
                    {
                        showMore
                        && (
                            <AnimateOnChange>
                                <DropdownActionMenu>
                                    <IconBox onClick={() => push('/sign-in')}>
                                        {t('account')}
                                    </IconBox>
                                    <IconBox onClick={addNewOrganization}>
                                        {t('organization')}
                                    </IconBox>
                                </DropdownActionMenu>
                            </AnimateOnChange>
                        )
                    }
                </IconBox>
            </ExitFromProfile>
            <CurrentProfileWrapper to={getUrl()}>
                <CommonAvatar size={100} imgUrl={currentProfile.avatar}/>
                <CurrentProfile.Content>
                    <CurrentProfile.Title>
                        {currentProfile.name}
                    </CurrentProfile.Title>
                    {
                        currentProfile.status !== undefined
                            ? currentProfile.status < 5
                            ? (
                                <CurrentProfile.Text color={getStatus(currentProfile.status).color}>
                                    {
                                        t(getStatus(currentProfile.status).text)
                                    }
                                </CurrentProfile.Text>
                            ) : currentProfile.category
                            && (
                                <CurrentProfile.Text>
                                    {currentProfile.category.name}
                                </CurrentProfile.Text>
                            )
                            : currentProfile.category
                            && (
                                <CurrentProfile.Text>
                                    {currentProfile.category.name}
                                </CurrentProfile.Text>
                            )
                    }
                </CurrentProfile.Content>
            </CurrentProfileWrapper>
        </CurrentProfile>
    )
}