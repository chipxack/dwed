import React, {useCallback, useState} from 'react'
import {AccountSidebarListWrapper} from '../../../UIComponents/global-styles'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$organizationModel} from '../../../models/organization-models'
import {useUrlParams} from '../../../hooks/common'
import {FETCHING_STATUS, PROFILE_TYPE, URL_KEYS} from '../../../constants'
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {ShortAccountCard, ShortAccountCardSkeleton} from '../../../components/card/'
import {Modal} from '../../../components/modal'
import {useOfferingBasic} from '../../../hooks/offers'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {SpecialistFilterModal} from './specialist-filter-modal'

const skeletonData = generateSkeleton(4)

export const OrgSpecialistList = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {location: {pathname}} = useHistory()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {$orgSpecsLists: {data, skeleton}} = useStore($organizationModel)
    const {organization} = useParams()
    const {getOfferingList} = useOfferingBasic({slug: organization, type: PROFILE_TYPE.ORGANIZATION})

    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]
    const spec_cat_id = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]

    const generateLink = useCallback((id) => {
        const url = []
        if (spec_cat_id) {
            url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${spec_cat_id}`)
        }

        if (!spec_id || spec_id !== id) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${id}`)
        }

        return {
            pathname,
            search: url.join('&')
        }
    }, [spec_cat_id, pathname, spec_id])


    const onSelect = useCallback((id) => {
        const urlParam = {
            status: FETCHING_STATUS.FILTER,
            params: {
                limit: 20,
                offset: 0,
            }
        }

        if (!spec_id || (spec_id && spec_id !== String(id))) {
            urlParam['params']['responsible'] = id
        }
        getOfferingList(urlParam)
    }, [spec_id, getOfferingList])

    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={t('all_specialists')}
                component={
                    <SpecialistFilterModal onClose={() => setModalIsOpen(false)}/>
                }
                width={970}
            />
            <AccountSidebarListWrapper>
                <Title className='account-sidebar-title'>
                    {t('specialists')}
                </Title>
                {
                    skeleton === false && data.length > 0 && data.slice(0, 4).map((item, idx) => (
                        <NavLink
                            key={`${idx + 1}`}
                            to={generateLink(String(item.id))}
                            className='account-sidebar-list-item'
                            isActive={() => spec_id && Number(spec_id) === item.id}
                            onClick={() => onSelect(item.id)}
                        >
                            <ShortAccountCard
                                imgUrl={item.user.avatar}
                                name={item.user.full_name}
                                text={item.job.name}
                                imgSize={60}
                                rating={item.rating}
                                truncateLength={20}
                            />
                        </NavLink>
                    ))
                }
                {
                    (skeleton === undefined || !!skeleton) && skeletonData.map((item, idx) => (
                        <div className='account-sidebar-list-item' key={`${idx + 1}`}>
                            <ShortAccountCardSkeleton size={60}/>
                        </div>
                    ))
                }
                <div className='account-show-more' onClick={() => setModalIsOpen(true)}>
                    {t('show_all')}
                </div>
            </AccountSidebarListWrapper>
        </>
    )
}