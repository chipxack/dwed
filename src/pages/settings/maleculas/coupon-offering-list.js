import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Avatar, Checkbox, Col, Row} from 'antd'
import {useOfferingList} from '../../../hooks/offers'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {useTranslation} from 'react-i18next'
import {AntTable, TableTitle} from '../../../ui/atoms'
import {CircularProgress} from '@material-ui/core'
import {$offeringModel} from '../../../models/offering-model'
import {getLocalCost} from '../../../utils/app-utils'
import {useUrlParams} from '../../../hooks/common'
import {useHistory} from 'react-router-dom'
import {URL_KEYS, URL_VALUES} from '../../../constants'
import {InputSystem, SelectSystem} from '../../../ui/molecules'
import {SearchSvg} from '../../../media/search'
import {CommonSearchFilter} from '../../../UIComponents/global-styles'
import {$organizationModel} from '../../../models/organization-models'

export const CouponOfferingList = ({formik, onSpecSearch, loadMoreSpec}) => {
    //Hooks
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$offerListStore: {data, loading, result}} = useStore($offeringModel)
    const {$orgSpecsLists: {data: specList, loading: specLoading}} = useStore($organizationModel)
    const {t} = useTranslation()
    const {location: {pathname}, push} = useHistory()
    const {urlData} = useUrlParams()
    const specOptions = useMemo(() => {
        return specList.map(item => ({
            value: item.id,
            label: `${item.user.full_name} ${item.spec_cat.name}`,
            image: item.user.avatar
        }))
    }, [specList])
    const _spec_id = urlData[URL_KEYS.SPECIALIST_ID]
    const page = Number(urlData?.page) || 1

    //States
    const [specId, setSpecId] = useState(undefined)

    //Custom hooks
    const {search, onSearch} = useOfferingList({id: currentProfile?.slug_name, limit: 10})

    const onPageChange = useCallback((page) => {
        const url = []
        url.push(`${URL_KEYS.TAB}=${URL_VALUES.OFFERINGS}`)
        if (specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }
        url.push(`${URL_KEYS.PAGE}=${page}`)
        push({
            pathname,
            search: url.join('&')
        })
    }, [push, pathname, specId])

    const onChecked = useCallback((checked, id) => {
        const offerings = {...formik.values.offerings}
        if (!offerings[id]) {
            offerings[id] = id
        } else {
            delete offerings[id]
        }

        formik.setFieldValue('offerings', offerings)
    }, [formik])

    const onSpecChange = useCallback((value) => {
        const url = []
        url.push(`${URL_KEYS.TAB}=${URL_VALUES.OFFERINGS}`)

        if (value) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${value}`)
        }

        if (page) {
            url.push(`${URL_KEYS.PAGE}=${page}`)
        }

        setSpecId(value)

        push({
            pathname,
            search: url.join('&')
        })

    }, [push, pathname, page])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (!specId && _spec_id) {
                setSpecId(Number(_spec_id))
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [specId, _spec_id])

    const getChecked = useCallback((id) => {
        const checkedOfferings = {...formik.values.offerings}
        const checkAll = formik.values.offerings_reverse
        if (checkAll) {
            return !checkedOfferings[id]
        } else {
            return !!checkedOfferings[id]
        }
    }, [formik.values])

    const columns = [
        {
            title: (
                <Checkbox
                    checked={formik.values.offerings_reverse}
                    onChange={(e) => formik.setFieldValue('offerings_reverse', e.target.checked)}/>
            ),
            dataIndex: 'image',
            key: 'image',
            render: (_, {id}) => (
                <TableTitle>
                    <Checkbox
                        checked={getChecked(id)}
                        onChange={(e) => onChecked(e.target.checked, id)}
                    />
                </TableTitle>
            ),
            width: 40
        },
        {
            title: t('name_in_form_title'),
            dataIndex: 'name',
            key: 'name',
            render: (name, {image}) => (
                <TableTitle>
                    <Row gutter={8} align='middle' wrap={false}>
                        <Col>
                            <Avatar src={image} size={32} shape='square'/>
                        </Col>
                        <Col>
                            {name}
                        </Col>
                    </Row>
                </TableTitle>
            )
        },
        {
            title: t('price'),
            dataIndex: 'cost',
            key: 'cost',
            render: (cost) => (
                <TableTitle>
                    {
                        cost ?
                            getLocalCost(cost, currentProfile?.currency?.code, currentProfile?.lang) :
                            `0 ${currentProfile?.currency?.code.toUpperCase()}`
                    }
                </TableTitle>
            )
        }
    ]


    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <CommonSearchFilter gutter={16} style={{marginBottom: 0}}>
                    <Col span={8}>
                        <InputSystem
                            value={search || ''}
                            change={onSearch}
                            placeholder={t('search')}
                            icon={<SearchSvg/>}
                        />
                    </Col>
                    <Col span={8}>
                        <SelectSystem
                            placeholder={t('select_specialist')}
                            options={specOptions}
                            change={onSpecChange}
                            value={specId}
                            loading={specLoading}
                            allowClear
                            showSearch
                            onSearch={onSpecSearch}
                            onPopupScroll={loadMoreSpec}
                        />
                    </Col>
                </CommonSearchFilter>
            </Col>
            <Col span={24}>
                <AntTable
                    columns={columns}
                    loading={{spinning: loading, indicator: <CircularProgress size={24}/>}}
                    dataSource={data.map(item => ({...item, key: item.id}))}
                    pagination={{
                        current: page,
                        hideOnSinglePage: true,
                        showLessItems: true,
                        showSizeChanger: false,
                        total: result.count,
                        onChange: onPageChange
                    }}
                />
            </Col>
        </Row>
    )
}