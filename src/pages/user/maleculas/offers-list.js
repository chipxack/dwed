import React from 'react'
import {useStore} from "effector-react";
import {StyledInfiniteScroller} from "../../../ui/atoms";
import Masonry from "react-responsive-masonry";
import {ProductCard} from "../../../components/card";
import {$offeringModel} from "../../../models/offering-model";

export const UserOffersList = ({loadOffers}) => {
    const {$allOfferingList} = useStore($offeringModel)
    const {data, result, forceLoading, loading} = $allOfferingList

    return (
        <>
            {
                !forceLoading && data.length > 0 &&
                (
                    <StyledInfiniteScroller
                        pageStart={0}
                        loadMore={loadOffers}
                        hasMore={!loading && result.next !== null && result.next !== undefined}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                        initialLoad={false}
                    >
                        <Masonry gutter='12px' columnsCount={4}>
                            {
                                data.map((item, idx) =>
                                    <ProductCard
                                        key={`${idx + 1}`}
                                        data={item}
                                    />
                                )
                            }
                        </Masonry>
                    </StyledInfiniteScroller>
                )
            }
        </>
    )
}