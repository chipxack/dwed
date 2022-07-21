import styled from "styled-components";

export const VideoRecorderUi = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  video {
    position: static;
    transform: unset;
    width: 100%;
    height: 230px;
    margin-bottom: 16px;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    right: -12px;
    background-color: #E5E5EA;
    top: 0;
  }

  img {
    width: 100%;
  }

  .video-recorder__Wrapper-sc-7k20rv-0 {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #2C2C2E;
    letter-spacing: 0.4px;
  }

  .video-recorder__CameraView-sc-7k20rv-1 {
    margin-bottom: 16px;
  }

  .react-html5-camera-photo {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-right: 28px;

    button {
      margin-top: 30px;
    }

    video {
      width: 100%;
    }
  }

  #container-circles {
    bottom: -30px;
  }

  #outer-circle {
    background: #1DA1F2;
    border-radius: 4px;
    width: 122px;
    height: 40px;
    display: ${props => props.status ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.75px;
    text-transform: uppercase;
    color: #FFFFFF;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    left: -61px;

    &:before {
      content: 'Снять';
    }

    #inner-circle {
      display: none;
    }
  }
`;

export const VideoDisconnectedView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: auto;
  color: var(--dark-basic);
  font-size: 13px;

  svg {
    color: var(--dark-basic);
  }

  svg {
    margin-bottom: 24px;
    width: 48px;
    height: 48px;
  }

  span {
    max-width: 220px;
  }
`;

export const InstructionBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: initial;
    display: flex;
  }
`
export const VideoActionWrapper = styled.div`
  margin-top: auto;
  width: 100%;
  min-height: 30px;

  svg {
    margin-right: 6px;
    width: 18px;
    height: 18px;
  }
`

export const RecCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 6px;
`

export const RecStop = styled.div`
  width: 12px;
  height: 12px;
  background-color: #fff;
  margin-right: 6px;
  border-radius: 2px;
`

export const RecActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;

  button:nth-child(2) {
    margin-left: 8px;
  }
`

export const VerifyingInstruction = styled.div`
  span {
    color: var(--primary-dwed);
  }
`

export const PhotoVerifyingWrapper = styled.div`
  display: flex;
  flex-direction: column;

  react-html5-camera-photo img,
  .react-html5-camera-photo video {
    width: 100%;
    height: auto;
  }
`

export const CameraWrapper = styled.div`
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
  align-items: center;

  .react-html5-camera-photo {
    margin-top: auto;
  }

  #container-circles {
    bottom: 55px;
    transform: scale(.5);
  }

  .react-html5-camera-photo > img, .react-html5-camera-photo > video {
    border-radius: ${({shape}) => shape === 'round' ? '50%' : '0'}  !important;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    right: -24px;
    background-color: #E5E5EA;
    top: 0;
  }

  img {
    width: 75%;
    height: auto;
    margin-top: 30px;
  }

  ${VideoActionWrapper} {
    display: flex;
    justify-content: center;
  }
`

export const UploadedImage = styled.div`
  width: 300px;
  height: 300px;
  background-image: url("${({imgUrl}) => imgUrl}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  margin-top: auto;
  border-radius: 50%;
`


export const ExampleItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    height: auto;
  }
`

export const ExampleType = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #F2F2F2;
  line-height: 24px;
  font-weight: 600;
  justify-content: center;
  text-transform: uppercase;
  margin-top: -4px;

  svg {
    margin-left: 10px;
    color: ${({type}) => type === 'success' ? '#00E58F' : 'var(--danger-dwed)'}
  }
`
