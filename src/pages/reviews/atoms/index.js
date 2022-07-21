import styled from 'styled-components'
import {StyledText, StyledTitle} from "../../../UIComponents/typography/atoms";

export const ReviewHeading = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 16px;
`

export const ReviewForm = styled.form`

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
  top: 100%;
  padding: 4px 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 500;
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

export const ReviewType = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  justify-content: space-between;
  width: 60px;
  
  svg {
    width: 24px;
    height: 24px;
  }
`

export const ReviewSpecialistInfo = styled.div`
  ${StyledTitle} {
    font-size: 16px;
  }
  
  ${StyledText} {
    font-size: 14px;
    font-weight: 20px;
  }
`