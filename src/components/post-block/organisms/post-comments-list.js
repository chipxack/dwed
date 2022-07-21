import React, {useEffect, useState} from 'react'
import tape from '../../../service/tape'
import {Link} from 'react-router-dom'
import {PostCommentItem, PostCommentItemBody, PostCommentsBlock,} from '../atoms'
import {Col, Row} from 'antd'
import {PostBottomBlock} from '../molecules'


export const PostCommentsList = ({id, newComment}) => {
    const [list, setList] = useState([])
    const [offset] = useState(0)
    const [nextSource, setNextSource] = useState(undefined)


    useEffect(() => {
        if (id) {
            const params = {
                offset,
                limit: 10
            }
            tape.getCommentsPost(id, params)
                .then(response => {
                    if (response.status === 200) {
                        // console.log(response.data);
                        offset === 0 ?
                            setList([...response.data.results]) :
                            setList([...list, ...response.data.results])
                        setNextSource(response.data.next)
                    }
                })
                .catch(error => console.error(error.response))
        }
    }, [id, offset])

    useEffect(() => {
        if (newComment) {
            console.log("newComment", newComment);
            setList([...list, newComment])
        }
    }, [newComment])

    return (
        <PostCommentsBlock>
            {
                list && list.length > 0 &&
                list.map(item =>
                    <PostCommentItem key={item.id}>
                        <img src={item.author.avatar} alt={item.author.name}/>
                        <Row style={{flex: 1}}>
                            <Col span={24}>
                                <PostCommentItemBody>
                                    <Link
                                        to={`/${item.author.type === 'user' ? '@' : ''}${item.author.slug_name}/tape`}
                                    >
                                        {item.author.name}
                                    </Link>
                                    {item.text}
                                </PostCommentItemBody>
                            </Col>
                            <Col span={24}>
                                <PostBottomBlock postId={id} data={item}/>
                            </Col>

                        </Row>

                    </PostCommentItem>
                )
            }
        </PostCommentsBlock>
    )
}