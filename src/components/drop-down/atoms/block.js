import styled from "styled-components";

export const DropDownSection = styled.div`
  display: flex;
  position: relative;
  //z-index: 9;
  //opacity: 0;

  button {
    background: transparent;
    width: 24px;
    padding: 0;
    color: #231F20;
    height: 24px;

    &:hover {
      background: transparent;
      color: #231F20;

    }
  }
`

export const DropDownSectionBlock = styled.div`
  display: flex;
  position: absolute;
  right: 24px;
  bottom: 0;
  transition: .3s;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  opacity: ${props => props.status ? 1 : 0};
  visibility: ${props => props.status ? 'visibility' : 'hidden'};
`

export const DropDownClick = styled.div`
  display: flex;
`