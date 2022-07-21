import styled from "styled-components";
import {getColor} from "../../helpers";
import {ErrorMessage} from "./input";


export const TextAreaSystemBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  ${ErrorMessage}{
    transform: translateY(${props => props.error ? '25px' : '0px'});
    opacity: ${props => props.error ? '1' : '0'};
  }
  div{
    position: relative;
    svg{
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }
  textarea{
    padding: 10px ${props => props.icon ? '30px' : '10px'} 10px 10px;
    outline: none;
    width: 100%;
    border: 1px solid ${props => getColor(props.status)};
    border-radius: 8px;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #7F92A0;
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
  label{
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: #8992A3;
    margin-bottom: 8px;
  }
`