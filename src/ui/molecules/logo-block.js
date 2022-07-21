import React from "react";
import {LogoEllipseSvg} from "../../media";
import {LogoBlockSection} from "../atoms";


export const LogoBlock = ({image, label, style}) => {


    return (
        <LogoBlockSection style={style}>
            <LogoEllipseSvg/>
            <img src={image} alt={label}/>
        </LogoBlockSection>
    )
}