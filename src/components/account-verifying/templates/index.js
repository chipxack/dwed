import React from 'react'
import {VerifyingStepSlider} from "../moleculas";
import {useVerificationSteps} from "../../../hooks/settings";
import {useUrlParams} from "../../../hooks/common";
import {URL_KEYS} from "../../../constants";
import {VerifyingWrapper} from "../atoms";
import {AccountInfoVerifying, AccountJuridicVerifying, AccountVideoVerifying} from "../organims";
import {LoadingContainer} from "../../../UIComponents/loading-container";

export const AccountVerifying = () => {
    const {urlData} = useUrlParams()
    const {allowToNav} = useVerificationSteps()
    const step = urlData[URL_KEYS.VERIFICATION_STEP]

    return (
        <LoadingContainer loading={false}>
            <VerifyingStepSlider allowToNav={allowToNav}/>
            {
                step && (
                    <VerifyingWrapper>
                        {
                            step === '1' && <AccountInfoVerifying/>

                        }
                        {
                            step === '2' && <AccountJuridicVerifying/>
                        }
                        {
                            step === '3' && <AccountVideoVerifying/>
                        }
                    </VerifyingWrapper>
                )
            }
        </LoadingContainer>
    )
}
