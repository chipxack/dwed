import React from 'react'
import {Text, Title} from "../../../UIComponents/typography";
import {useTranslation} from "react-i18next";
import {VerifyingInstruction} from "../atoms";

export const VideoInstruction = ({instruction}) => {
    const {t} = useTranslation()
    return (
        <VerifyingInstruction style={{paddingLeft: 12}}>
            <video src=""/>
            <Title level={5}>{t('instruction')}</Title>
            <Text size={14} color='var(--dark-basic)'>
                {instruction}
            </Text>
        </VerifyingInstruction>
    )
}