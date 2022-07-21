import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Timebox} from '../../account-job/atoms'


export const MediaBlock = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
`

export const MediaBlockHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  button {
    background: transparent;
    border: none;
    box-shadow: none;
    color: #83868D;

    &:hover {
      cursor: pointer;
      color: #1DA1F2;
    }
  }
`

export const StreamFormTitle = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    letter-spacing: 0.5px;
    color: #2C2C2E;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 28px;
    margin: 0 0 8px;
  }

  span {
    align-items: center;
    letter-spacing: 0.4px;
    color: #797979;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 24px;
  }
`

export const MediaContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const StreamSection = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #FFFFFF;
  //box-shadow: var(--shadow-dwed);
  height: 100%;

  img {
      // border: ${props => props.live ? '4px solid #FF0000' : '4px solid transparent'};
    display: block;
    width: 100%;
    height: 214px;
    border-radius: 4px;
    object-fit: cover;
  }
`

export const StreamSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #FFFFFF;
  box-shadow: var(--shadow-dwed);
  height: 100%;

  img {
      // border: ${props => props.live ? '4px solid #FF0000' : '4px solid transparent'};
    display: block;
    width: 100%;
    height: 214px;
    border-radius: 4px;
    object-fit: cover;
  }
`

export const StreamTitle = styled.div`
  display: flex;
  letter-spacing: 0.4px;
  color: var(--dark-basic);
  line-height: 20px;
  flex: 1;
  flex-direction: column;
  font-family: var(--medium-text);
  font-size: 13px;

  span {
    //margin-top: 4px;
    color: var(--grey-basic);
    font-size: 11px;
    line-height: 13px;
    font-family: var(--regular-text);
  }

  //span {
  //  display: flex;
  //  width: 100%;
  //  letter-spacing: 0.4px;
  //  font-weight: normal;
  //  font-size: 12px;
  //  line-height: 16px;
  //  color: rgba(38, 38, 38, 0.5);
  //  margin-top: 8px;
  //}
`

export const StreamConfigSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChannelBlock = styled.form`
  display: flex;
  flex-direction: column;

  h3 {
    color: #2C2C2E;
    letter-spacing: 0.5px;
    font-weight: 500;
    font-size: 15px;
    line-height: 28px;
  }

  h4 {
    color: #797979;
    letter-spacing: 0.4px;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;

    svg {
      width: 24px;
      margin-right: 10px;
    }

    span {
      flex: 1;
    }
  }

  & > div {
    display: flex;
    flex-direction: row;


    //span {
    //  &:nth-child(2) {
    //    margin-left: 36px;
    //    flex: 1;
    //    justify-content: center;
    //    display: flex;
    //    flex-direction: column;
    //
    //    h2 {
    //      color: #2C2C2E;
    //      letter-spacing: 0.5px;
    //      font-style: normal;
    //      font-weight: bold;
    //      font-size: 20px;
    //      line-height: 28px;
    //      margin: 0;
    //    }
    //
    //    h3 {
    //      color: #83868D;
    //      letter-spacing: 0.4px;
    //      font-style: normal;
    //      font-weight: normal;
    //      font-size: 14px;
    //      line-height: 19px;
    //    }
    //  }
    //}
  }

  img {
    width: 360px;
    height: 250px;
    border-radius: 4px;
    object-fit: cover;
  }

  h1 {
    color: #2C2C2E;
    letter-spacing: 0.5px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    margin: 0 0 32px;
    padding: 0;
  }
`

export const StreamControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;


  span {
    width: 50px;
  }

  button {
    border: none;
    background: transparent;
    padding: 0;
    width: 24px;
    height: 24px;
    margin-left: 16px;
  }
`

export const LiveWatchers = styled.div`
  height: 18px;
  width: initial;
  display: inline-flex;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  background: #4E4E4E;
  border-radius: 2px;
  color: #ffffff;
  padding: 0 5px;
  margin-left: 4px;

  span {
    color: #D9D9D9;
    margin: 0 0 0 2px;
  }
`

