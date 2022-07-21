import React, {useCallback} from 'react'
import {CommonProgress} from '../../progres'
import {ratingData} from '../../../data/rating'
import {SkeletonUI} from '../../../UIComponents/global-styles'
import {Col, Row} from 'antd'

export const CardProgress = ({data, showSkeleton}) => {

    const renderItem = useCallback((item) => {
        let tmp = {
            ...item,
            score: 0,
            level: 0,
            remaining_score: 0
        }

        if (data && data[item.id]) {
            tmp = {
                ...item,
                ...data[item.id]
            }
        }

        return tmp
    }, [data])

    return (
        <Row gutter={12}>
            {
                ratingData.map((item, idx) => (
                    <Col span={8} key={`${idx + 1}`}>
                        {
                            showSkeleton
                                ? <SkeletonUI height={16}/>
                                : <CommonProgress item={renderItem(item)}/>
                        }
                    </Col>
                ))
            }
        </Row>
    )
}