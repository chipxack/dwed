import Modal from 'antd/lib/modal/Modal'
import styled from 'styled-components'

export const getWidth = ({maxWidth}) => {
    switch (maxWidth) {
        case "lg":
            return 800
        case 'md':
            return 600
        default:
            return 480
    }
}

export const ModalCustom = styled(Modal)`
  && {
    .ant-modal-content {
      border-radius: 4px;
      overflow: hidden;
    }

    .ant-modal-close{
      margin: 24px;
      color: #2E3A59;
    }

    .ant-modal-close-x {
      width: 24px;
      height: 24px;
      line-height: 24px;
    }

    .ant-modal-header {
      border-bottom: 0;
      padding: 24px 24px 0 24px;
    }

    .ant-modal-title {
      font-family: var(--regular-text);
      color: var(--dark-basic);
      font-size: 18px;
      line-height: 22px;
      text-align: center;
    }

    .anticon-close {
      color: var(--grey-basic);
    }

    .ant-modal-body {
      padding: 24px 32px;
    }
  }
`
