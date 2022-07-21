import React from 'react'
import {CheckoutDetailWrapper} from "../atoms";
import {Title} from "../../../UIComponents/typography";
import {useTranslation} from "react-i18next";
import {useStore} from "effector-react";
import {$orderModel} from "../../../models/order-models";
import {numberFormat} from "../../../utils/numberUtils";
import {ButtonUI} from "../../../ui/atoms";

export const CheckoutDetail = ({createOrder, loading}) => {
    const {t} = useTranslation()
    const {$cart: {result}} = useStore($orderModel)

    return (
        <>
            {
                result && Object.values(result).length > 0
                && (
                    <CheckoutDetailWrapper>
                        <Title level={3}>{t('total')}</Title>
                        <Title level={4}>{`${numberFormat(result.total_cost)} UZS`}</Title>
                        <Title level={5} style={{paddingRight: 12}}>
                            {t('offerings_count')}
                            <span>{result.count}</span>
                        </Title>
                        <ButtonUI
                            size='lg'
                            style={{justifyContent: 'center', marginTop: 18}}
                            onClick={createOrder}
                            loading={loading}
                        >
                            {t('checkout')}
                        </ButtonUI>
                    </CheckoutDetailWrapper>
                )
            }
        </>
    )
}