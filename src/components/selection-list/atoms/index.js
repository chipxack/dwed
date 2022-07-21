import styled from 'styled-components'
import {StyledTitle} from "../../../UIComponents/typography/atoms";

export const ListHeading = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  ${StyledTitle} {
    margin-bottom: 24px;
  }
`

export const SelectedListWrapper = styled.div`
  min-height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ListWrapper = styled.div`
  width: 100%;
  min-height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 380px;
  margin-bottom: 32px;
`

export const ListContent = styled.div`
  padding-right: 16px;
  display: flex;
  align-items: center;
  border: 1px solid #E4E9F2;
  border-top: 0;
  background-color: ${({active}) => active ? 'rgba(51, 102, 255, 0.03)' : '#fff'};
  transition: .15s ease;

  &:first-child {
    border-top: 1px solid #E4E9F2;
  }
`

export const ListArrow = styled.div`
  display: flex;
  align-items: center;
  min-width: 24px;
  color: #8E8E93;
  margin-right: 4px;
`

export const ListTitle = styled.div`
  color: #2C2C2E;
  flex-grow: 1;
  font-weight: 500;
  padding: 6px 0 6px 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`


export const BreadcrumbItem = styled.div`
  cursor: ${({isText}) => isText ? 'default' : 'pointer'};
  padding: 4px 10px 4px 4px;
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
  color: ${({isText}) => isText ? '#2C2C2E' : '#8E8E93'};
  transition: .2s ease;

  &:hover {
    color: #2C2C2E;
  }

  &::after {
    content: '/';
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &:last-child::after {
    content: unset;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  &:first-child {
    padding-left: 0;
  }
`

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`