import React from 'react'
import {AccountMenuGrid} from '../atoms'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {CustomLink} from '../../../UIComponents/custom-link'

export const AccountMenuList = ({path, menuData, onMenuClick}) => {
    const {t} = useTranslation()
    const {location: {pathname}} = useHistory()

    const generateTitle = (item) => {
        switch (item) {
            case 'media':
                return t(`${item}_files`)
            case 'jobs':
                return t('job')
            default:
                return t(item)
        }
    }

    return (
        <AccountMenuGrid>
            {
                menuData && menuData.length > 0 && menuData.map((item, idx) => {
                    return (
                        <CustomLink
                            key={`${idx + 1}`}
                            path={`/${path}/${item.path || item.id}`}
                            onAction={() => pathname.indexOf(item.id) === -1 && onMenuClick && onMenuClick()}
                            isActive={pathname.indexOf(item.id) !== -1}
                        >
                            {generateTitle(item.id)}
                        </CustomLink>
                    )
                })
            }
        </AccountMenuGrid>
    )
}