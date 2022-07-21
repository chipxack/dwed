import styled, {keyframes} from 'styled-components'
import {getColor} from '../../helpers'
import {ButtonUi, ButtonUiOutlet} from './button'
import InfiniteScroll from 'react-infinite-scroller'

export const Block = styled.div`
  display: ${props => props.inline ? 'inline-flex' : 'flex'};
  flex-direction: ${props =>
          props.column ? 'column' :
                  props.columnReverse ? 'column-reverse' :
                          props.rowReverse ? 'row-reverse' :
                                  'row'
  };
  flex-wrap: ${props => props.wrapReverse ? 'wrap-reverse' : props.noWrap ? 'nowrap' : 'wrap'};
  justify-content: ${props => props.jContent === 'middle' ?
          'center' : props.jContent === 'start' ?
                  'flex-start' : props.jContent === 'end' ? 'flex-end' : 'flex-start'};
  align-items: ${props => props.aItems === 'middle' ?
          'center' : props.aItems === 'start' ?
                  'flex-start' : props.aItems === 'end' ? 'flex-end' : 'flex-start'};
`

export const SignBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1DA1F2;
  min-height: 100vh;
  padding: 20px 0;
  position: relative;

  .dwed-text {
    position: absolute;
    left: 0;
    bottom: 0;

    img {
      width: 195px;
      height: auto;
    }
  }
`

export const SignFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    color: #fff;
  }

  form {
    background: #FFFFFF;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    width: ${props => props.width ? props.width + 'px' : '432px'};
    padding: 32px 56px 40px;
    margin-top: 80px;
  }
`

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    color: #fff;
    width: 140px;
    height: 160px;
  }

  form {
    background: #FFFFFF;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    width: ${props => props.width ? props.width + 'px' : '432px'};
    padding: 32px;
    margin-top: 50px;
  }
`

export const BottomText = styled.div`
  margin-top: 32px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #FFFFFF;

  a {
    color: #FFFFFF;
    border-bottom: 1px solid #FFFFFF;
  }
`

export const SignButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${ButtonUi} {
    margin-top: 25px;
  }

  ${ButtonUiOutlet} {
    margin-top: 20px;
  }
`

export const SelectBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .ant-select-arrow .anticon > svg {
    width: 12px;
    height: 12px;
    color: var(--grey-basic);
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: unset;
    border-color: #3366FF !important;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input {
    padding: 0 4px !important;
  }

  .ant-select-multiple .ant-select-selection-item {
    min-height: 24px;
    height: 100%;
    align-items: center;
  }

  input {
    margin: 0 !important;
  }

  //& > div{
  //  position: relative;
  //  svg{
  //    position: absolute;
  //    top: 50%;
  //    right: 10px;
  //    transform: translateY(-50%);
  //  }
  //}
  .css-1hwfws3 {
    padding: 0;
  }

  .css-b8ldur-Input {
    display: none;
  }

  .css-1wa3eu0-placeholder, .css-1uccc91-singleValue {
    position: static;
    transform: none;
  }

  .css-1okebmr-indicatorSeparator {
    display: none;
  }

  .css-26l3qy-menu {
    margin: 0;
    box-shadow: none;
  }

  .css-1n7v3ny-option {
    background: #8f9bb314;
  }

  .ant-select {
    &--single {
      height: initial;
      border: none;
    }

    &-selection {
      &-search {
        display: flex;
        align-items: center;
      }

      &-placeholder {
        padding: 0 10px;
        color: var(--grey-basic) !important;
        font-family: var(--regular-text);
      }
    }

    &-selector {
      padding: 4px 12px !important;
      outline: none;
      width: 100%;
      border: 1px solid var(--input-bg) !important;
      border-radius: 4px !important;
      background: #fff;
      font-family: var(--medium-text);
      font-size: 14px;
      line-height: 24px;
      color: var(--dark-basic);
      transition: .3s;
      margin: 0;

      &::placeholder {
        color: var(--grey-basic);
      }

      &:focus {
        border: 1px solid var(--primary-dwed) !important;
        box-shadow: unset !important;
      }

      &:disabled {
        mix-blend-mode: normal;
        opacity: 0.48;
      }
    }
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: unset !important;
  }

  label {
    font-family: var(--demi-text);
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: var(--grey-basic);
    margin-bottom: 8px;
  }
