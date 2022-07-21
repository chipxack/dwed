import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {StyledText, StyledTitle} from '../../../UIComponents/typography/atoms'
import {Row} from 'antd'
import {IconBox} from '../../../UIComponents/global-styles'
import {ButtonUI} from '../../../ui/atoms'

export const MerchandiseMenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--grey-basic);

  &:hover {
    color: var(--grey-basic);
  }

  svg {
    margin-right: 8px;
  }

  ${StyledTitle} {
    color: var(--grey-basic);
  }

  &.active {
    ${StyledTitle} {
      color: var(--dark-basic);
    }

    &:hover {
      ${StyledTitle} {
        color: var(--dark-basic);
      }
    }
  }
`


export const SellerList = styled(Row)`
  .splide {
    width: 100%;
  }

  .splide__slide {
    padding: 10px;
  }
`

export const CartItem = styled.div`
  padding: 10px 16px;
  border-bottom: 1px solid var(--input-bg);
`

export const CartItemLink = styled(NavLink)`
  border-radius: 6px;
  box-shadow: var(--shadow-dwed);
  display: block;
  transition: .2s ease;

  .cart-info {
    padding: 10px 16px;
    line-height: 20px;
  }

  &:hover {
    box-shadow: var(--shadow-hover-dwed);
  }

  &.active {
    box-shadow: var(--shadow-hover-dwed);
  }
`

export const CartSpecialistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CartSpecialistItem = styled(NavLink)`
  display: block;
  margin-bottom: 16px;
  opacity: ${({selected}) => selected ? 0.5 : 1};

  &.active {
    opacity: 1;
  }
`

export const CartOfferingWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`

export const CartOfferingImg = styled.div`
  min-width: 60px;
  min-height: 60px;
  max-width: 60px;
  max-height: 60px;
  background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")` : 'unset'};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`

export const CartOfferingContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;

  ${IconBox} {
    color: var(--dark-basic);

    &:hover {
      color: var(--danger-dwed);
    }
  }

  ${StyledTitle} {
    line-height: 1.3;

    span {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`

export const QtyActionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  input {
    border: 0;
    background: none;
    outline: none;
    width: 50px;
    font-size: 14px;
    text-align: center;
  }
`

export const CartQtyBtn = styled(IconBox)`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid var(--grey-basic);
  color: var(--grey-basic);
  transition: .2s ease;

  svg {
    width: 18px;
    height: 18px;
  }
`

export const CheckoutWrapper = styled.div`
  padding: 15px 0;
  border-bottom: ${({bordered}) => bordered ? '1px solid var(--input-bg)' : 0};
`

export const CheckoutDetailWrapper = styled.div`
  padding: 24px;
  border: 1px solid var(--input-bg);
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  ${StyledTitle} {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const OrderQRActionButton = styled(ButtonUI)`
  min-width: 120px;
  justify-content: center;

  svg {
    margin-right: 8px;
  }
`

export const SpecDateItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 76px;
  height: 86px;
  border-radius: 6px;
  background-color: var(--input-bg);
  color: var(--dark-basic);
  
  ${StyledTitle} {
    color: var(--dark-basic);
  }

  ${StyledText} {
    color: var(--dark-basic);
    font-family: var(--regular-text);
  }
  
  &:hover,
  &.active{
    background-color: var(--primary-dwed);
    
    ${StyledTitle},
    ${StyledText} {
      color: #fff;
    }
  }
`

export const MeetTimeItem = styled(NavLink)`
  display: block;
  margin-bottom: 12px;
  border-radius: 6px;
  background-color: var(--input-bg);
  width: 75px;
  height: 50px;
  font-family: var(--medium-text);
  
  &:hover,
  &.active{
    background-color: var(--primary-dwed);
    
    ${StyledTitle} {
      color: #fff;
    }
  }
  
  ${StyledTitle} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const MeetTimeUIBox = styled.div`
  margin-bottom: 12px;
  border-radius: 6px;
  background-color: var(--input-bg);
  width: 75px;
  height: 50px;
  background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")`: 'unset'};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  
  ${StyledTitle} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

