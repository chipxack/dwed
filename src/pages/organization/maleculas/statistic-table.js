import React from 'react'
import {AntTable} from '../../../ui/atoms'
import {CircularProgress} from '@material-ui/core'

export const StatisticTable = ({columns, data, page, count, limit, onFilterChange, loading, statName}) => {
    return (
        <AntTable
            dataSource={data.map((item, idx) => ({...item, key: idx + 1}))}
            loading={{spinning: loading, indicator: <CircularProgress size={24}/>}}
            columns={columns}
            onChange={onFilterChange}
            pagination={{
                showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
                pageSize: limit,
                current: page,
                hideOnSinglePage: true,
                showLessItems: true,
                showSizeChanger: false,
                total: count || 0
            }}
        />
    )
}