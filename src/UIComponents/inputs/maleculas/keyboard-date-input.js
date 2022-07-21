import React, {useEffect, useRef, useState} from 'react'
import {KeyboardDatePicker} from '@material-ui/pickers'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'

export const KeyboardDateInput = (
    {
        variant,
        format,
        helperText,
        hideErrorText,
        disableFuture,
        onChange,
        mask,
        value,
        error,
        className,
        ...props
    }) => {
    const [inputValue, setInputValue] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const divRef = useRef(null)

    const onDateChange = (date, value) => {
        onChange(date)
        setInputValue(value)
    }

    useEffect(() => {
        setAnchorEl(divRef.current)
    }, [divRef])

    return (
        <StyledFormControl ref={divRef}>
            <KeyboardDatePicker
                className={className}
                {...props}
                error={!!error}
                value={value}
                onChange={onDateChange}
                disableFuture={disableFuture || false}
                autoOk
                format={format || 'YYYY-MM-DD'}
                inputValue={inputValue}
                variant="inline"
                InputAdornmentProps={(p) => {
                    console.log(p)
                }}
                PopoverProps={{
                    anchorEl,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    classes: {paper: 'select-dropdown'},
                }}
                inputVariant={variant || 'outlined'}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}