export const LiveWatchersBlock = styled.div`
  display: flex;

  svg {
    height: 18px;
  }
`

export const StreamConfigRouts = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  a {
    color: #8E8E93;
    letter-spacing: 0.15px;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 24px;
    margin-right: 24px;

    &.active {
      color: #2C2C2E;
    }
  }
`

export const StreamProgramsSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const StreamProgramsHead = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #F0F1F2;
  padding-bottom: 16px;
  justify-content: space-between;

  img {
    width: 68px;
    height: 68px;
    border-radius: 8px;
    object-fit: cover;
    overflow: hidden;
    margin-right: 16px;
  }

  span {
    color: #2C2C2E;
    letter-spacing: 0.15px;
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
  }
`

export const StreamProgramsBody = styled.div`
  display: flex;
  flex-wrap: wrap;

  h1 {
    color: #8E8E93;
    letter-spacing: 0.15px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    margin-top: 16px;
    width: 100%;
  }
`

export const AddAnnounce = styled.div`
  display: flex;

  button {
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    color: #2C2C2E;
    letter-spacing: 0.5px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    display: inline-flex;
    align-items: center;

    span {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #FBFBFB;
      border: 1px solid #F0F1F2;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #828282;
      margin-right: 16px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`

export const StreamProgramForm = styled.form`
  display: flex;
  flex-direction: column;

  & > img {
    width: 100%;
    margin-bottom: 16px;
  }
`

export const FormTimeBlock = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #000000;
    letter-spacing: 0.4px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    margin-right: 16px;
  }

  svg {
    color: #1DA1F2;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }


  ${Timebox} {
    background: transparent;
    border: none;
    padding: 0;
    height: initial;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 0.4px;
    display: inline-flex;
    width: initial;

    input {
      border: none;
      padding: 0;
      height: initial;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 16px;
      letter-spacing: 0.4px;
      width: initial;
      text-align: left;
    }
  }
`

export const AnnouncementBlock = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 16px;

  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    overflow: hidden;
    margin-right: 12px;
  }
`

export const AnnouncementTitle = styled.div`
  display: inline-flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 17px;
  color: #262626;
  padding-top: 8px;
  border-top: 1px solid #F2F2F2;
  flex: 1;

  span {
    font-size: 14px;
    line-height: 17px;
    color: #7F92A0;
    margin-top: 8px;
  }
`

export const AnnouncementBody = styled.div`
  color: #808080;
  letter-spacing: 0.4px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin-top: 16px;
  width: 100%;
`

export const StreamBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;


  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    margin-right: 8px;
  }
`

export const StreamBg = styled.div`
  display: flex;
  position: relative;

  div {
    &.bg {
      width: 100%;
      height: 196px;
      border-radius: 5px;
      // background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.0127407) 8.59%, rgba(0, 0, 0, 0.0485926) 17.48%, rgba(0, 0, 0, 0.104) 26.53%, rgba(0, 0, 0, 0.175407) 35.61%, rgba(0, 0, 0, 0.259259) 44.59%, rgba(0, 0, 0, 0.352) 53.34%, rgba(0, 0, 0, 0.450074) 61.73%, rgba(0, 0, 0, 0.549926) 69.63%, rgba(0, 0, 0, 0.648) 76.9%, rgba(0, 0, 0, 0.740741) 83.41%, rgba(0, 0, 0, 0.824593) 89.03%, rgba(0, 0, 0, 0.896) 93.63%, rgba(0, 0, 0, 0.951407) 97.08%, rgba(0, 0, 0, 0.987259) 99.25%, #000000 100%), url(${props => props.image}) no-repeat center;
      background: url(${props => props.image}) no-repeat center;
      background-size: contain;
    }

    &.live-block {
      position: absolute;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px;
      z-index: 1;
      flex-wrap: nowrap;

      svg {
        color: #FF5A5F;
      }

      span {
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
        height: 24px;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 100px;
        display: inline-flex;
        align-items: center;
        padding: 0 8px;
        //mix-blend-mode: multiply;
        width: initial;

      }
    }
  }
`