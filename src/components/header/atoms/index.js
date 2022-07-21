import styled from 'styled-components'
import {Link, NavLink} from "react-router-dom";
import {InputBlock} from "../../../ui/atoms";
import {IconBox} from "../../../UIComponents/global-styles";
import {Col} from 'antd'
import qrSvg from '../../../assets/images/qr.svg'

export const SearchSection = styled.div`
  display: flex;
  align-self: center;
  color: var(--primary-dwed);
  flex-direction: column;
  margin: 0 16px 0 0;
  transition: .3s;
`;

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 960px;
  width: 100%;
  height: 100%;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  margin-left: auto;
`;

export const HeaderStaticWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: var(--header-height);
`

export const HeaderSection = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  height: var(--header-height);
  align-items: flex-start;
  background-color: #fff;
  transition: 0.25s ease;
`;

export const HeaderFiltersBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 0 0 35px;
  transition: .2s ease;
  width: 100%;
`;


export const HeaderFilterItem = styled(Col)`
  display: flex;
  align-items: center;
  
  .custom-link {
    background: transparent;
    border-radius: 100px;
    font-size: 14px;
    font-weight: normal;
    height: 100%;
    display: inline-flex;
    align-items: center;
    transition: .3s ease-in-out;

    svg {
      color: var(--grey-basic);
      width: 24px !important;
      height: 24px !important;
    }

    &:first-child {
      margin-left: 0;
    }

    &:hover {
      color: var(--primary-dwed);

      svg {
        color: var(--primary-dwed);
      }
    }

    &.active {
      color: var(--primary-dwed);

      svg {
        color: var(--primary-dwed);
      }
    }
  }
`

export const HeaderSettingWrap = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderSettingItem = styled.div`
  cursor: pointer;
  color: ${({active}) => active ? 'var(--primary-dwed)' : 'var(--grey-basic)'};
  transition: .2s ease-in-out;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--primary-dwed)
  }

  &:first-child {
    margin-right: 12px;
  }

  svg {
    width: 24px !important;
    height: 24px !important;
  }
`

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: var(--primary-dwed);
`

export const HeaderSearchWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-dwed);
  transition: .3s ease;
`;


export const SignLink = styled(Link)`
  display: flex;
  position: relative;
  z-index: 1;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  align-items: center;
  letter-spacing: 0.5px;
  color: var(--dark-basic);
  margin-left: auto;

  svg {
    margin-left: 10px;
  }
`

export const SignBlock = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  z-index: 1;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  align-items: center;
  letter-spacing: 0.5px;
  color: var(--dark-basic);
  margin-left: auto;

  svg {
    margin-left: 10px;
  }
`

export const ExitFromProfile = styled.div`
  color: var(--dark-basic);
  cursor: pointer;
  position: absolute;
  right: 22px;
  top: 24px;
  z-index: 4;

  ${IconBox} {
    
    &.main-box {
      background-color: #f2f2f2;
      border-radius: 50%;
      width: 42px;
      height: 42px;
    }
    
    color: var(--dark-basic);
    position: relative;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  button {
    padding: 0;

    svg {
      width: 12px;
      height: 18px;
    }
  }
`

export const CurrentProfile = styled.div`
  position: relative;
  padding: var(--basic-offset) var(--basic-offset) 0 var(--basic-offset);
  margin-bottom: var(--basic-offset);
  min-width: 320px;
  max-width: 320px;
`

export const ProfileSettings = styled(Link)`
  color: var(--dark-basic);
  position: absolute;
  left: 24px;
  top: 24px;
  z-index: 4;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  
  &:hover {
    color: var(--dark-basic);
  }
`

export const CurrentProfileWrapper = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`

export const ProfileImage = styled.div`
  background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")` : 'unset'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 24px;
`

CurrentProfile.Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`

CurrentProfile.Title = styled.div`
  font-size: var(--basic-offset);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.15px;
  color: #2C2C2E;
  line-height: var(--basic-offset);
`

CurrentProfile.Text = styled.div`
  font-size: 14px;
  color: ${({color}) => color || '#8E8E93'};
  letter-spacing: 0.25px;
  line-height: 20px;
`

export const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--basic-offset) 0;
`

export const AccountListHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--basic-offset);
  padding: 0 16px;
  
  .line {
    margin-left: 16px;
    flex-grow: 1;
    height: 1.5px;
    background-color: #f2f2f2;
  }
`

export const AccountItem = styled.div`
  padding: 6px 16px;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .2s ease;
  
  &:hover {
    background-color: #f2f2f2;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  ${IconBox} {
    opacity: 1;
    width: 24px;
    height: 24px;
    color: var(--danger-dwed);
  }
`

export const AccountItemLink = styled(Link)`
  padding: 6px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .2s ease;
`

export const AccountAction = styled(Link)`
  padding: 12px 36px;
  border-top: 1px solid #E4E9F2;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 24px;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-dwed);
  transition: .15s ease-in;

  &:hover {
    opacity: .8;
  }

  svg {
    width: 12px;
    height: 12px;
    margin-right: 6px !important;
  }
`

export const HeaderQR = styled(NavLink)`
  cursor: pointer;
  padding: 4px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  background-color: var(--grey-basic);
  transition: .2s ease;
  -webkit-mask: url("${qrSvg}") center center no-repeat;
  -webkit-mask-size: contain;
  width: 24px;
  height: 24px;
  
  &.active {
    background-color: var(--primary-dwed);
  }
`

export const SearchFormWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const Search = styled.form`
  flex-grow: 1;
  max-width: 240px;
  transition: .2s ease;
  width: 100%;

  ${InputBlock} {
    input {
      padding-top: 3px !important;
      padding-bottom: 3px !important;
      transition: .2s ease;
    }

    ${IconBox} {
      height: 30px;
    }
  }
`

export const AccountMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  
  .accounts-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 500px;
  }
`

export const HeaderNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--grey-basic)
`

export const HeaderNotificationCount = styled.div`
  position: absolute;
  right: -4px;
  top: -4px;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  color: #fff;
  padding: 2px 4px;
  background-color: var(--danger-dwed);
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`


