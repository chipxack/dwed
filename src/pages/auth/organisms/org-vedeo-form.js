import React from 'react'
import {VideoVerifying} from "../../../components/video-recorder";
import {Title} from "../../../UIComponents/typography";
import {Trans, useTranslation} from "react-i18next";
import {AuthButton, AuthButtonGroup} from "../atoms";
import {GridCustom} from "../../../ui/atoms";
import {useStore} from "effector-react";
import {$accountModel} from "../../../models/accountModel";

export const OrganizationVideoForm = ({formik, handleChange, setShowVideoVerify}) => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const organization = formik.values.name
    const name = currentProfile && currentProfile.name
    const instruction = (
        <Trans i18nKey='org_video_verifying'>
            <span style={{color: 'var(--primary-dwed)'}}/>
            {{organization, name}}
        </Trans>
    )
    return (
        <>
            <Title level={4}>
                {t('video_message')}
            </Title>
            <VideoVerifying
                instruction={instruction}
                handleChange={(e) => handleChange(e, 'video_verifying')}
            />
            <AuthButtonGroup style={{justifyContent: 'flex-end', marginTop: 24}}>
                <GridCustom perColumn={2} gap={1}>
                    <AuthButton
                        size='lg'
                        buttonstyle='link'
                        onClick={() => setShowVideoVerify(false)}
                    >
                        {t('back')}
                    </AuthButton>
                    <AuthButton
                        size='lg'
                        htmlType='submit'
                        disabled={
                            formik.isSubmitting
                            || !formik.values.video_verifying
                        }
                    >
                        {t('create_organization')}
                    </AuthButton>
                </GridCustom>
            </AuthButtonGroup>
        </>
    )
}