import React, {useCallback, useEffect, useState} from "react";
import {ProgressBall, RateButton, RateProgressItem} from "../../../pages/reviews/atoms";
import {IconBox} from "../../../UIComponents/global-styles";
import {MinusSvg, PlusSvg} from "../../../media";
import {ProgressInner, ProgressOuter} from "../atoms";
import {useTranslation} from "react-i18next";

export const ProgressFormItem = ({item, onChange}) => {
    const {t} = useTranslation()
    const [value, setValue] = useState(null)
    const [mounted, setMounted] = useState(false)
    const {color, score, level, remaining_score, shadow_color, icon} = item
    const Icon = icon

    const getWidth = useCallback(() => {
        let tmp
        let v = value === null ? 0 : value

        if (score === 0 && v === -1) {
            v = 1
        }
        if (remaining_score !== 0 || score !== 0) {
            tmp = ((v + score) * 100) / (score + remaining_score)
        } else {
            tmp = 0
        }
        return tmp
    }, [remaining_score, score, value])

    const getColor = useCallback(() => {
        let tmp = {
            color,
            shadow_color
        }
        if (score === 0 && value === -1) {
            tmp = {
                color: 'var(--danger-dwed)',
                shadow_color: 'var(--danger-dwed-box-shadow)'
            }
        }
        return tmp
    }, [color, score, value, shadow_color])

    const handleClick = useCallback((a) => {
        onChange(a)
        if (score === 0 && (value === -1 || value === 1)) {
            setValue(0)
            setTimeout(() => {
                setValue(a)
            }, 300)
        } else {
            setValue(a)
        }
    }, [score, value, onChange])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (!mounted) {
                setMounted(true)
            }
        }, 1200)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [mounted])

    return (
        <RateProgressItem>
            <IconBox color={getColor().color}>
                <Icon/>
            </IconBox>
            <RateButton
                type='button'
                onClick={() => handleClick(-1)}
            >
                <MinusSvg/>
            </RateButton>
            <ProgressOuter>
                <ProgressBall>
                    {`${score + value}/${score + remaining_score}`}
                </ProgressBall>
                <ProgressInner
                    className={!mounted ? 'animate' : ''}
                    width={getWidth()}
                    color={getColor().color}
                    shadowColor={getColor().shadow_color}
                />
            </ProgressOuter>
            <RateButton
                type='button'
                onClick={() => handleClick(1)}
            >
                <PlusSvg/>
            </RateButton>
            {t('lvl_n', {n: level})}
        </RateProgressItem>
    )
}