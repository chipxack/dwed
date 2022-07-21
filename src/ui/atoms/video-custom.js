import styled from 'styled-components'

export const VideoRecorderUi = styled.div`
    /* display: none !important; */
    img{
      width: 100%;
    }
    .video-recorder__Wrapper-sc-7k20rv-0{
        display: flex;
        background: #ffffff;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #2C2C2E;
        letter-spacing: 0.4px;
        /* display: none !important; */
    }
    .iNKXiU, .cENmDr{
      position: static;
      transform: none;
    }
    .sc-fzqARJ{
      position: static;
    }
    .react-html5-camera-photo{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding-right: 28px;
      button{
        margin-top: 30px;
      }
      video{
        width: 100%;
      }
    }
    #container-circles{
      bottom: -30px;
    }
    #outer-circle{
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
      &:before{
        content: 'Снять';
      }
      #inner-circle{
        display: none;
      }
    }
`;
