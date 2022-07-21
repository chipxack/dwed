import React, {useCallback, useRef, useState} from 'react'
import {HomeOfferingCatContainer, HomeOfferingCatItem} from '../atoms'
import {useStore} from 'effector-react'
import {$categoryModel} from '../../../models/categories-models'
import {useTranslation} from 'react-i18next'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import {Col, Row} from 'antd'
import {ChevronLeftSvg} from '../../../media'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {SkeletonUI} from '../../../UIComponents/global-styles'
import {HomeFilter} from '../../../components/filter'
import {Modal} from '../../../components/modal'
import {useOfferingCategoryId, useOfferingCategoryList} from '../../../hooks/category'

const skeleton = generateSkeleton(6)

export const HomeOfferingCatList = () => {
    const {t} = useTranslation()
    const {parentId, drawPath, itemClick, itemBack} = useOfferingCategoryList({init: true, routing: true})
    const {$offeringCategory: {data, loading}} = useStore($categoryModel)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {offeringCatId} = useOfferingCategoryId()
    const categoryId = offeringCatId || 0
    const contRef = useRef(null)

    const getWidth = useCallback((clientWidth) => {
        let width
        if (parentId) {
            width = clientWidth - 128
        } else {
            width = clientWidth - 76
        }

        return width
    }, [parentId])

    return (
        <>
            <Modal
                title={t('offering_category')}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                component={(
                    <HomeFilter
                        type='category'
                        onClose={() => setModalIsOpen(false)}
                    />
                )}
                width={960}
            />
            <HomeOfferingCatContainer ref={contRef}>
                {
                    data[categoryId] && data[categoryId].length > 0 && contRef.current && (
                        <Row gutter={16} wrap={false} align='middle'>
                            {
                                parentId ? (
                                    <Col>
                                        <HomeOfferingCatItem style={{width: 36, padding: 0}} onClick={itemBack}>
                                            <ChevronLeftSvg/>
                                        </HomeOfferingCatItem>
                                    </Col>
                                ) : null
                            }

                            <Col flex={1}>
                                <Splide
                                    options={{
                                        rewind: true,
                                        autoWidth: true,
                                        width: getWidth(contRef.current.clientWidth),
                                        gap: '1rem',
                                        arrows: false,
                                        pagination: false
                                    }}
                                >
                                    {
                                        data[categoryId].slice(0, 10).map(item => (
                                            <SplideSlide key={item.id}>
                                                <HomeOfferingCatItem
                                                    isActive={categoryId && parseInt(categoryId) === item.id}
                                                    href={drawPath(item)}
                                                    onClick={(e) => itemClick(e, item)}
                                                >
                                                    {item.name}
                                                </HomeOfferingCatItem>
                                            </SplideSlide>
                                        ))
                                    }
                                </Splide>
                            </Col>
                            <Col>
                                <HomeOfferingCatItem
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setModalIsOpen(true)
                                    }}
                                    style={{width: 60}}
                                >
                                    ...
                                </HomeOfferingCatItem>
                            </Col>
                        </Row>
                    )
                }
                {
                    !data[categoryId] && loading && (
                        <Row gutter={16} style={{width: '100%'}}>
                            {
                                skeleton.map((item, idx) => (
                                    <Col span={4} key={`${idx + 1}`} style={{display: 'flex', alignItems: 'center'}}>
                                        <SkeletonUI
                                            width='100%'
                                            height={40}
                                            variant='text'
                                            animation='wave'
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    )
                }
            </HomeOfferingCatContainer>
        </>
    )
}