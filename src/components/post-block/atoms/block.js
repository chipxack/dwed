import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonUI } from "../../../ui/atoms";

export const PostBottomItem = styled.div`
  display: flex;
  margin-right: 16px;
  color: #7F92A0;
  font-size: 16px;
  line-height: 19px;
  justify-content: center;
  align-items: center;

  span{
    margin-right: 3px;
  }
  
  svg {
    color: ${props => props.status ? 'red' : 'currentColor'};
    margin-right: 8px;
  }
`

export const AuthJobBlock = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: -20px;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: flex-end;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    transform: translateX(25px);

    &.small-image {
      width: 124px;
      height: 124px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      transform: translateX(-25px);
    }
  }
`

export const AuthJobBody = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  margin-top: 20px;
`

export const ChangeAvatar = styled.div`
  display: flex;
  height: 272px;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 192px;
    height: 192px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    border: 10px solid white;
    position: absolute;
    left: calc(50% - 159px);

    &:nth-child(2) {
      width: 220px;
      height: 220px;
      left: calc(50% - 60px);
      z-index: 1;
    }
  }
`

export const ChangeDuty = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & > h1 {
    color: #2C2C2E;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: var(--medium-text);
    font-size: 18px;
    line-height: 23px;
    padding: 0 24px;
    margin: 0 0 10px;
  }
`

export const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  time {
    color: #8E8E93;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 14px;
  }

  h1 {
    color: #000000;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    margin-bottom: 20px;
  }
`

export const PostBodyDescription = styled.div`
  letter-spacing: 0.4px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  white-space: pre-line;
  display: flex;
  line-height: 19px;
  color: #262626;

  span {
    margin-bottom: 16px;
    &.more{
      margin-left: 5px;
      color: #1DA1F2;
      &:hover, &:focus{
        cursor: pointer;
      }
    }
  }

`

export const PostBottom = styled.div`
  display: flex;
  width: 100%;
  //margin-top: 16px;
  align-items: center;
  justify-content: flex-start;
  //height: 48px;
  //border-top: 1px solid #F2F2F2;
  padding: 0 12px;
  margin-bottom: 12px;
`

export const ButtonsBottom = styled.div`
  display: flex;
  width: 100%;
  //margin-top: 16px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #F2F2F2;
  height: 48px;

  ${PostBottomItem} {
    width: 100%;
    margin-right: 0;
    &:hover, &:focus{
      cursor: pointer;
    }
    svg {
      margin-right: 12px;
    }
  }
`

export const PostBottomBorder = styled.div`
  display: flex;
  width: calc(100% - 32px);
  margin: 0 16px 16px;
  height: 1px;
  background: #F0F0F0;
`
export const PostEditContent = styled.div`
  display: flex;
  padding: 16px 24px;
  background: #FFFFFF;
  box-shadow: 0 2px 9px rgba(165, 165, 165, 0.25);
  border-radius: 4px;
  flex-direction: column;

  button {
    height: 24px;
    margin-bottom: 10px;
    border: none;
    box-shadow: none;
    outline: none;
    display: inline-flex;
    align-items: center;

    &:last-child {
      margin: 0;
    }
  }
`
export const PostHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  padding: 0 16px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    //margin-left: 10px;
    margin-right: 12px;
  }
`

export const PostHeaderLeft = styled(Link)`
  display: flex;
  height: 100%;
`

export const PostHeaderName = styled.div`
  display: inline-flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;

  h1 {
    color: currentColor;
    letter-spacing: 0.4px;
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
    margin: 0 14px 0 0;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  b {
    margin: 0;
    padding: 0;
    font-family: var(--medium-text);
    font-size: 16px;
    line-height: 19px;
    display: inline-flex;
    align-items: center;

    time {
      font-size: 14px;
      line-height: 17px;
      font-family: var(--regular-text);
      color: #7F92A0;
      font-weight: normal;
    }

    div {
      width: 3px;
      height: 3px;
      background: #262626;
      border-radius: 50%;
      margin: 0 8px;
    }
  }

  span {
    color: #7F92A0;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;

    b {
      color: #2C2C2E;
      margin: 0 6px;
    }
  }
`
export const PostHeaderRight = styled.div`
  display: inline-flex;
  align-items: center;
  color: #231F20;

  time {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #939393;
  }

  button {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    box-shadow: none;
    outline: none;
    margin-left: 16px;
  }


`

export const PostItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => props.fluid ? '100%' : '700px'};
  width: 100%;
  margin: 0 auto 18px;
  padding: 15px 0 0;
  background: #FFFFFF;
  //box-shadow: 0 2px 10px #F2F2F2;
  border-radius: 6px;
  border: 1px solid #F2F2F2;
`

export const ScheduleGallery = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 16px;

  h3 {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 16px 24px;
    height: 36px;
    background: #FFFFFF;
    border-radius: 4px;
    color: #2C2C2E;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: var(--medium-text);
    font-size: 18px;
    line-height: 16px;
    padding: 0 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-size: cover;
    backdrop-filter: blur(10px);
  }

  img {
    width: 100%;
    height: 410px;
    object-fit: cover;
  }

  & > span {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
      height: 410px;
      object-fit: contain;
    }
  }
