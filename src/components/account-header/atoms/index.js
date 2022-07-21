import styled from 'styled-components'
import SlideDown from 'react-slidedown'
import {Link} from 'react-router-dom'


export const AccountHeaderGrid = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AccountHeaderSlideDown = styled(SlideDown)`
  ${AccountHeaderGrid} {
    padding-top: 16px;
  }
`

export const StyledAccountAvatar = styled.div`
  width: 80px;
  height: 80px;
  max-width: 80px;
  max-height: 80px;
  border-radius: 50%;
  overflow: hidden;

  .ant-image {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-image-mask-info {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const AccountHeaderInfoContent = styled(Link)`
  display: flex;
  flex-direction: column;
`

export const AccountHeaderDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: baseline;
  cursor: pointer;
  padding: 0 7px;
  transition: .3s ease;
  transform: scaleY(${({active}) => active ? -1 : 1});
  margin-top: -12px;
`

export const AccountHeaderProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const AccountHeaderProgressItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({color}) => color};
  padding: 0 12px;
  cursor: default;

  svg {
    margin-right: 6px;
  }
`

export const AccountHeaderReviewWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const AccountHeaderReviewItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: var(--dark-basic);
  font-weight: 600;
  cursor: default;

  svg {
    margin-right: 8px;
  }
`

export const AccountHeaderContactWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-gap: 20px;
`

export const AccountHeaderContactItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #E9F5FE;
  color: #231F20;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const AccountHeaderSubscribeWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const AccountHeaderSubscribeItem = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  text-align: center;
  font-family: var(--medium-text);
  line-height: 24px;
  color: var(--dark-basic);
  cursor: pointer;
  text-transform: lowercase;

  span {
    font-size: 12px;
    line-height: 16px;
    font-family: var(--regular-text);
    display: block;
    margin-left: 8px;
  }
`
