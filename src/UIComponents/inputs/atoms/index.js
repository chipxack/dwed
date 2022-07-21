import styled from 'styled-components'
import {Chip, MenuItem} from '@material-ui/core'
import {StyledAvatar} from '../../avatar/atoms'
import {IconBox} from '../../global-styles'
import {ButtonUI} from '../../../ui/atoms'

export const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
  
  .custom-keyboard-picker {
    .MuiInputAdornment-root {
      display: none;
    }
  }

  .MuiInputLabel-filled {
    transform: translate(12px, 19px) scale(1);
  }

  .MuiFilledInput-root {
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid var(--grey-basic);
    
    &.Mui-focused {
      border-color: var(--primary-dwed);
      background-color: #fff;
    }

    &.Mui-error, &.Mui-focused.Mui-error {
      border-color: var(--danger-dwed);
    }
    
    &:hover {
      background-color: #fff;
    }
    
    &::before,
    &::after{
      content: '';
      display: none;
    }

    .MuiFilledInput-input {
      padding-top: 21px;
      font-size: 14px;
      
      &.MuiInputBase-input {
       height: unset; 
      }
    }
  }

  .MuiInput-underline:before,
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 0.5px solid var(--grey-basic);
  }

  .MuiInput-underline:after {
    border-bottom: 1px solid var(--primary-dwed);
  }
  

  .MuiFormLabel-asterisk {
    color: var(--danger-dwed) !important;
  }

  .MuiPhoneNumber-flagButton {
    z-index: 10;
  }

  .MuiCircularProgress-root {
    z-index: 9;
  }

  .MuiInputLabel-root,
  .MuiFormLabel-root.Mui-error {
    color: var(--grey-basic);
    font-size: 14px;
  }

  .MuiAutocomplete-tag {
    position: relative;
    z-index: 9;
  }

  .MuiOutlinedInput-root {
    border-radius: 6px;
  }

  ${IconBox} {
    position: relative;
    z-index: 10;

    svg {
      width: 24px;
      height: 24px;
      color: var(--grey-basic);
    }
  }

  .MuiChip-root {
    height: 27px;
    border: 1px solid var(--grey-basic);
    background: unset;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .MuiSelect-select:focus {
    background-color: unset;
  }

  .MuiOutlinedInput-notchedOutline {
    background-color: var(--input-bg);
  }

  .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
    background-color: var(--input-hover-bg);
    border-color: var(--input-hover-color);
  }

  .MuiOutlinedInput-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-border-color);
    background-color: var(--input-bg);
  }

  .MuiInputBase-root.Mui-disabled {
    opacity: .6;
  }

  .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-border-color);
  }

  .MuiInputBase-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-focus-color);
  }

  .MuiInputBase-root.Mui-focused.Mui-error:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border-color: var(--input-danger-color);
  }

  .MuiSelect-icon {
    z-index: 5;
    width: 24px;
    height: 24px;
    color: var(--grey-basic);
  }

  //.Mui-focused {
  //  color: var(--input-focus-color);
  //}

  .Mui-error {
    color: var(--grey-basic);
  }

  .MuiFormLabel-root.Mui-focused {
    color: var(--input-focus-color);
  }

  .Mui-error.Mui-focused {
    color: var(--input-danger-color);
  }

  .MuiAutocomplete-endAdornment {
    z-index: 9;

    svg {
      color: var(--grey-basic);
    }
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0;
  }

  .MuiChip-root.MuiAutocomplete-tag:first-child {
    margin-left: 16px;
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input {
    padding: 18.5px 0 18.5px 16px;
    //height: 18px;

    &:first-child {
      padding-left: 16px;
    }
  }
  
  
  .MuiInput-underline input {
    font-size: 14px;
    padding: 7.37px 0 8px 0;
  }

  .MuiOutlinedInput-input,
  .MuiInput-input{
    position: relative;
    z-index: 2;
    color: var(--dark-basic);

    &.MuiOutlinedInput-inputMultiline {
      height: unset;
      padding: 0;
    }

    &.MuiOutlinedInput-inputAdornedEnd {
      padding-left: 16px;
    }

    &.MuiOutlinedInput-inputAdornedStart {
      padding-left: 0;
    }

    .MuiInputBase-root.MuiAutocomplete-input {
      padding-right: 0;
    }
  }
`

export const StyledHelperText = styled.div`
  line-height: 20px;
  font-size: 13px;
  color: var(--primary-dwed);
`

export const StyledInputError = styled.div`
  color: var(--danger-dwed);
  font-size: 13px;
  line-height: 1.2;
  padding: 2px 0;
`

export const StyledOptionItem = styled(MenuItem)`
  display: flex;
  align-items: center;

  ${StyledAvatar} {
    margin-right: 8px;
  }
`

export const MultipleSelectedWrap = styled.div`
  display: flex;
  align-items: center;
`

export const StyledChip = styled(Chip)`
  && {
    height: 25px;
    margin: 0 4px 2px 0
  }
`

export const OptionLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;

  img {
    max-width: 50px;
    height: auto;
  }
`

export const StyledSelected = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  color: var(--dark-basic);
  z-index: 6;
`

export const UploadInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${IconBox} {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    opacity: 0;
  }

  &:hover {
    ${IconBox} {
      opacity: 1;
    }
  }

  ${ButtonUI} {
    border-radius: 4px 0 0 4px;
    min-width: 110px;

    svg {
      margin-right: 8px;
    }
  }

  input {
    flex-grow: 1;
    border-radius: 0 4px 4px 0;
    background: var(--input-bg);
    border: 1px solid #F0F1F2;
    border-left: 0;
    padding: 0 16px;
    height: 50px;
    font-family: var(--medium-text);
    color: var(--dark-basic);
    outline: none;
    cursor: default;

    &::placeholder {
      color: var(--grey-basic);
    }
  }
`
