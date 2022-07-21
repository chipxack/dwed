import styled, {css} from 'styled-components'
import TimeInput from 'material-ui-time-picker'
import {Button, Dropdown, Slider} from 'antd'
import {NavLink} from 'react-router-dom'
import {ButtonUI} from '../../../ui/atoms'
import QrReader from 'react-qr-reader'
import {StyledText, StyledTitle} from '../../../UIComponents/typography/atoms'
import {IconBox} from '../../../UIComponents/global-styles'

export const AutoModeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 15px;
    font-weight: normal;
    line-height: 20px;
    color: #2C2C2E;
  }
`

export const AutoModeText = styled.div`
  margin-bottom: 24px;
`

export const AutoModeForm = styled.div`
  margin-bottom: 40px;

  p {
    margin-bottom: 10px;

  }
`

export const jobItemBox = css`
  min-height: 64px;
  background: #FFFFFF;
  box-shadow: 0 3px 14px rgba(38, 38, 38, 0.12);
  border-radius: 6px;
  padding: 12px 16px;
`

export const JobItemBox = styled.div`
  ${jobItemBox};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .2s ease;

  &.active {
    background-color: rgba(29, 161, 242, 0.1);;
  }

  .icon-text {
    text-align: center;
    color: var(--primary-dwed);
    margin-right: 8px;
    width: 20px;
    font-weight: 500;
    line-height: 18px;
  }

  svg {
    width: 20px !important;
  }
`

export const JobItem = styled(NavLink)`
  display: block;
`

export const JobDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;


  svg {
    width: 18px;
    height: 18px;

    color: var(--primary-dwed)
  }
`

export const QrCodeWrapper = styled.div`
  ${jobItemBox};
  cursor: pointer;
  color: var(--dark-basic);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  height: 100%;

  svg {
    margin-right: 8px;
    color: var(--primary-dwed);
  }
`

export const SpecWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;

  ${({disabled}) => disabled && (
          `
    &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .6);
    z-index: 10;
  }
    `
  )}
`

export const StyledDropdown = styled(Dropdown)`
  && {
    width: 24px;
    height: 24px;
    padding: 0;

    svg {
      width: 20px;
      height: 20px;
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
      transition: .2s ease
    }
  }
`

export const DropdownItem = styled(Button)`
  && {
    align-items: center;
    padding: 5px 16px !important;
    min-width: 160px;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-basic);

    &:hover {
      background-color: #F8F8F8;
    }

    svg {
      width: 18px;
      height: 18px;
      margin: 0 0 0 20px !important;
      color: var(--primary-dwed);
    }
  }
`

export const RequestFilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  margin-bottom: 32px;
`

export const RequestFilterItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  box-shadow: var(--shadow-dwed);
  font-family: var(--demi-text);
  color: var(--grey-basic);
  height: 84px;
  cursor: pointer;
  position: relative;

  &.active {
    ${StyledTitle}, ${StyledText} {
      color: var(--primary-dwed);
    }
  }

  ${StyledTitle} {
    right: 16px;
    bottom: 16px;
    position: absolute;
  }
`
export const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`

export const Timebox = styled(TimeInput)`
  && {
    padding: 4px 8px;
    border-radius: 4px;
    line-height: 24px;
    font-size: 20px;
    font-weight: 600;
    color: #2C2C2E;
    background-color: #FAFAFB;
    border: 1px solid #E4E9F2;
    align-items: center;
    width: 80px;
    height: 42px;
    display: flex;
    justify-content: center;
    transition: 0.25s ease;

    input {
      cursor: pointer;
      text-align: center;
    }

    &::before, &::after {
      content: unset;
    }

    &:hover {
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.1)
    }
  }
`

export const TimeSplit = styled.div`
  display: flex;
  line-height: 42px;
  font-size: 24px;
  font-weight: 600;
`

export const BreakItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    display: ${({disabled}) => disabled ? 'block' : 'none'};
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: .5;
    background-color: #fff;
    z-index: 3;
  }
`

export const BreakAction = styled.div`
  cursor: pointer;
  color: ${({type}) => type === 'delete' ? '#8e8e93' : '#1DA1F2'};
  width: 24px;
  height: 24px;
  margin-left: 8px;
  transition: .2s ease;

  &:hover {
    color: ${({type}) => type === 'delete' ? 'red' : '#1DA1F2'};
  }
