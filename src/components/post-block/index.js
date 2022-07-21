import React from 'react'
import Moment from 'react-moment'
import {useStore} from 'effector-react'
import ImageGallery from 'react-image-gallery'
import {
    AuthJobBlock,
    AuthJobBody,
    ButtonsBottom,
    ChangeAvatar,
    ChangeDuty,
    PostBody,
    PostBodyDescription,
    PostBodyRepost,
    PostBottom,
    PostBottomItem,
    PostEditContent,
    PostHeader,
    PostHeaderLeft,
    PostHeaderName,
    PostHeaderRight,
    PostItemBlock,
    ScheduleGallery,
    TapeForm,
    TapeFormFooter,
} from './atoms'
import {
    BgJobSvg,
    ChatSvg,
    ChevronLeftSvg,
    ChevronRightSvg,
    CloseSvg,
    HeartCustomSvg,
    MoreVerticalSvg,
    ShareSvg,
} from '../../media'
import {ButtonUi, GallerySection} from '../../ui/atoms'
import {PostComments} from './template'
import {Button, Popover} from 'antd'
import {useTranslation} from 'react-i18next'
import {ModalCustom} from '../modal/atoms'
import {PostItemHooks} from '../../hooks/post'
import {TextAreaSystem} from "../../ui/molecules"
import { $appModel } from '../../models/app'
import {toggleAuthModal} from "../../models/widgets";




