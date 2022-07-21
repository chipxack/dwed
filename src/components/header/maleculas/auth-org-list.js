import React, {Fragment} from 'react'
import {AccountItem, AccountList, AccountListHeading} from '../atoms'
import {ShortAccountCard} from '../../card'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'

export const AuthOrgList = ({changeAccount}) => {
    const {$profiles: {organizations}} = useStore($accountModel)
    const {t} = useTranslation()

    const renderItem = (item) => {
        return (
            <AccountItem
                onClick={() => changeAccount(item)}
            >
                <ShortAccountCard
                    imgSize={42}
                    truncateLength={23}
                    imgUrl={item.avatar}
                    name={item.name}
                    text={item.category && item.category.name}
                />
            </AccountItem>
        )
    }

    return (
        <>
            {
                organizations && organizations.length > 0
                && (
                    <AccountList>
                        <AccountListHeading>
                            <Title color='#939393'>
                                {t('company')}
                            </Title>
                            <div className='line'/>
                        </AccountListHeading>
                        {
                            organizations.map((item, idx) => (
                                <Fragment key={`${idx + 1}`}>
                                    {renderItem(item)}
                                </Fragment>
                            ))
                        }
                    </AccountList>
                )
            }
        </>
    )
}