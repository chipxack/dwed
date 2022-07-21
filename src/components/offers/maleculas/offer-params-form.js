import React, {Fragment} from 'react'
import {AccountSectionHeading, ButtonGroup, ButtonUI, CommonForm, GridBasic, GridItem} from "../../../ui/atoms";
import {CHARACTER_FIELDS} from "../../../constants/";
import {useStore} from "effector-react";
import {$categoryModel} from "../../../models/categories-models";
import {Title} from "../../../UIComponents/typography";
import {useTranslation} from "react-i18next";
import {useOfferParamsForm} from "../../../hooks/offers";
import {InputUI} from "../../../UIComponents/inputs";
import {LoadingContainer} from "../../../UIComponents/loading-container";
import {ColorForm} from "./color-form";

export const OfferParamsForm = () => {
    const {t} = useTranslation()
    const {$charactersPreparedValues} = useStore($categoryModel)
    const preparedValues = $charactersPreparedValues.data
    const {
        formik,
        formParams,
        loadMore,
        onSearch,
        handleChange,
        searchColor,
        loadMoreColor,
        setSearchColor
    } = useOfferParamsForm()

    const booleanOption = [
        {
            value: '1',
            label: t('yes')
        },
        {
            value: '0',
            label: t('no')
        }
    ]


    const getInputType = (field) => {
        switch (field) {
            case CHARACTER_FIELDS[4]:
                return 'number'
            default:
                return 'text'
        }
    }

    const getDateView = (field) => {
        switch (field) {
            case CHARACTER_FIELDS[12]:
                return 'year'
            default:
                return false
        }
    }

    const generateForm = (item) => {
        const {field, name, id, title, multi_values} = item
        switch (field) {
            case CHARACTER_FIELDS[1]:
                return (
                    <InputUI
                        label={title}
                        multiple={multi_values}
                        options={preparedValues[id] ?? []}
                        name={String(name)}
                        onLoadMore={(e) => loadMore(e, item)}
                        filterSelectedOptions={false}
                        inputType='autocomplete-select'
                        value={formik.values && formik.values[name] ? formik.values[name] : multi_values ? [] : null}
                        loading={$charactersPreparedValues.loading}
                        onSearch={(e) => onSearch(e, item)}
                        onChange={(e) => handleChange(item, e)}
                        onBlur={() => formik.setFieldTouched(name, true, true)}
                        error={formik.touched[name] && formik.errors[name]}
                    />
                )
            case CHARACTER_FIELDS[10]:
            case CHARACTER_FIELDS[12]:
                return (
                    <InputUI
                        inputType='date'
                        name={String(name)}
                        views={getDateView(field)}
                        label={title}
                        onChange={(value) => handleChange(item, value)}
                        value={new Date(formik.values[name])}
                        onBlur={formik.handleBlur}
                        error={formik.touched[name] && formik.errors[name]}
                    />
                )
            case CHARACTER_FIELDS[9]:
                return (
                    <InputUI
                        name={String(name)}
                        inputType='select'
                        label={title}
                        options={booleanOption}
                        value={formik.values[name] || ''}
                        error={formik.touched[name] && formik.errors[name]}
                        onBlur={() => formik.setFieldValue(String(name), true, true)}
                        onChange={(e) => formik.setFieldValue(String(name), e.target.value)}
                    />
                )
            case CHARACTER_FIELDS['11']:
                return (
                    <>
                        <InputUI
                            type={getInputType(field)}
                            name={String(name)}
                            label={title}
                            onChange={(e) => handleChange(item, e.target.value)}
                            value={formik.values[name] || ''}
                            onBlur={formik.handleBlur}
                            error={formik.touched[name] && formik.errors[name]}
                            readOnly
                        />
                    </>
                )
            default:
                return (
                    <InputUI
                        type={getInputType(field)}
                        name={String(name)}
                        label={title}
                        onChange={(e) => handleChange(item, e.target.value)}
                        value={formik.values[name] || ''}
                        onBlur={formik.handleBlur}
                        error={formik.touched[name] && formik.errors[name]}
                    />
                )
        }
    }

    return (
        <>
            <AccountSectionHeading>
                <Title level={3}>
                    {t('add_offer_params')}
                </Title>
            </AccountSectionHeading>
            <CommonForm onSubmit={formik.handleSubmit}>
                <LoadingContainer loading={formParams.length === 0}>
                    {
                        formParams.length > 0
                        && (
                            <GridBasic perColumn={2}>
                                {
                                    formParams.map((item, idx) => (
                                        <Fragment key={`${idx + 1}`}>
                                            {
                                                item.field === CHARACTER_FIELDS['11']
                                                    ? (
                                                        <GridItem gridColumn='1/3'>
                                                            <ColorForm
                                                                multiple={item.multi_values}
                                                                value={formik.values[item.name]}
                                                                onChange={(value) => handleChange(item, value)}
                                                                onSearch={setSearchColor}
                                                                search={searchColor}
                                                                loadMore={loadMoreColor}
                                                            />
                                                        </GridItem>
                                                    )
                                                    : <>{generateForm(item)}</>
                                            }
                                        </Fragment>
                                    ))
                                }
                                <GridItem gridColumn='1/3'>
                                    <ButtonGroup style={{justifyContent: 'flex-end'}}>
                                        <ButtonUI
                                            size='lg'
                                            htmlType='submit'
                                        >
                                            {t('save')}
                                        </ButtonUI>
                                    </ButtonGroup>
                                </GridItem>
                            </GridBasic>
                        )
                    }
                </LoadingContainer>
            </CommonForm>
        </>
    )
}