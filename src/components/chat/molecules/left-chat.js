import React, {useEffect} from 'react'
import {ChatLeftText, ChatMessage, ChatUploadImage, ChatUserMessageBlock} from '../atoms'
import {useInView} from 'react-intersection-observer'
import Moment from 'react-moment'
import {Progress} from 'antd'

export const LeftChat = ({data, setReplyMessage, name, image, sendMessage}) => {
    const {ref, inView, entry} = useInView({
        threshold: 0.25,
        delay: 300
    })


    useEffect(() => {
        if (inView && !data.is_read) {
            const params = {
                action: 'read',
                message_id: data.id
            }
            sendMessage(JSON.stringify(params))
        }
    }, [entry, inView])

    return (
        <ChatLeftText
            className={'chat-item'}
            ref={ref}
            key={data.id}
            data-id={data.id}
        >
            {/*{*/}
            {/*    name*/}
            {/*}*/}
            <ChatUserMessageBlock>
                {/*{*/}
                {/*    image*/}
                {/*}*/}
                {
                    data.file ?
                        <ChatUploadImage>
                            {
                                data.loading &&
                                <Progress type='circle' percent={data.loadingPercent} width={80}/>
                            }
                            <div className={data.loading ? 'blur-effect' : undefined}>
                                <img src={data.file} alt={data.sender.username}/>
                            </div>
                        </ChatUploadImage> :
                        <ChatMessage>
                            {
                                data.reply_to &&
                                <div>
                                    <span>{data.reply_to.sender.full_name}</span>
                                    <span>{data.reply_to.text}</span>
                                </div>
                            }
                            <span>
                                    {data.text}
                                </span>
                        </ChatMessage>
                }

                {/*<ChatMessage>*/}
                {/*    {*/}
                {/*        data.reply_to &&*/}
                {/*        <div>*/}
                {/*            /!*<span>{data.reply_to.sender && data.reply_to.sender.full_name}</span>*!/*/}
                {/*            <span>{data.reply_to.text}</span>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*    <span>*/}
                {/*        {data.text}*/}
                {/*    </span>*/}
                {/*</ChatMessage>*/}

                <span style={{display: 'flex', alignItems: 'flex-end'}}>
                    <Moment format='hh:mm'>
                        {data.date}
                    </Moment>
                    {/*<Reply onClick={() => setReplyMessage(data)}>*/}
                    {/*    <UndoSvg/>*/}
                    {/*</Reply>*/}
                </span>
            </ChatUserMessageBlock>
        </ChatLeftText>
    )
}