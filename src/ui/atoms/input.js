import styled from 'styled-components';
import {DatePicker} from 'antd';
import {getColor} from "../../helpers";
import {IconBox} from "../../UIComponents/global-styles";


export const ErrorMessage = styled.div`
  color: var(--danger-dwed);
  font-size: 13px;
  line-height: 24px;
`;

export const HelperText = styled.div`
  line-height: 20px;
  font-size: 12px;
  color: #636366;
`

export const InputBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  
  ${IconBox} {
    position: absolute;
    top: 0;
    right: 10px;
    height: 48px;
    
    svg {
      color: var(--grey-basic);
      width: 16px;
      height: 16px;
    }
  }

  .react-tel-input .form-control {
    width: 100%;
    height: unset;
    border-radius: 4px;
    border: 1px solid ${props => getColor(props.status)};
    line-height: 24px;
    padding-left: 60px;

    &::placeholder {
      color: var(--grey-basic);
      font-weight: 400 !important;
    }
    
    &:focus {
      border: 1px solid #3366FF;
    }

    &:disabled {
      mix-blend-mode: normal;
      opacity: 0.48;
    }
  }

  .react-tel-input .selected-flag {
    border-radius: 4px 0 0 4px;
    width: 48px;
    padding: 0 0 0 13px;
    border-right: 1px solid #E4E9F2;
  }

  .react-tel-input .flag-dropdown {
    border-radius: 4px 0 0 4px;
    border: 0;
    left: 1px;
    top: 1px;
    bottom: 1px;
  }

  input {
    padding: 11px ${props => props.icon ? '36px' : '12px'} 11px 12px;
    border-radius: 4px;
    outline: none;
    width: 100%;
    border: 1px solid var(--input-bg);
    background: #fff;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: var(--dark-basic);
    transition: .3s;

    &::placeholder {
      color: var(--grey-basic);
      font-weight: 400 !important;
    }

    &:hover {
      background: #fff;
    }

    &:focus {
      border: 1px solid #3366FF;
    }

    &:disabled {
      mix-blend-mode: normal;
      opacity: 0.48;
    }
  }

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: #8992A3;
    margin-bottom: 8px;
  }

  textarea {
    padding: 16px;
    width: 100%;
    color: var(--dark-basic);
    background-color: var(--input-bg);
    border: 1px solid ${props => getColor(props.status)};
    border-radius: 6px;
    outline: none;
    font-family: var(--medium-text);
    transition: .2s ease;
    
    &:focus {
      border: 1px solid #3366FF;
    }
  }
`;

export const DatePickerUI = styled(DatePicker)`
  border: none;
  padding: 0;
  width: 100%;

  span {
    display: none;
  }
`;