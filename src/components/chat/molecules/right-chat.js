import {ChatMenu, ChatMessage, ChatRightText, ChatUploadImage, ChatUserMessageBlock} from "../atoms";
import {AllCheckLineSvg, CheckLineSvg} from "../../../media";
import Moment from "react-moment";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {DropDownSystem} from "../../drop-down";
import chat from "../../../service/chat";
import {ClockSvg} from "../../../media/clock";
import {Progress} from "antd";


export const RightChat = ({data, setReplyMessage, checkedUser, openNotification}) => {
    const {t} = useTranslation()
    const [visible, setVisible] = useState(false);

    const removeMessage = (params) => {
        chat.deleteUserMessage(checkedUser, data.id, params)
            .then(response => {
                if (response.status === 204) {
                    setVisible(false)
                }
            })
            .catch(error => console.error(error.response))
    }

    const replyMessage = () => {
        setVisible(false)
        setReplyMessage(data)
    }

    const menu = (
        <ChatMenu>
            <ChatMenu.Item onClick={() => setReplyMessage(data)} key="1">
                <span>{t('pin_it')}</span>
            </ChatMenu.Item>
            <ChatMenu.Item onClick={() => replyMessage()} key="2">
                <span>{t('reply')}</span>
            </ChatMenu.Item>
            <ChatMenu.Item onClick={() => openNotification('delete', data, removeMessage, setVisible)} key="3">
                <span>{t('delete_message')}</span>
            </ChatMenu.Item>
        </ChatMenu>
    );


    return (
        <ChatRightText
            className={'chat-item'}
            onMouseLeave={() => setVisible(false)}
            key={data.id}
        >
            <DropDownSystem
                // style={{width: '100%', flexDirection: 'column'}}
                visible={visible}
                overlay={menu}
                trigger={['click']}
                placement="bottomRight"
                changeVisible={setVisible}
            >
                {/*{*/}
                {/*    name*/}
                {/*}*/}
                <ChatUserMessageBlock>
                    {/*{*/}
                    {/*    image*/}
                    {/*}*/}
                    <span style={{display: 'flex', alignItems: 'flex-end'}}>
                        {/*<DropDownSystem overlay={menu} trigger={['click']} placement="bottomRight">*/}
                        {/*    <ButtonUi><MoreVerticalSvg/></ButtonUi>*/}
                        {/*</DropDownSystem>*/}
                        {/*<Reply onClick={() => setReplyMessage(data)}>*/}
                        {/*    <UndoSvg/>*/}
                        {/*</Reply>*/}
                        <Moment format="hh:mm">
                            {data.date}
                        </Moment>
                            {
                                data.loading ?
                                    <ClockSvg/> :
                                    data.is_read ?
                                        <AllCheckLineSvg/> : <CheckLineSvg/>
                            }
                    </span>
                    {
                        data.file ?
                            <ChatUploadImage>
                                {
                                    data.loading &&
                                        <Progress type="circle" percent={data.loadingPercent} width={80} />
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

                </ChatUserMessageBlock>
            </DropDownSystem>
        </ChatRightText>

    )
}