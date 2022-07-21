import React from 'react'
import {useSubscription} from '../../../hooks/user'
import {SubsList, SubsSearch} from '../maleculas'
import {useStore} from 'effector-react'
import {$userModel} from '../../../models/user-models'

export const UserSubscriptions = ({type, username}) => {
    const {
        $userSubsMy: {data: subsMyData, result: subsMyResult, loading: subsMyLoading, forceLoading: myForceLoading},
        $userSubsMe: {data: subsMeData, result: subsMeResult, loading: subsMeLoading, forceLoading: meForceLoading}
    } = useStore($userModel)

    const {loadMore, searchText, onSearch} = useSubscription({type, username})

    const getListProps = () => {
        if (type === 'me' && subsMeData[username]) {
            return {
                data: subsMeData[username],
                result: subsMeResult[username],
                loading: subsMeLoading,
                forceLoading: meForceLoading[username]
            }
        }
        if (type === 'my' && subsMyData[username]) {
            return {
                data: subsMyData[username],
                result: subsMyResult[username],
                loading: subsMyLoading,
                forceLoading: myForceLoading[username]
            }
        }
        return {
            data: [],
            result: {},
            loading: false,
            forceLoading: undefined
        }
    }

    return (
        <>
            <SubsSearch value={searchText} onChange={onSearch}/>
            <SubsList
                loadMore={loadMore}
                {...getListProps()}
                userKey={type === 'my' ? 'to_user' : 'follower_user'}
                orgKey={type === 'my' ? 'to_org' : 'follower_org'}
            />
        </>
    )
}