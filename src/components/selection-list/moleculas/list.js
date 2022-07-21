import React from 'react'
import {StyledInfiniteScroller} from "../../../ui/atoms";
import {ListItem} from "./list-item";
import {ListWrapper, SelectedListWrapper} from "../atoms";
import {Spin} from "antd";

export const List = (
    {
        list,
        loadList,
        selected,
        onSelect,
        getChildren
    }
) => {
    const {result, loading, data, forceLoading} = list

    return (
        <SelectedListWrapper>
            {
                forceLoading && <Spin />
            }
            {
                !forceLoading && data.length > 0
                && (
                    <ListWrapper>
                        <StyledInfiniteScroller
                            pageStart={0}
                            loadMore={loadList}
                            hasMore={!loading && result.next !== null && result.next !== undefined}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                            useWindow={false}
                        >
                            {
                                data.map((item, idx) => (
                                    <ListItem
                                        key={`${idx + 1}`}
                                        data={item}
                                        selected={selected}
                                        onSelect={onSelect}
                                        getChildren={getChildren}
                                    />
                                ))
                            }
                        </StyledInfiniteScroller>
                    </ListWrapper>
                )
            }
        </SelectedListWrapper>
    )
}