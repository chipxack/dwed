import React from 'react'
import {useParamFilter} from "../../../hooks/common";
import {Col, Row} from "antd";
import {HomeFilterHeader, PriceFilter} from "../moleculas";
import {CategoryCharacterList} from "./category-character-list";
import {CategoryScroll} from "../atoms";
import {ButtonGroup, ButtonUI} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";

export const HomeParamsFilter = ({paramFilterId, onClose}) => {
    const {
        values,
        onChange,
        onSearch,
        costValue,
        resetFilter,
        setCostValue,
        handleAccept,
        getAllValues,
        showAllFilters,
        handleShowAllFilters
    } = useParamFilter({id: paramFilterId, onClose})
    const {t} = useTranslation()

    return (
        <>
            <HomeFilterHeader handleAccept={handleAccept} resetFilter={resetFilter}/>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <PriceFilter
                        categoryId={paramFilterId}
                        costValue={costValue}
                        setCostValue={setCostValue}
                    />
                </Col>
                <Col span={24}>

                    {
                        paramFilterId && (
                            <>
                                <CategoryScroll>
                                    <CategoryCharacterList
                                        values={values}
                                        getAllValues={getAllValues}
                                        onSearch={onSearch}
                                        onChange={(data) => onChange(data)}
                                    />
                                </CategoryScroll>
                                {
                                    !showAllFilters && (
                                        <ButtonGroup style={{justifyContent: 'center', marginTop: 32}}>
                                            <ButtonUI size='lg' onClick={handleShowAllFilters}>
                                                {t('all_filters')}
                                            </ButtonUI>
                                        </ButtonGroup>
                                    )
                                }
                            </>
                        )
                    }
                </Col>
            </Row>
        </>
    )
}