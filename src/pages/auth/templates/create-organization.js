import React from 'react'
import {FormBlock} from "../../../ui/atoms";
import {CloseSvg, LogoSvg} from "../../../media";
import {SignBodyTemplate} from "../../../ui/molecules";
import {useOrganizationCreate} from "../../../hooks/org";
import {OrganizationMainForm, OrganizationVideoForm} from "../organisms";
import {Link} from "react-router-dom";
import {AuthAccountList} from "../maleculas";
import {AuthCloseLink} from "../atoms";

export const CreateOrganization = () => {
    const {
        formik,
        handleChange,
        continueDisabled,
        showVideoVerify,
        setShowVideoVerify,
        slugNameStatus,
        validateSlugName
    } = useOrganizationCreate()

    return (
        <SignBodyTemplate>
            <AuthCloseLink to='/'><CloseSvg/></AuthCloseLink>
            <AuthAccountList/>
            <FormBlock width={776}>
                <Link to='/'>
                    <LogoSvg/>
                </Link>
                <form onSubmit={formik.handleSubmit}>
                    {
                        !showVideoVerify
                            ? (
                                <OrganizationMainForm
                                    formik={formik}
                                    handleChange={handleChange}
                                    setShowVideoVerify={setShowVideoVerify}
                                    disabled={continueDisabled}
                                    slugNameStatus={slugNameStatus}
                                    validateSlugName={validateSlugName}
                                />
                            )
                            : (
                                <OrganizationVideoForm
                                    handleChange={handleChange}
                                    formik={formik}
                                    setShowVideoVerify={setShowVideoVerify}
                                />
                            )
                    }
                </form>
            </FormBlock>
        </SignBodyTemplate>
    )
}