import React from 'react'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS, URL_VALUES} from '../../../constants'
import {useHome} from '../../../hooks/home'
import {OffersList, OrganizationList, StreamingList} from '../organisms'
import {TapeList} from '../organisms/tape-list'
import {Container, SectionWrapper} from '../../../UIComponents/global-styles'

export const HomePage = () => {
    const {urlData} = useUrlParams('search')
    const {loadList, subscribeOrg} = useHome()

    return (
        <SectionWrapper>
            <Container>
                {
                    !urlData[URL_KEYS.SEARCH_FILTER_TYPE] && <TapeList/>
                }
                {
                    urlData[URL_KEYS.SEARCH_FILTER_TYPE] === URL_VALUES.ORGANIZATION &&
                    <OrganizationList loadList={loadList} subscribeOrg={subscribeOrg}/>
                }
                {
                    urlData[URL_KEYS.SEARCH_FILTER_TYPE] === URL_VALUES.STREAM &&
                    <StreamingList loadList={loadList} subscribeOrg={subscribeOrg}/>
                }
                {/*{*/}
                {/*    urlData[URL_KEYS.SEARCH_FILTER_TYPE] === URL_VALUES.PEOPLE &&*/}
                {/*    <PeopleList loadList={loadList} subscribeUser={subscribeUser}/>*/}
                {/*}*/}
                {
                    urlData[URL_KEYS.SEARCH_FILTER_TYPE] === URL_VALUES.OFFERINGS &&
                    <OffersList loadList={loadList}/>
                }
            </Container>
        </SectionWrapper>
    )
}
