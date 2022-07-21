import styled from 'styled-components'
import Checkbox from "antd/es/checkbox";

export const CheckboxUiBlock = styled.label`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;

  & > span {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: #222B45;
    margin-left: 8px;
  }
`

export const SquareCheckboxUiBlock = styled.label`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;

  & > span {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: #222B45;
    margin-left: 8px;
  }

  & > label > span {
    display: none;
  }
  
  svg{
    width: 18px;
    height: 18px;
  }

  input {
    display: none;
  }
`

export const SpecCheckbox = styled(Checkbox)`
  display: flex;
  flex-direction: column;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }
`