import React, {useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$offeringModel} from '../../../models/offering-model'
import {Title} from '../../../UIComponents/typography'
import {DetailShowMore, OfferCharacsItem, OfferCharacsLine} from '../atoms'
import {useTranslation} from 'react-i18next'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {SkeletonUI} from '../../../UIComponents/global-styles'

const skeletonData = generateSkeleton(3)

export const OfferDetailParams = () => {
    const [showMoreParams, setShowMoreParams] = useState(false)
    const [data, setData] = useState([])
    const {$offerParamsStore} = useStore($offeringModel)
    const [showMoreButton, setShowMoreButton] = useState(true)
    const {t} = useTranslation()

    useEffect(() => {
        if ($offerParamsStore.data.length > 0) {
            const allData = $offerParamsStore.data.filter(item => item.character.character_type !== 11)
            const onlyRequiredData = allData.filter(item => item.character.required)
            const notRequiredData = allData.filter(item => !item.character.required)
            if (notRequiredData.length > 0) {
                if (showMoreParams) {
                    setData(allData)
                } else {
                    setData(onlyRequiredData)
                }
            } else {
                setShowMoreButton(false)
                setData(allData)
            }
        }

    }, [showMoreParams, $offerParamsStore.data])


    return (
        <>
            {
                $offerParamsStore.skeleton === false && data.length > 0
                && (
                    <>

                        <Title level={5} weight={600}>
                            {t('characters')}
                        </Title>
                        {
                            data.map((item, idx) => (
                                <OfferCharacsItem key={`${idx + 1}`}>
                                    <Title weight={400}>
                                        {item.character.name}:
                                    </Title>
                                    <OfferCharacsLine/>
                                    <div style={{minWidth: '30%'}}>
                                        <Title level={5} weight={600}>
                                            {
                                                item.character.character_type === 9
                                                    ? item.value === '1' ? t('yes') : t('no')
                                                    : item.value
                                            }
                                        </Title>
                                    </div>
                                </OfferCharacsItem>
                            ))
                        }
                        {
                            !showMoreParams && showMoreButton &&
                            <DetailShowMore
                                onClick={() => setShowMoreParams(true)}
                            >
                                {t('more')}
                            </DetailShowMore>
                        }
                    </>
                )
            }
            {
                ($offerParamsStore.skeleton === undefined || !!$offerParamsStore.skeleton) && skeletonData.map((item, idx) => (
                    <OfferCharacsItem key={`${idx + 1}`}>
                        <Title weight={400}>
                            <SkeletonUI variant='rect' height={20} width={120} />
                        </Title>
                        <OfferCharacsLine/>
                        <div style={{minWidth: '30%'}}>
                            <Title level={5} weight={600}>
                                <SkeletonUI variant='rect' height={20} width='100%' />
                            </Title>
                        </div>
                    </OfferCharacsItem>
                ))
            }
        </>
    )
}