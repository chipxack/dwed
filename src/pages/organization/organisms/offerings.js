import React from 'react'
import {useOrgSpecCatList, useOrgSpecialist} from '../../../hooks/org'
import {OrgOfferingFilter, OrgOfferingsList, OrgOffersGroupList, OrgSpecialistList} from '../maleculas'
import {Col, Row} from 'antd'
import {AccountSidebar} from '../../../UIComponents/global-styles'
import {debounce} from '../../../utils/debounceUtils'
import {useOfferingList} from '../../../hooks/offers'
import {useParams} from 'react-router-dom'

export const OrgOfferings = () => {
    const {organization} = useParams()
    const {loadMore, onSearch, search, removeOffering} = useOfferingList({id: organization})
    useOrgSpecialist(organization)
    useOrgSpecCatList()

    return (
        <>
            <OrgOfferingFilter
                search={search}
                onSearch={(value) => debounce(onSearch(value), 300)}
            />
            <Row gutter={12} style={{position: 'relative'}}>
                <Col span={17} style={{paddingTop: 7}}>
                    <OrgOfferingsList loadMore={loadMore} removeOffering={removeOffering}/>
                </Col>
                <Col span={7}>
                    <AccountSidebar>
                        <OrgSpecialistList/>
                        <OrgOffersGroupList/>
                    </AccountSidebar>
                </Col>
            </Row>
        </>
    )
}