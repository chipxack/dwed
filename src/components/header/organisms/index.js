import React from 'react'
import {HeaderSearchWrap, HeaderSection, HeaderStaticWrapper, HeaderWrap} from '../atoms'
import {useHeader} from '../../../hooks/common'
import {HeaderSearch} from '../maleculas'
import {Account} from './account'
import {useStickyHeader} from 'react-use-sticky-header'

export const Header = () => {
    useHeader()
    const [setHeaderRef] = useStickyHeader(65, {
        headerDetached: 'header--detached-custom'
    })

    return (
        <HeaderSection ref={setHeaderRef}>
            <HeaderStaticWrapper style={{width: '100%'}}>
                <Account/>
            </HeaderStaticWrapper>
            <HeaderSearchWrap>
                <HeaderWrap>
                    <HeaderSearch/>
                </HeaderWrap>
            </HeaderSearchWrap>
        </HeaderSection>
    )
}