`

export const ScheduleTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
  padding: 16px 0;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #2C2C2E;
`

export const ToggleBreak = styled.div`
  color: ${({active}) => active ? '#1DA1F2' : '#8e8e93'};
  margin-right: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const ProcIntervalSlider = styled(Slider)`
  && {
    .ant-slider-rail {
      height: 12px;
      border-radius: 8px;
      background-color: #F2F2F7;
    }

    .ant-slider-track {
      height: 12px;
      background-color: #1DA1F2;
      box-shadow: 0px 1px 4px rgba(29, 161, 242, 0.45);
      border-radius: 8px;
    }

    .ant-slider-handle {
      height: 24px;
      width: 24px;
      border-color: #1DA1F2;
      background-color: #1DA1F2;
    }
  }
`

export const RoundClock = styled.div`
  display: flex;
  align-items: center;
  color: ${({active}) => active ? '#1DA1F2' : '#8e8e93'};
  justify-content: flex-end;
  cursor: pointer;
  margin-right: 8px;

  svg {
    width: 26px;
    height: 26px
  }
`

export const WeekDayWrapper = styled.div`
  margin: 0 -6px;
`

export const WeekdayItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({active}) => active ? 'var(--primary-dwed)' : '#f2f2f2'};
  color: ${({active}) => active ? '#fff' : 'var(--dark-dwed)'};
  border-radius: 20px;
  transition: .2s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dwed);
    color: #fff;
  }
`

WeekdayItem.Title = styled.div`
  padding: 7px 3px 7px 16px;
`

WeekdayItem.Close = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 4px;
`

export const QRCodeActionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  margin-bottom: 24px;

  video {
    width: 100%;
    height: auto;
  }
`

const activeCss = css`
  border-color: transparent;
  background: #1DA1F2;
  box-shadow: 0 0 4px #BCBCBC;
  color: #fff;
`

export const QRCodeButton = styled(ButtonUI)`
  justify-content: center;
  ${({activestatus}) => activestatus && activeCss};

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`

export const RequestHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${StyledTitle} {
    text-transform: uppercase;
    font-size: 16px;
    color: var(--grey-basic);
    margin-right: 16px;
  }

  &:after {
    content: '';
    flex-grow: 1;
    height: 1.5px;
    background-color: #f2f2f2;
  }
`

export const RequestAddNoteBtn = styled.div`
  color: var(--grey-basic);
  font-size: 11px;
  text-transform: uppercase;
  line-height: 16px;
  padding: 2px 4px;
  background-color: #fff;
  font-weight: 600;
  margin-bottom: -12px;
  transition: .2s ease;
  cursor: pointer;
`

export const RequestAddNoteWrapper = styled.div`
  border-top: 0;
  border-radius: 0 0 4px 4px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: #fff;
  background-color: var(--primary-dwed);
  height: 32px;
  margin-top: -8px;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
`

export const RequestOfferItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 2px solid #F0F1F2;
  overflow: hidden;
  width: 100%;

  img {
    width: 96px;
    height: 96px;
    object-fit: contain;
  }
`
RequestOfferItem.Content = styled.div`
  flex-grow: 1;
  padding: 16px;
`

export const RequestUserMainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`


export const MeetDateSetting = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
`

export const MeetDateContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const MeetDateContentInner = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 340px;
  padding-right: 6px;
`

export const MeetDateGridItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
`

export const MeetDateHour = styled.div`
  font-size: 16px;
  font-family: var(--medium-text);
  line-height: 24px;
  margin-right: 16px;
  width: 55px;
`

export const MeetDatePeople = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  min-height: 40px;
  max-width: 345px;
  overflow-x: auto;
  overflow-y: hidden;
`

export const MeetDate = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 12px;
  color: var(--dark-basic)
`

export const MeetDateItem = styled.div`
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
  background-color: var(--input-bg);
  margin: 0 5px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const CameraQrReader = styled(QrReader)`

  div {
    background: linear-gradient(var(--primary-dwed), var(--primary-dwed)) bottom left/100px 5px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) bottom left/5px 100px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) bottom right/100px 5px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) bottom right/5px 100px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) top left/100px 5px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) top left/5px 100px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) top right/100px 5px,
    linear-gradient(var(--primary-dwed), var(--primary-dwed)) top right/5px 100px;
    background-repeat: no-repeat;
    box-shadow: unset !important;
    border-width: 40px !important;
  }
