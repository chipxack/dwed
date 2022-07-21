import React, {Fragment} from 'react'
import {AccountItemLink, AccountList, AccountListHeading,} from '../atoms'
import {ShortAccountCard} from "../../card";
import {useStore} from "effector-react";
import {$accountModel} from "../../../models/accountModel";
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'

export const AuthSpecialistList = ({changeAccount}) => {
    const {$profiles: {specialisms}} = useStore($accountModel)
    const {t} = useTranslation()

    const getUrl = (item) => {
        return item.settings.accepted ?  item.url : `/@${item.slug_name}/jobs`
    }

    const renderItem = (item) => (
        <AccountItemLink onClick={() => changeAccount(item.slug_name)} to={getUrl(item)}>
            <ShortAccountCard
                imgSize={42}
                truncateLength={23}
                imgUrl={item.avatar}
                name={item.name}
                text={item.text}
            />
        </AccountItemLink>
    )

    return (
        <>
            {
                specialisms && specialisms.length > 0
                && (
                    <AccountList>
                        <AccountListHeading>
                            <Title color='#939393'>
                                {t('work')}
                            </Title>
                            <div className='line'/>
                        </AccountListHeading>
                        {
                            specialisms.map((item, idx) => (
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