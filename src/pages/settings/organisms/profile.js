import React from 'react'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {PROFILE_TYPE} from '../../../constants'
import {OrgProfile, UserProfile} from '../maleculas'

export const ProfileSettings = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)

    return (
        <>
            {
                currentProfile && (
                    <>
                        {
                            currentProfile.type === PROFILE_TYPE.USER && <UserProfile/>
                        }
                        {
                            currentProfile.type === PROFILE_TYPE.ORGANIZATION && <OrgProfile/>
                        }
                    </>
                )
            }
        </>
    )
}