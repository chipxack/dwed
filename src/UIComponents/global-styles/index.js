import styled from "styled-components";
import {Link} from "react-router-dom";
import {Row, Statistic} from 'antd'
import {InputBlock} from "../../ui/atoms";
import {Skeleton} from "@material-ui/lab";
import Modal from 'antd/lib/modal/Modal'
import {StyledText, StyledTitle} from '../typography/atoms'

const {Countdown} = Statistic;

export const SectionWrapper = styled.div`
  padding-top: var(--header-height);
  margin-top: 16px;
  height: 100%;
`

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
`

export const TemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-dwed);
  border-radius: 4px;
  margin-top: 24px;
  width: 100%;
  background: #FFFFFF;
`

export const TemplateInfoBlock = styled.div`
  background: #FFFFFF;
  box-shadow: var(--shadow-dwed);
  border-radius: 4px;
  min-height: 100%;
  width: 100%;
  display: flex;
  max-width: 960px;
  margin-top: 24px;
`;

export const TemplateInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const ListWrapperBordered = styled.div`
  position: relative;
  margin-bottom: 8px;
  padding-bottom: ${({offsetBottom}) => offsetBottom ? offsetBottom : 0}px;

  &::before {
    content: '';
    width: 98%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #F0F1F2;
  }
`

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: ${({onClick}) => onClick ? 'pointer' : 'unset'};
  color: ${({color}) => color ? color : 'var(--grey-basic)'}
`

export const StyledLabel = styled.div`
  font-family: var(--demi-text);
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #8992A3;
  margin-bottom: 8px;
`

export const ApplyLink = styled(Link)`
  width: 200px;
  justify-content: center;
  display: flex;
  height: 50px;
  padding: 0 24px;
  border-radius: 4px;
  background-color: var(--primary-dwed);
  align-items: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 16px;
  font-family: var(--medium-text);

  &:hover {
    color: #fff;
  }
`

export const CommonSearchFilter = styled(Row)`
  margin-bottom: 16px;

  ${InputBlock} {
    input {
      padding-top: 7px !important;
      padding-bottom: 7px !important;
    }

    ${IconBox} {
      height: 40px !important;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`

export const AccountSidebar = styled.div`
  position: sticky;
  padding: 6px 0;
  transition: .2s ease;
  top: 0;
`

export const AccountSidebarListWrapper = styled.div`
  margin-bottom: 24px;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  
  .account-sidebar-title {
    padding: 16px;
    font-size: 16px;
  }
  
  .account-sidebar-list-item {
    padding: 8px 16px;
    display: block;
    transition: .2s ease;
    
    &.active {
      background-color: var(--input-bg);
    }
    
    &:hover {
      background-color: var(--input-bg);
    }
  }
  
  .account-show-more {
    margin-top: 16px;
    background-color: var(--input-bg);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-family: var(--medium-text);
    color: var(--primary-dwed);
    cursor: pointer;
  }
`

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const SkeletonUI = styled(Skeleton)`
  margin: ${({offset}) => offset ? `${offset}px 0` : 0};
  border-radius: 4px;

  &.MuiSkeleton-text {
    transform: scale(1, 0.75);
  }
`

export const ColorHex = styled.div`
  position: relative;
  min-width: ${({size}) => size || 28}px;
  min-height: ${({size}) => size || 28}px;
  max-width: ${({size}) => size || 28}px;
  max-height: ${({size}) => size || 28}px;
  border-radius: 50%;
  background-color: ${({color}) => color ? color : 'var(--input-bg)'};
  margin-right: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
`

export const ActiveColor = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--primary-dwed);
  color: #fff;

  svg {
    width: 11px;
    height: 11px;
  }
`

export const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${({maxHeight}) => maxHeight || 300}px;
`

export const DropdownActionMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: var(--shadow-dwed);
  border-radius: 6px;
  overflow: hidden;
  position: absolute;
  padding: 6px 0;
  right: 0;
  top: 100%;
  z-index: 15;

  ${IconBox} {
    flex-direction: row;
    justify-content: unset;
    padding: 6px 12px;
    font-size: 14px;
    font-family: var(--medium-text);
    background-color: #fff;
    white-space: nowrap;
    color: var(--dark-basic);
    
    &:hover {
      background-color: var(--input-bg);
    }

    svg {
      width: 18px;
      height: 18px;
      margin-right: 8px;
      color: var(--primary-dwed);
    }
  }
`

export const FastAuthModal = styled(Modal)`
  max-width: 100vw;
  margin: 0 !important;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  top: 0;
  bottom: 0;

  .ant-modal-body {
    padding: 0;
  }
`

export const MeetTimeBox = styled.div`
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: var(--shadow-dwed);
`

export const StatusBadge = styled.div`
  display: inline-block;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  padding: 3px 8px;
  white-space: nowrap;
`

export const StatFilterWrapper = styled.div`
  color: var(--grey-basic);
  font-size: 14px;
  
  ${IconBox} {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const ActionButton = styled.button`
  border: 0;
  background: unset;
  outline: none;
  color: var(--primary-dwed);
  padding: 6px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  svg {
    margin-right: 8px;
  }
`

export const ShadowBox = styled.div`
  padding: 12px;
  box-shadow: var(--shadow-dwed);
  transition: .2s ease;
  border-radius: 6px;
  position: relative;

  ${StyledTitle} {
    line-height: 1.2;
  }

  &:hover {
    box-shadow: var(--shadow-hover-dwed);

    .box-actions,
    .add-users-to-coupon{
      opacity: 1;
    }
  }

  .box-icon {
    position: relative;
  }

  .box-actions {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 5;
    opacity: 0;
  }
  
  .add-users-to-coupon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 6;
    opacity: 0;
    transition: .2s ease;
  }
`

export const ShadowBoxActions = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 2px);
  transform-origin: top right;
  transform: scale(${({show}) => show ? 1 : 0});
  z-index: 6;
  transition: .2s ease;
  border-radius: 6px;
  box-shadow: var(--shadow-dwed);
  background-color: #fff;
  padding: 8px 0 ;
  
  .box-action {
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition: .1s ease;
    padding: 6px 12px;
    color: var(--dark-basic);
    
    &:hover {
      background-color: var(--input-bg);
    }
    
    .action-icon {
      margin-right: 8px;

    }
  }
`

export const CountdownWrapper = styled.div`
  color: var(--grey-basic);
  line-height: 24px;
  font-size: 12px;
  margin-top: 4px;
  text-align: center;

  ${StyledText} {
    font-weight: normal;
    font-size: 12px;
    color: var(--primary-dwed);
    cursor: pointer;
    text-align: center;
  }
`

export const StyledCountdown = styled(Countdown)`
  && {
    display: inline;
    
   .ant-statistic-content {
    display: inline;
    font-size: 14px;
    font-weight: 500;
   }
  }
`
