import React from 'react'
import {CategoryScroll, CategoryWrapper} from '../atoms'
import {useStore} from 'effector-react'
import {$categoryModel} from '../../../models/categories-models'
import {CategoryItem} from '../moleculas'
import {ButtonUI, StyledInfiniteScroller} from '../../../ui/atoms'
import backImg from '../../../assets/images/back.png'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'

export const UserCategoryList = ({
                                     loadCategory,
                                     commonCatHandleClick,
                                     onClose,
                                     parent,
                                     goBackCategory,
                                     handleAccept
                                 }) => {
    const {$categoryList} = useStore($categoryModel)
    const {loading, data, result} = $categoryList
    const {t} = useTranslation()

    return (
        <Row gutter={24}>
            <Col span={24}>
                <CategoryScroll>
                    <StyledInfiniteScroller
                        pageStart={0}
                        loadMore={loadCategory}
                        hasMore={!loading && result.next !== null && result.next !== undefined}
                        loader={<div className='loader' key={0}>Loading ...</div>}
                        useWindow={false}
                        threshold={400}
                    >
                        <CategoryWrapper>
                            {
                                parent !== 0
                                && (
                                    <CategoryItem
                                        onClick={goBackCategory}
                                        data={{image: backImg, name: t('back')}}
                                    />
                                )
                            }
                            {
                                data.map((item, idx) => (
                                    <CategoryItem
                                        onClick={() => commonCatHandleClick(item)}
                                        key={`${idx + 1}`}
                                        data={item}
                                    />
                                ))
                            }
                        </CategoryWrapper>
                    </StyledInfiniteScroller>
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