import React, {useCallback} from 'react'
import {ProgressInner, ProgressOuter, ProgressValue, ProgressWrap} from "../atoms";
import {Tooltip} from "antd";

export const CommonProgress = ({item}) => {
    const {color, shadow_color, score, remaining_score, level, type, column} = item

    const getWidth = useCallback(() => {
        let tmp
        if (remaining_score !== 0 || score !== 0) {
            tmp = (score * 100) / (score + remaining_score)
        } else {
            tmp = 0
        }
        return tmp
    }, [remaining_score, score])

    const getOverlayClassName = type
        ? `progress-tooltip-type-${type}`
        : 'progress-tooltip-type-0'

    return (
        <ProgressWrap column={column} color={color}>
            <ProgressValue color={color}>
                {level}
            </ProgressValue>
            <Tooltip
                title={`${score}/${score + remaining_score}`}
                overlayClassName={`progress-tooltip ${getOverlayClassName}`}
            >
                <ProgressOuter column={column}>
                    <ProgressInner
                        shadowColor={shadow_color}
                        width={getWidth()}
                        color={color}
                        className='animate'
                    />
                </ProgressOuter>
            </Tooltip>
        </ProgressWrap>
    )
}