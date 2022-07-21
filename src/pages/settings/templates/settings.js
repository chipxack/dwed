import React from 'react'
import {ProfileSettingsHeader, ProfileSettingsNav, SettingsContent} from '../organisms'
import {SettingsWireframe} from '../../../UIComponents/wireframe'
import {useTranslation} from 'react-i18next'

export const SettingsPage = () => {
    const {t} = useTranslation()
    return (
        <SettingsWireframe
            title={t('settings')}
            header={<ProfileSettingsHeader/>}
            sidebar={<ProfileSettingsNav/>}
            content={<SettingsContent/>}
        />
    )
}