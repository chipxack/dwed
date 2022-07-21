import React from 'react'
import {Text, Title} from '../../../UIComponents/typography'
import {ButtonGroup, ButtonUI} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'

export const AccountVerifyModal = ({onClose}) => {
    const {t} = useTranslation()
    const {push} = useHistory()

    const handleClick = () => {
        push('/settings/verification')
        onClose()
    }

    return (
        <>
            <Text size={16} weight={400} lineHeight={24} style={{marginTop: 24, marginBottom: 24}}>
                {t('full_registration_sentence')}
            </Text>

            <Title level={5} style={{marginBottom: 32}}>
                {t('you_will_have_access_to')}:
                <br />
                1-{t('content_publishing')}
                <br />
                2-{t('purchase_offerings')}
                <br />
                3-{t('comments')}
                <br />
                4-{t('subscriptions')}
                <br />
                5-{t('post_management')}
                <br />
                <br />

                {t('no_moderation_sentence')}
            </Title>

            <ButtonGroup>
                <ButtonUI buttonstyle="link" size="lg" onClick={onClose}>
                    {t('i_dont_want')}
                </ButtonUI>
                <ButtonUI size="lg" onClick={handleClick}>
                    {t('i_will_try')}
                </ButtonUI>
            </ButtonGroup>
        </>
    )
}
