import styled from "styled-components";
import Modal from "antd/lib/modal/Modal";


export const FastAuthModal = styled(Modal)`
  max-width: 100vw;
  margin: 0 !important;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  top: 0;
  bottom: 0;

  .ant-modal-body {
    padding: 0;
  }
`