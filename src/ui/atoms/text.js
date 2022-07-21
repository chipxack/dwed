import styled from 'styled-components';

export const TextTitle = styled.div`
  align-items: center;
  letter-spacing: 0.15px;
  color: #2C2C2E;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export const TextTitleForm = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  color: #2C2C2E;
`;

export const TextMiddle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2E;
`;

const getWeight = ({weight}) => {
    switch (weight) {
        case 'black':
            return 900
        case 'bold':
            return 700
        case 'medium':
            return 500
        default:
            return 400
    }
}

export const Title = styled.div`
  font-size: ${({size}) => size ? size : 16}px;
  font-weight: ${getWeight};
  line-height: 24px;
  color: #2C2C2E;
`