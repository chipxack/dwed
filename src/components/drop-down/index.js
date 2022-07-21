import React from "react";
import {DropDownClick, DropDownSection, DropDownSectionBlock} from "./atoms";


export const DropDownSystem = ({style, children, overlay, visible, changeVisible}) => {


    return (
        <DropDownSection
            style={style}
        >
            <DropDownSectionBlock status={visible}>
                {overlay}
            </DropDownSectionBlock>
            <DropDownClick onClick={() => changeVisible(!visible)}>
                {
                    children
                }
            </DropDownClick>
        </DropDownSection>
    )
}