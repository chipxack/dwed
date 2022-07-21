import React from 'react'
import {SignBodyTemplate} from '../../../ui/molecules'
import {AuthCloseButton} from '../atoms'
import {CloseSvg, LogoSvg} from '../../../media'
import {FormBlock} from '../../../ui/atoms'
import {Link} from 'react-router-dom'
import {FastAuthActivate, FastAuthForm} from '../organisms'
import {useFastAuth} from '../../../hooks/auth'

export const FastAuthView = ({onClose}) => {
    const {formik, nextStep, onFinish, onResend, deadline, showResend, handleRefresh, setNextStep} = useFastAuth(onClose)

    return (
        <SignBodyTemplate>
            <AuthCloseButton onClick={handleRefresh}><CloseSvg/></AuthCloseButton> :
            <FormBlock>
                <Link to='/'><LogoSvg/></Link>
                {
                    nextStep
                        ? <FastAuthActivate
                            deadline={deadline}
                            onFinish={onFinish}
                            showResend={showResend}
                            formik={formik}
                            onResend={onResend}
                            setNextStep={setNextStep}
                        />
                        : <FastAuthForm onClose={onClose} formik={formik}/>
                }
            </FormBlock>
        </SignBodyTemplate>
    )
}
