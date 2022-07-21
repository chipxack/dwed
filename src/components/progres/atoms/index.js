import styled, {keyframes} from "styled-components";

export const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.column ? 'column' : 'initial'};
`

export const ProgressOuter = styled.div`
  position: relative;
  height: 6px;
  background: #F2F2F7;
  border-radius: 8px;
  margin-left: ${props => props.column ? '0px' : '8px'};
  flex-grow: 1;
  width: ${props => props.column ? '100%' : 'initial'};
`

export const ProgressValue = styled.div`
  color: ${({color}) => color ? color : '#1DA1F2'};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  margin-right: 8px;
`


export const getProgressBar = ({width}) => {
    return keyframes`
      0% {
        width: 0;
      }
      100% {
        width: ${width}%;
      }
    `
}

export const ProgressInner = styled.div`
  position: absolute;
  height: 100%;
  border-radius: 8px;
  width: ${({width}) => width ? width : 0}%;
  background-color: ${({color}) => color ? color : '#1DA1F2'};
  left: 0;
  top: 0;
  z-index: 2;
  box-shadow: ${({shadowColor}) => shadowColor ? `0 1px 4px ${shadowColor}` : 'unset'};
  transition: .3s ease;
  
  &.animate {
    animation: ${getProgressBar} 0.8s;
    animation-fill-mode: forwards;
  }
`

export const RateProgressItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: var(--dark-basic);
  font-weight: 500;
  position: relative;
  font-size: 16px;
`

export const ProgressBall = styled.div`
  position: absolute;
  bottom: 100%;
  padding: 4px 0;
  font-size: 14px;
  font-weight: 400;
`

export const RateButton = styled.button`
  margin: 0 8px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #F2F2F7;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 12px;
    height: 12px;
  }
`
