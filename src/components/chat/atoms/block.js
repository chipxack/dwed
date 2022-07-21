import styled from "styled-components";
import {Menu} from 'antd'
import {DropDownSection, DropDownSectionBlock} from "../../drop-down/atoms";


export const ChatBlock = styled.div`
  display: flex;
  position: fixed;
  left: 18px;
  bottom: 18px;
  z-index: 9999;
`

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: #1DA1F2;
  height: 48px;
  justify-content: flex-end;
  color: #ffffff;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  padding: 0 16px;

  span {
    margin-right: 8px;
  }
`

export const BGChat = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  opacity: ${props => props.status ? 1 : 0};
  visibility: ${props => props.status ? 'visible' : 'hidden'};
  background: transparent;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
`

export const ChatTemplateBlock = styled.div`
  width: 315px;
  min-height: 400px;
  height: calc(100vh - 160px);
  display: ${props => props.status ? 'flex' : 'none'};
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -330px;
  background: #FBFBFB;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.17);
  border-radius: 8px;
  padding: 0;
  transition: .3s;
  flex-direction: column;
  opacity: ${props => props.status ? 1 : 0};
  visibility: ${props => props.status ? 'visible' : 'hidden'};

  .ant-tabs {
    width: 100%;
    overflow: initial;
    //height: calc(100% - 60px);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px 0;

    &-content {
      height: 100%;

      &-holder {
        flex: 1;
        //overflow: hidden;
      }
    }

    &-tab {
      margin: 0 16px 0 16px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.25px;
      color: #2C2C2E;

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }

      &-active {
        color: #1DA1F2;
      }
    }

    &-nav {
      width: calc(100% - 32px);
      display: flex;
      flex-direction: column;
      margin: 0 16px 16px;

      & > div {
        width: 100%;
        display: flex;
      }
    }

    &-bar {
      border-bottom: none;
    }

    &-ink {
      &-bar {
        border-radius: 4px;
        height: 3px;
        background-color: #1DA1F2;
        //position: relative;
        margin-bottom: 10px;

        //&:before {
        //  position: absolute;
        //  content: '';
        //  bottom: -5px;
        //  left: calc(50% - 5px);
        //  display: block;
        //  width: 0;
        //  height: 0;
        //  border-right: 5px solid transparent;
        //  border-left: 5px solid transparent;
        //  border-top: 5px solid #1DA1F2;
        //}
      }
    }
  }
`

export const ChatTemplateBlockTitle = styled.div`
  letter-spacing: 0.5px;
  color: #2C2C2E;
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 32px;
  margin: 16px 16px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 32px;
    height: 32px;
    padding: 0;
    color: #2C2C2E;
    background: transparent;
    box-shadow: none;

    &:hover {
      color: #1DA1F2;
      background: transparent;
    }
  }
`

export const AllChatsSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  //height: 60vh;
`

export const ChatUserBlockList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: scroll;
  overflow-x: hidden;
  width: calc(100% + 18px);
  margin-right: -18px;
  padding-right: 18px;

  .scroll-chat {
    width: 100%;
  }

  //.scroll-chat {
  //  width: 100%;
  //  display: flex;
  //  flex-direction: column-reverse;
  //  height: min-content;
  //}
`

export const ChatUserBlock = styled.div`
  width: calc(100% - 32px);
  display: flex;
  height: 72px;
  background: #FFFFFF;
  box-shadow: ${props => props.checked ? '0 1px 8px' : '0 0 0'} rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 16px 16px;
  align-items: center;
  padding: 8px;
  border-right: 3px solid ${props => props.checked ? '#1DA1F2' : 'transparent'};
  transition: .3s;
  position: relative;
  overflow: hidden;
  justify-content: space-between;

  // &:before {
  //   background: #1DA1F2;
    //   transform: ${props => props.checked ? 'translateX(-13px) rotate(-45deg)' : 'translateX(0) rotate(-45deg)'};
  //   width: 15px;
  //   height: 15px;
  //   position: absolute;
  //   right: -22px;
  //   top: calc(50% - 7.5px);
  //   content: '';
  //   display: block;
  //   transition: .3s;
  // }

  &:hover {
    cursor: pointer;
    border-color: #1DA1F2;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);

    &:before {
      transform: translateX(-13px) rotate(-45deg);
    }
  }


  span.avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 18px 0 0;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    overflow: hidden;
    font-size: 28px;
  }
`

export const ChatUserBlockHeader = styled.div`
  display: inline-flex;
  align-items: center;

`

