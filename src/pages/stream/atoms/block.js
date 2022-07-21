import styled from "styled-components";
import {StyledInfiniteScroller} from "../../../ui/atoms";

export const StreamPageSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const StreamUserBlock = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  //height: 40px;
  margin-top: 24px;
`

export const StreamLogoBlock = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: flex-end;

  svg {
    position: absolute;
    z-index: 1;
    color: #FF5A5F;
    width: 36px;
    left: 15px;
    bottom: -4px;
  }

  img {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
    object-fit: cover;
    display: flex;
    border: 2px solid ${props => props.live ? '#FF5A5F' : 'transparent'};
  }
`

export const StreamPlayerBlock = styled.div`
  display: flex;
  margin-top: 24px;
  flex-direction: column;
`

export const StreamChatBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  //min-height: 100%;
  padding: 24px 0;

  & > h1 {
    margin: 0;
    align-items: center;
    font-size: 16px;
    line-height: 19px;
    color: #262626;
    display: flex;
    background: #F8F8F8;
    border-radius: 4px 4px 0 0;
    height: 40px;
    padding: 0 12px;
  }

  button.toggle-chat {
    margin: 0;
    align-items: center;
    font-size: 16px;
    line-height: 19px;
    color: #262626;
    display: flex;
    background: #F8F8F8;
    border-radius: 4px 4px 0 0;
    height: 40px;
    padding: 0 12px;
    border: none;
    outline: none;
    justify-content: space-between;

    &:hover, &:focus {
      cursor: pointer;
    }

    svg {
      transform: rotate(-90deg);
    }

    &.close {
      svg {
        transform: rotate(90deg);
      }
    }
  }
`

export const StreamChatBlockForm = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 10px 0 0;
  position: relative;
  max-height: 50vh;
  background: #FFFFFF;
  border-left: 1px solid #F2F2F2;
  border-right: 1px solid #F2F2F2;
  box-sizing: border-box;
  border-radius: 4px;

  form {
    background: #F8F8F8;
    //height: 47px;
    //width: calc(100% - 24px);
    display: flex;
    align-items: center;
    padding: 14px 18px;
    //margin: 0 12px;
    width: 100%;
    height: 48px;
    background: rgba(242, 242, 242, 0.25);
    border-top: 1px solid #F2F2F2;
    border-bottom: 1px solid #F2F2F2;
    box-sizing: border-box;
    border-radius: 4px;
    color: #7F92A0;

    input {
      background: transparent;
      border: none;
      box-shadow: none;
      outline: none;
      flex: 1;
      letter-spacing: 0.4px;
      font-style: normal;
      font-weight: normal;
      color: currentColor;
      font-size: 14px;
      line-height: 17px;

      &::placeholder {
        color: currentColor;
      }
    }

    button {
      background: transparent;
      border: none;
      box-shadow: none;
      outline: none;
      width: 20px;
      height: 20px;
      padding: 0;
      color: currentColor;

      &:hover {
        cursor: pointer;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`

export const LiveAt = styled.div`
  display: flex;
  position: relative;
  
  div{
    background: #000;
    display: block;
    &.live-bg {
      width: 100%;
      height: 346px;
      object-fit: cover;
    }
  }

  img {
    &.live-bg {
      width: 100%;
      height: 346px;
      object-fit: cover;
    }
  }

  a {
    position: absolute;
    top: 16px;
    left: 16px;
    height: 25px !important;
    display: block;
    z-index: 99;
    width: initial !important;

    img {
      height: 100%;
      width: initial !important;
    }
  }
`

export const StreamChatSection = styled.div`
  display: flex;
  padding: 0 20px;
  overflow: auto;
  overflow-x: hidden;
  flex: 1;
  flex-direction: column-reverse;
  min-height: 300px;

  ${StyledInfiniteScroller} {
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
  }

  //flex-direction: column-reverse;
  //height: 50vh;
`

export const StreamChat = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  //
  //& > div {
  //  display: flex;
  //  align-items: center;
  //
  //  img {
  //    width: 24px;
  //    height: 24px;
  //    object-fit: cover;
  //    border-radius: 50%;
  //    overflow: hidden;
  //    margin-right: 4px;
  //  }
  //
  //  h1 {
  //    color: #2C2C2E;
  //    letter-spacing: 0.15px;
  //    font-style: normal;
  //    font-weight: 900;
  //    font-size: 12px;
  //    line-height: 24px;
  //    margin: 0;
  //  }
  //}
  //
  //span {
  //  color: #8E8E93;
  //  letter-spacing: 0.4px;
  //  font-style: normal;
  //  font-weight: normal;
  //  font-size: 14px;
  //  line-height: 16px;
  //  margin-top: 12px;
  //}
  //
  //time {
  //  color: #8E8E93;
  //  letter-spacing: 0.4px;
  //  font-style: normal;
  //  font-weight: normal;
  //  font-size: 12px;
  //  line-height: 16px;
  //  margin-left: auto;
  //  margin-top: 6px;
  //}
`

export const StreamChatAvatar = styled.div`
  display: flex;

  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 4px;
  }


  div {
    flex: 1;
    display: inline-flex;
    //flex-wrap: wrap;
    //align-items: center;
    font-size: 12px;
    line-height: 14px;
    color: #7F92A0;
    margin-right: 8px;
    flex-direction: column;

    h1 {
      font-size: 12px;
      line-height: 14px;
      color: ${props => props.owner ? '#1DA1F2' : '#7F92A0'};
      display: inline-flex;
      height: 24px;
      align-items: center;
      margin: 0;
    }

    span {
      flex: 1;
      font-size: 12px;
      line-height: 14px;
      color: #262626;
    }
  }
`

export const StreamLiveBlock = styled.div`
  height: 26px;
  width: initial;
  display: inline-flex;
  align-items: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  background: currentColor;
  border-radius: 6px;
  color: #ffffff;
  padding: 0 10px;

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    color: #FFFFFF;
    margin: 0 0 0 8px;
  }
`

export const StreamUserTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;


  h1 {
    color: #2C2C2E;
    margin: 0;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.25px;
    justify-content: space-between;
    align-items: center;
    font-family: var(--medium-text);
    display: inline-flex;
    flex-direction: column;

  }

  div {
    color: #7F92A0;
    font-size: 16px;
    line-height: 19px;
    margin-top: 4px;
    width: 100%;
  }

  & > span {
    font-size: 16px;
    line-height: 19px;
    color: #262626;
    display: inline-flex;
    align-items: center;

    svg {
      margin-right: 2px;
    }
  }
`

export const StreamUserBody = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 17px;
  color: #262626;
  width: 100%;
  border-top: 1px solid #F2F2F2;
  margin-top: 16px;
  padding-top: 16px;
`