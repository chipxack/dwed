import React from 'react'
import {VideoVerifying} from '../../video-recorder'
import {useAccountVideoVerifying} from '../../../hooks/settings'
import {Col, Row} from 'antd'
import {ButtonGroup, ButtonUI} from '../../../ui/atoms'
import {Trans, useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'

export const AccountVideoVerifying = () => {
    const {formik} = useAccountVideoVerifying()
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const instruction = (
        <Trans i18nKey='user_video_verifying'>
            <span style={{color: 'var(--primary-dwed)'}}/>
            {{n: currentProfile ? currentProfile.name : ''}}
        </Trans>
    )
    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <VideoVerifying
                        handleChange={value => formik.setFieldValue('video', value)}
                        instruction={instruction}
                    />
                </Col>
                <Col span={24}>
                    <ButtonGroup style={{marginTop: 24, justifyContent: 'flex-end'}}>
                        <ButtonUI
                            buttonstyle='link'
                            size='lg'
                        >
                            {t('cancel')}
                        </ButtonUI>
                        <ButtonUI
                            size='lg'
                            htmlType='submit'
                            disabled={formik.isSubmitting || !formik.values.video}
                        >
                            {t('send_to_moderation')}
                        </ButtonUI>
                    </ButtonGroup>
                </Col>
            </Row>
        </form>
    )
}