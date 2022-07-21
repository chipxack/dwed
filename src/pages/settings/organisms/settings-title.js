import React, {useCallback, useState} from 'react'
import {Title} from '../../../UIComponents/typography'
import {SettingHeading} from '../atoms'
import {useTranslation} from 'react-i18next'
import {useHistory, useLocation} from 'react-router-dom'
import {accountSettingsMenu} from '../../../data/account-settings'
import {PROFILE_TYPE, URL_VALUES} from '../../../constants'
import {ActionButton} from '../../../UIComponents/global-styles'
import {PlusIcon} from '../../../icons/plus'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {Modal} from '../../../components/modal'
import {CreditCardForm} from '../../../components/credit-card'

export const ProfileSettingsHeader = () => {
    const {pathname} = useLocation()
    const {t} = useTranslation()
    const {push} = useHistory()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const getTitle = useCallback(() => {
        let title = ''

        for (let i = 0; i < accountSettingsMenu.length; i++) {
            if (pathname.indexOf(accountSettingsMenu[i].id) !== -1) {
                title = accountSettingsMenu[i].id
                break
            }
        }

        return title
    }, [pathname])

    const renderAction = useCallback(() => {
        const hasPath = pathname.indexOf(URL_VALUES.COUPON) !== -1 &&
            (pathname.indexOf('add') === -1 && pathname.indexOf('edit') === -1)
        if (currentProfile?.type === PROFILE_TYPE.ORGANIZATION && hasPath) {
            return (
                <ActionButton onClick={() => push('/settings/coupon/add')}>
                    <PlusIcon />
                    {t('add')}
                </ActionButton>
            )
        }

        if (currentProfile?.type === PROFILE_TYPE.USER && pathname.indexOf('payment') !== -1) {
            return (
                <ActionButton onClick={() => setModalIsOpen(true)}>
                    <PlusIcon />
                    {t('add_card')}
                </ActionButton>
            )
        }

        return null
    }, [pathname, push, t, currentProfile?.type])

    return (
        <>
            <Modal
                centered
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                component={<CreditCardForm onClose={() => setModalIsOpen(false)} />}
                width={400}
            />
            <SettingHeading style={{justifyContent: 'space-between', marginBottom: 0, width: '100%'}}>
                <Title level={5} weight={500}>
                    {t(getTitle())}
                </Title>
                {renderAction()}
            </SettingHeading>
        </>
    )
}
