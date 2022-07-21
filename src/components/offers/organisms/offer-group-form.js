import React from 'react'
import {useTranslation} from "react-i18next";
import {AccountSectionHeading, ButtonGroup, ButtonUI, CommonForm, GridBasic} from "../../../ui/atoms";
import {Title} from "../../../UIComponents/typography";
import {useOffersGroupForm} from "../../../hooks/offers";
import {SimpleImageUpload} from "../../image-upload";
import {useParams} from "react-router-dom";
import {InputUI} from "../../../UIComponents/inputs";

export const OfferGroupForm = () => {
    const {t} = useTranslation()
    const {formik} = useOffersGroupForm()
    const {group_id} = useParams()
    return (
        <>
            <AccountSectionHeading>
                <Title level={4}>
                    {t(group_id ? 'edit_offering_group' : 'add_offer_group')}
                </Title>
            </AccountSectionHeading>
            <CommonForm onSubmit={formik.handleSubmit}>
                <GridBasic>
                    <InputUI
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && formik.errors.name}
                        onBlur={formik.handleBlur}
                        label={t('enter_group_name')}
                    />
                    <div>
                        <SimpleImageUpload
                            onChange={(e) => formik.setFieldValue('image', e)}
                            error={formik.touched.image && formik.errors.image}
                            value={formik.values.image}
                            onBlur={() => formik.setFieldTouched('image', true, true)}
                        />
                    </div>
                    <ButtonGroup style={{justifyContent: 'flex-end'}}>
                        <ButtonUI
                            size='lg'
                            htmlType='submit'
                        >
                            {t('save')}
                        </ButtonUI>
                    </ButtonGroup>
                </GridBasic>
            </CommonForm>
        </>
    )
}