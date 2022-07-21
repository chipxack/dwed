import React from 'react'
import {AccountHeaderReviewItem, AccountHeaderReviewWrapper} from "../atoms";
import {DislikeSvg, LikeSvg} from "../../../media";

export const AccountHeaderReview = () => {
    return (
        <AccountHeaderReviewWrapper>
            <AccountHeaderReviewItem>
                <LikeSvg/> 8
            </AccountHeaderReviewItem>
            <AccountHeaderReviewItem>
                <DislikeSvg/> 1
            </AccountHeaderReviewItem>
        </AccountHeaderReviewWrapper>
    )
}