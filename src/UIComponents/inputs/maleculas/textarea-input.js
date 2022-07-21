import React from 'react'
import {StyledFormControl, StyledHelperText, StyledInputError} from "../atoms";
import {TextField} from "@material-ui/core";

export const TextareaInput = ({error, label, hideErrorText, rows, helperText, maxLength, ...props}) => {

    return (
        <StyledFormControl>
            <TextField
                label={label}
                multiline
                rows={rows || 4}
                {...props}
                inputProps={{maxLength: maxLength || 2000}}
                variant="outlined"
                error={!!error}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}