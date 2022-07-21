import React from 'react'
import {URL_KEYS, URL_VALUES} from "../../../constants";
import {OfferingCategory} from "./offer-cat";
import {UserCategoryList} from "./user-cat-list";
import {OrganizationCategoryList} from "./org-cat-list";
import {useCategory, useUrlParams} from "../../../hooks/common";

export const CategoryFilter = ({onClose}) => {
    const {urlData} = useUrlParams()
    const {loadCategory, commonCatHandleClick, parent, goBackCategory} = useCategory()
    const filterType = urlData[URL_KEYS.SEARCH_FILTER_TYPE]


    return (
        <>
            {
                filterType && filterType === URL_VALUES.OFFERINGS
                && (
                    <OfferingCategory onClose={onClose}/>
                )
            }
            {
                filterType && filterType === URL_VALUES.PEOPLE
                && (
                    <UserCategoryList
                        loadCategory={loadCategory}
                        commonCatHandleClick={commonCatHandleClick}
                        parent={parent}
                        onClose={onClose}
                        goBackCategory={() => goBackCategory(parent)}
                    />
                )
            }
            {
                filterType && filterType === URL_VALUES.ORGANIZATION
                && (
                    <OrganizationCategoryList
                        parent={parent}
                        loadCategory={loadCategory}
                        commonCatHandleClick={commonCatHandleClick}
                        goBackCategory={() => goBackCategory(parent)}
                    />
                )
            }
        </>
    )
}