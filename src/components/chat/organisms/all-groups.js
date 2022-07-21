import React from "react";
import {GroupsHooks} from "../../../hooks/chat";
import {AllChatsSection, ChatUserBlock, ChatUserBlockList, ChatUserTitleBlock} from "../atoms";
// import InfiniteScroll from "react-infinite-scroller";
import {$isDataPending, checkGroupChatEvent} from "../../../models/chat";
// import {Badge} from "antd";
// import Moment from "react-moment";
import {useStore} from "effector-react";
import {GroupListBlock} from "./group-list-block";


export const AllGroups = () => {
    const isDataPending = useStore($isDataPending)
    const groupId = isDataPending.$checkedGroup.id

    const groupList = isDataPending.$groupList
    const groupListData = groupList.data

    GroupsHooks()

    return (
        <AllChatsSection>
            <ChatUserBlockList>
                {
                    groupListData.results && groupListData.results.length > 0 &&
                    groupListData.results.map((item, key) =>
                        <ChatUserBlock
                            checked={groupId === item.receiver.id}
                            onClick={() => {checkGroupChatEvent(item)}}
                            key={key}
                        >
                            <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                {
                                    !item.avatar ?
                                        <span className='avatar' style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}>
                                            {item.receiver.name[0]}
                                        </span> :
                                        <img src={item.avatar} alt={item.receiver.name}/>

                                }
                                <ChatUserTitleBlock>
                                    <div>
                                        {item.receiver.name}
                                    </div>
                                </ChatUserTitleBlock>
                            </div>
                            {/*<ChatUserBlockDate>*/}
                            {/*    <Badge count={undefined} />*/}
                            {/*    <Moment format="hh:mm">*/}
                            {/*        {item.last_message.date}*/}
                            {/*    </Moment>*/}
                            {/*</ChatUserBlockDate>*/}
                        </ChatUserBlock>
                    )
                }
            </ChatUserBlockList>

            <GroupListBlock
                // sendMessage={sendMessage}
                groupData={isDataPending.$checkedGroup.groupData}
                groupId={groupId}
            />
        </AllChatsSection>
    )
}