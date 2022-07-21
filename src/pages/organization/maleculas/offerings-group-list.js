import React, {useCallback, useState} from 'react'
import {AccountSidebarListWrapper, SkeletonUI} from '../../../UIComponents/global-styles'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$offeringModel} from '../../../models/offering-model'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'
import {NavLink, useLocation, useParams} from 'react-router-dom'
import {Modal} from '../../../components/modal'
import {Avatar, Col, Row} from 'antd'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {OfferingGroupModal} from './offering-group-modal'
import {useOfferingGroupList} from '../../../hooks/offers'

const skeletonData = generateSkeleton(4)

export const OrgOffersGroupList = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {pathname} = useLocation()
    const {organization} = useParams()
    useOfferingGroupList({slug: organization})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {$offerGroupList: {data, skeleton}} = useStore($offeringModel)

    /*URl KEYS*/
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]
    const group_id = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const spec_cat_id = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]

    const generateLink = useCallback((id) => {
        const url = []
        if (spec_cat_id) {
            url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${spec_cat_id}`)
        }

        if (spec_id) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${spec_id}`)
        }

        if (!group_id || group_id !== id) {
            url.push(`${URL_KEYS.OFFERING_GROUP_ID}=${id}`)
        }

        return {
            pathname,
            search: url.join('&')
        }
    }, [spec_cat_id, spec_id, group_id, pathname])


    // const onSelect = useCallback((id) => {
    //     const urlParam = {
    //         status: FETCHING_STATUS.FILTER,
    //         params: {
    //             limit: 20,
    //             offset: 0,
    //         }
    //     }
    //
    //     if (spec_id) {
    //         urlParam['params']['responsible'] = spec_id
    //     }
    //
    //     if (!group_id || (group_id && group_id !== String(id))) {
    //         urlParam['params']['group'] = id
    //     }
    //
    //     getOfferingList(urlParam)
    // }, [spec_id, getOfferingList, group_id])

    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={t('all_groups')}
                component={
                    <OfferingGroupModal onClose={() => setModalIsOpen(false)}/>
                }
                width={970}
            />
            <AccountSidebarListWrapper>
                <Title className='account-sidebar-title' style={{marginBottom: 6}} level={5}>
                    {t('groups')}
                </Title>
                {
                    skeleton === false && data.length > 0 && data.slice(0, 4).map((item, idx) => (
                        <NavLink
                            key={`${idx + 1}`}
                            to={generateLink(String(item.id))}
                            isActive={() => group_id && Number(group_id) === item.id}
                            className='account-sidebar-list-item'
                        >
                            <Row gutter={8} wrap={false} align='middle'>
                                <Col>
                                    <Avatar style={{borderRadius: 6}} src={item.image} size={50} shape='square'/>
                                </Col>
                                <Col>
                                    <Title weight={500} level={5} style={{lineHeight: 1.3}}>
                                        {item.name}
                                    </Title>
                                </Col>
                            </Row>
                        </NavLink>
                    ))
                }
                {
                    (skeleton === undefined || !!skeleton) && skeletonData.map((item, idx) => (
                        <div className='account-sidebar-list-item' key={`${idx + 1}`}>
                            <SkeletonComponent/>
                        </div>
                    ))
                }
                <div className='account-show-more' onClick={() => setModalIsOpen(true)}>
                    {t('show_all')}
                </div>
            </AccountSidebarListWrapper>
        </>
    )
}

const SkeletonComponent = () => (
    <Row gutter={8} align='middle'>
        <Col>
            <SkeletonUI
                variant='rect'
                height={50}
                width={50}
                animation='wave'
            />
        </Col>
        <Col flex={1}>
            <SkeletonUI
                variant='text'
                height={18}
                width='100%'
                animation='wave'
            />
            <SkeletonUI
                variant='text'
                height={18}
                width='70%'
                animation='wave'
            />
        </Col>
    </Row>
)
