import React, {useCallback, useEffect} from 'react'
import {FormBlock} from "../../../ui/atoms";
import {CloseSvg, LogoSvg} from "../../../media";
import {SignBodyTemplate} from "../../../ui/molecules";
import {ChangePhone, CreateAccount, PhoneVerifyForm} from "../organisms";
import {useUrlParams} from "../../../hooks/common";
import {URL_KEYS, URL_VALUES} from "../../../constants";
import {Link, useHistory} from 'react-router-dom'
import {AuthCloseLink} from "../atoms";

export const SignUp = () => {
    const {urlData} = useUrlParams()
    const {push} = useHistory()

    const renderSignUpSteps = () => {
        switch (urlData[URL_KEYS.STEP]) {
            case URL_VALUES.PHONE_VERIFY:
                return <PhoneVerifyForm/>
            case URL_VALUES.CHANGE_PHONE:
                return <ChangePhone />
            default:
                return <CreateAccount/>
        }
    }

    const replace = useCallback(() => {
        push('/sign-up')
    }, [push])

    useEffect(() => {
        window.addEventListener('load', replace)
        return () => {
           window.removeEventListener('load', replace)
        }
    }, [replace])

    return (
        <SignBodyTemplate>
            <AuthCloseLink to='/'><CloseSvg/></AuthCloseLink>
            <FormBlock width={432}>
                <Link to='/'>
                    <LogoSvg/>
                </Link>
                {
                    renderSignUpSteps()
                }
            </FormBlock>
        </SignBodyTemplate>
    )
}
