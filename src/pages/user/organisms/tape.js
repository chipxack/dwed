import React, {useState} from 'react'
import {Col, Row, Spin} from 'antd'
import {useStore} from "effector-react";
import {$isDataPending} from "../../../models/tape";
import {
    PostOffersItem,
    PostOrgsList,
    PostStreamsList,
    PostUsersList
} from "../../home/molecules";
import {UserTapeHooks} from "../../../hooks/tape/tape-hooks";
import {removeMyPost} from "../../../models/tape/events";
import InfiniteScroll from "react-infinite-scroller";
import {LoadingOutlined} from "@ant-design/icons";
import {PostItem} from "../../../components/post-block";
import {PostToTape} from "../../../components/post-block/template";
import {useParams} from "react-router-dom";
import {$accountModel} from "../../../models/accountModel";

export const UserTape = () => {
    const {account} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const isDataPending = useStore($isDataPending)
    const tapeList = isDataPending.$userTapeList.data && isDataPending.$userTapeList.data.results
    const loading = isDataPending.$userTapeList.loading
    const moreList = isDataPending.$userTapeList.data && !!isDataPending.$userTapeList.data.next

    // const isUserDataPending = useStore($userModel)
    // const subscribeList = isUserDataPending.$userSubscribe.data

    const [visible, setVisible] = useState(false);

    const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

    const {
        handleScroll
    } = UserTapeHooks()

    return (
        <div style={{padding: '0 0 16px'}}>
            {
                currentProfile?.slug_name === account &&
                <PostToTape visible={visible} setVisible={setVisible}/>
            }
            <Row gutter={15}>
                <Col span={17}>
                    {
                        tapeList && tapeList.length > 0 &&
                        <InfiniteScroll
                            loader={<Spin indicator={antIcon}/>}
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
                                        <PostStreamsList key={key} data={item.block_data}/> :
                                        item.block_type === 'post' ?
                                            <PostItem setVisible={setVisible} removePost={removeMyPost} key={key} data={item.block_data}/> :
                                            item.block_type === 'orgs' ?
                                                <PostOrgsList key={key} data={item.block_data}/> :
                                                item.block_type === 'users' ?
                                                    <PostUsersList key={key} data={item.block_data}/> :
                                                    item.block_type === 'offers' ?
                                                        <PostOffersItem key={key} data={item.block_data}/> : null
                                )
                            }
                        </InfiniteScroll>

                    }
                </Col>
                <Col span={7}>
                    {/*<UserPostRightBlock>*/}
                    {/*    <h1>{t('subscribe')}</h1>*/}
                    {/*    {*/}
                    {/*        subscribeList && subscribeList.results && subscribeList.results.length > 0 &&*/}
                    {/*        subscribeList.results.map((item, key) => item.to_org &&*/}
                    {/*            <div key={key}>*/}
                    {/*                <img src={item.to_org.logo} alt={item.to_org.name}/>*/}
                    {/*                <span>{item.to_org.name}</span>*/}
                    {/*                <span>{item.to_org.category.name}</span>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</UserPostRightBlock>*/}
                </Col>
            </Row>
        </div>
    )
}