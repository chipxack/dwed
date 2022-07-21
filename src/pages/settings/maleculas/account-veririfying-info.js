import React, {useState} from 'react'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {ButtonUI} from '../../../ui/atoms'
import {ProfileActivationBlock} from '../atoms'
import {Modal} from '../../../components/modal'
import {AccountVerifyModal} from './account-verify-modal'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {getStatus} from '../../../utils/accountUtils'
import {PROFILE_TYPE} from '../../../constants'

export const AccountVerifyingInfo = () => {
    const {t} = useTranslation()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    return (
        <>
            {
                currentProfile && currentProfile.status < 5 && (
                    <>
                        <Modal
                            modalIsOpen={modalIsOpen}
                            setModalIsOpen={setModalIsOpen}
                            component={<AccountVerifyModal onClose={() => setModalIsOpen(false)}/>}
                            width={450}
                        />
                        <ProfileActivationBlock>
                            <Title color={getStatus(currentProfile.status).color}>
                                {t(getStatus(currentProfile.status).text)}
                            </Title>
                            {
                                currentProfile?.type !== PROFILE_TYPE.ORGANIZATION && (
                                    <ButtonUI onClick={() => setModalIsOpen(true)}>
                                        {t('activate')}
                                    </ButtonUI>
                                )
                            }
                        </ProfileActivationBlock>
                    </>
                )
            }
        </>
    )
}