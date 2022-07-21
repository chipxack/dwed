import React from 'react'
import {OfferingDetail, OfferingDetailItem, OfferingSeperate} from '../atoms'
import {ShortAccountCardSkeleton} from '../../card'
import {Title} from '../../../UIComponents/typography'
import {SkeletonUI} from '../../../UIComponents/global-styles'
import {ButtonUI} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {useParams} from 'react-router-dom'

export const OfferDetailSkeleton = () => {
    const {t} = useTranslation()
    const {offering_id} = useParams()

    return (
        <OfferingDetail>
            <OfferingSeperate>
                {
                    !offering_id
                    && (
                        <OfferingDetailItem style={{marginBottom: 8}}>
                            <ShortAccountCardSkeleton size={40}/>
                        </OfferingDetailItem>
                    )
                }
                <OfferingDetailItem>
                    <div style={{width: '100%'}}>
                        <SkeletonUI variant='text' heigh={24} width='100%'/>
                        <SkeletonUI variant='text' heigh={24} width='70%'/>
                    </div>
                </OfferingDetailItem>
            </OfferingSeperate>
            <OfferingSeperate>
                <OfferingDetailItem>
                    <Title level={6} weight={700} color='var(--grey-basic)'>
                        {t('quantity')}:
                    </Title>
                    <SkeletonUI variant='text' heigh={24} width='30%'/>
                </OfferingDetailItem>
            </OfferingSeperate>
            <ButtonUI size='lg'>
                {t('checkout_now')}
            </ButtonUI>
        </OfferingDetail>
    )
}