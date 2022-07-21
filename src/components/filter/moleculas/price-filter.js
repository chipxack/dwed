import React, {useEffect, useState} from 'react'
import {Col, Row, Slider} from "antd";
import {useStore} from "effector-react";
import {$categoryModel} from "../../../models/categories-models";
import {$accountModel} from "../../../models/accountModel";
import {HomePriceFilterWrapper} from "../atoms";
import {numberFormat} from "../../../utils/numberUtils";

export const PriceFilter = ({costValue, setCostValue, categoryId}) => {
    const {$filterParams: {data}} = useStore($categoryModel)
    const [marks, setMarks] = useState({0: 0, 100: 100})
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const s_value = data.cost

    const currency = currentProfile ? currentProfile.currency.code : ''

    useEffect(() => {
        if (s_value && categoryId) {
            setMarks({
                [s_value.min]: `${numberFormat(s_value.min)} ${currency}`,
                [s_value.max]: `${numberFormat(s_value.max)} ${currency}`
            })
        } else {
            setMarks({0: `0 ${currency}`, 100: `100 ${currency}`})
        }
    }, [s_value, setCostValue, categoryId, currency])


    return (
        <HomePriceFilterWrapper>
            <Row gutter={24} justify='center'>
                <Col span={22}>
                    <Slider
                        range
                        marks={marks}
                        value={costValue}
                        min={s_value ? s_value.min : 0}
                        max={s_value ? s_value.max : 100}
                        onChange={(value) => setCostValue(value)}
                        tipFormatter={(value) => `${numberFormat(value)} ${currency}`}
                    />
                </Col>
            </Row>
        </HomePriceFilterWrapper>
    )
}