import React from 'react'
import {Col, Pagination, Row} from 'antd'
import {useOrgCouponList} from '../../../hooks/settings'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {$organizationModel} from '../../../models/organization-models'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'
import {NavLink, useLocation} from 'react-router-dom'
import {CouponItem} from '../maleculas/coupon-item'
import {useTranslation} from 'react-i18next'

const coupon_filters = [
    {
        id: 0,
        title: 'all',
    },
    {
        id: 1,
        title: 'valid',
    },
    {
        id: -1,
        title: 'not_valid',
    },
    {
        id: -2,
        title: 'expired',
    }
]

export const Coupon = () => {
    const {t} = useTranslation()
    const {pathname} = useLocation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {onPageChange} = useOrgCouponList(currentProfile?.slug_name)
    const {$orgCouponListStore: {data, result}} = useStore($organizationModel)
    const {urlData} = useUrlParams()
    const page = Number(urlData?.[URL_KEYS.PAGE]) || 1
    const status = urlData[URL_KEYS.STATUS]

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <div className='app-nav-list'>
                    {
                        coupon_filters.map((item) => (
                            <NavLink key={item.id} className='app-nav-link' to={{
                                pathname,
                                search: item.id ? `${URL_KEYS.STATUS}=${item.id}` : ''
                            }}
                                     isActive={() => item.id === 0 && !status ? true : status && Number(status) === item.id}
                            >
                                {t(item.title)}
                            </NavLink>
                        ))
                    }
                </div>

            </Col>
            {
                data.length > 0 && (
                    <>
                        {
                            data.map(item => (
                                <Col key={item.id} span={24}>
                                    <CouponItem item={item}/>
                                </Col>
                            ))
                        }
                        <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Pagination
                                pageSize={4}
                                current={page}
                                hideOnSinglePage
                                showLessItems
                                showSizeChanger={false}
                                total={result.count}
                                onChange={onPageChange}
                            />
                        </Col>
                    </>
                )
            }
        </Row>
    )
}