import React from 'react'
import {ListArrow, ListContent, ListTitle} from "../atoms";
import {ChevronRightSvg} from "../../../media";
import {CheckboxSystem} from "../../../ui/molecules/checkbox";

export const ListItem = ({data, selected, onSelect, getChildren}) => {

    const handleClick = () => {
        if(data.has_subs) {
            getChildren(data)
        }else {
            onSelect(data)
        }
    }

    const renderArrow = () => {
        return data.has_subs
            && (
                <ListArrow>
                    <ChevronRightSvg/>
                </ListArrow>
            )
    }

    const isActive = selected && selected.id === data.id

    return (
        <ListContent active={isActive}>
            <ListTitle
                onClick={handleClick}
            >
                {renderArrow()}
                {data.name}
            </ListTitle>
            {
                !data.has_subs
                && (
                    <CheckboxSystem
                        value={isActive}
                        change={() => onSelect(data)}
                    />
                )
            }
        </ListContent>
    )
}