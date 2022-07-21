import React, {useCallback} from 'react'
import {useStore} from 'effector-react'
import Masonry from 'react-responsive-masonry'
import {ProductCard, ProductCardSkeleton} from '../../../components/card'
import {useHistory, useParams} from 'react-router-dom'
import {useAccountCart, useCreateCart} from '../../../hooks/order'
import {PERMISSIONS, PROFILE_TYPE, URL_KEYS} from '../../../constants'
import {TrashSvg} from '../../../media/trash'
import {$appModel} from '../../../models/app'
import {$accountModel} from '../../../models/accountModel'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {useUrlParams} from '../../../hooks/common'
import {BasketSvg, EditPenFillSvg} from '../../../media'
import {$orderModel} from '../../../models/order-models'
import {$offeringModel, resetOfferingInfoStore, resetOfferingListStore} from '../../../models/offering-model'
import {deleteConfirm} from '../../../UIComponents/modal'
import InfiniteScroll from 'react-infinite-scroll-component'
import {ApplyButton} from '../atoms'
import {ProductSelectedCount} from '../../../components/card/atoms'
import {Row} from 'antd'
import {useTranslation} from 'react-i18next'

const skeletonData = generateSkeleton(10, 80, 320)

export const OrgOfferingsList = ({loadMore, removeOffering}) => {
    //Hooks
    const {push} = useHistory()
    const {organization} = useParams()
    const {t} = useTranslation()
    // Custom hooks
    useAccountCart()
    const {urlParams} = useUrlParams()
    const {handleChangeCart} = useCreateCart({fromDetail: false})
    //Stores
    const {$cart} = useStore($orderModel)
    const {$app: {allow}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$offerListStore: {data, loading, result, skeleton}} = useStore($offeringModel)


    const update = (id) => {
        resetOfferingInfoStore()
        resetOfferingListStore()

        push({
            pathname: `/${organization}/offerings/edit/${id}`,
            state: {urlParams}
        })
    }

    const actions = [
        {
            type: 'edit',
            onClick: update,
            icon: <EditPenFillSvg/>
        },
        {
            type: 'delete',
            onClick: (id) => deleteConfirm(() => removeOffering(id)),
            icon: <TrashSvg/>
        }
    ]

    const canAction = allow && (allow[PERMISSIONS.GRAND] || allow[PERMISSIONS.OFFERINGS]) && actions
    const showApplyButton = currentProfile &&
        currentProfile.type === PROFILE_TYPE.USER &&
        $cart.result.count && $cart.result.count > 0

    const generateCartLink = useCallback(() => {
        return {
            pathname: '/records/unregistered',
            state: {
                [URL_KEYS.SELLER]: organization,
                [URL_KEYS.SPECIALIST_ID]: $cart.data[0].responsible.id
            }
        }
    }, [$cart.data, organization])


    return (

        <>
            {
                skeleton === false && (
                    <InfiniteScroll
                        dataLength={result.nextOffset || 20}
                        next={loadMore}
                        hasMore={!loading && !!result.next}
                        loader={<h4>Loading...</h4>}
                    >
                        {
                            data.length > 0 && (
                                <Masonry gutter='12px' columnsCount={3}>
                                    {
                                        data.map((item, idx) => {
                                            return (
                                                <ProductCard
                                                    key={`${idx + 1}`}
                                                    data={item}
                                                    onSelect={() => handleChangeCart(item)}
                                                    select={item.is_in_cart}
                                                    path={`/${organization}/offerings/${item.id}`}
                                                    actions={canAction}
                                                />
                                            )
                                        })
                                    }
                                </Masonry>
                            )
                        }
                        {
                            showApplyButton
                                ? (
                                    <Row style={{justifyContent: 'flex-end'}}>
                                        <ApplyButton to={generateCartLink()}>
                                            <BasketSvg/>
                                            {t('checkout')}
                                            <ProductSelectedCount>
                                                ({$cart.result.count})
                                            </ProductSelectedCount>
                                        </ApplyButton>
                                    </Row>
                                )
                                : ''
                        }
                    </InfiniteScroll>
                )
            }

            {
                (skeleton === undefined || !!skeleton) && (
                    <Masonry gutter='12px' columnsCount={3}>
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
        </>
    )
}