import React from 'react'
import {RequestOfferItem} from "../atoms";
import {Title} from "../../../UIComponents/typography";
import {SkeletonUI} from "../../../UIComponents/global-styles";

export const OrderOfferingSkeleton = ({animation}) => {
    return (
        <RequestOfferItem>
            <RequestOfferItem.Content>
                <Title style={{lineHeight: '20px', marginBottom: 10}}>
                    <SkeletonUI
                        variant='text'
                        height={20}
                        width='100%'
                        animation={animation || 'wave'}
                    />
                    <SkeletonUI
                        variant='text'
                        height={20}
                        width='100%'
                        animation={animation || 'wave'}
                    />
                </Title>
                <SkeletonUI
                    variant='text'
                    height={16}
                    width='100%'
                    animation={animation || 'wave'}
                />
            </RequestOfferItem.Content>
            <SkeletonUI
                style={{borderRadius: 0}}
                animation={animation || 'wave'}
                variant='rect' width={102}
                height={102}
            />
        </RequestOfferItem>
    )
}