import React from 'react'
import {StyledFormControl, StyledHelperText, StyledInputError} from "../atoms";
import {IconBox} from "../../global-styles";
import {TextField} from "@material-ui/core";

export const NormalInput = ({label, error, helperText, hideErrorText, readOnly, icon, variant, ...props}) => {
    return (
        <StyledFormControl>
            <TextField
                {...props}
                label={label}
                variant={variant || 'outlined'}
                error={!!error}
                InputProps={{
                    readOnly: readOnly || false,
                    endAdornment: icon && <IconBox>{icon}</IconBox>
                }}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
