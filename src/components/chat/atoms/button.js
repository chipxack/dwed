import styled from "styled-components";


export const ChatButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1DA1F2;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  width: 66px;
  height: 66px;
  border-radius: 50%;
  overflow: hidden;
  color: #ffffff;
  border: none;
  padding: 0;

  &:hover, &:focus {
    cursor: pointer;
  }

  //svg{
  //  width: 38px;
  //  height: 38px;
  //}
`