`

export const AvatarUploadSection = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 160px;
  background: #FBFBFB;
  border: 1px dashed #F0F1F2;
  box-sizing: border-box;
  position: relative;

  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    overflow: hidden;
  }

  svg {
    width: 48px;
    height: 48px;
    color: #8E8E93;

    &:nth-child(2) {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 2;
      width: 32px;
      height: 32px;
    }
  }
`

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
`

export const TemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-top: 24px;
  width: 100%;
  background: #FFFFFF;
`

export const TemplateInfoBlock = styled.div`
  background: #FFFFFF;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  min-height: 100%;
  width: 100%;
  display: flex;
  max-width: 960px;
  margin-top: 24px;
`

export const AccountWireframeHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--basic-offset);
`

export const AccountWireframeMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`

export const AccountWireframeContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const TemplateInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--basic-offset);
`

export const LeftInfoBlockWrap = styled.div`
  border-right: 1px solid #F0F1F2;
  min-width: 272px;
  max-width: 272px;
  display: flex;
  flex-direction: column;
  padding: var(--basic-offset);
`

export const ContentInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const InfoImage = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
  overflow: hidden;
  margin: 24px;
  border-radius: 50%;
`
export const InfoTitle = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15px;
  color: #2C2C2E;
  margin-top: 16px;
`
export const InfoSpan = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.4px;
  color: #8E8E93;
  margin-bottom: 24px;
`

export const ContactBtnBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 40px;
    height: 40px;
    background: #E9F5FE;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0;
    margin: 40px 8px;
  }
`

export const LevelsBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 35px;
  width: 100%;
`

export const LevelNumber = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.25px;
  width: 72px;
  color: #3A3A3C;
`

export const SubsBlock = styled.div`
  border-top: 1px solid #F0F1F2;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SubsBlockTitle = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  color: #2C2C2E;
  margin-bottom: 15px;
`

export const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #F0F1F2;
  padding: 0 16px;
  min-height: 56px;

  .ant {
    &-dropdown {
      &-link {
        &.ant-btn {
          background: #1DA1F2;
          border-radius: 4px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          padding: 0;
          outline: none;
          border: none;
          box-shadow: none;

          svg {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
`

export const NavBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 100%;

  a {
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    letter-spacing: 0.15px;
    color: #2C2C2E;
    border-bottom: 2px solid transparent;
    transition: .3s;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 12px;

    &:hover, &:focus, &.active {
      border-color: #1DA1F2;
    }
  }
`

export const OffersSection = styled.div`
  display: flex;
  border-top: 1px solid #F0F1F2;
  width: 100%;
  flex-direction: column;

`

export const OfferBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  margin: 0 16px;
  width: calc(100% - 32);

  img {
    width: 100%;
    object-fit: cover;
    height: 138px;
  }
`

export const OfferTitle = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #2C2C2E;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`

export const OfferBottomBlock = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #2C2C2E;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`

export const AddingModalSection = styled.div`
  display: flex;
  padding: 24px;
  width: 100%;
  flex-direction: column;

  form {
    input {
      //margin-top: 24px;
    }

    button {
      margin-top: 24px;
    }

    .ant-upload-picture-card-wrapper {
      margin-top: 24px;
    }
  }
`

export const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin: 24px 0 16px;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.15px;
    color: #2C2C2E;
  }

  a {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.25px;
    color: #8E8E93;

    &.setting {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 12px;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: #2C2C2E;
      border-radius: 4px;
      margin-top: 18px;
      margin-bottom: 25px;

      svg {
        width: 16px;
        height: 16px;
        margin-right: 7px;
      }
    }
  }
`

export const HeaderRightBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid #E4E9F2;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: #2C2C2E;
    margin: 0;
  }
`

export const LinkPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 26px;

  img {
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 16px;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: #2C2C2E;
    text-align: left;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #8E8E93;
    margin: 0;
    text-align: left;
  }
`


export const GridWrapper = styled.div`
  display: grid;
