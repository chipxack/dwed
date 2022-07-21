import React from 'react'
import {usePersonalSettings} from "../../../hooks/settings";
import {Col, Row} from "antd";
import {useStore} from "effector-react";
import {$accountModel} from "../../../models/accountModel";
import {PROFILE_TYPE} from "../../../constants";
import {orgPersonalInfo, userPersonalInfo} from "../../../data/personal";
import {PersonalSettingsItem} from "../atoms";
import {Text, Title} from "../../../UIComponents/typography";
import {useTranslation} from "react-i18next";
import {$settingsModel} from "../../../models/settings-model";
import {LEGAL_FORM} from "../../../data/legal-form";

export const PersonalSettings = () => {
    usePersonalSettings()
    const {t} = useTranslation()
    const {$personalInfo: {data}} = useStore($settingsModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const renderItem = (id) => {
        const legal_form = data && data[id] && id === 'legal_form' && LEGAL_FORM.find(item => item.value === data[id])
        switch (id) {
            case 'legal_form':
                return legal_form ? `(${t(legal_form.label)}) ${legal_form.title}` : t('no_data')
            case 'gender':
                return data && data[id] ? data[id] === 'm' ? t('male') : t('female') : t('no_data')
            case 'login':
                return `@${currentProfile.slug_name}`
            default:
                return data && (data[id] || t('no_data'))
        }
    }


    const renderData = (type) => {
        let configs = []
        if (type === PROFILE_TYPE.USER) {
            configs = userPersonalInfo
        }

        if (type === PROFILE_TYPE.ORGANIZATION) {
            configs = orgPersonalInfo
        }

        return (
            <Row gutter={24}>
                {
                    configs.map((item, idx) => (
                        <Col key={`${idx + 1}`} span={12}>
                            <PersonalSettingsItem>
                                <Text style={{height: 16}}>{t(item)}</Text>
                                <Title level={6} style={{height: 24}}>
                                    {renderItem(item)}
                                </Title>
                            </PersonalSettingsItem>
                        </Col>
                    ))
                }
            </Row>
        )
    }

    return (
        <>
            {
                currentProfile && renderData(currentProfile.type)
            }
        </>
    )
}