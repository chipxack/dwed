import React from "react";
import {NewChatHooks} from "../../../hooks/chat/new-chat-hooks";
import {useStore} from "effector-react";
import {$userModel} from "../../../models/user-models";
import InfiniteScroll from "react-infinite-scroller";
import {ChatUsersList, NewChatUser} from "../atoms";
import {Col, Row} from "antd";



export const NewChat = ({closeModal}) => {
    const isDataPending = useStore($userModel).$userList
    const loading = isDataPending.loading
    const moreList = isDataPending.result.next
    const usersList = isDataPending.data

    const {
        setOffset,
        checkNewChat
    } = NewChatHooks(closeModal)

    return (
        <ChatUsersList>
            <InfiniteScroll
                hasMore={
                    !loading && moreList
                }
                className='scroll-chat'
                useWindow={false}
                initialLoad={loading}
                pageStart={0}
                loadMore={() => setOffset(usersList.length)}
            >
                <Row gutter={[33, 16]}>
                    {
                        usersList && usersList.length > 0 &&
                        usersList.map((item, i) =>
                            <Col key={i} span={4}>
                                <NewChatUser onClick={() => checkNewChat(item)} >
                                    <img src={item.avatar} alt=""/>
                                    <h1>{item.full_name}</h1>
                                </NewChatUser>
                            </Col>
                        )
                    }
                </Row>

            </InfiniteScroll>
        </ChatUsersList>
    )
}