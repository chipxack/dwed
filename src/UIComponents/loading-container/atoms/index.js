import styled from 'styled-components'

export const LoadingWrapper = styled.div`
  position: relative;
  min-height: 200px;
`

export const LoadingSpinner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
`