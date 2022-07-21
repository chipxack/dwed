import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {StyledTitle} from '../../../UIComponents/typography/atoms'
import {IconBox} from '../../../UIComponents/global-styles'
import pattern from '../../../assets/images/coupon_bg.svg'

export const SettingsNavLink = styled(NavLink)`
  color: var(--grey-basic);
  line-height: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.15px;
  font-family: var(--medium-text);
  transition: .2s ease;
  padding: 6px 0;
  margin: 6px 0;
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    color: var(--primary-dwed);
  }
  
  &.active {
    color: var(--primary-dwed);
  }
`

export const ProfileActivationBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  
  ${StyledTitle} {
    margin-bottom: 8px;
  }
`

export const SettingHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  cursor: ${({onClick}) => onClick ? 'pointer' : 'unset'};
  
  svg {
    transform: rotate(${({closed}) => closed ? 0 : -90}deg);
    transition: .2s ease-in;
    width: 18px;
    height: 18px;
  }
  
  ${IconBox} {
    margin-left: 12px;
  }
`

export const PersonalSettingsItem = styled.label`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #EDF1F7;
  padding: 20px;
`


export const CouponCard = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 288px;
  height: 150px;
  border-radius: 6px;
  background: url(${pattern}) no-repeat center center;
  background-color: ${({color}) => color || 'var(--danger-dwed)'};
  
  ${StyledTitle} {
    color: #fff;
    line-height: 20px;
    
    &.coupon-percent{
      font-size: 38px;
      line-height: 46px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    
    &.coupon-name {
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 10px;
      
    }
    
    &.coupon-offerings {
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    &.coupon-range {
      font-size: 12px;
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  
`
