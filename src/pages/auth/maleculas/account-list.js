import React, {useEffect, useRef, useState} from 'react'
import {useProfile} from "../../../hooks/profile";
import {AuthAccountItem, AuthAccountWrapper} from "../atoms";
import {CommonAvatar} from "../../../UIComponents/avatar";
import {useStore} from "effector-react";
import {$accountModel} from "../../../models/accountModel";
import {Title} from "../../../UIComponents/typography";
import {SlideDown} from "react-slidedown";
import {IconBox} from "../../../UIComponents/global-styles";
import {ChevronDownSvg} from "../../../media";
import {truncateString} from "../../../utils/stringUtils";
import {MESSAGES} from "../../../constants";
import {useTranslation} from "react-i18next";
import {useOutsideClicker} from "../../../hooks/common";
import {useLocation} from "react-router-dom";


export const AuthAccountList = () => {
    const {$profiles: {linkedUsers}} = useStore($accountModel)
    const {changeAccount} = useProfile()
    const [closed, setClosed] = useState(true)
    const {t} = useTranslation()
    const message = `${t(MESSAGES.DONOT_HAVE_ACCESS)}, ${t(MESSAGES.UNIDENTIFiED_ACCOUNT)}`
    const wrapperRef = useRef(null)
    const {clicked} = useOutsideClicker(wrapperRef)
    const {pathname} = useLocation()

    console.log('$profiles: ', $accountModel.$profiles)

    const handleClick = (item) => {
        const showMessage = !pathname.includes('sign-in') && item.status !== 5 && message
        changeAccount(item.slug_name, showMessage)
    }

    useEffect(() => {
        if (clicked) {
            setClosed(true)
        }
    }, [clicked])

    return (
        <>
            {
                linkedUsers.length > 0
                && (
                    <>
                        <AuthAccountWrapper ref={wrapperRef}>
                            <AuthAccountItem>
                                <div
                                    style={{display: 'flex', alignItems: 'center'}}
                                    onClick={() => handleClick(linkedUsers[0])}
                                >
                                    <CommonAvatar size={45} imgUrl={linkedUsers[0].avatar}/>
                                    <Title>
                                        {truncateString(linkedUsers[0].name, 22)}
                                    </Title>
                                </div>
                                {
                                    linkedUsers.length > 1
                                    && (
                                        <IconBox onClick={() => setClosed(!closed)} color='#fff'>
                                            <ChevronDownSvg/>
                                        </IconBox>
                                    )
                                }

                            </AuthAccountItem>
                            <SlideDown closed={closed} transitionOnAppear={false}>
                                {
                                    linkedUsers.length > 1 && linkedUsers.slice(1).map(item => (
                                        <AuthAccountItem
                                            key={item.slug_name}
                                            onClick={() => handleClick(item)}
                                        >
                                            <CommonAvatar size={45} imgUrl={item.avatar}/>
                                            <Title>
                                                {truncateString(item.name, 22)}
                                            </Title>
                                        </AuthAccountItem>
                                    ))
                                }
                            </SlideDown>
                        </AuthAccountWrapper>
                    </>
                )
            }
        </>
    )
}