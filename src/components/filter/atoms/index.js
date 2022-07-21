import styled from 'styled-components'
import {ButtonUI} from '../../../ui/atoms'
import {IconBox} from '../../../UIComponents/global-styles'
import {StyledTitle} from '../../../UIComponents/typography/atoms'

export const CategoryContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  align-items: center;
  padding: 36px 24px 24px 24px;
  transition: .3s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-dwed);
  }
`

export const CategoryImg = styled.div`
  margin-bottom: 32px;
  width: 86px;
  height: 86px;
  background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")` : 'unset'};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #E4E9F2;
  border-radius: 50%;
`

export const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`

export const CategoryTitle = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.75px;
  color: var(--dark-basic);

  span {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

export const CategoryHeading = styled.div`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 20px;
`

export const CategoryScroll = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 450px;
  padding: 8px 0;
`

export const OfferCatItemTitle = styled.div`
  font-size: 16px;
  flex-grow: 1;
  transition: .2s ease;
  line-height: 1.3;
`

export const OfferCatItemImg = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`

export const OfferCatItemContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;

  ${OfferCatItemTitle} {
    color: ${({selected}) => selected ? 'var(--primary-dwed)' : 'var(--dark-basic)'};
  }

  ${OfferCatItemImg} {
    svg {
      * {
        fill: ${({selected}) => selected ? 'var(--primary-dwed)' : 'var(--dark-basic)'} !important;
      }
    }
  }
`

export const CommonFieldCharItem = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.2;
  color: var(--dark-basic);
  padding: 2px 0;
  cursor: default;

  ${IconBox} {
    margin-right: 10px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const ColorFieldCharItem = styled(CommonFieldCharItem)`
  padding: 4px 0;
`

export const CharacterItem = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 280px;

  ${StyledTitle} {
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    line-height: 20px;

    ${IconBox} {
      margin-left: 6px;
      transform: rotate(${({showContent}) => showContent ? '-90deg' : 0});
      height: 20px;
      width: 20px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`

export const HomeFilterHeading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  ${ButtonUI} {
    text-transform: unset;
    font-weight: 400;
    font-size: 14px;
  }
`

export const HomePriceFilterWrapper = styled.div`
  .ant-slider-mark-text {
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .ant-slider-mark {
    top: 20px;
  }
`

