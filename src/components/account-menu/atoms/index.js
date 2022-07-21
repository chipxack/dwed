import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {ButtonUI} from '../../../ui/atoms'

export const AccountMenuWrapper = styled.div`
  position: relative;
`
export const AccountMenuGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  .custom-link {
    font-family: var(--medium-text);
    font-size: 18px;
    text-align: center;
    padding: 4px 20px;
    line-height: 24px;
    position: relative;
    display: flex;
    align-items: center;
    color: var(--dark-basic);
    cursor: pointer;
    
    &:last-child::before {
      content: unset;
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 1.5px;
      height: 21px;
      background-color: var(--input-bg);
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    &.active {
      color: var(--primary-dwed)
    }

    svg {
      margin-right: 6px;
      margin-left: -2px;
    }

    &:hover {
      color: var(--primary-dwed);
    }
  }
`

export const AccountDropdownMenuBtn = styled(ButtonUI)`
  && {
    padding: 0;
    width: 24px !important;
    height: 24px;
    justify-content: center;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const AccountDropdownMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

export const DropdownMenuItem = styled(Link)`
  && {
    display: flex;
    align-items: center;
    padding: 8px 0;
    line-height: 24px;
    color: var(--dark-basic);
    text-decoration: none;

    svg {
      margin-right: 12px;
    }

    &:hover {
      color: var(--primary-dwed);
      text-decoration: none;
    }
  }
`