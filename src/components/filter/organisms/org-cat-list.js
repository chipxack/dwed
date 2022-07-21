import React from 'react'
import {CategoryHeading, CategoryScroll, CategoryWrapper} from "../atoms";
import {useStore} from "effector-react";
import {$categoryModel} from "../../../models/categories-models";
import {CategoryItem} from "../moleculas";
import {StyledInfiniteScroller} from "../../../ui/atoms";
import backImg from "../../../assets/images/back.png";

export const OrganizationCategoryList = ({loadCategory, commonCatHandleClick, parent, setParent}) => {
    const {$categoryList} = useStore($categoryModel)
    const {loading, data, result} = $categoryList
    return (
        <>
            <CategoryHeading>
                Категория организации
            </CategoryHeading>
            <CategoryScroll>
                <StyledInfiniteScroller
                    pageStart={0}
                    loadMore={loadCategory}
                    hasMore={!loading && result.next !== null && result.next !== undefined}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    threshold={400}
                >
                    <CategoryWrapper>
                        {
                            parent !== 0
                            && (
                                <CategoryItem
                                    onClick={() => setParent(0)}
                                    data={{image: backImg, name: 'назад'}}
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
        </>
    )
}