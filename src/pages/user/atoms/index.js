import styled from 'styled-components'

export const UserPostRightBlock = styled.div`
  display: flex;
  background: #FBFBFB;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  h1{
    color: #2C2C2E;
    margin: 16px 24px 20px;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    display: flex;
  }
  div{
    width: calc(50% - 40px);
    margin: 0 20px 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    img{
      width: 64px;
      height: 64px;
      overflow: hidden;
      border-radius: 50%;
      margin-bottom: 4px;
      object-fit: cover;
    }
    span{
      color: #2C2C2E;
      letter-spacing: 0.25px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      &:nth-child(3){
        color: #8E8E93;
        letter-spacing: 0.4px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    }
  }
`