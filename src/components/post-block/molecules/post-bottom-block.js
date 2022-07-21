import {
    LikeComment,
    PostCommentItemBottom,
    ReplyComment
} from "../atoms";
import {HeartSvg} from "../../../media";
import {DotUi} from "../../../ui/atoms";
import Moment from "react-moment";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import tape from "../../../service/tape";


export const PostBottomBlock = ({postId, data}) => {
    const {t} = useTranslation()
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (data.likes_count) {
            setLikeCount(data.likes_count)
            setIsLiked(data.is_liked)
        }
    }, [data])

    const LikedComment = () => {
        isLiked ?
            tape.deleteCommentLike(postId, data.id)
                .then(response => {
                    if (response.status === 204) {
                        setLikeCount(likeCount - 1)
                        setIsLiked(false)
                    }
                }) :
            tape.commentLike(postId, data.id)
                .then(response => {
                    if (response.status === 201) {
                        setLikeCount(likeCount + 1)
                        setIsLiked(true)
                    }
                })
    }

    return (
        <PostCommentItemBottom>
            <LikeComment
                onClick={() => LikedComment()}
                liked={isLiked}
            >
                <HeartSvg/><span>{likeCount}</span>
            </LikeComment>
            <DotUi/>
            <ReplyComment>
                {t('reply')}
            </ReplyComment>
            <DotUi/>
            <Moment fromNow ago>
                {data.date}
            </Moment>
        </PostCommentItemBottom>
    )
}