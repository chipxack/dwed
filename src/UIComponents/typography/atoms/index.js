import styled, {css} from "styled-components";

const commonTitle = css`
  line-height: 24px;
`

const commonText = css`
`

const getTitleFontSize = ({level}) => {
    switch (level) {
        case 1:
            return 38
        case 2:
            return 30
        case 3:
            return 24
        case 4:
            return 20
        case 5:
            return 16
        case 6:
            return 14
        default:
            return 14
    }
}

const getFontFamily = ({weight}) => {
    switch (weight) {
        case 400:
            return 'var(--regular-text)'
        case 500:
            return 'var(--medium-text)'
        case 600:
            return 'var(--demi-text)'
        case 700:
            return 'var(--bold-text)'
        case 900:
            return 'var(--black-text)'
        default:
            return 'var(--medium-text)'
    }
}

export const StyledTitle = styled.div`
  ${commonTitle};
  font-size: ${getTitleFontSize}px;
  font-family: ${getFontFamily};
  color: ${({color}) => color ? color : 'var(--dark-basic)'};
  text-align: ${({align}) => align || 'left'};
`

export const StyledText = styled.div`
  ${commonText};
  font-family: ${({weight}) => weight ? getFontFamily({weight}) : 'var(--regular-text)'};
  font-size: ${({size}) => size ? size : 12}px;
  color: ${({color}) => color ? color : 'var(--grey-basic)'};
  line-height: ${({lineHeight}) => lineHeight ? lineHeight : 16}px;
`