`

export const GridBasic = styled(GridWrapper)`
  grid-template-columns: repeat(${({perColumn}) => perColumn ? perColumn : 1}, 1fr);
  grid-gap: ${({gap}) => gap ? gap : 32}px;
`

export const GridCustom = styled(GridWrapper)`
  grid-template-columns: repeat(${props => props.perColumn}, max-content);
  grid-gap: ${({gap}) => gap ? gap : 24}px;
`

export const GridItem = styled.div`
  ${props => props.gridColumn && `grid-column: ${props.gridColumn}`};
  display: flex;
  flex-direction: column;
`

export const CircleUpload = styled.div`
  display: flex;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: #1DA1F2;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  right: -9px;
  bottom: 0;

  svg {
    width: 16px;
    height: 16px;
    color: white;
  }
`

export const ThreeSelectBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  input {
    margin: 0 !important;
  }

  & > div {
    position: relative;

    svg {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }

  .css-1hwfws3 {
    padding: 0;
  }

  .css-b8ldur-Input {
    display: none;
  }

  .css-1wa3eu0-placeholder, .css-1uccc91-singleValue {
    position: static;
    transform: none;
  }

  .css-1okebmr-indicatorSeparator {
    display: none;
  }

  .css-26l3qy-menu {
    margin: 0;
    box-shadow: none;
  }

  .css-1n7v3ny-option {
    background: #8f9bb314;
  }

  .ant-select {
    &--single {
      height: initial;
      border: none;
    }

    &__placeholder {
      padding: 0 10px;
      color: #8F9BB3;
    }

    &-selection {
      &-search {
        display: flex;
        align-items: center;
      }
    }

    &-selector {
      padding: 7px ${props => props.icon ? '30px' : '10px'} 7px 10px !important;
      outline: none;
      width: 100%;
      border: 1px solid ${props => getColor(props.status)} !important;
      border-radius: 8px !important;
      background: #FAFAFB !important;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      color: #222B45;
      transition: .3s;
      height: initial !important;
      margin: 0;

      &::placeholder {
        color: #8F9BB3;
      }

      &:hover {
        background: #EDF1F7;
        border-color: ${props => getColor(props.status)};
      }

      &:focus {
        border: 1px solid #3366FF;
      }

      &:disabled {
        mix-blend-mode: normal;
        opacity: 0.48;
      }
    }
  }

  .ant-select-search--inline .ant-select-search__field {
    height: initial;
  }

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: #8992A3;
    margin-bottom: 8px;
  }
`

export const CategoryButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 43px;
  background: #1DA1F2;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 0 43px 43px 0;
  position: absolute;
  color: #ffffff;
  z-index: 99;

  svg {
    color: #ffffff;
  }

  &:hover, &:focus {
    cursor: pointer;
  }
`


export const NoImageBlock = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const StyledInfiniteScroller = styled(InfiniteScroll)`
  width: 100%;
`

const pendingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`

export const PendingAnimateUI = styled.div`
  display: flex;
  padding-bottom: 30px;
  margin-left: 10px;

  span {
    width: 9px;
    height: 9px;
    background: #C4C4C4;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 9px;
    margin-left: 0 !important;

    &:nth-child(1) {
      animation: ${pendingAnimation} 0.8s ease-in-out infinite;
    }

    &:nth-child(2) {
      animation: ${pendingAnimation} 0.8s 0.1s ease-in-out infinite;
    }

    &:nth-child(3) {
      animation: ${pendingAnimation} 0.8s 0.3s ease-in-out infinite;
    }
  }
`
export const AccountContentSection = styled.div`

`

export const AccountSectionHeading = styled.div`
  padding: 12px 0;
  margin-bottom: 24px;
`

export const CommonForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const AccountSectionItem = styled.div`
  margin-bottom: 32px;
`

export const GallerySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  .image {
    &-gallery {
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

export const LogoBlockSection = styled.div`
  display: flex;
  width: 46px;
  height: 46px;
  position: relative;
  justify-content: center;
  align-items: center;

  img {
    width: 28px !important;
    height: 28px !important;
    overflow: hidden !important;
    border-radius: 50% !important;
    object-fit: cover !important;
  }

  svg {
    width: 46px;
    height: 46px;
    position: absolute;
    left: 0;
    top: 0;
  }
`
