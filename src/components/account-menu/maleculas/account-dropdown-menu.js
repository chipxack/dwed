import React, {useState, Fragment} from 'react'
import {PopoverView} from "../../popover";
import {
    AccountDropdownMenuBtn,
    AccountDropdownMenuWrapper,
    DropdownMenuItem
} from "../atoms";
import {PlusSvg} from "../../../media";
import {useTranslation} from "react-i18next";

export const AccountDropdownMenu = ({data}) => {
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()
    const content = (
        data.map(item => {
            const Icon = item.icon
            return (
                <Fragment key={item.id}>
                    {
                        !item.hidden
                        && (
                            <DropdownMenuItem
                                to={item.path}
                            >
                                <Icon/>
                                {t(item.id)}
                            </DropdownMenuItem>
                        )
                    }
                </Fragment>
            )
        })
    )

    return (
        <AccountDropdownMenuWrapper>
            <PopoverView
                open={open}
                content={content}
                overlayClassName='account-dropdown-menu'
                handleClose={() => setOpen(false)}
            >
                <AccountDropdownMenuBtn onClick={() => setOpen(true)}>
                    <PlusSvg/>
                </AccountDropdownMenuBtn>
            </PopoverView>
        </AccountDropdownMenuWrapper>
    )
}