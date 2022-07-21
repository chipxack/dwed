import React from 'react'
import {Checkbox} from 'antd'
import {CheckboxUiBlock, SquareCheckboxUiBlock} from "../atoms";
import {CheckMarkSquareCheckedSvg, CheckMarkSquareUncheckedSvg} from "../../media";



export const CheckboxSystem = (props) => {
    const {
        change,
        label,
        value,
    } = props


    return(
        <CheckboxUiBlock>
            <Checkbox
                checked={value}
                onChange={(e) => change(e.target.checked)}
            />
            {label && <span>{label}</span>}
        </CheckboxUiBlock>
    )
}

export const SquareCheckBoxSystem = (props) => {
    const {
        change,
        label,
        value,
    } = props


    return(
        <SquareCheckboxUiBlock>
            {
                value ?
                    <CheckMarkSquareCheckedSvg style={{color: '#1DA1F2'}}/> : <CheckMarkSquareUncheckedSvg/>

            }
            <Checkbox
                checked={value}
                onChange={(e) => change(e.target.checked)}
            />
            {label && <span>{label}</span>}
        </SquareCheckboxUiBlock>
    )
}