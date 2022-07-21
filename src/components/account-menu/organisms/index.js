import React from 'react'
import {AccountDropdownMenu, AccountMenuList} from "../maleculas";
import {AccountMenuWrapper} from "../atoms";
import {useLocation} from "react-router-dom";

export const AccountMenu = ({dropdownMenu, path, menuData, onMenuClick}) => {
    const {pathname} = useLocation()
    const pathes = pathname.split('/')
    const data = dropdownMenu.filter(item => pathes.indexOf(item.pathType) !== -1)

    return (
        <AccountMenuWrapper>
            <AccountMenuList
                path={path}
                menuData={menuData}
                onMenuClick={onMenuClick}
            />
            {
                data.length > 0
                && (
                    <AccountDropdownMenu
                        data={data}
                    />
                )
            }
        </AccountMenuWrapper>
    )
}