import styled from 'styled-components'
import {ProgressValue} from '../../../components/progres/atoms'
import {ButtonUI} from '../../../ui/atoms'

export const PostStreamSection = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  flex-direction: column;
  margin-top: 16px;

  h1 {
    font-style: normal;
    font-family: var(--medium-text);
    font-size: 18px;
    line-height: 21px;
    color: var(--dark-basic);
    margin-bottom: 16px;
  }
`

export const PostStreamBlock = styled.div`
  display: flex;

  h2 {
    color: #FFFFFF;
    font-style: normal;
    font-family: var(--medium-text);
    font-size: 16px;
    line-height: 19px;
    position: absolute;
    left: 15px;
    bottom: 15px;
    margin: 0;
    z-index: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1;
  }
`

export const StreamThumbnail = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.0127407) 9.99%, rgba(0, 0, 0, 0.0485926) 19.88%, rgba(0, 0, 0, 0.104) 29.6%, rgba(0, 0, 0, 0.175407) 39.05%, rgba(0, 0, 0, 0.259259) 48.15%, rgba(0, 0, 0, 0.352) 56.8%, rgba(0, 0, 0, 0.450074) 64.92%, rgba(0, 0, 0, 0.549926) 72.41%, rgba(0, 0, 0, 0.648) 79.2%, rgba(0, 0, 0, 0.740741) 85.19%, rgba(0, 0, 0, 0.824593) 90.28%, rgba(0, 0, 0, 0.896) 94.4%, rgba(0, 0, 0, 0.951407) 97.45%, rgba(0, 0, 0, 0.987259) 99.35%, #000000 100%), url(${props => props.img}) center center no-repeat;
  background-size: contain;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  //box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  //object-fit: cover;
`


export const PostOrgsBlock = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  flex-direction: column;

  & > h1 {
    color: var(--dark-basic);
    letter-spacing: 0.4px;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    margin: 0;
  }
`

export const PostOrgItem = styled.div`
  background: #FFFFFF;
  box-shadow: var(--shadow-dwed);
  border-radius: 4px;
  display: flex;
  width: 100%;
  padding: 24px 16px;
  align-items: center;
  height: 100%;
  flex-direction: column;

  a {
    color: var(--dark-basic);
    letter-spacing: 0.15px;
    font-style: normal;
    font-family: var(--medium-text);
    font-size: 16px;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
    margin-top: 18px;
  }

  span {
    color: var(--grey-basic);
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 16px;

    &.subscribe {
      color: var(--primary-dwed);
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;

      &.subscribed {
        cursor: initial;
        color: var(--grey-basic);
      }

      &:hover, &:focus {
        cursor: pointer;
      }
    }
  }

  ${ProgressValue} {
    margin: 0;
  }
`

export const PostOfferItem = styled.div`
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: var(--shadow-dwed);
  border-radius: 4px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  flex-direction: column;

  h1 {
    letter-spacing: 0.15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin-top: 10px;
    padding: 0 15px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
    color: var(--dark-basic);

  }

  span {
    color: var(--grey-basic);
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }
`

export const PostOfferBlock = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  flex-direction: column;

  & > h1 {
    color: var(--dark-basic);
    letter-spacing: 0.4px;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    margin: 0;
  }

`

export const HomeList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;

  .ant-spin {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
`

export const HomeOfferingCatContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .splide__slide {
    padding: 3px;
  }

  .tns-inner {
    display: flex;
    align-items: center;
  }
`

export const HomeOfferingCatItem = styled.a`
  display: flex;
  cursor: pointer;
  line-height: 20px;
  align-items: center;
  letter-spacing: 0.25px;
  white-space: nowrap;
  color: var(--dark-basic);
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: var(--shadow-dwed);
  justify-content: center;
  height: 40px;
  transition: .2s ease;


  &:hover {
    background-color: var(--primary-dwed);
    box-shadow: var(--shadow-hover-dwed);
    color: #fff;
  }
`

// export const HomeOfferingCatSvg = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 8px;
//   min-width: 20px;
//   min-height: 20px;
// `

export const PostOfferOrg = styled.div`
  display: flex;
  padding: 0 16px;
  width: 100%;
  align-items: center;
  margin-bottom: 14px;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    margin-right: 8px;
  }

  span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    color: #999999;
    flex: 1;
    margin: 0;
  }
`


export const PostPrice = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  ${ButtonUI} {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    outline: none;
    color: var(--dark-basic);
    width: 24px !important;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover, &:focus {
      background: transparent;
    }
  }

  & > span {
    color: var(--primary-dwed);
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    margin: 0;
  }
`

export const PostStreamWatcher = styled.div`
  display: flex;
  height: 26px;
  background: #4D4D4D;
  border-radius: 5px;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  position: absolute;
  top: 15px;
  right: 71px;
  line-height: 16px;
  align-items: center;
  padding: 5px 10px;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 3px;
  }
`

export const PostStreamLive = styled.div`
  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;
  background: #FF1A1A;
  border-radius: 5px;
  height: 26px;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  padding: 5px 10px;
`


export const PostOrgItemAvatar = styled.div`
  display: inline-flex;
  position: relative;

  img {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }

  svg {
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
  }
`