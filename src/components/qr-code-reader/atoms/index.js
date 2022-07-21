import styled from "styled-components";

export const ImageLoadContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ImageLoadDragContainer = styled.div`
    background: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
`

export const UploadedImage = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`