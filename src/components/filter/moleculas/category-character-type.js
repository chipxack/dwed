import React, {useCallback} from 'react'
import {ActiveColor, ColorHex, IconBox} from "../../../UIComponents/global-styles";
import {CheckLineSvg, CheckMarkSquareCheckedSvg, CheckMarkSquareUncheckedSvg} from "../../../media";
import {ColorFieldCharItem, CommonFieldCharItem} from "../atoms";
import {useTranslation} from "react-i18next";

export const CommonFieldCharacterItem = ({data, onChange, values, id, result, type, getAllValues, showAll}) => {
    const {t} = useTranslation()
    const getActive = (item) => values[item.value] !== undefined && values[item.value].key === String(item.value)
    const list = useCallback(() => {
        if (data && data.length > 0) {
            if (showAll) {
                return data
            } else {
                return data.slice(0, 4)
            }
        }
        return false
    }, [data, showAll])

    return (
        <>
            {
                list() && list().length > 0 && list().map((item, idx) => (
                    <CommonFieldCharItem
                        key={`${idx + 1}`}
                        onClick={() => onChange({
                            key: String(item.value),
                            value: String(item.value),
                            charac_id: `${type}${id}`
                        })}
                    >
                        <IconBox color={getActive(item) ? 'var(--primary-dwed)' : 'var(--grey-basic)'}>
                            {
                                getActive(item)
                                    ? <CheckMarkSquareCheckedSvg/>
                                    : <CheckMarkSquareUncheckedSvg/>
                            }
                        </IconBox>
                        {item.label}
                    </CommonFieldCharItem>
                ))
            }
            {
                !showAll && list() && result && result.count > list().length && (
                    <CommonFieldCharItem onClick={getAllValues}>
                        <IconBox onClick={() => false} color='var(--primary-dwed)'>
                            {t('all')}
                        </IconBox>
                    </CommonFieldCharItem>
                )
            }
        </>
    )
}

export const ColorFieldCharacterItem = ({data, onChange, values, id, result, getAllValues, showAll}) => {
    const {t} = useTranslation()
    const getActive = (item) => {
        const selected = values[`${item.label}|${item.value}`] !== undefined
            && values[`${item.label}|${item.value}`].key.split('|')[1]
        return selected && selected === item.value
    }

    const list = useCallback(() => {
        if (data && data.length > 0) {
            if (showAll) {
                return data
            } else {
                return data.slice(0, 4)
            }
        }

        return false
    }, [data, showAll])

    const getColor = (value) => value === '-' ? 'transparent' : `#${value}`

    return (
        <>
            {
                list() && list().length > 0 && list().map((item, idx) => (
                    <ColorFieldCharItem
                        key={`${idx + 1}`}
                        onClick={() => onChange({
                            key: `${item.label}|${item.value}`,
                            value: `${item.label}|${item.value}`,
                            charac_id: `c${id}`
                        })}
                    >
                        <ColorHex size={24} color={getColor(item.value)}>
                            {
                                getActive(item)
                                && (
                                    <ActiveColor>
                                        <CheckLineSvg/>
                                    </ActiveColor>
                                )
                            }

                        </ColorHex>
                        {
                            item.label
                        }
                    </ColorFieldCharItem>
                ))
            }
            {
                !showAll && list() && result && result.count > list().length && (
                    <ColorFieldCharItem onClick={getAllValues}>
                        <IconBox onClick={() => false} color='var(--primary-dwed)'>
                            {t('all')}
                        </IconBox>
                    </ColorFieldCharItem>
                )
            }
        </>
    )
}