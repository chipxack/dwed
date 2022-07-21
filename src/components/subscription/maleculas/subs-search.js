import React from 'react'
import {InputSystem} from '../../../ui/molecules'
import {SearchSvg} from '../../../media/search'
import {useTranslation} from 'react-i18next'
import {CommonSearchFilter} from '../../../UIComponents/global-styles'
import {Col} from 'antd'

export const SubsSearch = ({value, onChange}) => {
    const {t} = useTranslation()

    return (
        <CommonSearchFilter gutter={24}>
            <Col span={24}>
                <InputSystem
                    value={value}
                    change={onChange}
                    placeholder={t('search')}
                    icon={<SearchSvg/>}
                />
            </Col>
        </CommonSearchFilter>
    )
}