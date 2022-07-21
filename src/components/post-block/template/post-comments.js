import React, {useState} from "react";
import {SmileSvg} from "../../../media";
import {PostCommentsSection} from "../atoms";
import tape from "../../../service/tape";
import {PostCommentsList} from "../organisms";
import {useTranslation} from "react-i18next";
import {toggleAuthModal} from "../../../models/widgets";
import {useStore} from "effector-react";
import {$appModel} from "../../../models/app";


export const PostComments = ({id, replyId, status}) => {
    const {t} = useTranslation()
    const {$app: {token}} = useStore($appModel)

    const [commentText, setCommentText] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [newComment, setNewComment] = useState(undefined)

    const commentSubmit = (e) => {
        e.preventDefault()
        const data = {
            post_id: id,
            text: commentText,
            reply_to: replyId
        }
        setLoading(true)
        tape.sendCommentToPost(data)
            .then(response => {
                if (response.status === 201) {
                    setNewComment(response.data)
                    setLoading(false)
                    setCommentText('')
                }
            })
            .catch(error => {
                setLoading(false)
                console.error(error.response)
            })
    }

    return (
        status &&
        <PostCommentsSection>
            <PostCommentsList newComment={newComment} id={id}/>
            <form onSubmit={(e) => commentSubmit(e)}>
                <label htmlFor="comment">
                    <SmileSvg/>
                    <input
                        onClick={() => !token && toggleAuthModal(true)}
                        id='comment'
                        placeholder={t('write')}
                        onChange={(e) => setCommentText(e.target.value)}
                        value={commentText}
                    />
                    {
                        commentText && commentText.length > 3 &&
                        <button hidden={loading} type='submit'>{t('add')}</button>
                    }
                </label>
            </form>
        </PostCommentsSection>
    )
}