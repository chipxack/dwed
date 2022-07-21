import React, {Fragment, useEffect, useRef, useState} from 'react'
import {LangItem, LangList, LangListWrapper, LangSelectWrapper, SelectedLang} from "../atoms";
import {useOutsideClicker} from "../../../hooks/common";
import {IconBox} from "../../global-styles";
import {ChevronDownOutlineSvg} from "../../../media";
import SlideDown from "react-slidedown";

export const LangSelect = ({onChange, value, langList}) => {
    const ref = useRef(null)
    const {clicked} = useOutsideClicker(ref)
    const [closed, setClosed] = useState(true)

    useEffect(() => {
        if (clicked) {
            setClosed(true)
        }
    }, [clicked])

    const handleClick = (value) => {
        onChange(value)
        setClosed(true)
    }

    return (
        <>
            {
                value
                && (
                    <LangSelectWrapper ref={ref}>
                        <SelectedLang onClick={() => setClosed(!closed)} open={closed}>
                            {value}
                            <IconBox>
                                <ChevronDownOutlineSvg/>
                            </IconBox>
                        </SelectedLang>
                        <LangListWrapper>
                            <SlideDown closed={closed} transitionOnAppear={false}>
                                <LangList>
                                    {
                                        langList.map(item => (
                                            <Fragment key={item}>
                                                {
                                                    value && value !== item
                                                    && (
                                                        <LangItem onClick={() => handleClick(item)}>
                                                            {item}
                                                        </LangItem>
                                                    )
                                                }
                                            </Fragment>
                                        ))
                                    }
                                </LangList>
                            </SlideDown>
                        </LangListWrapper>

                    </LangSelectWrapper>
                )
            }
        </>
    )
}