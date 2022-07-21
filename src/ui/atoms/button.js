import styled, {css} from 'styled-components';
import { Button, Switch } from 'antd';
import {
    getButtonFontSize,
    getButtonHeight,
    getButtonPadding,
    getButtonStyle
} from "../../utils/styleUtils";
import {COLOR_TYPE} from "../../constants/style-formats";

export const ButtonUi = styled(Button)`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.75px;
    text-transform: uppercase;
    color: ${({ buttonType }) => buttonType === 'link' ? '#2E3A59 !important' : '#FFFFFF'};
    border-radius: 4px;
    background: ${props => props.buttonType ?
    props.buttonType === 'primary' ? '#1DA1F2' :
      props.buttonType === 'success' ? '#00E096' :
        props.buttonType === 'warning' ? '#FFAA00' :
          props.buttonType === 'danger' ? '#FF3D71' :
            props.buttonType === 'dark' ? '#151A30' :
              props.buttonType === 'link' ? 'none !important' : '#1DA1F2' : '#1DA1F2'};
    outline: none;
    padding: 0 30px;
    height: 40px;
    transition: .3s;
    border: 1px solid transparent;
    &:hover{
      border-color: transparent;
      background: ${props => props.buttonType ?
    props.buttonType === 'primary' ? '#66C5FF' :
      props.buttonType === 'success' ? '#24F8B1' :
        props.buttonType === 'warning' ? '#FFC144' :
          props.buttonType === 'danger' ? '#FF5C88' :
            props.buttonType === 'dark' ? '#252C4E' : '#66C5FF'
    : '#66C5FF'};
      color: #fff;
    }
    &:active{
      border-color: transparent;
      background: ${props => props.buttonType ?
    props.buttonType === 'primary' ? '#0079C4' :
      props.buttonType === 'success' ? '#00B578' :
        props.buttonType === 'warning' ? '#DA9815' :
          props.buttonType === 'danger' ? '#CD2955' :
            props.buttonType === 'dark' ? '#000000' : '#0079C4'
    : '#0079C4'};
      color: #fff;
    }
    &:focus{
      border-color: transparent;
      background: ${props => props.buttonType ?
    props.buttonType === 'primary' ? '#1DA1F2' :
      props.buttonType === 'success' ? '#00E096' :
        props.buttonType === 'warning' ? '#FFAA00' :
          props.buttonType === 'danger' ? '#FF3D71' :
            props.buttonType === 'dark' ? '#151A30' : '#1DA1F2'
    : '#1DA1F2'};
      box-shadow: 0 0 4px #BCBCBC;
      color: #fff;
    }
    &:disabled{
      background: #ECECEC;
      color: rgba(34, 43, 69, 0.45);
      border-color: #E2E2E2;
    }
`;
export const ButtonUiOutlet = styled(Button)`
  background: #FFFFFF;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.75px;
  padding: 12px 38px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: initial;
  color: #2C2C2E;
  font-style: normal;
  border: none;
  span{
    display: flex;
  }
`;

export const UploadButton = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #FBFBFB;
  border: 1px dashed #F0F1F2;
  border-radius: 4px;
  width: 100px;
  height: 100px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #8E8E93;
  flex-direction: column;
  svg{
    margin-bottom: 10px;
  }
`;

export const AccountAddButton = styled(Button)`
     padding: 6px 12px !important;
    display: flex;
    align-items: center;
    border-radius: 4px;
    text-transform: uppercase;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.75px;
    font-weight: bold;
    background-color: #C9E7E5 !important;
    color: #1DA1F2;
    width: unset !important;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 7px !important;
    }
  `

export const SwitchButton = styled(Switch)`
    && {
      min-width: 52px;
      height: 32px;

      &::after {
        width: 28px;
        height: 28px;
        border-radius: 28px;
      }
    }
  `

////////////////////////////////////////////////////

const commonButton = css`
  width: unset;
  border-radius: 4px;
  text-transform: uppercase;
  font-family: var(--medium-text);
  outline: none;
  transition: .3s;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  white-space: nowrap;
  display: flex;
  align-items: center;
`
export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  
  button:nth-child(2) {
    margin-left: 24px;
  }
`
const primaryButton = css`
  background-color: var(--primary-dwed);
  border-color: var(--primary-dwed);
  color: #fff;
  
  &:hover {
    background-color: #66C5FF;
    border-color: #66C5FF;
  }
`

const dangerButton = css`
  background-color: var(--danger-dwed);
  border-color: var(--danger-dwed);
  color: #fff;

  &:hover {
    background-color: #F7645C;
    border-color: #F7645C;
  }
`

const linkButton = css`
  color: var(--grey-basic);
  border: 0;
  background: none;
  box-shadow: unset;
  
  &:hover {
    color: var(--primary);
  }
`

const buttonStyle = {
    [COLOR_TYPE.PRIMARY]: primaryButton,
    [COLOR_TYPE.LINK]: linkButton,
    [COLOR_TYPE.DANGER]: dangerButton
}

export const ButtonUI = styled(Button)`
  &&{
    ${commonButton};
    height: ${getButtonHeight}px;
    line-height: ${getButtonHeight}px;
    padding-left: ${getButtonPadding}px;
    padding-right: ${getButtonPadding}px;
    font-size: ${getButtonFontSize}px;
    ${({buttonstyle}) => getButtonStyle(buttonStyle, buttonstyle)};
    
    &:disabled{
      background: #ECECEC;
      color: rgba(34, 43, 69, 0.45);
      border-color: #E2E2E2;
    }

    & > span {
      display: flex;
      align-items: center;
    }
  }
`
export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({column}) => column ? column : 1}, max-content);
  grid-gap: ${({gap}) => gap ? gap : 24}px;
`