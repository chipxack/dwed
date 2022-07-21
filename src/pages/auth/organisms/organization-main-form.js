import React from 'react'
import {GridBasic, GridItem} from "../../../ui/atoms";
import {showModal} from "../../../models/widgets";
import {LISTS} from "../../../constants/lists";
import {AuthButton, AuthButtonGroup, OrgCreateGrid} from "../atoms";
import {SelectionList} from "../../../components/selection-list";
import {useTranslation} from "react-i18next";
import {Title} from "../../../UIComponents/typography";
import {AlertCircleSvg, CheckMarkCircleSvg, EditPenFillSvg} from "../../../media";
import {LEGAL_FORM} from "../../../data/legal-form";
import {Col, Row} from "antd";
import {SimpleImageUpload} from "../../../components/image-upload";
import {InputUI} from "../../../UIComponents/inputs";

export const OrganizationMainForm = (
    {
        formik,
        handleChange,
        setShowVideoVerify,
        disabled,
        slugNameStatus,
    }) => {
    const {t} = useTranslation()

    const getComponent = (type) => {
        switch (type) {
            case LISTS.REGION:
                return <SelectionList
                    handleChange={(value) => handleChange(value, 'region_id')}
                    type={type}
                />
            case LISTS.ORG_CATEGORY:
                return <SelectionList
                    handleChange={(value) => handleChange(value, 'category_id')}
                    type={type}
                />
            default:
                return 'category_id'
        }
    }

    const legalFormOptions = LEGAL_FORM.map(item => ({
        value: item.value,
        label: t(item.label),
        title: item.title
    }))

    const renderModal = (type) => {
        return {
            component: getComponent(type),
            open: true,
            props: {width: 432}
        }
    }

    const renderIcon = () => {
        switch (slugNameStatus) {
            case 1:
                return <CheckMarkCircleSvg style={{color: '#00E096'}}/>
            case 0:
                return <AlertCircleSvg style={{color: '#FF3D71'}}/>
            default:
                return undefined
        }
    }

    return (
        <>
            <Title level={4}>
                {t('organization_information')}
            </Title>
            <OrgCreateGrid>
                <GridBasic gap={24}>
                    <InputUI
                        label={t('brand_name_of_organization')}
                        name='name'
                        value={formik.values.name}
                        onChange={(e) => handleChange(e.target.value, 'name')}
                        error={formik.touched.name && formik.errors.name}
                        onBlur={formik.handleBlur}
                    />
                    <Row gutter={24}>
                        <Col span={8}>
                            <InputUI
                                name='legal_form'
                                inputType='select'
                                value={formik.values.legal_form}
                                options={legalFormOptions}
                                onChange={(value) => handleChange(value, 'legal_form')}
                                error={formik.touched.legal_form && formik.errors.legal_form}
                                onBlur={() => formik.setFieldTouched('legal_form', true, true)}
                            />
                        </Col>
                        <Col span={16}>
                            <InputUI
                                name='juridic_name'
                                onBlur={formik.handleBlur}
                                value={formik.values.juridic_name}
                                label={t('name_of_the_organization')}
                                onChange={(e) => handleChange(e.target.value, 'juridic_name')}
                                error={formik.touched.juridic_name && formik.errors.juridic_name}
                            />
                        </Col>
                    </Row>
                    <InputUI
                        name='slug_name'
                        icon={renderIcon()}
                        value={formik.values.slug_name}
                        onBlur={formik.handleBlur}
                        label={t('name_in_english')}
                        helperText='Данное имя используется в адресной строке'
                        onChange={(e) => handleChange(e.target.value, 'slug_name')}
                        error={formik.touched.slug_name && formik.errors.slug_name}
                    />
                    <InputUI
                        label={t('inn')}
                        mask='999 999 999'
                        name='inn'
                        inputType='masked'
                        value={formik.values.inn}
                        onChange={(e) => handleChange(e.target.value, 'inn')}
                        error={formik.touched.inn && formik.errors.inn}
                        onBlur={formik.handleBlur}
                    />
                    <InputUI
                        onClick={() => showModal(renderModal(LISTS.ORG_CATEGORY))}
                        label={t('category')}
                        name='category_id'
                        value={formik.values.category_id ? formik.values.category_id.name : ''}
                        onChange={(value) => handleChange(value, 'category_id')}
                        onBlur={formik.handleBlur}
                        error={formik.touched.category_id && formik.errors.category_id}
                        readOnly
                        icon={<EditPenFillSvg/>}
                    />
                    <InputUI
                        onClick={() => showModal(renderModal(LISTS.REGION))}
                        label={t('region')}
                        name='region_id'
                        value={formik.values.region_id ? formik.values.region_id.name : ''}
                        onChange={(value) => handleChange(value, 'region_id')}
                        onBlur={formik.handleBlur}
                        error={formik.touched.region_id && formik.errors.region_id}
                        readOnly
                        icon={<EditPenFillSvg/>}
                    />
                </GridBasic>
                <GridItem>
                    <GridBasic gap={32}>
                        <SimpleImageUpload
                            onChange={(value) => handleChange(value, 'logo')}
                            onBlur={() => formik.setFieldTouched('logo', true, true)}
                            error={formik.touched.logo && formik.errors.logo}
                            label={t('upload_organization_logo')}
                        />
                        <SimpleImageUpload
                            onChange={(value) => handleChange(value, 'certificateFile')}
                            onBlur={() => formik.setFieldTouched('certificateFile', true, true)}
                            error={formik.touched.certificateFile && formik.errors.certificateFile}
                            label={t('upload_organization_certificate')}
                        />
                    </GridBasic>
                </GridItem>
                <GridItem gridColumn='1/3'>
                    <AuthButtonGroup style={{justifyContent: 'flex-end'}}>
                        <AuthButton
                            size='lg'
                            onClick={() => setShowVideoVerify(true)}
                            disabled={disabled()}
                        >
                            {t('continue')}
                        </AuthButton>
                    </AuthButtonGroup>
                </GridItem>
            </OrgCreateGrid>
        </>
    )
}