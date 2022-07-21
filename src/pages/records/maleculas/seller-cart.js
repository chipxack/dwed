import React from 'react'
import {AntTable, TableTitle} from '../../../ui/atoms'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../models/order-models'
import {useTranslation} from 'react-i18next'
import {Text, Title} from '../../../UIComponents/typography'
import {ApplyLink, IconBox} from '../../../UIComponents/global-styles'
import {CloseSvg, MinusSvg, PlusSvg} from '../../../media'
import {CartOfferingContent, CartOfferingImg, CartOfferingWrapper, CartQtyBtn, QtyActionWrapper} from '../atoms'
import {getMeasurement} from '../../../utils/measuremenUtils'
import {AnimateOnChange} from 'react-animation'
import {InfinitySvg} from '../../../media/infinity'
import {Col, Row} from 'antd'
import {CircularProgress} from '@material-ui/core'
import {$accountModel} from '../../../models/accountModel'
import {getLocalCost} from '../../../utils/app-utils'
import {URL_KEYS} from '../../../constants'
import {useUrlParams} from '../../../hooks/common'

export const SellerCart = ({handleChange, handleClick, handleRemove, values, handleBlur}) => {
    const {t} = useTranslation()
    const {$cart: {data, loading, result}} = useStore($orderModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]

    const columns = [
        // {
        //     title: (<Checkbox checked={false}/>),
        //     dataIndex: 'check',
        //     key: 'check',
        //     render: (name, {id}) => (<TableTitle><Checkbox checked={false}/></TableTitle>),
        //     width: 40
        // },
        {
            title: t('name_in_form_title'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering) => (
                <TableTitle>
                    <CartOfferingWrapper>
                        <CartOfferingImg imgUrl={offering.image}/>
                        <CartOfferingContent>
                            <Title level={5}>
                                <span>{offering.name}</span>
                            </Title>
                            <Text lineHeight={20} size={14} weight={500}>
                                {`${t('price')}: ${getLocalCost(offering.cost, currentProfile?.currency?.code)} UZS`}
                            </Text>
                            <Text lineHeight={24} size={14} weight={500}
                                  style={{display: 'flex', alignItems: 'center'}}>
                                {
                                    offering.qty
                                        ? t('in_stock_var', {
                                            q: offering.qty,
                                            m: t(getMeasurement(offering.measurement, 'label'))
                                        })
                                        : <>
                                            {`${t('in_stock')}:`}
                                            <IconBox style={{marginLeft: 6}}>
                                                <InfinitySvg/>
                                            </IconBox>
                                        </>
                                }
                            </Text>
                        </CartOfferingContent>
                    </CartOfferingWrapper>
                </TableTitle>
            ),
            width: '40%'
        },
        {
            title: t('quantity'),
            dataIndex: 'qty',
            key: 'qty',
            render: (qty, item) => (
                <TableTitle>
                    <div>
                        <QtyActionWrapper>
                            <CartQtyBtn onClick={() => handleClick(item.offering, qty, 'decrement')}>
                                <MinusSvg/>
                            </CartQtyBtn>
                            <input
                                type='text'
                                value={values[item.offering.id] !== undefined ? values[item.offering.id] : qty}
                                onChange={(e) => handleChange(e.target.value, {offering: item.offering, qty})}
                                onBlur={() => handleBlur(item, qty)}
                            />
                            <CartQtyBtn onClick={() => handleClick(item.offering, qty, 'increment')}>
                                <PlusSvg/>
                            </CartQtyBtn>
                        </QtyActionWrapper>
                    </div>
                </TableTitle>),
            width: 180
        },
        {
            title: t('unit'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering) => (
                <TableTitle>
                    {t(getMeasurement(offering.measurement, 'label'))}
                </TableTitle>
            ),
            width: 100
        },
        {
            title: t('price'),
            dataIndex: 'total_cost',
            key: 'total_cost',
            render: (total_cost) => (
                <TableTitle>
                    <Title weight={600}>
                        {
                            total_cost
                                ? (
                                    <AnimateOnChange
                                        animationIn='bounceIn'
                                        animationOut='bounceOut'
                                        durationOut={500}
                                    >
                                        {
                                            getLocalCost(total_cost, currentProfile?.currency?.code, currentProfile?.lang)
                                        }
                                    </AnimateOnChange>
                                )
                                : `0 ${currentProfile?.currency?.code.toUpperCase()}`
                        }

                    </Title>
                </TableTitle>
            ),
            width: 'auto'
        },
        {
            title: '',
            dataIndex: 'offering',
            key: 'offering',
            render: (_, {offering}) => (
                <IconBox onClick={() => handleRemove(offering.id)}>
                    <CloseSvg/>
                </IconBox>
            ),
            width: '30px'
        },
    ]

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <AntTable
                    columns={columns}
                    dataSource={data}
                    loading={{spinning: loading, indicator: <CircularProgress size={24}/>}}
                />
            </Col>
            {
                result.total_cost !== undefined && (
                    <Col span={24}>
                        <Row gutter={16} justify='end'>
                            <Col>
                                <Title level={5} color='var(--grey-basic)'>
                                    {t('total_cost')}:
                                </Title>
                            </Col>
                            <Col>
                                <Title style={{minWidth: 150}} level={5}>
                                    {
                                        result.total_cost
                                            ? (
                                                <AnimateOnChange
                                                    animationIn='bounceIn'
                                                    animationOut='bounceOut'
                                                    durationOut={500}
                                                >
                                                    {
                                                        getLocalCost(result.total_cost, currentProfile?.currency?.code, currentProfile?.lang)
                                                    }
                                                </AnimateOnChange>
                                            )
                                            : (
                                                `0 ${currentProfile?.currency?.code.toUpperCase()}`
                                            )
                                    }

                                </Title>
                            </Col>
                        </Row>
                    </Col>
                )
            }

            {
                spec_id && seller
                && (
                    <Col span={24}>
                        <ApplyLink
                            to={{
                                pathname: `/records/checkout`,
                                search: `${URL_KEYS.SELLER}=${seller}&${URL_KEYS.SPECIALIST_ID}=${spec_id}`
                            }}
                            style={{marginLeft: 'auto'}}
                        >
                            {t('continue')}
                        </ApplyLink>
                    </Col>
                )
            }
        </Row>
    )
}