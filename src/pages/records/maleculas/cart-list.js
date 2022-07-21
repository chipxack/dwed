import React from 'react'
import {CartItem, CartItemLink, SellerList} from '../atoms'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../models/order-models'
import {useLocation} from 'react-router-dom'
import {URL_KEYS} from '../../../constants'
import {ShortAccountCard} from '../../../components/card'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import {Col, Row} from 'antd'
import {$accountModel} from '../../../models/accountModel'
import {Text, Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {getLocalCost} from '../../../utils/app-utils'
import {AnimateOnChange} from 'react-animation'
import {useUrlParams} from '../../../hooks/common'

export const CartList = () => {
    const {$allCart: {data}} = useStore($orderModel)
    const {pathname} = useLocation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const {t} = useTranslation()

    const generateUrl = (item) => {
        return {
            pathname,
            search: `${URL_KEYS.SELLER}=${item.id}&${URL_KEYS.SPECIALIST_ID}=${item.specialists[0].id}`
        }
    }

    return (
        <SellerList>
            <Splide
                options={{
                    rewind: true,
                    perPage: 3,
                    perMove: 1,
                    width: 960,
                    arrows: data.length > 3,
                    pagination: false
                }}
            >
                {
                    data.length > 0 && data.map((item, idx) => (
                        <SplideSlide key={`${idx + 1}`}>
                            <CartItemLink
                                to={generateUrl(item)}
                                isActive={() => seller && seller === String(item.id)}
                            >
                                <CartItem>
                                    <ShortAccountCard
                                        name={item.name}
                                        imgUrl={item.image}
                                        text={item.text}
                                        imgSize={40}
                                        isOfficial={item.isOfficial}
                                        truncateLength={20}
                                    />
                                </CartItem>
                                <div className='cart-info'>
                                    <Row justify='space-between' align='middle'>
                                        <Col>
                                            <Text color='var(--primary-dwed)'>
                                                {`${t('short_qty')}: ${item.total.count}`}
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Title weight={600}>
                                                {
                                                    item.total.cost
                                                    ? (
                                                            <AnimateOnChange
                                                                animationIn='bounceIn'
                                                                animationOut='bounceOut'
                                                                durationOut={500}
                                                            >
                                                                {
                                                                    getLocalCost(item.total.cost, currentProfile?.currency?.code, currentProfile?.lang)
                                                                }
                                                            </AnimateOnChange>
                                                        )
                                                        : `0 ${currentProfile?.currency?.code.toUpperCase()}`
                                                }

                                            </Title>
                                        </Col>
                                    </Row>
                                </div>
                            </CartItemLink>
                        </SplideSlide>
                    ))
                }
            </Splide>
        </SellerList>
    )
}