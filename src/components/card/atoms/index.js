import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Row} from 'antd'
import {IconBox} from '../../../UIComponents/global-styles'
import {StyledText, StyledTitle} from '../../../UIComponents/typography/atoms'

export const CommonCardItem = styled.div`
  padding: var(--basic-offset);
  background-color: #fff;
  box-shadow: var(--shadow-dwed);
  border-radius: 4px;
  transition: .2s ease;
  position: relative;

  .account-card-link {
    display: block;
  }

  .profile-subscribe {
    transition: .2s ease;
    cursor: pointer;
    line-height: 1.2;
    position: absolute;
    right: 12px;
    top: 14px;
    z-index: 5;
    padding: 2px 4px;
  }

  &:hover {
    box-shadow: var(--shadow-hover-dwed);
  }
`

export const CommonCardImage = styled.div`
  position: relative;
  height: 74px;
  width: 74px;
  border-radius: 50%;

  img {
    width: 74px;
    height: 74px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
  }
`

export const CommonCardItemTitle = styled(StyledTitle)`
  display: flex;
  align-items: center;
  min-height: 24px;
  font-size: 16px;

  svg {
    margin-left: 8px;
  }
`

export const CommonCardItemCaption = styled.div`
  letter-spacing: 0.4px;
  color: var(--grey-basic);
  font-size: 14px;
  line-height: 18px;
  min-height: 18px;
`

export const ProductSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({selected}) => selected ? 1 : 0};
  transition: .2s ease all;
  cursor: pointer;
  color: ${({selected}) => selected ? 'var(--primary-dwed)' : 'var(--grey-basic)'};
`

export const ProductOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(39, 39, 39, .8) 0%, rgba(0, 0, 0, 0) 100%);
  transition: .3s ease;
  opacity: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`

export const ProductImg = styled.div`
  position: relative;
  border-radius: 4px;
  transition: .2s ease;
  filter: ${({selected}) => selected ? 'unset' : 'drop-shadow(var(--shadow-dwed))'};

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
`

export const ProductCardContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({selected}) => selected ? '#fff' : 'transparent'};
  border-radius: 0 0 4px 4px;
  transition: .2s ease all;
  box-shadow: ${({selected}) => selected ? 'var(shadow-hover-dwed)' : 'unset'};

  &:hover {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    ${ProductSelect} {
      opacity: 1;
    }

    ${ProductOverlay} {
      opacity: 1;
    }

    ${ProductImg} {
      filter: unset;
    }
  }
`

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0.25px;
  line-height: 24px;
  padding: 8px 12px;
`

ProductContent.Title = styled(Link)`
  color: rgba(31, 31, 31, 0.74);
  font-size: 16px;
  font-weight: 400;
  display: block;
  line-height: 1.2;
  margin-bottom: 4px;

  &:hover {
    color: rgba(31, 31, 31, 0.74);
    text-decoration: underline;
  }

  span {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

ProductContent.Price = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: var(--dark-basic);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
`

export const ProductOwner = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #fff;
`

export const ProductOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  color: #fff;
  flex-grow: 1;
  position: relative;
  z-index: 100;
`

ProductOverlay.Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #fff;
  width: 100%;

  svg {
    margin-left: 6px;
  }

  span {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`

ProductOverlay.Quantity = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  span {
    display: block;
    margin-left: 12px;
  }

  ${IconBox} {
    margin-left: 8px;
  }
`

export const ProductSelectedCount = styled.div`
  margin-left: 6px;
`

export const HorizontalMenuCardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 145px;
  max-width: ${({fixedSize}) => fixedSize ? '145px' : 'unset'};
  overflow: hidden;
  cursor: pointer;
  transition: .2s all ease;
  padding: ${({offset}) => offset ? offset : '6px 12px'};
  border-radius: 4px;
  opacity: ${({unselected}) => unselected ? 0.4 : 1};
`

export const ProdcutActionWrapper = styled(Row)`
  position: relative;
  margin-top: auto;

  ${IconBox} {
    background-color: #fff;
    box-shadow: var(--shadow-dwed);
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const ShortAccountCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  a {
    color: var(--dark-basic);
    transition: .2s ease;
    font-size: 16px;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
      color: var(--primary-dwed);
    }
  }

  ${StyledTitle} {
    white-space: nowrap;
    font-size: 16px;
    font-family: var(--medium-text);
  }

  ${StyledText} {
    white-space: nowrap;
    font-size: 13px;
    font-family: var(--regular-text);
  }
`

export const ShortAccountCardImg = styled.div`
  position: relative;
  border-radius: 50%;
`

export const OfficialUser = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1px;
  right: 0;
`

ShortAccountCardContent.Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  min-height: 24px;
  letter-spacing: 0.15px;
  color: #2C2C2E;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

ShortAccountCardContent.Text = styled.div`
  font-size: 12px;
  line-height: 16px;
  min-height: 16px;
  letter-spacing: 0.25px;
  color: #8E8E93;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const ShortAccountCardWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({direction}) => direction === 'vertical' ? 'column' : 'row'};
  width: 100%;

  ${ShortAccountCardContent} {
    align-items: ${({direction}) => direction === 'vertical' ? 'center' : 'flex-start'};
    width: 100%;

    a {
      text-align: ${({direction}) => direction === 'vertical' ? 'center' : 'left'};
    }
  }

  ${ShortAccountCardImg} {
    margin: ${({direction}) => direction === 'vertical' ? '0 0 12px 0' : ' 0 12px 0 0'};
  }
`
