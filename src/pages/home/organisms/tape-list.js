import React, { useState } from 'react'
import { HomeList } from '../atoms'
import { PostItem } from '../../../components/post-block'
import { PostOffersItem, PostOrgsList, PostStreamsList, PostUsersList } from '../molecules'
import { TapeHooks } from '../../../hooks/tape'
import { useStore } from 'effector-react'
import { $isDataPending } from '../../../models/tape'
import InfiniteScroll from 'react-infinite-scroller'
import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import { removePost } from '../../../models/tape/events'
import { PostToTape } from '../../../components/post-block/template'
import { $appModel } from '../../../models/app'
import { ENVIRONMENT_MODE } from '../../../constants'


export const TapeList = () => {
    const isDataPending = useStore($isDataPending)
    const appData = useStore($appModel).$app

    const [visible, setVisible] = useState(false)


    const tapeList = isDataPending.$tapeList.data && isDataPending.$tapeList.data.results
    const loading = isDataPending.$tapeList.loading
    const moreList = isDataPending.$tapeList.data && !!isDataPending.$tapeList.data.next
console.log('isDataPending.$tapeList', isDataPending.$tapeList)
    const {
        handleScroll
    } = TapeHooks()
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return (
        <HomeList>
            <Row gutter={30}>
                <Col span={18}>
                    {
                        appData?.token &&
                        <PostToTape visible={visible} setVisible={setVisible} />
                    }
                    {
                        tapeList && tapeList.length > 0 &&
                        <InfiniteScroll
                            loader={<Spin indicator={antIcon} />}
                            hasMore={
                                !loading && moreList
                            }
                            className='scroll-chat'
                            initialLoad={false}
                            pageStart={0}
                            loadMore={() => handleScroll(tapeList)}
                        >
                            {
                                tapeList.map((item, key) =>
                                    item.block_type === 'streams' ?
                                        <PostStreamsList
                                            key={key}
                                            data={item.block_data}
                                        /> :
                                        item.block_type === 'post' ?
                                            <PostItem
                                                fluid
                                                setVisible={setVisible}
                                                removePost={removePost}
                                                key={key}
                                                data={item.block_data}
                                            /> :
                                            appData.prodsMode === ENVIRONMENT_MODE.DEVELOPMENT && item.block_type === 'orgs' ?
                                                <PostOrgsList
                                                    key={key}
                                                    data={item.block_data}
                                                /> :
                                                item.block_type === 'users' ?
                                                    <PostUsersList
                                                        key={key}
                                                        data={item.block_data}
                                                    /> :
                                                    appData.prodsMode === ENVIRONMENT_MODE.DEVELOPMENT && item.block_type === 'offers' ?
                                                        <PostOffersItem
                                                            key={key}
                                                            data={item.block_data}
                                                        /> : null
                                )
                            }
                        </InfiniteScroll>
                    }
                </Col>
                {/*<Col span={6}>*/}
                {/*    <UserPostRightBlock>*/}
                {/*        <h1>{t('subscriptions')}</h1>*/}
                {/*        /!*<div key={key}>*!/*/}
                {/*            /!*<img src={item.to_org.logo} alt={item.to_org.name}/>*!/*/}
                {/*            /!*<span>{item.to_org.name}</span>*!/*/}
                {/*            /!*<span>{item.to_org.category.name}</span>*!/*/}
                {/*        /!*</div>*!/*/}
                {/*    </UserPostRightBlock>*/}
                {/*</Col>*/}
            </Row>


        </HomeList>
    )
}