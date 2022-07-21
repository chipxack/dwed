import React, {useState} from 'react'
import {Title} from '../../../UIComponents/typography'
import {DetailShowMore, OfferingDetailDesc} from '../atoms'
import {truncateString} from '../../../utils/stringUtils'
import {useStore} from 'effector-react'
import {$offeringModel} from '../../../models/offering-model'
import {useTranslation} from 'react-i18next'
import {SkeletonUI} from '../../../UIComponents/global-styles'

export const OfferDescription = () => {
    const [showMore, setShowMore] = useState(false)
    const {$offerDetailStore: {data, skeleton}} = useStore($offeringModel)
    const {t} = useTranslation()

    return (
        <>
            <Title level={5} weight={600} style={{marginBottom: 6}}>
                {t('description')}
            </Title>
            {
                Object.values(data).length > 0 && skeleton === false
                && (
                    <OfferingDetailDesc>
                        <Title weight={400} align='justify'>
                            {
                                !showMore
                                    ? (
                                        <>
                                            {truncateString(data.description, 300)}
                                            {
                                                data.description.length > 300
                                                && (
                                                    <DetailShowMore onClick={() => setShowMore(!showMore)}>
                                                        {t(!showMore ? 'more' : 'hide')}
                                                    </DetailShowMore>
                                                )
                                            }
                                        </>
                                    )
                                    : (
                                        <>
                                            {data.description}
                                            {
                                                data.description.length > 300
                                                && (
                                                    <DetailShowMore onClick={() => setShowMore(!showMore)}>
                                                        {t(!showMore ? 'more' : 'hide')}
                                                    </DetailShowMore>
                                                )
                                            }
                                        </>
                                    )
                            }
                        </Title>
                    </OfferingDetailDesc>
                )
            }
            {
                (skeleton === undefined || !!skeleton) && (
                    <OfferingDetailDesc>
                        <SkeletonUI variant='rect' width='100%' height={16}/>
                        <SkeletonUI variant='rect' width='100%' height={16}/>
                        <SkeletonUI variant='rect' width='70%' height={16}/>
                    </OfferingDetailDesc>
                )
            }
        </>
    )
}