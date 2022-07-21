import React from "react";
import {CategoryContent, CategoryImg, CategoryTitle} from "../atoms";

export const CategoryItem = ({data, onClick}) => {
    return (
        <CategoryContent onClick={onClick}>
            <CategoryImg imgUrl={data.image} />
            <CategoryTitle>
                <span>{data.name}</span>
            </CategoryTitle>
        </CategoryContent>
    )
};