import styled from 'styled-components';

export const ImageSelectBlock = styled.div`
  display: inline-flex;
  flex-direction: row;
  background: #FFFFFF;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.status && props.status === 'error' ? 'red' : props.status === 'success' && props.main ? '#1DA1F2' : '#F9F9F9'};
  border-radius: 8px;
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 16px;
  box-shadow: 0 1px 2px rgba(233, 233, 233, 0.49);
  overflow: hidden;
  transition: .3s;
`;
export const ImageSelect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid ${props => props.status ? '#1DA1F2' : '#ffffff'};
  border-radius: 50px;
  overflow: hidden;
  width: 14px;
  height: 14px;
  z-index: 1;
  background: ${props => props.status ? '#F5F5F5' : '#ffffff'};
  margin: 6px;
  transition: .3s;
  div{
    background: ${props => props.status ? '#1DA1F2' : '#ffffff'};
    width: 8px;
    height: 8px;
    display: flex;
    border-radius: 50%;
    overflow: hidden;
  }
  &:hover, &:focus{
    cursor: pointer;
    border-color: #1DA1F2;
  }
`;

export const ImageBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &:hover, &:focus{
    cursor: pointer;
  }
`