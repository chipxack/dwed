import React, {useEffect, useState} from 'react'
import {ButtonGroup, ButtonUi} from '../../../ui/atoms'
import {AutoModeForm, AutoModeText, AutoModeWrapper} from '../atoms'
import {useStore} from "effector-react";
import {$jobModel, showSpecCalendar, updateSpec} from "../../../models/job-model";
import {hideModal} from "../../../models/widgets";
import {useTranslation} from "react-i18next";
import {InputUI} from "../../../UIComponents/inputs";

export const AutoModeContent = () => {
    const [autoModeText, setAutoModeText] = useState('')
    const {$accountSpec} = useStore($jobModel)
    const {t} = useTranslation()

    const activeAutoMode = () => {
        const params = {
            id: $accountSpec.data.id,
            data: {
                auto_mode: true,
                auto_answer_text: autoModeText,
                is_working: true
            }
        }
        showSpecCalendar(false)
        updateSpec(params)
        hideModal()
    }

    useEffect(() => {
        if ($accountSpec.data && $accountSpec.data.auto_answer_text) {
            setAutoModeText($accountSpec.data.auto_answer_text)
        }
    }, [$accountSpec.data])

    return (
        <AutoModeWrapper>
            <AutoModeText>
                <p>{t('turn_on_autopilot_sentence')}</p>
                <p>{t('autopilot_desc_sentence')}</p>
            </AutoModeText>
            <AutoModeForm>
                <p>{t('write_an_auto_reply_for_all_orders')}</p>
                <InputUI
                    inputType="textarea"
                    value={autoModeText}
                    onChange={(e) => setAutoModeText(e.target.value)}
                    placeholder="(Пример) Заказ выполнен!"
                />
            </AutoModeForm>
            <ButtonGroup>
                <ButtonUi buttonType='link' onClick={hideModal}>
                    {t('close')}
                </ButtonUi>
                <ButtonUi onClick={activeAutoMode}>
                    {t('apply')}
                </ButtonUi>
            </ButtonGroup>
        </AutoModeWrapper>
    )
}