`
export const TapeForm = styled.form`
  .image {
    &-gallery {
      margin-bottom: 24px;

      &-thumbnail {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        background: rgba(196, 196, 196, 0.54);

        &.active {
          background: rgba(196, 196, 196);
        }

        & + .image-gallery-thumbnail {
          margin-left: 8px;
        }
      }

      &-thumbnails {
        &-wrapper {
          position: absolute;
          bottom: 0;
          width: 100%;
          z-index: 1;
        }
      }
    }
  }

  .nav {
    &-buttons {
      position: absolute;
      z-index: 1;
      background: transparent;
      color: #2E3A59;
      border: none;
      box-shadow: none;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`

export const TapeFormFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  .ant-checkbox {

  }
`

export const TapeFormImageBlock = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;

  img, video {
    width: 100%;
    height: ${props => props.width ? props.width + 'px' : 'initial'};
    object-fit: contain;
    border-radius: ${props => props.width ? 5 : 0}px;
    max-height: 500px;
    &.back{
      position: absolute;
      z-index: -1;
      object-fit: cover;
      filter: blur(2px);
    }
  }

  .ant-progress {
    position: absolute;
    z-index: 1;
  }

  
`

export const TapeFormActionBlock = styled.div`
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  justify-content: center;
  align-items: center;
  
  ${ButtonUI} {
    //padding: 0 24px;
    height: 24px;
    background-color: #FFFFFF;
    color: #1DA1F2;
    letter-spacing: 0.4px;
    font-size: 18px;
    line-height: 16px;
    border: none;
    width: 24px;
    padding: 0;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    display: flex;
    
    &.trash{
      margin-left: 8px;
      color: #FF5A5F;
    }
  }
`

export const PostCommentsSection = styled.div`
  display: flex;
  width: 100%;
  //margin-top: 16px;
  flex-direction: column;
  padding: 0 16px 16px;

  form {
    width: 100%;
  }

  label {
    background: #FBFBFB;
    border: 1px solid #F0F1F2;
    border-radius: 8px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    border: none;
    height: 100%;
    flex: 1;
    background: transparent;

    &:hover, &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }

  button {
    color: #1DA1F2;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: var(--medium-text);
    font-size: 14px;
    line-height: 16px;
    margin: 16px 16px 16px 0;
    padding: 0;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  svg {
    margin: 0 16px;
  }
`

export const PostCommentsBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top: 1px solid #D9D9D9;
  padding-top: 16px;
`
export const PostCommentItem = styled.div`
  display: flex;
  margin-bottom: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }


`

export const PostCommentItemBody = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  width: 100%;

  a {
    font-style: normal;
    font-weight: var(--bold-text);
    font-size: 16px;
    line-height: 19px;
    color: #1DA1F2;
    margin-right: 3px;
  }


`

export const PostCommentItemBottom = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;

  time {
    margin: 0;
    color: #999999;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
`

export const LikeComment = styled.div`
  display: flex;
  align-items: center;

  &:hover, &:focus {
    cursor: pointer;
  }

  span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    margin-left: 5px;
  }

  svg {
    margin: 0;
    width: 20px;
    height: 20px;
    color: ${props => props.liked ? '#FF1A1A' : '#999999'}
  }
`

export const ReplyComment = styled.div`
  display: flex;
  color: #1DA1F2;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`

export const FastPost = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  padding: 0 16px;

  background: #FFFFFF;
  box-shadow: 0 2px 10px #F2F2F2;

  button {
    margin: 0 !important;
    height: 40px !important;
    font-size: 16px !important;
    padding: 0 15px !important;
  }

  svg {
    width: 26px;
    height: 26px;
  }

  textarea {
    padding: 14px 0;
    background: transparent;
    font-size: 16px;
    line-height: 21px;
    color: currentColor;
    border: none;
    resize: none;
    font-weight: normal;

    &::placeholder {
      color: rgba(38, 38, 38, 0.5);
      font-size: 16px;
      line-height: 21px;
      font-weight: normal;
    }

    &:hover, &:focus {
      outline: none;
      background: #FFFFFF;
      border: none;
      box-shadow: none;
    }
  }
`

export const FastPostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 16px 0;

  span {
    svg {
      color: rgba(38, 38, 38, 0.5);;
    }
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    box-shadow: none;

    &.upload-button {
      padding: 0 !important;
      width: initial;
    }

    &:hover {
      cursor: pointer;
    }
  }

  ${ButtonUI} {
    height: 50px;
    padding: 0 16px;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-transform: initial;

    &:disabled {
      background: #f2f2f2 !important;
    }
  }
`

export const PostToTapeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0;

  button {
    width: 56px;
    height: 56px;
    padding: 0;
    margin: 0 12px 0;
  }
`

export const TapeFormContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  color: #000000;
  letter-spacing: 0.4px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 16px;
  //padding: 0 16px;

  label {
    padding: 0;
    background: transparent;
    color: #000000;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    box-shadow: none;
    text-transform: initial;
    display: inline-flex;
    align-items: center;
    margin-left: 24px;

    &:hover {
      cursor: pointer;
    }

    svg {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
`

export const AddOfferCategoryList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: scroll;

  div {
    //display: flex;
    //width: 100%;
    //align-items: center;

    svg {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }

    span {
      color: #8E8E93;
      letter-spacing: 0.25px;
      font-style: normal;
      font-weight: var(--medium-text);
      font-size: 14px;
      line-height: 24px;
    }
  }

  button {
    background: transparent;
    padding: 0;
    height: initial;
    color: #8E8E93;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: var(--medium-text);
    font-size: 14px;
    line-height: 24px;
    text-transform: none;

    &:hover, &:focus {
      background: transparent;
      outline: none;

    }
  }
`

export const AddOfferToPostSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const AddPostOfferBlock = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 16px;
    max-height: 370px;
    object-fit: contain;
  }

  h1 {
    color: #2C2C2E;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: var(--medium-text);
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  svg {
    color: ${props => props.status ? '#1DA1F2' : "#636366"};
    width: 24px;
    height: 24px;
  }
`

export const OfferCatBlock = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  height: 24px;

  &:hover, &:focus {
    cursor: pointer;
  }

  span {
    &:first-child {
      font-size: initial;
      display: inline-flex;
      align-items: center;

      img {
        color: ${props => props.status ? '#1DA1F2' : '#272727'};
        width: 24px;
        height: 24px;
        object-fit: cover;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 18px;
      }
    }

    &:last-child {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: 1;
      color: ${props => props.status ? '#1DA1F2' : '#8E8E93'};
      letter-spacing: 0.25px;
      font-style: normal;
      font-weight: var(--medium-text);
      font-size: 14px;
      line-height: 24px;
    }
  }

`

export const OfferSpecBlock = styled.div`
  display: flex;
  height: 50px;
  border-radius: 8px;
  border: 1px solid transparent;
  align-items: center;
  border: 1px solid ${props => props.status ? '#1DA1F2' : 'transparent'};
  padding: 0 8px;

  &:hover, &:focus {
    cursor: pointer;
  }

  img {
    width: 34px;
    height: 34px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 16px;
  }

  h1 {
    color: #2C2C2E;
    letter-spacing: 0.15px;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #8E8E93 !important;
    letter-spacing: 0.4px !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 12px !important;
    line-height: 16px !important;
  }

  div {
    display: inline-flex;
    flex: 1;
    flex-direction: column;
  }

`

export const OfferToPostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  span {
    color: #8E8E93;
    display: inline-flex;
    align-items: center;
    font-weight: 900;
    font-size: 14px;
    line-height: 24px;

    svg {
      margin-right: 12px;
    }
  }
`

export const OfferToPostLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  h1 {
    color: #2C2C2E;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: var(--medium-text);
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 16px;
  }
`

export const PostBodyRepost = styled.div`
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
  width: calc(100% + 32px);
  margin: 10px -16px 0;

  ${PostBody} {
    padding: 0 16px 16px;
  }
`

export const PostButton = styled.div`
  display: inline-flex;
  font-size: 16px;
  line-height: 19px;
  color: #1DA1F2;
  margin-bottom: 20px;
  &:hover, &:focus{
    cursor: pointer;
  }
`

export const PostUploadImage = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 210px;
  width: 100%;
  height: 170px;
  border: 1px dashed #7F92A0;
  background: transparent;
  font-size: 14px;
  line-height: 17px;
  color: #7F92A0;
  border-radius: 5px;
  svg{
    margin-bottom: 8px;
  }
`