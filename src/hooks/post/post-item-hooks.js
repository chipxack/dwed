import React, {useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$accountModel} from "../../models/accountModel";
import {TapeFormImageBlock} from "../../components/post-block/atoms";
import tape from "../../service/tape";
import {getTapeListEvent} from "../../models/tape";


export const PostItemHooks = (data, removePost) => {
    const [media, setMedia] = useState([])
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [more, setMore] = useState(true);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [newData, setNewData] = useState(undefined);
    const accountModel = useStore($accountModel)
    const profileSlugName = accountModel.$profiles && accountModel.$profiles.currentProfile && accountModel.$profiles.currentProfile.slug_name

    const dataAuthorInfo = data && data.author
    const authorInfo = newData && newData.author
    const authorName = dataAuthorInfo && dataAuthorInfo.name
    const actionData = newData && newData.action
    const actionOrgData = actionData && actionData.data && actionData.data.new_specialism && actionData.data.new_specialism.org
    const streamSchedule = newData && newData.stream_schedule


    useEffect(() => {
        if (data) {
            setLiked(data.is_liked)
            setLikesCount(data.likes_count)
            setNewData(data)
        }
    }, [data]);


    useEffect(() => {
        if (newData && newData.medias && newData.medias.length > 0) {
            const dataArr = newData.medias.map(item => ({
                renderItem: () =>
                    <TapeFormImageBlock>
                        {
                            item.thumbnail ?
                                <><img className={'back'} src={item.thumbnail} alt={'slide'}/> <img src={item.thumbnail} alt={'slide'}/></> :
                                item.file && <video controls='false' src={item.file}/>

                        }
                    </TapeFormImageBlock>,
                renderLeftNav(onClick, disabled) {
                    return (
                        <button
                            className='image-gallery-custom-left-nav llll'
                            disabled={disabled}
                            onClick={onClick}/>
                    )
                },
                renderRightNav(onClick, disabled) {
                    return (
                        <button
                            className='image-gallery-custom-right-nav rrrr'
                            disabled={disabled}
                            onClick={onClick}/>
                    )
                }
            }))
            setMedia(dataArr)
        } else if (newData && newData.repost && newData.repost.medias && newData.repost.medias.length > 0) {
            const dataArr = newData.repost.medias.map(item => ({
                renderItem: () =>
                    <TapeFormImageBlock>
                        {
                            item.thumbnail ?
                                <img src={item.thumbnail} alt={'slide'}/> :
                                item.file && <video controls='false' src={item.file}/>

                        }
                    </TapeFormImageBlock>,
                renderLeftNav(onClick, disabled) {
                    return (
                        <button
                            className='image-gallery-custom-left-nav llll'
                            disabled={disabled}
                            onClick={onClick}/>
                    )
                },
                renderRightNav(onClick, disabled) {
                    return (
                        <button
                            className='image-gallery-custom-right-nav rrrr'
                            disabled={disabled}
                            onClick={onClick}/>
                    )
                }
            }))
            setMedia(dataArr)
        } else {
            setMedia([])
        }
    }, [newData])
    // console.log('data', data)

    const repost = (e) => {
        e.preventDefault()
        console.log('data', data)
        if (data && data.id) {
            const dataRes = {
                text: text && text.length > 0 ? text : undefined,
                repost_id: data.id
            }
            setLoading(true)
            tape.createPost(undefined, {...dataRes})
                .then(response => {
                    if (response.status === 201) {
                        setLoading(false)
                        setVisible(false)
                        const params = {
                            limit: 10,
                            offset: 0,
                        }
                        getTapeListEvent(params)
                    }
                })
                .catch(error => {
                    console.error(error.response)
                    setLoading(false)
                    setVisible(false)
                })
        }

    }

    const changePostLike = () => {
        liked ?
            tape.deletePostLike(data.id)
                .then(response => {
                    if (response.status === 204) {
                        setLiked(false)
                        setLikesCount(likesCount - 1)
                    }
                })
                .catch(error => console.error(error.response)) :
            tape.postLike(data.id)
                .then(response => {
                    if (response.status === 201) {
                        setLiked(true)
                        setLikesCount(likesCount + 1)
                    }
                })
                .catch(error => console.error(error.response))
    }

    const deleteMyPost = () => {
        tape.deletePost(data.id)
            .then(response => {
                if (response.status === 204) {
                    setPopoverVisible(false)
                    removePost(data.id)
                }
            })
            .catch(error => console.error(error.response))
    }

    return {
        deleteMyPost,
        changePostLike,
        repost,
        commentsVisible,
        setCommentsVisible,
        liked,
        likesCount,
        setVisible,
        streamSchedule,
        more,
        setMore,
        authorInfo,
        actionOrgData,
        actionData,
        authorName,
        loading,
        popoverVisible,
        setPopoverVisible,
        media,
        profileSlugName,
        visible,
        text,
        setText,
        newData,
        dataAuthorInfo
    }

}