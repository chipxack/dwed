import React from 'react'
import {LoadingSpinner, LoadingWrapper} from "../atoms";
import {CircularProgress} from "@material-ui/core";

export const LoadingContainer = ({loading, children}) => {
    return (
        <LoadingWrapper>
            {children}
            {
                loading
                && (
                    <LoadingSpinner>
                        <CircularProgress />
                    </LoadingSpinner>
                )
            }
        </LoadingWrapper>
    )
}