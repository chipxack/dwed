import styled from 'styled-components';

export const NoImage = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
