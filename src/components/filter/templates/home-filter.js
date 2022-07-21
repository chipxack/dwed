import React from 'react'
import {CategoryFilter, HomeParamsFilter} from "../organisms";

export const HomeFilter = ({type, paramFilterId, onClose}) => {

    return (
        <>
            {
                type === 'category'
                && (
                    <CategoryFilter onClose={onClose}/>
                )
            }
            {
                type === 'params'
                && (
                    <HomeParamsFilter onClose={onClose} paramFilterId={paramFilterId}/>
                )
            }
        </>
    )
}