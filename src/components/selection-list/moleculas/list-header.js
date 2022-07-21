import React from 'react'
import {LISTS} from "../../../constants/lists";
import {useTranslation} from "react-i18next";
import {ListHeading} from "../atoms";
import {ListBreadcrumb} from "./list-breadcrumb";
import {Title} from "../../../UIComponents/typography";
import {ListSearch} from "./list-search";

export const ListHeader = ({type, breadcrumb, breadcrumbAction, onSearch, search}) => {

    const renderTitle = () => {
        switch (type) {
            case LISTS.ORG_CATEGORY :
            case LISTS.USER_CATEGORY:
                return 'select_category'
            case LISTS.OFFERING_CATEGORY:
                return 'select_offering_category'
            case LISTS.REGION:
                return 'select_region'
            default:
                return 'select'
        }
    }

    const {t} = useTranslation()

    return (
        <ListHeading>
            <Title level={4} size={18} weight='bold'>
                {t(renderTitle())}
            </Title>
            <ListSearch
                value={search}
                onSearch={onSearch}
            />
            {
                (search.trim().length > 0 || breadcrumb.length > 0)
                && (
                    <ListBreadcrumb
                        breadcrumb={breadcrumb}
                        breadcrumbAction={breadcrumbAction}
                        searchValue={search}
                    />
                )
            }
        </ListHeading>
    )
}