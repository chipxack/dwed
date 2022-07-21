import React from 'react'
import {SignBodyTemplate} from "../../../ui/molecules";
import {CloseSvg, LogoSvg} from "../../../media";
import {FormBlock} from "../../../ui/atoms";
import {SignInForm} from "../organisms";
import {Link} from "react-router-dom";
import {AuthCloseButton, AuthCloseLink} from "../atoms";
import {AuthAccountList} from "../maleculas";

export const SignIn = (props) => {
    const {closeAuthModal} = props
    return (
        <SignBodyTemplate>
            {
                closeAuthModal ?
                    <AuthCloseButton onClick={() => closeAuthModal()}><CloseSvg/></AuthCloseButton> :
                    <AuthCloseLink to='/'><CloseSvg/></AuthCloseLink>
            }
            <AuthAccountList/>
            <FormBlock>
                <Link to='/'>
                    <LogoSvg/>
                </Link>
                <SignInForm closeAuthModal={closeAuthModal}/>
            </FormBlock>
        </SignBodyTemplate>
    )
}