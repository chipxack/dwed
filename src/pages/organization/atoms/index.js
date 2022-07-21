import styled from 'styled-components'
import {ApplyLink, IconBox} from '../../../UIComponents/global-styles'
import {NavLink} from 'react-router-dom'

export const OrgListWrapperBordered = styled.div`
  position: relative;
  margin-bottom: 30px;
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

export const ApplyButton = styled(ApplyLink)`
  position: fixed;
  z-index: 30;
  bottom: 30px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`

export const FilterModalScroll = styled.div`
  max-height: 550px;
  overflow-x: hidden;
  overflow-y: auto;
`


export const FilterModalItem = styled.div`
  padding: 12px 16px;
  border-radius: 6px;
  transition: .2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  .short-card-progress {
    margin-top: 4px;
  }

  &:hover,
  &.active {
    background-color: #f2f2f2;
  }
`

export const OfferingFilterActions = styled.div`
  position: absolute;
  opacity: 0;
  display: flex;
  align-items: center;
  right: 2px;
  z-index: 15;
  padding: 4px;
  top: 2px;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const OfferingFilterActionsInnerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const FilterModalActionWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.17);
  border-radius: 8px;
  transform-origin: top right;
  overflow: hidden;
  transform: scale(${({show}) => show ? 1 : 0});
  transition: .2s ease;

  ${IconBox} {
    flex-direction: row;
    justify-content: unset;
    font-size: 14px;
    padding: 6px 16px;

    &:hover {
      background-color: #f2f2f2;
    }

    svg {
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
  }
`

export const FilterModalContent = styled.div`
  position: relative;

  &:hover ${OfferingFilterActions} {
    opacity: 1;
  }
`

export const StatisticNav = styled.div`
  .ant-col {
    flex: unset;
    width: calc(100%/5);
  }
`

export const StatisticNavLink = styled(NavLink)`
  display: block;
  padding: 12px;
  border-radius: 6px;
  box-shadow: var(--shadow-dwed);

  &.active {
    box-shadow: var(--shadow-hover-dwed);
  }
`

export const FinanceIndicatorItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  box-shadow: var(--shadow-dwed);
  font-size: 16px;

  .finance-indicator-title {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    
    svg {
      margin-right: 8px;
    }
  }
`