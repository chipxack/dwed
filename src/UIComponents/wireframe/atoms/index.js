import styled from "styled-components";

export const AccountWireframeHeader = styled.div`
  display: flex;
  flex-direction: column;
`

export const AccountWireframeMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`

export const AccountWireframeContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const LeftInfoBlockWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-height) - 100px);
`;

export const ContentInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  .ant {
    &-dropdown {
      &-link {
        &.ant-btn {
          background: var(--primary-dwed);
          border-radius: 4px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          padding: 0;
          outline: none;
          border: none;
          box-shadow: none;

          svg {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
`;

export const MerchandiseHeader = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid var(--input-bg);
  margin-bottom: 16px;
`

export const MerchandiseContent = styled.div`
`

