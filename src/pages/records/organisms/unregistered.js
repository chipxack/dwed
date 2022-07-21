import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useCart} from '../../../hooks/order'
import {$orderModel} from '../../../models/order-models'
import {CartList, CartSpecialistList, SellerCart} from '../maleculas'
import {ShortAccountCard} from '../../../components/card'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'

export const Unregistered = () => {
    const {$allCart: {specialists}} = useStore($orderModel)
    const {handleChange, handleClick, handleRemove, values, handleBlur} = useCart()
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]

    const singleSpecialist = specialists.find(item => item.id === Number(spec_id))

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <CartList/>
            </Col>

            {
                singleSpecialist && (
                    <Col span={24}>
                        <ShortAccountCard
                            name={singleSpecialist.user.full_name}
                            imgUrl={singleSpecialist.user.avatar}
                            imgSize={40}
                            text={singleSpecialist.job.name}
                        />
                    </Col>
                )
            }
            {
                seller && specialists.length > 0
                && (
                    <Col span={24}>
                        <Row wrap={false} gutter={24}>
                            <Col>
                                <CartSpecialistList data={specialists}/>
                            </Col>
                            <Col flex={1}>
                                <SellerCart
                                    handleChange={handleChange}
                                    handleClick={handleClick}
                                    handleRemove={handleRemove}
                                    values={values}
                                    handleBlur={handleBlur}
                                />
                            </Col>
                        </Row>
                    </Col>
                )
            }
        </Row>
    )
}