import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'

export const PhoneInput = ({label, helperText, hideErrorText, error, variant, ...props}) => {

    return (
        <StyledFormControl>
            <MuiPhoneNumber
                {...props}
                defaultCountry={'uz'}
                label={label}
                variant={variant || 'outlined'}
                onlyCountries={['uz']}
                error={!!error}
                masks={{uz: '.. ... .. ..'}}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}