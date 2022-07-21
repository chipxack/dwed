import React, {useRef, useState} from 'react'
import {Col, Row} from 'antd'
import {DwedPlayer} from '../../components/player'
import {Block, Container, StyledInfiniteScroller} from '../../ui/atoms'
import {StreamPageHook} from '../../hooks/stream'
import {
    LiveAt,
    StreamChat, StreamChatAvatar,
    StreamChatBlock,
    StreamChatBlockForm,
    StreamChatSection,
    StreamPageSection,
    StreamPlayerBlock
} from './atoms'
import {useStore} from 'effector-react'
import {$isDataPending} from '../../models/stream'
import {StreamUser} from './molecules'
import {PaperPlaneSvg} from '../../media'
import {useTranslation} from 'react-i18next'
import {AnnouncementSection} from '../../components/stream-blok'
import {toggleAuthModal} from '../../models/widgets'
import {$appModel} from '../../models/app'
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";


export const Stream = () => {
    const {t} = useTranslation()
    const scrollBlock = useRef(null);
    const inputRef = useRef(null)
    const isDataPending = useStore($isDataPending)
    const streamInfo = isDataPending.$streamInfo.result
    const streamInfoPending = isDataPending.$streamInfo.loading
    const chatList = isDataPending.$streamChatList.result
    const chatListLoading = isDataPending.$streamChatList.loading
    const {$app: {token}} = useStore($appModel)
    const announcementList = isDataPending.$announcementList && isDataPending.$announcementList.data && isDataPending.$announcementList.data.results
    const [currentSchedule, setCurrentSchedule] = useState(undefined)
    const [closeStatus, setCloseStatus] = useState(true)


    const {
        text,
        setText,
        sendMessage,
        sendMessageLoading,
        loadMoreChatList,
        // liveCount
    } = StreamPageHook(inputRef)

    // console.log('announcementList', announcementList, moment(new Date()));
    const toggleModal = () => {
        !token && toggleAuthModal(true)
    }
    //
    // const scrollToBottom = () => {
    //     scrollBlock.current?.scrollIntoView({ behavior: "smooth" })
    // }

    // useEffect(() => {
    //     scrollToBottom()
    // }, [chatList?.results]);

    return (
        <Block style={{minHeight: 'calc(100vh - 92px)', marginTop: 50}} jContent='middle' aItems='start'>
            <Container>
                <StreamPageSection>
                    <Row gutter={12}>
                        <Col span={16}>
                            <StreamPlayerBlock>
                                {
                                    !streamInfoPending && streamInfo?.live_at ?
                                        <DwedPlayer
                                            hotKey
                                            url={`${process.env.REACT_APP_BASE_URL}/streaming/${streamInfo.channel_slug}/live.m3u8`}
                                        /> :
                                        <LiveAt>
                                            {
                                                streamInfoPending ?
                                                    <div className={'live-bg'}/> :
                                                    <img
                                                        src={streamInfo.thumbnail}
                                                        alt={streamInfo.channel_name}
                                                        className={'live-bg'}
                                                    />
                                            }

                                        </LiveAt>
                                }
                                <StreamUser data={streamInfo} currentSchedule={currentSchedule}/>
                            </StreamPlayerBlock>
                        </Col>
                        <Col span={8}>
                            <StreamChatBlock>
                                {/*<h1>*/}
                                {/*    {t('chat')}*/}
                                {/*</h1>*/}
                                <button
                                    onClick={() => setCloseStatus(!closeStatus)}
                                    className={`toggle-chat ${closeStatus && 'close'}`}
                                >
                                    {t(`${closeStatus ? 'hide_chat' : 'visible_chat'}`)}
                                    <ArrowLeftIcon/>
                                </button>
                                {
                                    closeStatus &&
                                    <StreamChatBlockForm>
                                        {
                                            chatList && chatList.results &&
                                            <StreamChatSection ref={scrollBlock}>
                                                <StyledInfiniteScroller
                                                    hasMore={
                                                        !chatListLoading && chatList.next
                                                    }
                                                    isReverse={true}
                                                    useWindow={false}
                                                    pageStart={0}
                                                    loadMore={() => loadMoreChatList(chatList.results.length)}
                                                    // loader={<div className="loader" key={0}>Loading ...</div>}
                                                    initialLoad={false}
                                                    getScrollParent={() => scrollBlock.current}
                                                >
                                                    {
                                                        chatList.results.length > 0 && chatList.results.map((item, index) =>
                                                            <StreamChat key={index}>
                                                                <StreamChatAvatar owner={streamInfo?.user?.username === item?.user?.username}>
                                                                    <img src={item.user.avatar}
                                                                         alt={item.user.full_name}/>
                                                                    <div>
                                                                        <h1>{item.user.full_name}</h1>
                                                                        <span>{item.text}</span>
                                                                    </div>
                                                                </StreamChatAvatar>
                                                            </StreamChat>
                                                        )
                                                    }
                                                </StyledInfiniteScroller>
                                            </StreamChatSection>

                                        }
                                        <form onSubmit={sendMessage}>
                                            <input
                                                ref={inputRef}
                                                onClick={() => toggleModal()}
                                                disabled={sendMessageLoading}
                                                value={text}
                                                onChange={(e) => e.target.value.length <= 250 && setText(e.target.value)}
                                                placeholder={t('write')}
                                                type='text'
                                            />
                                            <button disabled={sendMessageLoading || text.length < 2} htmltype='submit'>
                                                <PaperPlaneSvg/>
                                            </button>
                                        </form>
                                    </StreamChatBlockForm>

                                }

                            </StreamChatBlock>

                            <>
                                {
                                    announcementList && announcementList.length > 0 &&
                                    announcementList.map((item, key) =>
                                        <AnnouncementSection data={item} key={key} setCurrentSchedule={setCurrentSchedule}/>
                                    )
                                }
                            </>
                        </Col>
                    </Row>
                </StreamPageSection>
            </Container>
        </Block>
    )
}