export const ChatUserAvatarBlock = styled.div`
  display: flex;
  position: relative;

  img {
    width: 54px;
    height: 54px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 18px;
  }

  span {
    background: #34C759;
    border: 2px solid #FFFFFF;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    left: 38px;
    bottom: 2px;
    transition: .3s;
    opacity: ${props => props.status ? 1 : 0};
    transform: scale(${props => props.status ? 1 : 0});
  }
`

export const ChatUserTitleBlock = styled.div`
  flex: 1;

  div {
    letter-spacing: 0.25px;
    color: #2C2C2E;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    letter-spacing: 0.4px;
    color: #8E8E93;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`

export const ChatUserBlockDate = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`

export const ChatListSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 860px;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.17);
  border-radius: 8px;
  position: absolute;
  right: -864px;
  transform: translateX(${props => props.status ? '0' : '-4px'});
  opacity: ${props => props.status ? '1' : '0'};
  transition: .3s;
  top: 0;
  visibility: ${props => props.status ? 'visible' : 'hidden'};
`

export const ChatListSectionHeader = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px 8px 0 0;
  justify-content: space-between;
  position: relative;

  button {
    width: 32px;
    height: 32px;
    padding: 0;
    color: #2C2C2E;
    background: transparent;
    box-shadow: none;
    margin-right: 20px;

    &:hover {
      color: #1DA1F2;
      background: transparent;
    }
  }
`

export const ChatListSectionHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    font-size: 28px;
    justify-content: center;

    span {
      letter-spacing: 0.25px;
      color: #2C2C2E;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;

      &:nth-child(2) {
        color: #8E8E93;
        letter-spacing: 0.4px;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin: 0 16px 0 36px;
  }


`
export const Reply = styled.div`
  display: inline-flex;
  //position: absolute;
  opacity: 0;
  transition: .3s;
  bottom: 0;

  &:hover, &:focus {
    cursor: pointer;
  }
`

export const ChatUserMessageBlock = styled.div`
  display: inline-flex;
  position: relative;
  align-items: flex-end;
  //max-width: 50%;

  span {
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    margin-left: 8px;
    color: #A9A9A9;
  }

  &:hover {
      // ${Reply} {
    //   opacity: 1;
    // }

    ${DropDownSection} {
      opacity: 1;
    }
  }
`


export const ChatImageBlock = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: -44px;
  //background: #E9E9E9;
  border-radius: 50% 0 0 50%;
  z-index: -1;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin-right: 20px;
  }
`

export const ChatMessage = styled.div`
  display: inline-flex;
  min-height: 40px;
  background: #E9E9E9;
  border-radius: 16px;
  padding: 10px 0;
  align-items: center;
  flex-direction: column;
  white-space: pre-wrap;
  max-width: 100%;
  word-wrap: break-word;

  & > span {
    color: #2C2C2E;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    padding: 0 12px;
    width: 100%;
    margin-right: 0 !important;
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 0 20px 15px 12px;
    width: 100%;
    margin-bottom: 7px;

    span {
      &:nth-child(1) {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.25px;
        //color: #FFFFFF;
      }

      &:nth-child(2) {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.25px;
        //color: #FFFFFF;
      }
    }
  }
`

export const ChatUserName = styled.div`
  display: inline-flex;
  margin: 0 0 8px 36px;
  letter-spacing: 0.25px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
`

export const ChatLeftText = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;

  ${ChatUserMessageBlock} {
    margin: 0 0 15px 24px;
  }

  ${ChatMessage} {
    div {
      border-bottom: 1px solid rgba(72, 72, 72, 0.1);

      span {
        color: #484848;
      }
    }
  }
`

export const ChatRightText = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  //z-index: 1;

  ${ChatUserName} {
    margin: 0 36px 8px 0;
  }

  ${ChatMessage} {
    background: #1DA1F2;

    & > span {
      color: #ffffff;
    }

    div {
      border-bottom: 1px solid rgba(243, 243, 243, 0.24);

      span {
        color: #ffffff;
      }
    }
  }

  ${ChatUserMessageBlock} {
    margin: 0 24px 15px 24px;

    span {
      margin-left: initial;
      margin-right: 8px;
    }
  }

  ${ChatImageBlock} {
    left: initial;
    right: -44px;

    img {
      margin-right: initial;
      margin-left: 20px;
    }
  }
