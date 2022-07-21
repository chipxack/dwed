import React from 'react'
import {OffersGroupItem} from "../atoms";
import {Tooltip} from "antd";

export const OffersGroupListItem = ({item, active, onSelect, actions}) => {
    return (
        <>
            <Tooltip title={item.name}>
                <OffersGroupItem
                    onClick={onSelect}
                    active={active}
                    imgUrl={item.image}
                />
            </Tooltip>
            {actions && actions}
        </>
    )
}