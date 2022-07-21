import React from 'react'
import {AccountHeaderSubscribeItem, AccountHeaderSubscribeWrapper} from "../atoms";
import {useTranslation} from "react-i18next";

export const AccountHeaderSubscribes = ({data, showSubscriptions}) => {
    const {t} = useTranslation()
    return (
        <AccountHeaderSubscribeWrapper>
            <AccountHeaderSubscribeItem onClick={() => showSubscriptions('me')}>
                {data.me}
                <span>{t('subscribers')}</span>
            </AccountHeaderSubscribeItem>
            <AccountHeaderSubscribeItem onClick={() => showSubscriptions('my')}>
                {data.my}
                <span>{t('subscriptions')}</span>
            </AccountHeaderSubscribeItem>
        </AccountHeaderSubscribeWrapper>
    )
}