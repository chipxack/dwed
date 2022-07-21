import React from 'react'
import {Col, Row} from 'antd'
import {useSpecialistModal} from '../../../hooks/org'
import {$organizationModel} from '../../../models/organization-models'
import {useStore} from 'effector-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {ShortAccountCardSkeleton} from '../../../components/card'
import {FilterModalItem, FilterModalScroll} from '../atoms'
import {ButtonUI} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {SpecCatModalItem, SpecialistModalItem} from './modal-items'

export const SpecialistFilterModal = ({onClose}) => {
    const {t} = useTranslation()
    const {
        handleSelectSpec,
        activeSpecId,
        handleAccept,
        handleSelectSpecCat,
        loadMoreSpecCatList,
        loadMoreSpecList,
        activeSpecCatId,
    } = useSpecialistModal({onClose})

    return (
        <Row gutter={[16, 24]}>
            <Col span={7} style={{borderRight: '1px solid #f2f2f2'}}>
                <ModalSpecCatList
                    handleSelectSpecCat={handleSelectSpecCat}
                    loadMore={loadMoreSpecCatList}
                    activeSpecCatId={activeSpecCatId}
                />
            </Col>
            <Col span={17}>
                <ModalSpecList
                    handleSelectSpec={handleSelectSpec}
                    activeSpecId={activeSpecId}
                    loadMore={loadMoreSpecList}
                />
            </Col>
            <Col span={24}>
                <Row gutter={24} justify='end'>
                    <Col>
                        <ButtonUI size='lg' onClick={onClose} buttonstyle='link'>
                            {t('cancel')}
                        </ButtonUI>
                    </Col>
                    <Col>
                        <ButtonUI size='lg' onClick={handleAccept}>
                            {t('accept')}
                        </ButtonUI>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}


const ModalSpecCatList = ({loadMore, handleSelectSpecCat, activeSpecCatId}) => {
    const {$orgSpecCatList: {data, result, loading}} = useStore($organizationModel)

    return (
        <FilterModalScroll id='spec-cat-scroll'>
            <InfiniteScroll
                dataLength={result.nextOffset || 20} //This is important field to render the next data
                next={loadMore}
                hasMore={!loading && !!result.next}
                loader={<h4>Loading...</h4>}
                scrollableTarget='spec-cat-scroll'
            >
                <Row gutter={0}>
                    {
                        data.length > 0 && data.map((item, idx) => (
                            <Col span={24} key={`${idx + 1}`}>
                                <SpecCatModalItem
                                    item={item}
                                    activeSpecCatId={activeSpecCatId}
                                    handleSelectSpecCat={handleSelectSpecCat}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </FilterModalScroll>
    )
}

const skeletonData = generateSkeleton(9)

const ModalSpecList = ({loadMore, handleSelectSpec, activeSpecId}) => {
    const {$orgSpecsLists: {data, result, loading, skeleton}} = useStore($organizationModel)

    return (
        <FilterModalScroll id='spec-scroll'>
            <InfiniteScroll
                dataLength={result.nextOffset || 20}
                next={loadMore}
                hasMore={!loading && !!result.next}
                loader={<h4>Loading...</h4>}
                scrollableTarget='spec-scroll'
            >
                <Row gutter={[16, 16]}>
                    {
                        skeleton === false && data.length > 0 && data.map((item, idx) => (
                            <Col span={8} key={`${idx + 1}`}>
                                <SpecialistModalItem
                                    size={80}
                                    direction='vertical'
                                    item={item}
                                    activeSpecId={activeSpecId}
                                    handleSelectSpec={handleSelectSpec}
                                />
                            </Col>
                        ))
                    }
                    {
                        (skeleton === undefined || !!skeleton) && skeletonData.map((item, idx) => (
                            <Col span={8} key={`${idx + 1}`}>
                                <FilterModalItem>
                                    <ShortAccountCardSkeleton direction='vertical' size={60}/>
                                </FilterModalItem>
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </FilterModalScroll>
    )
}