`

export const ChatMessageBlock = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;

  .scroll-chat {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    height: min-content;
    .chat-item{
      &:last-child{
        margin-top: 20px;
      }
    }
  }

  ${DropDownSectionBlock} {
    z-index: 2;
  }
`


export const ChatSendMessageBlock = styled.form`
  min-height: 60px;
  background: #F9F9F9;
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  textarea {
    flex: 1;
    min-height: 25px;
    max-height: 80px;
    background: #F9F9F9;
    border: none;
    letter-spacing: 0.4px;
    color: #2C2C2E;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 14px;
    outline: none;
    margin: 10px 0;
    padding: 4px 24px;

    &::placeholder {
      letter-spacing: 0.4px;
      color: #A0A0A0;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 14px;
    }

    &:hover, &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }

  .add-files {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1DA1F2;
    font-size: 18px;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    margin: 0 0 0 14px;
  }

  button {
    background: transparent;
    border: none;
    box-shadow: none;
    outline: none;
    color: #1DA1F2;
    width: 24px;
    height: 24px;
    margin-right: 20px;
    padding: 0;
    transition: .3s;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      color: #2c2c2e;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
`

export const ReplyBlock = styled.div`
  display: flex;
  position: absolute;
  bottom: 92px;
  background: #FAFAFA;
  border-radius: 8px;
  width: calc(100% - 24px);
  z-index: 1;
  margin: 0 12px;
  padding: 10px 18px;
  justify-content: space-between;
  align-items: center;
  visibility: ${props => props.status ? 'visible' : 'hidden'};
  opacity: ${props => props.status ? '1' : '0'};
  transform: ${props => props.status ? 'translateY(0px)' : 'translateY(10px)'};
  transition: .3s;
`

export const ReplyBlockSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 30px;

  ${ChatUserName} {
    margin: 0 0 2px;
  }

  ${ChatMessage} {
    background: transparent;
    padding: 0;
  }
`

export const ChatMenu = styled(Menu)`
  padding: 16px;
  //z-index: 9;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }

  &.ant-menu-vertical {

    & > .ant-menu-item {
      height: 20px;
      line-height: initial;
    }

    .ant-menu-item {
      margin-bottom: 8px;
      padding: 0;
      margin-top: 0;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      span {
        display: inline-flex;
        align-items: center;
        letter-spacing: 0.25px;
        color: #2C2C2E;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        margin-right: 0;
      }

    }
  }


`

export const CreateGroupUserList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 24px;
  overflow: auto;
`

export const CreateGroupUserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 6px;
  border-radius: 8px;
  margin-bottom: 16px;
  background: ${props => props.status ? '#E9E9E9' : 'transparent'};

  img {
    width: 64px;
    height: 64px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 32px;
  }

  span {
    color: #2C2C2E;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
  }
`

export const ChatGroupSection = styled.div`
  button {
    margin-top: 16px;
  }
`

export const ChatUsersList = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
`

export const NewChatUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }

  h1 {
    color: #2C2C2E;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    margin: 8px 0 0;
    text-align: center;
  }

`

export const ChatNotificationBlock = styled.div`
  display: inline-flex;
  background: ${props => props.type && props.type === 'error' ? '#FF0000' : props.type === 'warning' ? '#FFAE00' : props.type === 'success' ? '#1DA1F2' : '#ffffff'};
  position: absolute;
  top: 70px;
  transition: .3s;
  left: 50%;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateX(-50%) translateY(${props => props.visible ? '5px' : '0px'});
  border-radius: 8px;
  right: 0;
  min-height: 40px;
  z-index: 1;
  padding: 10px 12px;
  color: ${props => !props.type ? '#2C2C2E' : '#ffffff'};
  border: 1px solid ${props => !props.type ? '#EAEAEA' : 'transparent'};

  .close-svg {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`

export const NotificationDeleteBlock = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 10px;
    display: flex;
    border-bottom: 1px solid #EAEAEA;
  }

  div {
    margin-top: 10px;
    display: flex;
  }

  button {
    width: initial;
  }
`

export const SearchUsersBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  width: 100%;
  margin-bottom: 20px;
`

export const ChatUploadImage = styled.div`
  display: flex;
  position: relative;

  .ant-progress {
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    z-index: 1;
  }
  img {
    max-width: 304px;
    border-radius: 5px;
    object-fit: contain;
    height: 200px;
  }

  .blur-effect {
    img{
      filter: blur(2px);
    }
  }

`

export const UploadImageLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  svg{
    width: 25px;
    height: 25px;
  }
`