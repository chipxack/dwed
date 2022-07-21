import React from 'react'
import {AccountHeaderProgressItem, AccountHeaderProgressWrapper} from "../atoms";
import {Tooltip} from "antd";
import {ratingData} from "../../../data/rating";
import {useTranslation} from "react-i18next";

export const AccountHeaderProgress = ({rating}) => {
    const {t} = useTranslation()

    return (
        <AccountHeaderProgressWrapper style={{marginBottom: 8}}>
            {ratingData.map(item => {
                const Icon = item.icon
                return (
                    <Tooltip key={item.id} title={t(`${item.id}_p`)}>
                        <AccountHeaderProgressItem
                            color={item.color}
                        >
                            <Icon/>
                            {
                                rating && rating[item.id] ? rating[item.id].level : 0
                            }
                        </AccountHeaderProgressItem>
                    </Tooltip>
                )
            })}
        </AccountHeaderProgressWrapper>
    )
}