`

export const NoteNavBtn = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: var(--grey-basic);
  transition: .2s ease;

  &:hover {
    color: var(--dark-basic);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  &.prev {
    left: -4px;
  }

  &.next {
    right: -4px;
  }
`

export const NoteOfferingWrapper = styled.div`
  margin: 8px 0;
  padding: 0 24px;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #F0F1F2;

  .note-offer-item {
    display: flex;
    align-items: center;
  }
`

export const NoteOfferingCol = styled.div`
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  color: ${({isActive}) => isActive ? 'var(--primary-dwed)' : 'var(--dark-basic)'};
  font-size: 12px;
  font-weight: 500;
  cursor: ${({onClick}) => !!onClick ? 'pointer' : 'unset'};
  position: relative;
  cursor: pointer;
  transition: .2s ease;

  svg {
    margin-right: 6px;
    width: 18px;
    height: 18px;
  }
`

export const NoteDescription = styled.div`
  padding: 0 16px;
  border-radius: 4px;
  background-color: var(--input-bg);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const NoteDescriptionItem = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .record-text {
    white-space: pre-wrap;
  }

  textarea {
    width: 100%;
    border: 0;
    background: unset;
    outline: 0;
    padding: 0;
    font-weight: 500;
    color: var(--dark-basic);
    height: 100%;
    flex-grow: 1;
    resize: none;

    &::placeholder {
      color: #8F9BB3;
    }
  }
`

export const RecordModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${IconBox} {
    svg {
      width: 36px;
      height: 36px;
    }
  }
`

export const CalendarFilter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 8px;
    width: 18px;
    height: 18px;
    color: var(--dark-basic);
  }
`

export const CustomerWrapper = styled.div`
  padding: 16px;
  border-radius: 6px;
  background-color: #f2f2f2;

  .ant-avatar-square {
    border-radius: 6px;
  }
`

export const CustomDropdownAction = styled.div`
  margin-top: 16px;

  ${StyledTitle} {
    margin: 0 16px;
    display: flex;
    align-items: center;
    font-weight: 400;
    cursor: pointer;

    svg {
      margin-left: 6px;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    background-color: #fff !important;
  }

  ${ButtonUI} {
    width: 100% !important;
    justify-content: center;
    margin-top: auto;
  }
}

.line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--dark-basic);
}
`

export const JubSuggestionItem = styled.div`
  padding: 30px;
  border-radius: 6px;
  background-color: #f2f2f2;

  ${StyledTitle} {
    margin-top: 16px;
  }

  .job-invitation-contract {
    display: flex;
    align-items: center;
    color: var(--primary-dwed);
    margin-bottom: 24px;

    svg {
      margin-right: 8px;
    }
  }

  .job-invitation-text {
    font-weight: normal;
    text-align: center;
    line-height: 19px;
  }

  ${ButtonUI} {
    padding-left: 15px;
    padding-right: 15px;
  }
`

export const RecordTab = styled.div`
  display: flex;
`

export const RecordTabItem = styled.div`
  border-radius: 6px;
  padding: 8px;
  line-height: 1.3;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 13px;
  margin-right: 10px;
  background-color: ${({active}) => active ? 'var(--primary-dwed)' : '#f2f2f2'};
  color: ${({active}) => active ? '#fff' : 'var(--dark-basic)'};
  cursor: pointer;
`

export const QrCodeScanCamera = styled.div`
  position: relative;
  
  section div {
    background: linear-gradient(#fff, #fff) bottom left/100px 5px,
    linear-gradient(#fff, #fff) bottom left/5px 100px,
    linear-gradient(#fff, #fff) bottom right/100px 5px,
    linear-gradient(#fff, #fff) bottom right/5px 100px,
    linear-gradient(#fff, #fff) top left/100px 5px,
    linear-gradient(#fff, #fff) top left/5px 100px,
    linear-gradient(#fff, #fff) top right/100px 5px,
    linear-gradient(#fff, #fff) top right/5px 100px;
    background-repeat: no-repeat;
    box-shadow: unset !important;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border: 60px solid transparent !important;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
