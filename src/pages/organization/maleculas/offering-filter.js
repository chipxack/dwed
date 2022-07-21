import React from 'react'
import {Col} from "antd";
import {CommonSearchFilter} from "../../../UIComponents/global-styles";
import {InputSystem} from "../../../ui/molecules";
import {useTranslation} from "react-i18next";
import {SearchSvg} from "../../../media/search";

export const OrgOfferingFilter = ({search, onSearch}) => {
    const {t} = useTranslation()
    return (
        <CommonSearchFilter gutter={12} justify="space-between" align='middle'>
            <Col span='auto'>
            </Col>
            <Col span={7}>
                <InputSystem
                    value={search || ''}
                    change={onSearch}
                    placeholder={t('search')}
                    icon={<SearchSvg />}
                />
            </Col>
        </CommonSearchFilter>
    )
}