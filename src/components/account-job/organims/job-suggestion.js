import React, {Fragment} from 'react'
import {Col, Row} from 'antd'
import {JubSuggestionItem, RequestHeading} from '../atoms'
import {useStore} from 'effector-react'
import {$accountModel, accountSpecPanelEvent} from '../../../models/accountModel'
import {Title} from '../../../UIComponents/typography'
import {Trans, useTranslation} from 'react-i18next'
import {ShortAccountCard} from '../../card'
import {FileTextSvg} from '../../../media/file'
import {ButtonUI} from '../../../ui/atoms'
import {updateSpec} from '../../../models/job-model'

export const JobSuggestion = () => {
    const {t} = useTranslation()
    const {$profiles: {specialisms}} = useStore($accountModel)

    const handleAccept = (id) => {
        const params = {
            id,
            data: {
                accepted: true
            }
        }
        updateSpec({...params, actions: () => accountSpecPanelEvent(params)})
    }

    return (
        <>
            <RequestHeading>
                <Title level={5}>
                    {t('job_invitation')}
                </Title>
            </RequestHeading>
            <Row gutter={[16, 16]} justify='center'>
                {
                    specialisms.map((spec, idx) => (
                        <Fragment key={`${idx + 1}`}>
                            {
                                !spec.settings.accepted && (
                                    <Col span={8}>
                                        <JubSuggestionItem>
                                            <ShortAccountCard
                                                direction='vertical'
                                                imgUrl={spec.avatar}
                                                name={spec.name}
                                                text={spec.category}
                                            />
                                            <Title className='job-invitation-text'>
                                                <Trans i18nKey='job_invitation_text' values={{n: spec.text}}>
                                                    <br/>
                                                </Trans>
                                            </Title>
                                            <Title className='job-invitation-contract'>
                                                <FileTextSvg/>
                                                {t('read_contract')}
                                            </Title>
                                            <Row gutter={16} justify='center'>
                                                <Col>
                                                    <ButtonUI buttonstyle='link' size='lg'>
                                                        {t('reject')}
                                                    </ButtonUI>
                                                </Col>
                                                <Col>
                                                    <ButtonUI size='lg' onClick={() => handleAccept(spec.id)}>
                                                        {t('accept')}
                                                    </ButtonUI>
                                                </Col>
                                            </Row>
                                        </JubSuggestionItem>
                                    </Col>
                                )
                            }
                        </Fragment>
                    ))
                }
            </Row>
        </>
    )
}