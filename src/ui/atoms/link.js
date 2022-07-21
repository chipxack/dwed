import styled from 'styled-components';
import {Link, NavLink} from "react-router-dom";


export const LinkBlock = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 0.4px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #8F9BB3;
`;

export const SubLink = styled(Link)`
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AccountOfferGroupItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  img, span{
    background: #B0DDC6;
    border-radius: 4px;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
  }
`;

export const SpecialistCategoryItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  span{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: #2C2C2E;
    border-bottom: 2px solid transparent;
    transition: .3s;
  }
  &.active, &:hover, &:focus{
    span{
      border-color: #1DA1F2;
    }
  }
`;

export const OrganizationSpecialistItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  flex-direction: column;
  transition: .3s;
  div{
    display: table-caption;
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #2C2C2E;
    margin-top: 8px;
    span{
      display: block;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.4px;
      color: #8E8E93;
    }
  }
  img{
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    border: 2px solid transparent;
    transition: .3s;
  }
  &.active, &:hover, &:focus{
    img{
      border-color: #1DA1F2;
    }
  }
`;