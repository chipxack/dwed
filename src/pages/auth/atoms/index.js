import styled from 'styled-components'
import {ButtonUI} from '../../../ui/atoms'
import {Link} from 'react-router-dom'
import {StyledTitle} from '../../../UIComponents/typography/atoms'
import {IconBox} from '../../../UIComponents/global-styles'

export const AuthButton = styled(ButtonUI)`
  && {
    width: 100% !important;
    justify-content: center;
    font-size: 14px;
    min-width: 190px !important;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const AuthButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${AuthButton} {
    width: unset !important;
  }
`

export const AuthTextLink = styled(Link)`
  letter-spacing: .3px;
  font-size: 12px;
  color: var(--dark-basic);
  line-height: 16px;
`

export const VerifyNumberInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    max-width: 255px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 17px;
    color: var(--dark-basic);
    margin-bottom: 0;
  }
  
  span {
    font-family: var(--medium-text);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--primary-dwed);
  }
`

export const OrgCreateGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 40px;
`

export const AuthAccountWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 80px;
  width: 250px;
  max-width: 250px;
`

export const AuthAccountItem = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  cursor: default;
  padding: 6px 0;

  ${IconBox} {
    margin-left: 6px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  ${StyledTitle} {
    margin-left: 12px;
    color: #fff;
    white-space: nowrap;
  }
`

export const AuthCloseLink = styled(Link)`
  position: absolute;
  right: 24px;
  top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;

  &:hover {
    color: #fff;
    transform: scale(1.03);
  }

  svg {
    width: 36px;
    height: 36px;
  }
`


export const AuthCloseButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
  border: none;
  background: transparent;
  padding: 0;
  box-shadow: none;
  outline: none;

  &:hover {
    color: #fff;
    transform: scale(1.03);
    cursor: pointer;
    box-shadow: none;
    border: none;
    outline: none;
  }

  svg {
    width: 36px;
    height: 36px;
  }
`
