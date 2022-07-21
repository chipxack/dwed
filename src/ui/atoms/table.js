import {Table} from 'antd'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {IconBox} from "../../UIComponents/global-styles";
import {StyledTitle} from '../../UIComponents/typography/atoms'

export const TableClose = styled(IconBox)`
  color: var(--grey-basic);
  opacity: 0;
`

export const AntTable = styled(Table)`
  && {
    .ant-table thead > tr > th {
      background-color: #fff;
      text-transform: uppercase;
      font-size: 13px;
      color: var(--grey-basic);
      font-family: var(--demi-text);
      border-bottom: 1px solid var(--input-bg);
      padding: 12px;
    }

    .ant-table tbody > tr > td {
      padding: 0;
      border-bottom: 0;
      border-bottom: 1px solid var(--input-bg);
      background-color: #fff;
    }

    .ant-table tbody > tr {
      .has-hover {
        opacity: 0;
      }
      &:hover {
        ${TableClose} {
          opacity: 1;
        }

        .has-hover {
          opacity: 1;
        }
      }
    }

    .ant-table-pagination {
      padding: 0 24px
    }
  }
`

export const TableLink = styled(Link)`
  color: ${({color}) => color || 'var(--primary-dwed)'};
  font-size: 14px;
  font-family: var(--medium-text);
  padding: 12px;
  display: block;
  white-space: nowrap;

  ${StyledTitle} {
    font-size: 14px !important;
  }
  
  &:hover {
    color: ${({color}) => color || 'var(--primary-dwed)'};
  }
`

export const TableTitle = styled.div`
  color: var(--dark-basic);
  font-size: 14px;
  font-family: var(--medium-text);
  cursor: pointer;
  padding: 12px;
  
  ${StyledTitle} {
    font-size: 14px !important;
  }
`

export const QrCodeUI = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${IconBox} {
    position: relative;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--warning-dwed);
    position: absolute;
    top: -10px;
    right: -10px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  svg {
    width: 32px;
    height: 32px;
  }
`