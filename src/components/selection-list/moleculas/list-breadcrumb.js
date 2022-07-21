import React from 'react'
import {BreadcrumbItem, Breadcrumbs} from "../atoms";
import {HomeSvg} from "../../../media";

export const ListBreadcrumb = ({breadcrumb, breadcrumbAction, searchValue}) => {
    const handleClick = (id) => {
        breadcrumbAction(id)
    }

    return (
        <Breadcrumbs>
            <BreadcrumbItem
                isText={false}
                onClick={() => handleClick(0)}
            >
                <HomeSvg/>
                {
                    searchValue.length > 0
                    && (
                        <div style={{marginLeft: 8}}>
                            {`"${searchValue}"`}
                        </div>
                    )
                }
            </BreadcrumbItem>
            {
                breadcrumb.map((item, idx, arr) => (
                    <BreadcrumbItem
                        key={`${idx + 1}`}
                        isText={(arr.length - 1) === idx}
                        onClick={() => (arr.length - 1) !== idx && handleClick(item.slug ? item.slug : item.id)}
                    >
                        {item.name}
                    </BreadcrumbItem>
                ))
            }
        </Breadcrumbs>
    )
}