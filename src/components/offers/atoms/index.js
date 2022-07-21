import styled from 'styled-components'
import {StyledTitle} from '../../../UIComponents/typography/atoms'
import {ButtonUI, CommonForm, GridCustom} from '../../../ui/atoms'
import {SkeletonUI} from '../../../UIComponents/global-styles'

export const OffersGroupItem = styled.div`
  width: 120px;
  height: 120px;
  background: url("${({imgUrl}) => imgUrl}") no-repeat center center;
  background-size: cover;
  border-radius: 4px;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid ${({active}) => active ? 'var(--primary-dwed)' : 'transparent'};
    left: 0;
    top: 0;
    transition: .2s ease all;
    border-radius: 4px;
  }
`

export const OfferDetailParamsWrapper = styled.div`

  ${StyledTitle} {
    margin-bottom: 16px;
  }

  ${GridCustom} ${StyledTitle} {
    margin-bottom: 0;
  }
`

export const OfferCharacsItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  ${StyledTitle} {
    margin-bottom: 0;
    line-height: 20px;
  }
`

export const OfferCharacsLine = styled.div`
  height: 1px;
  flex-grow: 1;
  border: 1px dashed #D1D1D1;
  margin: 0 16px;
`

export const OfferingDetail = styled.div`
  -webkit-user-select: none;

  ${StyledTitle} {
    margin-bottom: 12px;
  }

  ${ButtonUI} {
    margin-top: 24px;
    justify-content: center;
  }
`

export const OfferingSeperate = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #F0F1F2;
`

export const OfferingDetailItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
  cursor: ${({onClick}) => !!onClick ? 'pointer' : 'default'};

  ${StyledTitle} {
    margin-bottom: 0;
    margin-right: 16px;

    &.offer-title {
      font-size: 18px;
      margin-right: 0;
    }
  }
`

export const OfferingDetailDesc = styled.div`
  ${StyledTitle} {
    white-space: pre-wrap;
    line-height: 1.4;
  }

  ${SkeletonUI} {
    margin-bottom: 8px;
  }
`

export const DetailShowMore = styled.span`
  color: var(--primary-dwed);
  text-decoration: underline;
  cursor: default;
`

export const OfferingGallery = styled.div`
  .image-gallery-thumbnail {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid transparent;

    &.active, &:hover, &:focus {
      border: 1px solid var(--primary-dwed);
    }
  }

  .image-gallery-content.fullscreen {
    background: unset;
  }

  .image-gallery.fullscreen-modal {
    background: rgba(0, 0, 0, .3);
    z-index: 150;
  }

  .image-gallery-thumbnail {
    width: 90px;
  }

  .image-gallery-fullscreen-button {
    padding: 5px;
  }

  .image-gallery-fullscreen-button .image-gallery-svg, {
    width: 24px;
    height: 24px;
  }

  .image-gallery-thumbnail + .image-gallery-thumbnail {
    margin-left: 16px;
  }
`

export const GalleryPhotoItem = styled.div`
  background-image: url(${({imgUrl}) => imgUrl});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 70px;
`

export const LargePhoto = styled.div`
  width: 100%;
  // height: 320px;
    // background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")` : 'unset'};
  // background-position: center center;
  // background-size: contain;
  // background-repeat: no-repeat;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

const getBadgeColor = ({type}) => {
    switch (type) {
        case 'cashback':
            return 'var(--warning-dwed)'
        case 'payback':
            return 'var(--danger-dwed)'
        case 'discount':
            return 'var(--info-dwed)'
        default:
            return 'var(--primary-dwed)'
    }
}

export const OfferingDiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 0;
`
export const OfferingDiscountItem = styled.div`
  ${StyledTitle} {
    margin: 0;
  }

  &:last-child {
    width: unset;
    padding-left: 44px;
  }
`

export const OfferingDiscountBadge = styled.div`
  display: inline-block;
  padding: 0 9px;
  height: 27px;
  font-weight: 600;
  font-size: 16px;
  line-height: 27px;
  color: #fff;
  background-color: ${getBadgeColor};
  border-radius: 4px;
  width: 105px;
  text-align: center;
`

export const OfferingDiscount = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 11px;
`

export const OfferingForm = styled(CommonForm)`
  ${StyledTitle} {
    margin-bottom: 12px;
    font-size: 18px;
  }
`

export const ColorFormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${ButtonUI} {
    font-size: 16px;
    font-weight: 600;
    text-transform: unset;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: var(--primary-dwed);
    }
  }
`

export const ColorListWrapper = styled.div`
  padding: 24px;
  background-color: #FBFBFB;
  border: 1px solid #F0F1F2;
  border-radius: 4px;

  input {
    background-color: #FEFEFE;
    outline: none;
    padding: 5px 14px;
    border: 1px solid #F0F1F2;
    line-height: 24px;
    width: 250px;
    border-radius: 4px;
    color: var(--dark-basic);
    font-weight: 500;
    font-size: 14px;
    font-family: "Roboto", sans-serif;

    &::placeholder {
      color: var(--grey-basic);
    }
  }
`

export const ColorList = styled.div`
  margin-top: 24px;
`

export const ColorItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const SelectedColor = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: #FBFBFB;
  border: 1px solid #F0F1F2;
  border-radius: 4px;
  margin-bottom: 12px;
`