import React from 'react'
import {useOrgSpecCatForm} from "../../../hooks/org";
import {AccountSectionHeading, ButtonGroup, ButtonUI, CommonForm, GridBasic, Title} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {InputUI} from "../../../UIComponents/inputs";

export const OrgSpecialistCategoryForm = () => {
    const {formik} = useOrgSpecCatForm()
    const {t} = useTranslation()
    const {spec_cat_id} = useParams()

    return (
        <>
            <AccountSectionHeading>
                <Title weight='black' size={20}>
                    {t(spec_cat_id ? 'edit_specialist_ategory' : 'add_specialist_category')}
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
                    <ButtonGroup style={{justifyContent: 'flex-end'}}>
                        <ButtonUI
                            size='lg'
                            htmlType='submit'
                            disabled={
                                formik.isSubmitting
                                || (formik.touched.name && !!formik.errors.name)
                            }
                        >
                            {t('save')}
                        </ButtonUI>
                    </ButtonGroup>
                </GridBasic>
            </CommonForm>
        </>
    )
}