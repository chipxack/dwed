import React from 'react'
import {Col, Row, Spin} from 'antd'
import {useStore} from 'effector-react'
import {AccountCardSkeleton, CommonCard} from '../../../components/card'
import InfiniteScroll from 'react-infinite-scroll-component'
import {HomeList} from '../atoms'
import {$userModel, resetUser} from '../../../models/user-models'
import {generateSkeleton} from '../../../utils/skeletonUtils'

const skeletonData = generateSkeleton(16)

export const PeopleList = ({loadList, subscribeUser}) => {
    const {$userList: {data, loading, result, skeleton, status}} = useStore($userModel)

    const onAction = () => {
        resetUser()
    }

    return (
        <HomeList>
            {
                skeleton === false && (
                    <InfiniteScroll
                        dataLength={result.nextOffset || 20}
                        next={() => loadList(result.nextOffset, status)}
                        hasMore={!loading && !!result.next}
                        loader={<Spin size='small' />}
                        style={{overflow: 'unset'}}
                    >
                        <Row gutter={[16, 16]}>
                            {
                                data.length > 0 && data.map((item, idx) => {
                                    const info = {
                                        name: item.full_name,
                                        img: item.avatar,
                                        category: item.main_cat && item.main_cat.name,
                                        slug: item.username,
                                        isOfficial: item.is_official,
                                        itemSubs: item.subs
                                    }

                                    return (
                                        <Col key={`${idx + 1}`} span={12}>
                                            <CommonCard
                                                link={`/@${item.username}/tape`}
                                                data={info}
                                                subscribe={subscribeUser}
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
                                    <AccountCardSkeleton/>
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </HomeList>
    )
}