import React from 'react'
import {
  ChatMessage,
  ChatSendMessageBlock,
  ChatUserName,
  ReplyBlock,
  ReplyBlockSection,
  UploadImageLabel
} from '../atoms'
import { SendMessageHooks } from '../../../hooks/chat'
import { Input } from 'antd'
import { CloseSvg, PaperPlaneSvg, UndoSvg } from '../../../media'
import { useTranslation } from 'react-i18next'
import { AttachSvg } from '../../../media/attach'

const {TextArea} = Input


export const ChatSendMessageSection = (props) => {
  const {
    username,
    replyMessage,
    setReplyMessage,
    scrollToBottom,
    groupId
  } = props
  const {t} = useTranslation()
  // const inputRef = useRef(undefined)


  const {
    message,
    sendFunction,
    setMessage,
    sendImage
  } = SendMessageHooks(username || undefined, groupId || undefined, replyMessage, setReplyMessage, scrollToBottom)

  const typingMessage = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendFunction()
    }
  }

  // useEffect(() => {
  //     if (inputRef){
  //         console.log('inputRef.current: ', inputRef)
  //         inputRef?.current?.focus()
  //     }
  // }, [inputRef]);


  return (
    <ChatSendMessageBlock>
      <ReplyBlock status={replyMessage}>
        <UndoSvg />
        {
          replyMessage &&
          <ReplyBlockSection>
            <ChatUserName> {replyMessage.sender.full_name}</ChatUserName>
            <ChatMessage>
              {replyMessage.text}
            </ChatMessage>
          </ReplyBlockSection>
        }
        <CloseSvg onClick={() => setReplyMessage(undefined)} />
      </ReplyBlock>
      {/*<button className='add-files'><PlusSvg/></button>*/}
      <TextArea
        autoFocus
        ref={inputRef => inputRef?.focus()}
        placeholder={t('message')}
        autoSize={{minRows: 1, maxRows: 6}}
        onKeyDown={onEnterPress}
        onChange={typingMessage}
        value={message}
      />
      {/*<textarea*/}
      {/*    placeholder='Сообщение'*/}
      {/*    value={message}*/}
      {/*    onChange={(e) => setMessage(e.target.value)}*/}
      {/*/>*/}
      <UploadImageLabel htmlFor='file'>
        <input onChange={(e) => sendImage(e.target.files[0])} type={'file'} id={'file'} hidden={true} />
        <AttachSvg />
      </UploadImageLabel>
      <button disabled={!message || message.length < 3} type={'submit'} onClick={() => sendFunction()}>
        <PaperPlaneSvg /></button>
    </ChatSendMessageBlock>
  )
}