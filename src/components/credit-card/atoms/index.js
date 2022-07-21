import styled from 'styled-components'
import {StyledTitle} from '../../../UIComponents/typography/atoms'

export const CreditCardItem = styled.div`
  width: 294px;
  height: 167px;
  background-image: ${({url}) => `url("${url}")`};
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 12px;
  padding: 16px;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  position: relative;
  overflow: hidden;

  .not-verified {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(38, 38, 38, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    button {
      margin-top: 8px;
    }
  }

  .remove-card {
    position: absolute;
    top: 16px;
    right: 16px;
    color: #fff;
    z-index: 3;
  }

  ${StyledTitle} {
    color: #fff;
    font-size: 24px;
    line-height: 29px;
  }
`

export const CreditCardSelect = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: var(--grey-basic);
  justify-content: space-between;
  padding: 8px 0;
  line-height: 24px;
  border-bottom: 1px solid var(--grey-basic);
  cursor: pointer;

  .card-chevron {
    transition: .2s ease;
    transform: scaleY(${({open}) => open ? -1: 1});
  }

  .card-info {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }
`

export const CreditCardSelectDropdown = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(100% + 12px);
  z-index: 4;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: var(--shadow-dwed);
  background-color: #fff;
  padding: 8px 0;
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
  opacity: ${({open}) => open ? 1 : 0};
  transition: .2s ease;
  }

  .MuiTypography-root {
    color: var(--dark-basic);
    font-size: 14px;
  }

  .PrivateSwitchBase-root-5 {
    padding: 8px;
  }

  .card-radio {
    margin: 0;
    padding-left: 8px;
    padding-right: 16px;

    &:hover {
      background-color: var(--input-bg);
    }
  }

  .add-card {
    flex-direction: row;
    padding-left: 16px;
    font-family: var(--medium-text);

    svg {
      margin-right: 8px;
    }
  }
`


