import React from 'react'
import {OfferingDiscount, OfferingDiscountBadge, OfferingDiscountItem, OfferingDiscountWrapper} from "../atoms";
import {Title} from "../../../UIComponents/typography";

export const OfferingDiscountSystem = () => {
    const data = ['cashback', 'discount', 'payback']
    return (
        <OfferingDiscount>
            {
                data.map(item => (
                    <OfferingDiscountWrapper key={item}>
                        <OfferingDiscountItem>
                            <OfferingDiscountBadge type={item}>
                                {item}
                            </OfferingDiscountBadge>
                        </OfferingDiscountItem>
                        <OfferingDiscountItem>
                            {
                                item === 'payback'
                                    ? <Title level={5}>10 000 000 UZS </Title>
                                    : <Title level={5}>100 000 000 UZS </Title>
                            }
                        </OfferingDiscountItem>
                    </OfferingDiscountWrapper>
                ))
            }

        </OfferingDiscount>
    )
}