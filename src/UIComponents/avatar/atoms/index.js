import styled from 'styled-components'
import {Avatar} from "antd";

export const StyledAvatar = styled(Avatar)`
  position: relative;
  
  &::before{
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid ${({active}) => Number(active) ? 'var(--primary-dwed)' : 'transparent'};
    left: 0;
    top: 0;
    border-radius: 50%;
    z-index: 2;
    transition: .2s ease all;
  }
`