import styled from "styled-components";
import {IconBox} from "../../global-styles";

export const LangSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const SelectedLang = styled.div`
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: .2s ease;
  display: flex;
  align-items: center;
  line-height: 24px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  color: var(--dark-basic);

  ${IconBox} {
    transition: .2s ease;
    margin-left: 4px;
    transform: scaleY(${({open}) => open ? 1 : -1});
  }

  &:hover {
    border-color: #F0F1F2;
  }
`

export const LangListWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 3px);
  z-index: 50;
`

export const LangList = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.17);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #F0F1F2;
`

export const LangItem = styled.div`
  text-align: center;
  line-height: 24px;
  padding: 6px 10px;
  color: var(--dark-basic);
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: .2s ease;
  
  &:hover {
    background-color: var(--input-bg);
  }
`