export const PostItem = ({data, fluid, removePost, setVisible: openPostModal}) => {
    const {t} = useTranslation()
    const {$app: {token}} = useStore($appModel)



    const {
        deleteMyPost,
        changePostLike,
        repost,
        commentsVisible,
        likesCount,
        setVisible,
        setCommentsVisible,
        streamSchedule,
        setMore,
        more,
        authorInfo,
        actionOrgData,
        actionData,
        authorName,
        setPopoverVisible,
        media,
        popoverVisible,
        loading,
        text,
        setText,
        visible,
        profileSlugName,
        newData,
        dataAuthorInfo,
        liked
    } = PostItemHooks(data, removePost)


    const closePopover = () => {
        setPopoverVisible(false)
        openPostModal(newData)
    }

    const Content = () => {
        return (
            <PostEditContent>
                {
                    authorInfo && authorInfo.slug_name && authorInfo.slug_name === profileSlugName &&
                    <Button onClick={() => closePopover()}>{t('edit_post')}</Button>
                }
                {
                    authorInfo && authorInfo.slug_name && authorInfo.slug_name === profileSlugName &&
                    <Button onClick={() => deleteMyPost()}>{t('delete_post')}</Button>
                }

            </PostEditContent>
        )
    }



    return (
        <PostItemBlock fluid={fluid}>
            <ModalCustom
                footer={false}
                closeIcon={<CloseSvg />}
                width={732}
                visible={visible}
                title={t('repost')}
                onCancel={() => setVisible(false)}
            >
                <TapeForm onSubmit={repost}>
                    <TextAreaSystem
                        value={text}
                        onChange={(e) => setText(e)}
                        placeholder={t('message')}
                    />
                    <TapeFormFooter>
                        <div />
                        <ButtonUi
                            disabled={loading}
                            loading={loading}
                            style={{display: 'inline-flex'}}
                            htmlType="submit"
                        >
                            {t('post')}
                        </ButtonUi>
                    </TapeFormFooter>
                </TapeForm>
            </ModalCustom>
            <PostHeader>
                {
                    streamSchedule ?
                        streamSchedule.stream && streamSchedule.stream.logo &&
                        <img src={streamSchedule.stream.logo} alt="avatar" /> :
                        dataAuthorInfo && dataAuthorInfo.avatar &&
                        <img src={dataAuthorInfo.avatar} alt="avatar" />
                }
                <PostHeaderName>
                    <PostHeaderLeft
                        to={
                            streamSchedule ?
                                `/stream/${streamSchedule.stream.channel_slug}`
                                : authorInfo && `/${authorInfo && authorInfo.type !== 'org' ? '@' : ''}${authorInfo.slug_name}/tape`
                        }
                    >
                        <h1>
                            <b>
                                {
                                    streamSchedule ?
                                        streamSchedule.stream && streamSchedule.stream.channel_name :
                                        authorName
                                }
                                <div />
                                <Moment fromNow ago>
                                    {data.date}
                                </Moment>
                            </b>

                            {
                                newData && newData.repost && newData.repost.author ?
                                    <span>
                                        {
                                            t('shared')
                                        }
                                        <b>
                                            {newData.repost.author.name}
                                            <Moment style={{marginLeft: 3}} fromNow ago>
                                                {data.date}
                                            </Moment>
                                        </b>
                                    </span> :
                                    newData && newData.stream_schedule ?
                                        <span>
                                            {t('announcement')}
                                            <b>
                                                <Moment format={`DD.MM.YYYY`}>
                                                    {streamSchedule.date}
                                                </Moment>
                                            </b>
                                            {t('time')}
                                            <b>
                                                <Moment format={`HH:mm`}>
                                                    {streamSchedule.date}
                                                </Moment>
                                            </b>
                                        </span> :
                                        <span>
                                            {newData && newData.author && newData.author.sub_text}
                                            {/*{t('published')}*/}
                                        </span>

                            }
                        </h1>
                        {/*{*/}
                        {/*    streamSchedule &&*/}
                        {/*    <h1>*/}
                        {/*        <Moment format='DD.MM.YYYY, HH:mm'>*/}
                        {/*            {streamSchedule.date}*/}
                        {/*        </Moment>*/}
                        {/*    </h1>*/}
                        {/*}*/}
                    </PostHeaderLeft>
                    <PostHeaderRight>
                        {
                            authorInfo && authorInfo.slug_name && authorInfo.slug_name === profileSlugName &&
                            <Popover
                                content={Content}
                                title={undefined}
                                trigger="click"
                                visible={popoverVisible}
                                onVisibleChange={setPopoverVisible}
                            >
                                <Button> <MoreVerticalSvg /></Button>
                            </Popover>
                        }
                    </PostHeaderRight>

                </PostHeaderName>
            </PostHeader>

            {/*Родное описание поста*/}
            {/*<PostBody>*/}
            {/*    <PostBodyDescription style={{marginBottom: 16}}>*/}
            {/*        {*/}
            {/*            more ? data && data.text && data.text.split(' ', 20).join(' ') : data && data.text*/}
            {/*        }*/}
            {/*    </PostBodyDescription>*/}
            {/*</PostBody>*/}
            {/*<PostBottomBorder/>*/}

            <PostBody>
                {/*<h1>{data.title}</h1>*/}
                <PostBodyDescription>
                    {
                        streamSchedule ?
                            more && streamSchedule.description && streamSchedule.description.length > 20 ?
                                <span>
                                    {streamSchedule.description.split(' ', 20).join(' ')}
                                    <span className='more'
                                          onClick={() => setMore(false)}>{t('more')}</span>
                                </span> : <span>{streamSchedule.description}</span> :
                            more && newData && newData.text && newData.text.length > 20 ?
                                <span>
                                    {newData.text.split(' ', 20).join(' ')}
                                    <span className='more'
                                          onClick={() => setMore(false)}>{t('more')}</span>
                                </span> : newData && <span>{newData.text}</span>
                    }
                </PostBodyDescription>

                {
                    newData && newData.repost &&
                    <PostBodyRepost>
                        {
                            streamSchedule ?
                                <ScheduleGallery img={streamSchedule.image}>
                                    <div />
                                    <img src={streamSchedule.image} alt={streamSchedule.title} />
                                    <span>
                            <h3>{streamSchedule.title}</h3>
                            <img src={streamSchedule.image} alt={streamSchedule.title} />
                        </span>

                                </ScheduleGallery> :
                                newData.repost.medias && newData.repost.medias.length > 0 ?
                                    <GallerySection style={{marginBottom: 16}}>
                                        <ImageGallery
                                            renderLeftNav={(onClick, disabled) =>
                                                <button
                                                    type="button"
                                                    className="image-gallery-left-nav nav-buttons"
                                                    disabled={disabled}
                                                    onClick={onClick}
                                                >
                                                    <ChevronLeftSvg />
                                                </button>
                                            }
                                            renderRightNav={(onClick, disabled) =>
                                                <button
                                                    type="button"
                                                    className="image-gallery-right-nav nav-buttons"
                                                    disabled={disabled}
                                                    onClick={onClick}
                                                >
                                                    <ChevronRightSvg />
                                                </button>
                                            }
                                            items={media}
                                            showPlayButton={false}
                                            showFullscreenButton={false}
                                        />
                                    </GallerySection>
                                    : null
                            // <PostBottomBorder/>

                        }
                        {

                            actionData &&
                            <div>
                                {
                                    actionData.key === 'new_avatar' ?
                                        actionData.data &&
                                        <ChangeAvatar>
                                            <img src={actionData.data.old} alt="old" />
                                            <img src={actionData.data.new} alt="old" />
                                        </ChangeAvatar> :
                                        actionData.key === 'new_duty' &&
                                        <ChangeDuty>
                                            <h1>
                                                {`${authorName} ${actionData.data.new_specialism.job.name}`}
                                            </h1>
                                            <PostHeader>
                                                {
                                                    actionOrgData &&
                                                    <img src={actionOrgData.logo} alt={actionOrgData.name} />
                                                }
                                                <PostHeaderLeft
                                                    to={`/${actionOrgData.slug_name}`}
                                                >
                                                    <h1>
                                                        {
                                                            actionOrgData && actionOrgData.name
                                                        }
                                                        {/*<span>*/}
                                                        {/*    Спорт*/}
                                                        {/*</span>*/}
                                                    </h1>
                                                </PostHeaderLeft>
                                            </PostHeader>
                                            <AuthJobBody>
                                                <BgJobSvg />
                                                <AuthJobBlock>
                                                    {
                                                        authorInfo && authorInfo.avatar &&
                                                        <img src={authorInfo.avatar} alt="avatar" />
                                                    }
                                                    {
                                                        actionOrgData &&
                                                        <img className={'small-image'} src={actionOrgData.logo}
                                                             alt={actionOrgData.name} />
                                                    }
                                                </AuthJobBlock>
                                            </AuthJobBody>

                                        </ChangeDuty>
                                }
                            </div>

                        }
                        <PostBody>
                            {/*<h1>{data.title}</h1>*/}
                            <PostBodyDescription>
                                {
                                    streamSchedule ?
                                        more ?
                                            <span>
                                                {streamSchedule.description.split(' ', 20).join(' ')}
                                                <span className='more'
                                                      onClick={() => setMore(false)}>{t('more')}</span>
                                            </span> :
                                            <span>
                                                {streamSchedule.description}
                                            </span> :
                                        more ? newData.repost.text &&
                                            <span>
                                                {newData.repost.text.split(' ', 20).join(' ')}
                                                <span className='more'
                                                      onClick={() => setMore(false)}>{t('more')}</span>
                                            </span> :
                                            <span>{newData.repost.text}</span>
                                }
                                {/*{*/}
                                {/*    more && streamSchedule ? streamSchedule.description.split(' ').length > 20 && more &&*/}
                                {/*        <span style={{marginLeft: 10, color: '#1DA1F2'}}*/}
                                {/*              onClick={() => setMore(false)}>{t('more')}</span> :*/}
                                {/*        newData.repost.text && newData.repost.text.split(' ').length > 20 &&*/}
                                {/*        <span style={{marginLeft: 10, color: '#1DA1F2'}}*/}
                                {/*              onClick={() => setMore(false)}>{t('more')}</span>*/}
                                {/*}*/}
                            </PostBodyDescription>
                        </PostBody>
                    </PostBodyRepost>
                }
            </PostBody>

            {
                streamSchedule ?
                    <ScheduleGallery img={streamSchedule.image}>
                        <div />
                        <img src={streamSchedule.image} alt={streamSchedule.title} />
                        <span>
                            <h3>{streamSchedule.title}</h3>
                            <img src={streamSchedule.image} alt={streamSchedule.title} />
                        </span>

                    </ScheduleGallery> :
                    newData && newData.medias && newData.medias.length > 0 ?
                        <GallerySection style={{marginBottom: 16}}>
                            <ImageGallery
                                renderLeftNav={(onClick, disabled) =>
                                    <button
                                        type="button"
                                        className="image-gallery-left-nav nav-buttons"
                                        disabled={disabled}
                                        onClick={onClick}
                                    >
                                        <ChevronLeftSvg />
                                    </button>
                                }
                                renderRightNav={(onClick, disabled) =>
                                    <button
                                        type="button"
                                        className="image-gallery-right-nav nav-buttons"
                                        disabled={disabled}
                                        onClick={onClick}
                                    >
                                        <ChevronRightSvg />
                                    </button>
                                }
                                items={media}
                                showPlayButton={false}
                                showFullscreenButton={false}
                            />
                        </GallerySection>
                        : null
                // <PostBottomBorder/>

            }
            {

                actionData &&
                <div>
                    {
                        actionData.key === 'new_avatar' ?
                            actionData.data &&
                            <ChangeAvatar>
                                <img src={actionData.data.old} alt="old" />
                                <img src={actionData.data.new} alt="old" />
                            </ChangeAvatar> :
                            actionData.key === 'new_duty' &&
                            <ChangeDuty>
                                <h1>
                                    {`${authorName} ${actionData.data.new_specialism.job.name}`}
                                </h1>
                                <PostHeader>
                                    {
                                        actionOrgData && <img src={actionOrgData.logo} alt={actionOrgData.name} />
                                    }
                                    <PostHeaderLeft
                                        to={`/${actionOrgData.slug_name}`}
                                    >
                                        <h1>
                                            {
                                                actionOrgData && actionOrgData.name
                                            }
                                            {/*<span>*/}
                                            {/*    Спорт*/}
                                            {/*</span>*/}
                                        </h1>
                                    </PostHeaderLeft>
                                </PostHeader>
                                <AuthJobBody>
                                    <BgJobSvg />
                                    <AuthJobBlock>
                                        {
                                            authorInfo && authorInfo.avatar &&
                                            <img src={authorInfo.avatar} alt="avatar" />
                                        }
                                        {
                                            actionOrgData && <img className={'small-image'} src={actionOrgData.logo}
                                                                  alt={actionOrgData.name} />
                                        }
                                    </AuthJobBlock>
                                </AuthJobBody>

                            </ChangeDuty>
                    }
                </div>

            }
            <PostBottom>
                {
                    likesCount !== 0 &&
                    <PostBottomItem onClick={() => changePostLike()}>
                        <HeartCustomSvg />
                        <span>
                            {likesCount}
                        </span>
                        {t('likes')}
                    </PostBottomItem>
                }
                {
                    data.comments_count !== 0 &&
                    <PostBottomItem onClick={() => setCommentsVisible(!commentsVisible)}>
                        <ChatSvg />
                        <span>
                                {data.comments_count}
                            </span>
                        {t('comments')}
                    </PostBottomItem>
                }
                {
                    data.repost_count !== 0 &&
                    <PostBottomItem onClick={() => setVisible(true)}>
                        <ShareSvg />
                        <span>
                             {
                                 data.repost_count
                             }
                        </span>
                        {t('shares')}
                    </PostBottomItem>
                }

            </PostBottom>
            {
                commentsVisible ?
                    <PostComments id={data.id} status={commentsVisible} /> :
                    <ButtonsBottom>
                        <PostBottomItem status={liked} onClick={() => !token ? toggleAuthModal(true) : changePostLike()}>
                            <HeartCustomSvg/>{t('likes')}
                        </PostBottomItem>
                        <PostBottomItem onClick={() => !token ? toggleAuthModal(true) : setCommentsVisible(!commentsVisible)}>
                            <ChatSvg />{t('comments')}
                        </PostBottomItem>
                        <PostBottomItem onClick={() => !token ? toggleAuthModal(true) : setVisible(true)}>
                            <ShareSvg />{t('shares')}
                        </PostBottomItem>
                    </ButtonsBottom>
            }


        </PostItemBlock>
    )
}
