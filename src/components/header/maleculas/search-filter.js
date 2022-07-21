import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {Modal} from '../../modal'
import {useStore} from 'effector-react'
import {HomeFilter} from '../../filter'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {searchFilters} from '../../../data/search'
import {ENVIRONMENT_MODE, URL_KEYS, URL_VALUES} from '../../../constants'
import {$appModel} from '../../../models/app'
import {useUrlParams} from '../../../hooks/common'
import {HeaderFilterItem, HeaderFiltersBlock, HeaderSettingItem, HeaderSettingWrap} from '../atoms'
import {resetCharacter} from '../../../models/categories-models'
import {CustomLink} from '../../../UIComponents/custom-link'
import {$userModel} from '../../../models/user-models'
import {Row} from 'antd'
import {SettingSvg} from '../../../media/setting'
import {checkStatus} from '../../../utils/store-utils'
import {$organizationModel} from '../../../models/organization-models'
import {$offeringModel} from '../../../models/offering-model'
import {$isDataPending} from '../../../models/stream'

export const SearchFilter = () => {
    const {location: {pathname}} = useHistory()
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {$app: {searchFocus, prodsMode}} = useStore($appModel)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [activeFilterCatId, setActiveFilterCatId] = useState(null)
    const [filterType, setFilterType] = useState('category')
    const {$userList} = useStore($userModel)
    const {$allOrgList} = useStore($organizationModel)
    const {$allOfferingList} = useStore($offeringModel)
    const {$allStreamsList} = useStore($isDataPending)

    const searchFilterType = urlData[URL_KEYS.SEARCH_FILTER_TYPE]
    const categoryId = urlData[URL_KEYS.CATEGORY_ID]

    const getCategoryId = useCallback(() => {
        let tmp = null

        if (categoryId && categoryId.indexOf('|') !== -1) {
            tmp = parseInt(categoryId)
        }
        return tmp
    }, [categoryId])


    const getForceLoading = useCallback((type) => {
        let forceLoading
        if (type === URL_VALUES.PEOPLE) {
            forceLoading = checkStatus($userList.status)
        }

        if (type === URL_VALUES.ORGANIZATION) {
            forceLoading = checkStatus($allOrgList.status)
        }

        if (type === URL_VALUES.OFFERINGS) {

            forceLoading = checkStatus($allOfferingList.status)
        }

        if (type === URL_VALUES.STREAM) {
            forceLoading = checkStatus($allStreamsList.status)
        }

        return forceLoading
    }, [$userList.status, $allOfferingList.status, $allOrgList.status, $allStreamsList.status])

    const onLinkClick = (id, onClick) => {
        let forceLoading = getForceLoading(id)

        if (forceLoading) {
            onClick()
        }
    }

    const handleClick = useCallback(() => {
        setModalIsOpen(true)
        const cat_id = getCategoryId()
        if (cat_id && activeFilterCatId && cat_id !== activeFilterCatId) {
            resetCharacter()
            setActiveFilterCatId(cat_id)
        }
    }, [getCategoryId, activeFilterCatId])

    useEffect(() => {
        if (searchFilterType === URL_VALUES.OFFERINGS) {
            setFilterType('params')
        } else {
            setFilterType('category')
        }
    }, [searchFilterType])

    useEffect(() => {
        const cat_id = getCategoryId()
        if (cat_id) {
            setActiveFilterCatId(cat_id)
        } else {
            setActiveFilterCatId(null)
        }
    }, [getCategoryId, activeFilterCatId])


    const renderItem = (item) => {
        const Icon = item.icon
        return (
            <CustomLink
                onAction={() => onLinkClick(item.id, item.onClick)}
                path={item.id === 'tape' ? '/' : `/?${URL_KEYS.SEARCH_FILTER_TYPE}=${item.id}`}
                isActive={item.id === 'tape' ? !searchFilterType && pathname === '/' : searchFilterType && searchFilterType === item.id}
            >
                <Icon/>
            </CustomLink>
        )
    }

    return (
        <>
            <Modal
                title={t('filters')}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                component={(
                    <HomeFilter
                        type={filterType}
                        paramFilterId={activeFilterCatId}
                        onClose={() => setModalIsOpen(false)}
                    />
                )}
                width={960}
            />
            <HeaderFiltersBlock focused={searchFocus}>
                <Row gutter={24}>
                    {
                        searchFilters.map(item => (
                                <Fragment key={item.id}>
                                    {
                                        item.check && prodsMode !== ENVIRONMENT_MODE.PRODUCTION
                                            ? (
                                                <HeaderFilterItem focused={Number(!!searchFocus)}>
                                                    {renderItem(item)}
                                                </HeaderFilterItem>
                                            )
                                            : (
                                                <HeaderFilterItem focused={Number(!!searchFocus)}>
                                                    {renderItem(item)}
                                                </HeaderFilterItem>
                                            )
                                    }
                                </Fragment>
                            )
                        )
                    }
                </Row>
                {
                    prodsMode !== ENVIRONMENT_MODE.PRODUCTION && (
                        <HeaderSettingWrap>
                            {
                                pathname === '/' && searchFocus && (
                                    <HeaderSettingItem
                                        active={modalIsOpen}
                                        onClick={handleClick}
                                    >
                                        <SettingSvg/>
                                    </HeaderSettingItem>
                                )
                            }

                            {/*<HeaderSettingItem>*/}
                            {/*    <MedalSvg/>*/}
                            {/*</HeaderSettingItem>*/}
                        </HeaderSettingWrap>
                    )
                }
            </HeaderFiltersBlock>
        </>
    )
}
