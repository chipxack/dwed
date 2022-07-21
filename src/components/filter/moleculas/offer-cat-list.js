import React from 'react'
import {ButtonUI} from '../../../ui/atoms'
import {CategoryScroll, OfferCatItemContent, OfferCatItemImg, OfferCatItemTitle} from '../atoms'
import {useOfferingCategoryList} from '../../../hooks/category'
import {useStore} from 'effector-react'
import {$categoryModel} from '../../../models/categories-models'
import {GridSvg} from '../../../media'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {SkeletonUI} from '../../../UIComponents/global-styles'

const skeleton = generateSkeleton(12)

export const OfferCatList = ({onClose}) => {
    const {t} = useTranslation()
    const {parentId, itemClick, loadMore, handleAccept, selectedCat} = useOfferingCategoryList({init: false})
    const {$offeringCategory: {data, loading}} = useStore($categoryModel)

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <CategoryScroll onScroll={loadMore}>
                    <Row gutter={[24, 12]}>
                        {
                            data[parentId] && data[parentId].length > 0 && data[parentId].map((item) => (
                                <Col span={8} key={item.id}>
                                    <OfferCatItemContent
                                        selected={selectedCat && selectedCat === item.id}
                                        onClick={(e) => itemClick(e, item)}
                                    >
                                        {
                                            item.image
                                                ? <OfferCatItemImg dangerouslySetInnerHTML={{__html: item.image}}/>
                                                : <OfferCatItemImg><GridSvg/></OfferCatItemImg>
                                        }

                                        <OfferCatItemTitle>
                                            {item.name}
                                        </OfferCatItemTitle>
                                    </OfferCatItemContent>
                                </Col>
                            ))
                        }
                        {
                            loading && !data[parentId] && (
                                <>
                                    {
                                        skeleton.map((item, idx) => (
                                            <Col span={8} key={`${idx + 1}`}>
                                                <OfferCatItemContent>
                                                    <SkeletonUI
                                                        style={{marginRight: 8}}
                                                        width={24} height={24} variant='rect' animation='wave'
                                                    />
                                                    <SkeletonUI
                                                        width='85%'
                                                        height={24}
                                                        variant='text'
                                                        animation='wave'
                                                    />
                                                </OfferCatItemContent>
                                            </Col>
                                        ))
                                    }
                                </>
                            )
                        }
                    </Row>
                </CategoryScroll>
            </Col>
            <Col span={24}>
                <Row gutter={24} justify='end' style={{marginTop: 24}}>
                    <Col span='auto'>
                        <ButtonUI
                            size='lg'
                            buttonstyle='link'
                            onClick={onClose}
                        >
                            {t('close')}
                        </ButtonUI>
                    </Col>
                    <Col span='auto'>
                        <ButtonUI size='lg' onClick={handleAccept}>
                            {t('apply')}
                        </ButtonUI>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}