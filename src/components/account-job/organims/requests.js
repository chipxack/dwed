import { useStore } from 'effector-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AntTable, TableTitle } from '../../../ui/atoms'
import { URL_KEYS } from '../../../constants'
import { useHistory, useParams } from 'react-router-dom'
import { RequestFilter } from '../maleculas'
import { $jobModel } from '../../../models/job-model'
import { useJobRequestList } from '../../../hooks/job'
import { useUrlParams } from '../../../hooks/common'
import { truncateString } from '../../../utils/stringUtils'
import { ShortAccountCard } from '../../card'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@material-ui/core'
import { getOrderStatus } from '../../../utils/accountUtils'
import { Col } from 'antd'
import { InputSystem } from '../../../ui/molecules'
import { SearchSvg } from '../../../media/search'
import { CommonSearchFilter, IconBox } from '../../../UIComponents/global-styles'
import { CloseSvg } from '../../../media'

export const SpecialistRequests = () => {
  const {account} = useParams()
  const {push, location: {pathname}} = useHistory()
  const [search, setSearch] = useState(undefined)
  const {$specRequests: {loading, result, data}} = useStore($jobModel)
  const {urlData} = useUrlParams()
  const jobId = urlData[URL_KEYS.JOB_ID]
  const {
    socketData,
    activeFilter,
    handleDateRangeFilter,
    otherDate,
    selectedDateData,
    limit, page,
    onPageChange
  } = useJobRequestList()
  const {t} = useTranslation()
  const _filter_type = urlData[URL_KEYS.FILTER_TYPE]
  const _page = urlData[URL_KEYS.PAGE]
  const _search = urlData[URL_KEYS.SEARCH]

  const handleClick = (id, status) => {
    push({
      pathname: `/@${account}/jobs/request/${id}`,
      state: {jobId: jobId ? jobId : 'self', status}
    })
  }


  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const url = []
    if (jobId) {
      url.push(`${URL_KEYS.JOB_ID}=${jobId}`)
    }

    if (_filter_type) {
      url.push(`${URL_KEYS.FILTER_TYPE}=${_filter_type}`)
    }

    if (_page) {
      url.push(`${URL_KEYS.PAGE}=${_page}`)
    }

    if (search.length > 2) {
      url.push(`${URL_KEYS.SEARCH}=${search}`)
    }
    push({
      pathname,
      search: url.join('&')
    })

  }, [search, push, pathname, jobId, _page, _filter_type])

  const onChange = useCallback((value) => {
    const url = []
    if (jobId) {
      url.push(`${URL_KEYS.JOB_ID}=${jobId}`)
    }

    if (_filter_type) {
      url.push(`${URL_KEYS.FILTER_TYPE}=${_filter_type}`)
    }

    if (_page) {
      url.push(`${URL_KEYS.PAGE}=${_page}`)
    }

    if (value.length === 0) {
      push({
        pathname,
        search: url.join('&')
      })
    }
    setSearch(value)

  }, [push, pathname, jobId, _filter_type, _page])

  useEffect(() => {
    let timeout = null

    timeout = setTimeout(() => {
      if(search === undefined) {
        setSearch(_search)
      }

      return () => {
        clearTimeout(timeout)
      }
    }, 300)
  }, [search, _search])

  const columns = [
    {
      title: t('full_name'),
      dataIndex: 'full_name',
      key: 'full_name',
      render: (name, {id, status, ...data}) => (<TableTitle onClick={() => handleClick(id, status)}>
        <ShortAccountCard
          name={name.trim().length > 0 ? name : 'Client'}
          imgUrl={data.user.avatar}
          imgSize={36}
          isOfficial={data.user.is_official}
          truncateLength={20}
        />
      </TableTitle>),
      width: 250
    },
    {
      title: t('offerings'),
      dataIndex: 'offerings',
      key: 'offerings',
      render: (offerings, {id, status}) => (
        <TableTitle
          onClick={() => handleClick(id, status)}
        >
          {truncateString(offerings.firstOffer, 60)}
          {
            offerings.more && <span>{` (${offerings.more})`}</span>
          }
        </TableTitle>)
    },
    {
      title: t('date_and_time'),
      dataIndex: 'date',
      key: 'date',
      render: (date, {id, status}) => (
        <TableTitle
          onClick={() => handleClick(id, status)}
        >
          {date}
        </TableTitle>),
      width: 160
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, {id}) => (
        <TableTitle
          onClick={() => handleClick(id, status)}
        >
                    <span
                      style={{
                        color: getOrderStatus(status).color,
                        textTransform: 'lowercase',
                        fontSize: 13
                      }}
                    >
                        {t(getOrderStatus(status).title)}
                    </span>
        </TableTitle>
      ),
      width: 150
    }
  ]

  return (
    <>
      <RequestFilter
        selectedDateData={selectedDateData}
        socketData={socketData}
        handleDateRangeFilter={handleDateRangeFilter}
        otherDate={otherDate}
        activeFilter={activeFilter}
      />
      <form onSubmit={onSubmit}>
        <CommonSearchFilter gutter={12} justify='space-between' align='middle'>
          <Col span='auto'>
          </Col>
          <Col span={7}>
            <InputSystem
              value={search || ''}
              change={(value) => onChange(value)}
              placeholder={t('search')}
              icon={search && search.length > 0 ? <IconBox onClick={() => onChange('')}><CloseSvg /></IconBox> :
                <SearchSvg />}
            />
          </Col>
        </CommonSearchFilter>
      </form>
      <AntTable
        columns={columns}
        loading={{spinning: loading, indicator: <CircularProgress size={24} />}}
        dataSource={data}
        pagination={{
          pageSize: limit,
          onChange: onPageChange,
          current: page,
          hideOnSinglePage: true,
          showLessItems: true,
          showSizeChanger: false,
          total: result.count
        }}
      />
    </>
  )
}
