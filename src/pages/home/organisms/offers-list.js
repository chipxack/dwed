import React, {useState} from 'react'
import {HomeList} from '../atoms'
import {useStore} from 'effector-react'
import {$offeringModel, resetOffering} from '../../../models/offering-model'
import Masonry from 'react-responsive-masonry'
import {OfferDetail} from '../../../components/offers'
import {useTranslation} from 'react-i18next'
import {ProductCard, ProductCardSkeleton} from '../../../components/card'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {HomeOfferingCatList} from '../molecules/offering-cat-list'
import {Modal} from '../../../components/modal'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Spin} from 'antd'
import {debounce} from '../../../utils/debounceUtils'

const skeletonData = generateSkeleton(20, 80, 320)

export const OffersList = ({loadList}) => {
    const {$allOfferingList: {loading, data, result, skeleton, status}} = useStore($offeringModel)
    const {t} = useTranslation()
    const [offerId, setOfferId] = useState(null)


    const renderModal = (id) => {
        debounce(setOfferId(id), 200)
        resetOffering()
    }

    return (
        <>
            <Modal
                modalIsOpen={!!offerId}
                setModalIsOpen={() => setOfferId(null)}
                title={t('detailed_information')}
                width={700}
                component={<OfferDetail id={offerId} onClose={() => setOfferId(null)}/>}
            />
            <HomeList>
                <HomeOfferingCatList/>
                {
                    skeleton === false && (
                        <InfiniteScroll
                            dataLength={result.nextOffset || 20}
                            next={() => loadList(result.nextOffset, status)}
                            hasMore={!loading && !!result.next}
                            loader={<Spin size='small'/>}
                            style={{overflow: 'unset'}}
                        >
                            <Masonry gutter='12px' columnsCount={4}>
                                {
                                    data.length > 0 && data.map((item, idx) => {
                                        const path = item.org
                                            ? `/${item.org.slug_name}/offerings/${item.id}`
                                            : item.user ? `/${item.user.username}/offerings/${item.id}` : '/'
                                        return (
                                            <ProductCard
                                                showDetail={() => renderModal(item.id)}
                                                key={`${idx + 1}`}
                                                data={item}
                                                overlay
                                                path={path}
                                            />
                                        )
                                    })
                                }

                            </Masonry>
                        </InfiniteScroll>
                    )
                }

                {
                    (skeleton === undefined || skeleton) && (
                        <Masonry gutter='12px' columnsCount={4}>
                            {
                                skeletonData.map((item, idx) => (
                                    <ProductCardSkeleton
                                        key={`${idx + 1}`}
                                        height={item}
                                    />
                                ))
                            }
                        </Masonry>
                    )
                }
            </HomeList>
        </>
    )
}