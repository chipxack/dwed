import React, {Fragment} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$appModel} from '../../../models/app'
import {ENVIRONMENT_MODE} from '../../../constants'
import {SubsItem} from './subs-item'
import {SubsItemLink} from '../atoms'
import {StyledInfiniteScroller} from '../../../ui/atoms'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {ShortAccountCardSkeleton} from '../../card'
import {ScrollWrapper} from '../../../UIComponents/global-styles'

const skeleton = generateSkeleton(16)

export const SubsList = ({data, orgKey, userKey, loading, result, forceLoading, loadMore}) => {
    const {$app: {prodsMode}} = useStore($appModel)

    const getItem = (item) => item[userKey]
        ? {
            name: item[userKey].full_name,
            imgUrl: item[userKey].avatar,
            isOfficial: item[userKey].is_official,
            text: item[userKey].main_cat && item[userKey].main_cat.name
        }
        : {
            name: item[orgKey].name,
            imgUrl: item[orgKey].logo,
            isOfficial: item[orgKey].is_official,
            text: item[orgKey].category && item[orgKey].category.name
        }

    return (
        <>
            {
                data.length > 0 && forceLoading === 2
            }
            <ScrollWrapper maxHeight={520}>
                <StyledInfiniteScroller
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={result && !loading && !!result.next}
                    loader={<div className='loader' key={0}>Loading ...</div>}
                    useWindow={false}
                    initialLoad={false}
                >
                    <Row gutter={[16, 16]}>
                        {
                            data.length > 0 && data.map((item, idx) => (
                                <Fragment key={`${idx + 1}`}>
                                    {
                                        prodsMode !== ENVIRONMENT_MODE.PRODUCTION
                                            ? (
                                                <>
                                                    {
                                                        !item[orgKey] && (
                                                            <Col span={6}>
                                                                <SubsItemLink to={`/@${item[userKey].username}`}>
                                                                    <SubsItem item={getItem(item)}/>
                                                                </SubsItemLink>
                                                            </Col>
                                                        )
                                                    }
                                                </>
                                            )
                                            : (
                                                <Col span={6}>
                                                    <SubsItemLink
                                                        to={
                                                            `/${item[userKey]
                                                                ? `@${item[userKey].username}`
                                                                : item[orgKey].slug_name}`
                                                        }
                                                    >
                                                        <SubsItem item={getItem(item)}/>
                                                    </SubsItemLink>
                                                </Col>
                                            )
                                    }
                                </Fragment>
                            ))
                        }
                    </Row>
                </StyledInfiniteScroller>
            </ScrollWrapper>
            {
                (forceLoading === undefined || forceLoading === 1) && (
                    <Row gutter={[24, 24]}>
                        {
                            skeleton.map((item, idx) => (
                                <Col span={6} key={idx}>
                                    <ShortAccountCardSkeleton
                                        size={64}
                                        direction='vertical'
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </>
    )
}