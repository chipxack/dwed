import React, {useCallback, useRef} from 'react'
import {AccountSectionHeading, ButtonUI, GridBasic, GridItem} from "../../../ui/atoms";
import {useOfferForm} from "../../../hooks/offers";
import {useTranslation} from "react-i18next";
import {useStore} from "effector-react";
import {$organizationModel} from "../../../models/organization-models";
import {SelectionList} from "../../selection-list";
import {LISTS} from "../../../constants/lists";
import {showModal} from "../../../models/widgets";
import {$appModel} from "../../../models/app";
import {UNITS_OF_MEASUREMENT} from "../../../helpers";
import {Text, Title} from "../../../UIComponents/typography";
import {useHistory, useParams} from "react-router-dom";
import {$offeringModel, resetOfferingListStore} from "../../../models/offering-model";
import {GalleryImageUpload} from "../../image-upload";
import {Col, Row, Switch} from "antd";
import {InputUI} from "../../../UIComponents/inputs";
import {OfferingForm} from "../atoms";
import {URL_KEYS} from '../../../constants';
import {CircularProgress} from "@material-ui/core";
import {IconBox} from "../../../UIComponents/global-styles";
import {LangSelect} from "../../../UIComponents/lang";
import {langObj} from "../../../data/lang";

export const OfferBasicForm = () => {
    const {organization} = useParams()
    const {$specialistsOrganization} = useStore($organizationModel)
    const {$offeringGroupList} = useStore($offeringModel)
    const {$currencyList} = useStore($appModel)
    const {
        free,
        lang,
        formik,
        unlimit,
        handleChange,
        changeQtyType,
        galleryChange,
        loadSpecialist,
        changePriceType,
        searchSpecialist,
        handleChangeLang,
        loadOfferingGroup,
        isCategoryChanged,
        deleteGalleryImage,
        searchOfferingGroup,
        handleChangeCategory,
        changeMainGalleryImage,
    } = useOfferForm()

    const saveRef = useRef(null)

    const langList = Object.keys(langObj)

    const {t} = useTranslation()
    const {offering_id} = useParams()
    const specialist = $specialistsOrganization.data.map((item) => ({
        label: `${item.name} (${item.spec_name})`,
        image: item.image,
        value: String(item.id)
    }))
    const {push, location: {pathname}} = useHistory()


    const currencyList = $currencyList.data.map(item => ({label: item.code.toUpperCase(), value: item.id}))
    const measurementList = UNITS_OF_MEASUREMENT.map(item => ({...item, label: t(item.label)}))

    const getOfferGroupList = useCallback(() => {
        let data = $offeringGroupList.data
        const tmp = []

        for (let i = 0; i < data.length; i++) {
            tmp.push({label: data[i].name, value: data[i].id})
        }
        return tmp
    }, [$offeringGroupList.data])

    const renderModal = () => {
        return {
            component:
                <SelectionList
                    handleChange={handleChangeCategory}
                    type={LISTS.OFFERING_CATEGORY}
                />,
            open: true,
            props: {width: 432}
        }
    }

    const handleClick = () => {
        let timeout = null
        formik.setFieldValue('reload', false)
        saveRef.current.click()
        timeout = setTimeout(() => {
            resetOfferingListStore()
            push({
                pathname,
                search: `${URL_KEYS.OFFERING_PARAM_ID}=${offering_id}`
            })
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }

    return (
        <>
            <AccountSectionHeading>
                <Title level={3}>
                    {t('add_offer')}
                </Title>
            </AccountSectionHeading>
            <OfferingForm onSubmit={(e) => formik.handleSubmit(e, 'test')}>
                <GridBasic perColumn={2} gap={32}>
                    <GridItem gridColumn='1/3'>
                        <Title>
                            {t('photos_of_offering')}
                        </Title>
                        <GalleryImageUpload
                            values={formik.values.gallery}
                            handleChange={galleryChange}
                            changeMainGalleryImage={changeMainGalleryImage}
                            deleteGalleryImage={deleteGalleryImage}
                            error={formik.errors.gallery}
                        />
                    </GridItem>
                    <GridItem gridColumn='1/3'>
                        <Row justify='space-between' style={{marginBottom: 8}}>
                            <Col span='auto'>
                                <Title>
                                    {t('name_in_form_title')}
                                </Title>
                            </Col>
                            <Col>
                                <LangSelect
                                    langList={langList}
                                    value={lang}
                                    onChange={handleChangeLang}/>
                            </Col>
                        </Row>
                        <GridBasic perColumn={2} gap={24}>
                            <InputUI
                                name='name'
                                label={`${t('offering_name')} ${lang ? `(${lang})` : ''}`}
                                value={formik.values.name[lang] || ''}
                                onBlur={formik.handleBlur}
                                onChange={(e) => handleChange('name', e.target.value)}
                                error={formik.touched.name && formik.errors.name}
                            />
                            <InputUI
                                readOnly
                                name='category_id'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('select_offering_category')}
                                onClick={() => showModal(renderModal())}
                                error={formik.touched.category_id && formik.errors.category_id}
                                value={formik.values.category_id ? formik.values.category_id.name : ''}
                            />
                            <InputUI
                                name='group_id'
                                options={getOfferGroupList()}
                                value={formik.values.group_id}
                                onLoadMore={loadOfferingGroup}
                                loading={$offeringGroupList.loading}
                                inputType='autocomplete-select'
                                label={t('select_offering_group')}
                                onSearch={searchOfferingGroup}
                                error={formik.touched.group_id && formik.errors.group_id}
                                onChange={(e) => handleChange('group_id', e)}
                                onBlur={() => formik.setFieldTouched('group_id', true, true)}
                            />
                            {
                                organization && (
                                    <InputUI
                                        multiple
                                        options={specialist}
                                        name='responsible_ids'
                                        onLoadMore={loadSpecialist}
                                        label={t('attach_specialist')}
                                        inputType='autocomplete-select'
                                        value={formik.values.responsible_ids}
                                        loading={$specialistsOrganization.loading}
                                        onSearch={searchSpecialist}
                                        onChange={(e) => handleChange('responsible_ids', e)}
                                        onBlur={() => formik.setFieldTouched('responsible_ids', true, true)}
                                        error={formik.touched.responsible_ids && formik.errors.responsible_ids}
                                    />
                                )
                            }
                        </GridBasic>
                    </GridItem>
                    <GridItem gridColumn='1/3'>
                        <Title>
                            {t('description')}
                        </Title>
                        <InputUI
                            rows={8}
                            name='description'
                            inputType='textarea'
                            label={`${t('describe_the_offer')} ${lang ? `(${lang})` : ''}`}
                            value={formik.values.description[lang] || ''}
                            onBlur={formik.handleBlur}
                            onChange={(e) => handleChange('description', e.target.value)}
                            error={formik.touched.description && formik.errors.description}
                        />
                    </GridItem>
                    <GridItem gridColumn='1/3'>
                        <Title>
                            {t('offering_price')}
                        </Title>
                        <Row gutter={16} style={{marginBottom: 16}}>
                            <Col span='auto'>
                                <Text weight={500} size={14} lineHeight={24}>
                                    {t('free')}
                                </Text>
                            </Col>
                            <Col span='auto'>
                                <Switch checked={free} onChange={changePriceType}/>
                            </Col>
                        </Row>
                        <GridBasic perColumn={3} gap={24}>
                            {
                                !free && (
                                    <>
                                        <InputUI
                                            type="number"
                                            name='cost'
                                            label={t('cost')}
                                            min='0'
                                            value={formik.values.cost}
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => handleChange('cost', e.target.value)}
                                            error={formik.touched.cost && formik.errors.cost}
                                        />
                                        <InputUI
                                            name='currency_id'
                                            inputType='select'
                                            label={t('select_currency')}
                                            options={currencyList}
                                            value={formik.values.currency_id}
                                            error={formik.touched.currency_id && formik.errors.currency_id}
                                            onBlur={() => formik.setFieldTouched('currency_id', true, true)}
                                            onChange={(e) => handleChange('currency_id', e.target.value)}
                                        />
                                    </>
                                )
                            }
                        </GridBasic>
                    </GridItem>
                    <GridItem gridColumn='1/3'>
                        <Title>
                            {t('quantity')}
                        </Title>

                        <Row gutter={16} style={{marginBottom: 16}}>
                            <Col span='auto'>
                                <Text weight={500} size={14} lineHeight={24}>
                                    {t('unlimit')}
                                </Text>
                            </Col>
                            <Col span='auto'>
                                <Switch checked={unlimit} onChange={changeQtyType}/>
                            </Col>
                        </Row>

                        <GridBasic perColumn={3} gap={24}>
                            {
                                !unlimit
                                && (
                                    <InputUI
                                        type="number"
                                        name='qty'
                                        label={t('quantity')}
                                        value={formik.values.qty}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => handleChange('qty', e.target.value)}
                                        error={formik.touched.qty && formik.errors.qty}
                                    />
                                )
                            }

                            <InputUI
                                name='measurement'
                                inputType='select'
                                label={t('select_measurement')}
                                options={measurementList}
                                value={formik.values.measurement}
                                onChange={(e) => handleChange('measurement', e.target.value)}
                                error={formik.touched.measurement && formik.errors.measurement}
                                onBlur={() => formik.setFieldTouched('measurement', true, true)}
                            />
                        </GridBasic>
                    </GridItem>
                    <GridItem gridColumn='1/3'>
                        <Title>
                            {t('min/max_quantity')}
                        </Title>
                        <GridBasic perColumn={3} gap={24}>
                            <InputUI
                                type="number"
                                name='min_qty'
                                onBlur={formik.handleBlur}
                                label={t('minimum_quantity')}
                                value={formik.values.min_qty}
                                onChange={(e) => handleChange('min_qty', e.target.value)}
                                error={formik.touched.min_qty && formik.errors.min_qty}
                            />
                            <InputUI
                                type="number"
                                name='max_qty'
                                onBlur={formik.handleBlur}
                                value={formik.values.max_qty}
                                onChange={(e) => handleChange('max_qty', e.target.value)}
                                label={t('maximum_quantity')}
                                error={formik.touched.max_qty && formik.errors.max_qty}
                            />

                        </GridBasic>
                    </GridItem>
                    {/*<GridItem gridColumn='1/3'>*/}
                    {/*    <Title>*/}
                    {/*        {t('bar_code')}*/}
                    {/*    </Title>*/}
                    {/*    <GridBasic perColumn={3} gap={24}>*/}
                    {/*        <InputUI*/}
                    {/*            type="number"*/}
                    {/*            name='bar_code'*/}
                    {/*            onBlur={formik.handleBlur}*/}
                    {/*            value={formik.values.bar_code}*/}
                    {/*            onChange={(e) => handleChange('bar_code', e.target.value)}*/}
                    {/*            label={t('bar_code')}*/}
                    {/*            error={formik.touched.bar_code && formik.errors.bar_code}*/}
                    {/*        />*/}
                    {/*    </GridBasic>*/}
                    {/*</GridItem>*/}
                    <GridItem gridColumn='1/3'>
                        <Row gutter={24} justify='end'>
                            {
                                offering_id && !isCategoryChanged
                                && (
                                    <Col span='auto'>
                                        <ButtonUI
                                            size='lg'
                                            onClick={handleClick}
                                            disabled={formik.isSubmitting}
                                        >
                                            {t('change_parameters')}
                                        </ButtonUI>
                                    </Col>
                                )
                            }
                            <Col span='auto'>
                                <ButtonUI
                                    size='lg'
                                    htmlType='submit'
                                    disabled={formik.isSubmitting}
                                    ref={saveRef}
                                >
                                    {
                                        formik.isSubmitting
                                        && (
                                            <IconBox style={{marginRight: 10}}>
                                                <CircularProgress size={20}/>
                                            </IconBox>
                                        )
                                    }
                                    {t(
                                        offering_id
                                            ? isCategoryChanged ? 'continue' : 'save'
                                            : 'continue'
                                    )}
                                </ButtonUI>
                            </Col>
                        </Row>
                    </GridItem>
                </GridBasic>
            </OfferingForm>
        </>
    )
}