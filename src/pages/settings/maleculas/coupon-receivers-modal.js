import React, {useCallback, useMemo, useState} from 'react'
import {Badge, Checkbox, Col, Row} from 'antd'
import {useOrgCoupon, useOrgCouponReceiversList} from '../../../hooks/settings'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import classnames from 'classnames'
import {useUserList} from '../../../hooks/user'
import {$userModel, updateCouponCheckedEvent} from '../../../models/user-models'
import {CircularProgress} from '@material-ui/core'
import {AntTable, TableTitle} from '../../../ui/atoms'
import {ShortAccountCard} from '../../../components/card'
import {truncateString} from '../../../utils/stringUtils'
import {
  $organizationModel,
  createOrgCouponReceiverEvent,
  removeOrgCouponReceiverEvent
} from '../../../models/organization-models'
import {InputSystem} from '../../../ui/molecules'
import {SearchSvg} from '../../../media/search'
import {CommonSearchFilter, IconBox} from '../../../UIComponents/global-styles'
import debounce from 'lodash.debounce'
import {PROFILE_TYPE} from '../../../constants'
import {TrashIcon} from '../../../icons/trash'

export const CouponReceiversModalContent = ({coupon_id}) => {
  //Local States
  const [tab, setTab] = useState(false)
  //Hooks
  const {t} = useTranslation()
  const {$profiles: {currentProfile}} = useStore($accountModel)
  const {$orgCouponsReceiversList: {result}} = useStore($organizationModel)

  //Custom Hooks
  useOrgCoupon({slug: currentProfile?.slug_name, id: coupon_id})
  const {page: receiversPage, setPage: setReceiversPage} = useOrgCouponReceiversList({
    slug: currentProfile?.slug_name,
    coupon_id
  })
  const {page: usersPage, setUsersPage, search, setSearch} = useUserList({check_coupon: coupon_id})

  const getTabClassNames = useCallback((status) => {
    return classnames({
      'coupon-link': true,
      'active': status
    })
  }, [])

  const columns = [
    {
      title: t('users'),
      key: '',
      dataIndex: '',
      render: (_, data) => (
          <TableTitle>
            <ShortAccountCard
                name={data.full_name && data.full_name.trim().length > 0 ? data.full_name : `@${data.username}`}
                imgSize={32}
                imgUrl={data?.avatar}
                truncateLength={30}
            />
          </TableTitle>
      ),
      width: '50%'
    },
    {
      title: t('speciality'),
      key: 'main_cat',
      dataIndex: 'main_cat',
      render: (main_cat) => (
          <TableTitle>
            {
              main_cat?.name ? truncateString(main_cat.name, 30) : '-'
            }
          </TableTitle>
      ),
      width: '50%'
    }
  ]

  return (
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Row gutter={24} wrap={false}>
            <Col>
              <div className={getTabClassNames(!tab)} onClick={() => setTab(false)}>
                {t('all_users')}
              </div>
            </Col>
            <Col>
              <div className={getTabClassNames(tab)} onClick={() => setTab(true)}>
                {t('selected_users')}
                <Badge
                    showZero
                    count={result?.count || 0}
                    style={{backgroundColor: 'var(--grey-basic)', marginLeft: 8}}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {
            tab
                ?
                <OrgCouponReceiverList
                    columns={columns}
                    page={receiversPage}
                    onPageChange={setReceiversPage}
                    coupon_id={coupon_id}
                />
                : <UserList
                    search={search}
                    setSearch={setSearch}
                    columns={columns}
                    page={usersPage}
                    onPageChange={setUsersPage}
                    coupon_id={coupon_id}
                />
          }
        </Col>
      </Row>
  )
}

const OrgCouponReceiverList = ({page, onPageChange, columns, coupon_id}) => {
  const {$orgCouponsReceiversList: {data, result, loading}} = useStore($organizationModel)
  const {$profiles: {currentProfile}} = useStore($accountModel)

  const removeReceiver = useCallback((item) => {
    const action = (status) => {
      console.log(1)
      updateCouponCheckedEvent({username: item.username, status})
    }

    const data = {
      organization: currentProfile?.slug_name,
      id: coupon_id,
      receiver_id: item.username,
      action
    }

    removeOrgCouponReceiverEvent(data)
  }, [currentProfile.slug_name, coupon_id])

  const _columns = useMemo(() => {
    return [
      ...columns,
      {
        title: '',
        dataIndex: '',
        key: '',
        render: (_, item) => (
            <TableTitle>
              <IconBox onClick={() => removeReceiver(item)} color='var(--danger-dwed)'>
                <TrashIcon />
              </IconBox>
            </TableTitle>
        ),
        width: 40
      }
    ]
  }, [columns, removeReceiver])

  return (
      <Row gutter={[16, 16]}>
        <Col span={24}>

        </Col>
        <Col span={24}>
          <AntTable
              columns={_columns}
              loading={{spinning: loading, indicator: <CircularProgress size={24} />}}
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

const UserList = ({page, onPageChange, columns, search, setSearch, coupon_id}) => {
  const {$userList: {data, result, loading}} = useStore($userModel)
  const {t} = useTranslation()
  const {$profiles: {currentProfile}} = useStore($accountModel)

  const updateReceivers = useCallback((checked, username) => {
    if (currentProfile?.type === PROFILE_TYPE.ORGANIZATION) {
      const params = {
        organization: currentProfile?.slug_name,
        id: coupon_id
      }

      const action = (status) => {
        updateCouponCheckedEvent({username, status})
      }

      if (checked) {
        params.data = {
          user_id: username
        }
        createOrgCouponReceiverEvent({...params, action})
      }else {
        params.receiver_id = username
        removeOrgCouponReceiverEvent({...params, action})
      }
    }

  }, [coupon_id, currentProfile])

  const _columns = useMemo(() => {
    return [
      {
        title: (<Checkbox />),
        dataIndex: 'check_coupon',
        key: 'check_coupon',
        render: (check_coupon, {username}) => (
            <TableTitle>
              <Checkbox
                  checked={check_coupon}
                  onClick={(e) => updateReceivers(e.target.checked, username)}
              />
            </TableTitle>
        )
      },
      ...columns
    ]
  }, [columns, updateReceivers])

  return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CommonSearchFilter gutter={16} style={{marginBottom: 0}}>
            <Col span={8}>
              <InputSystem
                  value={search}
                  placeholder={t('search')}
                  icon={<SearchSvg />}
                  change={debounce(setSearch)}
              />
            </Col>
          </CommonSearchFilter>
        </Col>
        <Col span={24}>
          <AntTable
              columns={_columns}
              loading={{spinning: loading, indicator: <CircularProgress size={24} />}}
              dataSource={data.map(item => ({...item, key: item.username}))}
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
