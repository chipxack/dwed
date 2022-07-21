import React from 'react'
import {toggleSearchFocus} from '../../../models/app'
import {LogoLink, Search, SearchFormWrapper, SearchSection} from '../atoms'
import {InputSystem} from '../../../ui/molecules'
import {SearchFilter} from './search-filter'
import {SearchSvg} from '../../../media/search'
import {DWEDLogoSvg} from '../../../media/logo'
import {useHomeSearch} from '../../../hooks/home'

export const HeaderSearch = () => {
    const {searchText, onChange, onSubmit} = useHomeSearch()

    return (
        <>
            <SearchSection>
                <LogoLink to='/' onClick={() => toggleSearchFocus(undefined)}>
                    <DWEDLogoSvg/>
                </LogoLink>
            </SearchSection>
            <SearchFormWrapper>
                <Search onSubmit={onSubmit}>
                    <InputSystem
                        value={searchText || ''}
                        change={onChange}
                        placeholder='Что вы ищите?'
                        icon={<SearchSvg onClick={onSubmit}/>}
                    />
                </Search>
                <SearchFilter/>
            </SearchFormWrapper>
        </>
    )
}