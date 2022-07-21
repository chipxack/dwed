import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useStore} from "effector-react";
import {ChatAllUsers} from "../../../hooks/chat";
import {
    $isDataPending,
} from "../../../models/chat";
import {
    AllChatsSection,
    ChatUserBlockList
} from "../atoms";
import {ChatListBlock} from "./chat-list-block";
import {$accountModel} from "../../../models/accountModel";
import {ChatUserItem, SearchUsers} from "../molecules";


export const AllChats = ({setCount}) => {
    const isDataPending = useStore($isDataPending)
    const accountModel = useStore($accountModel)
    const usersList = isDataPending.$chatUsersList.data && isDataPending.$chatUsersList.data.results
    const loading = isDataPending.$chatUsersList.data && isDataPending.$chatUsersList.loading
    const moreList = isDataPending.$chatUsersList.data && isDataPending.$chatUsersList.data.next
    const profileSlugName = accountModel.$profiles && accountModel.$profiles.currentProfile && accountModel.$profiles.currentProfile.slug_name
    const userData = isDataPending.$checkedUser.userData
    const userName = userData && userData.username

    const {
        sendMessage,
        handleScroll
    } = ChatAllUsers(profileSlugName, usersList, setCount)


    return (
        <AllChatsSection>
            <SearchUsers/>
            <ChatUserBlockList>
                {
                    usersList && usersList.length > 0
                    && (
                        <InfiniteScroll
                            hasMore={
                                !loading && Boolean(moreList)
                            }
                            className='scroll-chat'
                            isReverse={true}
                            useWindow={false}
                            initialLoad={loading}
                            pageStart={0}
                            loadMore={handleScroll}
                        >
                            {
                                usersList.map((item, key) => <ChatUserItem userName={userName} data={item} key={key}/>)
                            }
                        </InfiniteScroll>
                    )
                }
            </ChatUserBlockList>
            <ChatListBlock sendMessage={sendMessage} userData={userData}/>
        </AllChatsSection>
    )
}