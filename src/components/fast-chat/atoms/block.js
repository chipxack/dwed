import styled from 'styled-components'


export const FastChatBodySection = styled.div`
  display: flex;

  & > div {
    color: #2C2C2E;
    letter-spacing: 0.25px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-top: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const FastChatSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const FastChatFormBlock = styled.div`
  display: flex;
  align-items: center;
  background: #F9F9F9;
  border-radius: 8px;
  height: 42px;
  margin-top: 16px;

  input {
    flex: 1;
    border: none;
    outline: none;
    color: #A0A0A0;
    font-size: 12px;
    line-height: 16px;
    background: transparent;
    padding: 0 15px;

    &::placeholder {
      letter-spacing: 0.4px;
      color: #A0A0A0;
      font-size: 12px;
      line-height: 16px;
      outline: none;
    }
  }

  button {
    width: 40px;
    height: 40px;
    background: #1DA1F2;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    box-shadow: none;
    border: none;
    padding: 0;
    
    &:hover, &:focus{
      cursor: pointer;
    }

    svg {
      width: 24px;
      height: 24px;
      transform: rotate(45deg) translateX(-3px) translateY(3px);
    }
  }
`