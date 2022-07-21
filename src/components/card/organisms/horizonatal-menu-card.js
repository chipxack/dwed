import React from 'react'
import {HorizontalMenuCardItem} from "../atoms";
import {ShortAccountCard} from "./short-account-card";

export const HorizontalMenuCard = ({active, unselected, item, onSelect, actions, ...props}) => {
    const {path, image, name, text, isOfficial} = item
    return (
        <HorizontalMenuCardItem
            active={active}
            unselected={unselected}
            {...props}
        >
            <ShortAccountCard
                path={path || false}
                imgUrl={image}
                onSelect={onSelect}
                direction={props.direction ? props.direction : 'vertical'}
                active={active}
                name={name}
                text={text || false}
                isOfficial={isOfficial}
                imgSize={props.imgSize ? props.imgSize : 64}
            />
            {actions && actions}
        </HorizontalMenuCardItem>
    )
}