import React, {Fragment} from 'react'
import {ActiveProfile} from '../maleculas'
import {AccountMenuBox} from '../atoms'

export const AccountPopoverContent = ({menu}) => {
    return (
        <AccountMenuBox>
            <ActiveProfile/>
            <div className='accounts-wrapper'>
                {
                    menu.map(item => (
                        <Fragment key={item.id}>
                            {item.component}
                        </Fragment>
                    ))
                }
            </div>
        </AccountMenuBox>
    )
}