import styled from "styled-components";
import {Cascader} from 'antd';
import {getColor} from "../../helpers";


export const CascaderBlock = styled(Cascader)`
  width: 100%;
  height: 46px;
  input.ant-cascader-input.ant-input{
    padding: 10px ${props => props.icon ? '30px' : '10px'} 10px 10px;
    outline: none;
    width: 100%;
    border: 1px solid ${props => getColor(props.status)};
    border-radius: 8px;
    background: #FAFAFB !important;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #222B45;
    transition: .3s;
    &::placeholder{
      color: #8F9BB3;
    }
    &:hover{
      background: #EDF1F7;
    }
    &:focus{
      border: 1px solid #3366FF;
    }
    &:disabled{
      mix-blend-mode: normal;
      opacity: 0.48;
    }
  }
`;