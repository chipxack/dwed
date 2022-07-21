import React from 'react'
import InputMask from 'react-input-mask'
import {TextField} from '@material-ui/core'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'

export const MaskedInput = (
    {
        mask,
        error,
        onBlur,
        helperText,
        hideErrorText,
        disabled,
        variant,
        label,
        maskChar,
        ...props
    }) => {

    return (
        <StyledFormControl>
            <InputMask
                {...props}
                mask={mask ? mask : '***-***'}
                maskChar={maskChar || '_'}
                onBlur={onBlur}
                disabled={disabled}
            >{(inputProps) => {
                const muiprops = {...inputProps, onBlur, disabled}
                return (
                    <TextField
                        {...muiprops}
                        label={label}
                        variant={variant || 'outlined'}
                        error={!!error}
                    />
                )
            }}</InputMask>
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
