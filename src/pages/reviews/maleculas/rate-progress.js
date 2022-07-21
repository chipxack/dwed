import React, {useCallback} from 'react'
import {ProgressFormItem} from "../../../components/progres";
import {Title} from "../../../UIComponents/typography";
import {ReviewHeading} from "../atoms";
import {useTranslation} from "react-i18next";
import {useStore} from "effector-react";
import {$orderModel} from "../../../models/order-models";
import {ratingData} from "../../../data/rating";

export const RateProgress = ({formik}) => {
    const {t} = useTranslation()
    const {$orderInfo: {data: orderData, loading}} = useStore($orderModel)

    const renderItem = useCallback((item) => {
        let tmp = {
            ...item,
            level: 0,
            remaining_score: 0,
            score: 0
        }
        if (!loading && orderData.responsible && orderData.responsible.rating) {
            const rating = orderData.responsible.rating
            tmp = {
                ...item,
                ...rating[item.id],
            }
        }

        return tmp
    }, [orderData, loading])

    return (
        <>
            <ReviewHeading>
                <Title level={4}>
                    {t('rate_a_specialist')}
                </Title>
            </ReviewHeading>
            {
                ratingData.map((item, idx) => (
                    <ProgressFormItem
                        key={`${idx + 1}`} item={renderItem(item)}
                        onChange={(value) => formik.setFieldValue(item.id, value)}
                    />
                ))
            }
        </>
    )
}