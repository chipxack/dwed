import React from 'react'
import {useStore} from 'effector-react'
import {$organizationModel, resetOrg} from '../../../models/organization-models'
import {Col, Row, Spin} from 'antd'
import {AccountCardSkeleton, CommonCard} from '../../../components/card'
import InfiniteScroll from 'react-infinite-scroll-component'
import {HomeList} from '../atoms'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {resetOffering} from '../../../models/offering-model'

const skeletonData = generateSkeleton(16)

export const OrganizationList = ({loadList, subscribeOrg}) => {
    const {$allOrgList: {data, loading, result, skeleton, status}} = useStore($organizationModel)

    const onAction = () => {
        resetOrg()
        resetOffering()
    }

    return (
        <HomeList>
            {
                skeleton === false && (
                    <InfiniteScroll
                        dataLength={result.nextOffset || 20}
                        next={() => loadList(result.nextOffset, status)}
                        hasMore={!loading && !!result.next}
                        loader={<Spin size='small'/>}
                        style={{overflow: 'unset'}}
                    >
                        <Row gutter={[16, 16]}>
                            {
                                data.length > 0 && data.map((item, idx) => {
                                    const data = {
                                        name: item.name,
                                        img: item.logo,
                                        category: item.category.name,
                                        slug: item.slug_name,
                                        id: item.id,
                                        isOfficial: item.is_official,
                                        itemSubs: item.subs,
                                        rating: item.rating,
                                    }

                                    return (
                                        <Col key={`${idx + 1}`} span={12}>
                                            <CommonCard
                                                link={`/${item.slug_name}/offerings`}
                                                data={data}
                                                subscribe={subscribeOrg}
                                                showProgress
                                                onAction={onAction}
                                            />
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </InfiniteScroll>
                )
            }

            {
                (skeleton === undefined || skeleton) && (
                    <Row gutter={[16, 16]}>
                        {
                            skeletonData.map((item, idx) => (
                                <Col key={`${idx + 1}`} span={12}>
                                    <AccountCardSkeleton showProgress/>
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </HomeList>
    )
}