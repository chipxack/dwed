import React, {useEffect, useState} from 'react'
import {ColorFormWrapper, ColorItem, ColorList, ColorListWrapper, SelectedColor} from "../atoms";
import {ButtonUI} from "../../../ui/atoms";
import {CheckLineSvg, PlusSvg} from "../../../media";
import {useTranslation} from "react-i18next";
import {useStore} from "effector-react";
import {$categoryModel} from "../../../models/categories-models";
import {Title} from "../../../UIComponents/typography";
import {Col, Row} from "antd";
import {ActiveColor, ColorHex} from "../../../UIComponents/global-styles";

export const ColorForm = ({value, onChange, loadMore, multiple, onSearch, search}) => {
    const {t} = useTranslation()
    const [colorPalette, setColorPalette] = useState(false)
    const {$colorList: {data}} = useStore($categoryModel)

    const handleClick = (item) => {
        let selected = value && value.trim().length > 0 ? value.split(',') : []
        if (multiple) {
            if (selected.findIndex(x => x === item) === -1) {
                selected.push(item)
            } else {
                selected.filter(x => x !== item)
            }
        } else {
            selected = []
            if (value !== item) {
                selected.push(item)
            }
        }

        onChange(selected.join(','))
    }

    useEffect(() => {
        if (value && value.trim().length > 0) {
            setColorPalette(true)
        }
    }, [value])

    const getActive = (item) => {
        const selected = value && value.trim().length > 0 ? value.split(',') : []
        return selected.findIndex(x => x === item) !== -1
    }

    const selectedList = value && value.trim().length > 0 ? value.split(',') : []

    return (
        <ColorFormWrapper>
            {
                selectedList && selectedList.length > 0
                && (
                    <SelectedColor>
                        <Row gutter={24}>
                            {
                                selectedList.map(item => {
                                    const index = item.indexOf('|')
                                    const name = item.substr(0, index)
                                    const hex = item.substr(index + 1)

                                    return (
                                        <Col key={hex} span='auto'>
                                            <ColorItem onClick={() => handleClick(item)}>
                                                <ColorHex color={`#${hex}`}/>
                                                <Title>{name}</Title>
                                            </ColorItem>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </SelectedColor>
                )
            }
            {
                colorPalette
                    ? (
                        <ColorListWrapper>
                            <input
                                placeholder={t('search')}
                                value={search}
                                onChange={(e) => onSearch(e.target.value)}
                            />
                            <ColorList>
                                {
                                    data.length > 0
                                        ? (
                                            <Row gutter={[48, 12]}>
                                                {
                                                    data.map((item, idx) => {
                                                        return (
                                                            <Col span={8} key={`${idx + 1}`}>
                                                                <ColorItem
                                                                    onClick={() => handleClick(`${item.name}|${item.hex}`)}>
                                                                    <ColorHex color={`#${item.hex}`}>
                                                                        {
                                                                            getActive(`${item.name}|${item.hex}`)
                                                                            && (
                                                                                <ActiveColor>
                                                                                    <CheckLineSvg/>
                                                                                </ActiveColor>
                                                                            )
                                                                        }
                                                                    </ColorHex>
                                                                    <Title>{item.name}</Title>
                                                                </ColorItem>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        )
                                        : ''
                                }
                            </ColorList>
                        </ColorListWrapper>
                    )
                    : (
                        <ButtonUI
                            buttonstyle='link'
                            size='lg'
                            onClick={() => setColorPalette(true)}
                        >
                            <PlusSvg/>
                            {t('add_color')}
                        </ButtonUI>
                    )
            }

        </ColorFormWrapper>
    )
}