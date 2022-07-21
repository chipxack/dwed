import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$organizationModel} from '../../../models/organization-models'
import {FilterModalItem, FilterModalScroll} from '../atoms'
import InfiniteScroll from 'react-infinite-scroll-component'
import {ShortAccountCardSkeleton} from '../../../components/card'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {$offeringModel} from '../../../models/offering-model'
import {Title} from '../../../UIComponents/typography'
import {useOrgOfferingModal} from '../../../hooks/org'
import {SkeletonUI} from '../../../UIComponents/global-styles'
import {ButtonUI} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {ModalGroupItem, SpecialistModalItem} from './modal-items'

export const OfferingGroupModal = ({onClose}) => {
    const {
        activeGroupId,
        activeSpecId,
        loadMoreSpecList,
        loadMoreGroup,
        handleSelectGroup,
        handleSelectSpec,
        handleAccept
    } = useOrgOfferingModal(onClose)
    const {t} = useTranslation()


    return (
        <Row gutter={[16, 24]}>
            <Col span={7}>
                <ModalSpecList
                    activeSpecId={activeSpecId}
                    handleSelectSpec={handleSelectSpec}
                    loadMore={loadMoreSpecList}
                />
            </Col>
            <Col span={17}>
                <OfferingGroupList
                    loadMore={loadMoreGroup}
                    handleSelectGroup={handleSelectGroup}
                    activeGroupId={activeGroupId}
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
const skeletonData = generateSkeleton(9)

const ModalSpecList = ({loadMore, handleSelectSpec, activeSpecId}) => {
    const {$orgSpecsLists: {data, result, loading, skeleton}} = useStore($organizationModel)

    return (
        <FilterModalScroll id='spec-scroll'>
            <InfiniteScroll
                dataLength={result.nextOffset || 20} //This is important field to render the next data
                next={loadMore}
                hasMore={!loading && !!result.next}
                loader={<h4>Loading...</h4>}
                scrollableTarget='spec-scroll'
            >
                <Row gutter={[16, 16]}>
                    {
                        skeleton === false && data.length > 0 && data.map((item, idx) => (
                            <Col span={24} key={`${idx + 1}`}>
                                <SpecialistModalItem
                                    item={item}
                                    handleSelectSpec={handleSelectSpec}
                                    activeSpecId={activeSpecId}
                                />
                            </Col>
                        ))
                    }
                    {
                        (skeleton === undefined || !!skeleton) && skeletonData.map((item, idx) => (
                            <Col span={24} key={`${idx + 1}`}>
                                <FilterModalItem>
                                    <ShortAccountCardSkeleton size={60}/>
                                </FilterModalItem>
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </FilterModalScroll>
    )
}


const groupSkeletonData = generateSkeleton(9)

const OfferingGroupList = ({loadMore, activeGroupId, handleSelectGroup}) => {
    const {$offerGroupList: {data, skeleton, result, loading}} = useStore($offeringModel)

    return (
        <FilterModalScroll id='offer-group-scroll'>
            <InfiniteScroll
                id='offer-group-scroll'
                dataLength={result.nextOffset || 20}
                next={loadMore}
                hasMore={!loading && !!result.next}
                loader={<h4>Loading...</h4>}
                scrollableTarget='offer-group-scroll'
            >
                <Row gutter={[16, 16]}>
                    {
                        skeleton === false && data.length > 0 && data.map((item, idx) => (
                            <Col span={8} key={`${idx + 1}`}>
                                <ModalGroupItem
                                    item={item}
                                    activeGroupId={activeGroupId}
                                    handleSelectGroup={handleSelectGroup}
                                />
                            </Col>
                        ))
                    }
                    {
                        (skeleton === undefined || !!skeleton) && groupSkeletonData.map((item, idx) => (
                            <Col span={8} key={`${idx + 1}`}>
                                <FilterModalItem>
                                    <SkeletonUI variant='rect' width={80} height={80} style={{marginBottom: 8}}/>
                                    <Title style={{
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'column'
                                    }}>
                                        <SkeletonUI type='text' width='75%'/>
                                    </Title>
                                </FilterModalItem>
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </FilterModalScroll>
    )
}