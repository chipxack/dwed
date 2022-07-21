import React from 'react'
import {ReviewHeading, ReviewType} from "../atoms";
import {Title} from "../../../UIComponents/typography";
import {IconBox} from "../../../UIComponents/global-styles";
import {DislikeSvg, LikeSvg} from "../../../media";
import {InputUI} from "../../../UIComponents/inputs";
import {useTranslation} from "react-i18next";

export const ReviewInput = ({formik}) => {
    const {t} = useTranslation()
    return (
        <>
            <ReviewHeading>
                <Title level={4}>
                    {t('leave_review')}
                </Title>
                <ReviewType>
                    <IconBox
                        onClick={() => formik.setFieldValue('type', 1)}
                        color={formik.values.type ? 'var(--primary-dwed)' : 'var(--grey-basic)'}
                    >
                        <LikeSvg/>
                    </IconBox>
                    <IconBox
                        onClick={() => formik.setFieldValue('type', 0)}
                        color={!formik.values.type ? 'var(--primary-dwed)' : 'var(--grey-basic)'}
                    >
                        <DislikeSvg/>
                    </IconBox>
                </ReviewType>
            </ReviewHeading>
            <InputUI
                name='text'
                inputType='textarea'
                label={t('enter_text')}
                value={formik.values.text}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.text && formik.errors.text}
            />
        </>
    )
}