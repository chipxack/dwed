import React, {useCallback} from 'react'
import {CartSpecialistItem, CartSpecialistWrapper} from '../atoms'
import {CommonAvatar} from '../../../UIComponents/avatar'
import {URL_KEYS} from '../../../constants'
import {useLocation} from 'react-router-dom'
import {useUrlParams} from '../../../hooks/common'

export const CartSpecialistList = ({data}) => {
    const {pathname} = useLocation()
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]

    const generateUrl = useCallback((id) => {
        return {
            pathname,
            search: `${URL_KEYS.SELLER}=${seller}&${URL_KEYS.SPECIALIST_ID}=${id}`
        }
    }, [seller, pathname])


    return (
        <CartSpecialistWrapper>
            {
                data.map(item => (
                    <CartSpecialistItem
                        key={item.id}
                        to={generateUrl(item.id)}
                        isActive={() => spec_id && Number(spec_id) === item.id}
                        selected={!!spec_id}
                    >
                        <CommonAvatar
                            imgUrl={item.user.avatar}
                            size={40}
                            active={spec_id && Number(spec_id) === item.id}
                        />
                    </CartSpecialistItem>
                ))
            }
        </CartSpecialistWrapper>
    )
}
