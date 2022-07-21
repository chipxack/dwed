import styled from "styled-components";

export const DotUi = styled.div`
  display: flex;
  width: ${props => props.size ? props.size : 3}px;
  height: ${props => props.size ? props.size : 3}px;
  border-radius: 50%;
  background: #999999;
  overflow: hidden;
  margin: 0 10px;
`