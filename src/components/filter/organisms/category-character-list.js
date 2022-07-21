import React from 'react'
import {useStore} from "effector-react";
import {$categoryModel} from "../../../models/categories-models";
import Masonry from "react-responsive-masonry"
import {CategoryCharacterItem, CategoryCharacterSkeletonItem} from "../moleculas";
import {generateSkeleton} from "../../../utils/skeletonUtils";

const skeleton = generateSkeleton(12)

export const CategoryCharacterList = ({values, onChange, getAllValues, onSearch}) => {
    const {
        $categoryCharacters: {data, loading},
        $charactersPreparedValues: {forceLoading: p_forceLoading},
        $charactersCustomValues: {forceLoading: c_forceLoading}
    } = useStore($categoryModel)

    return (
        <Masonry gutter='16px' columnsCount={3}>
            {
                !loading && !p_forceLoading && !c_forceLoading && data.length > 0 && data.map(item => (
                    <CategoryCharacterItem
                        item={item}
                        key={item.id}
                        values={values}
                        onSearch={onSearch}
                        onChange={onChange}
                        getAllValues={getAllValues}
                    />
                ))
            }
            {
                (loading || p_forceLoading || c_forceLoading) && skeleton.map((item, idx) => (
                    <CategoryCharacterSkeletonItem key={`${idx + 1}`}/>
                ))
            }
        </Masonry>
    )
}