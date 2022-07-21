import React, {useEffect, useRef, useState} from 'react'
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import {StyledFormControl, StyledHelperText, StyledInputError} from "../atoms";
import {TextField} from "@material-ui/core";

export const DateInput = ({label, value, error, onChange, helperText, views, hideErrorText, variant, ...props}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const divRef = useRef(null);

    useEffect(() => {
        setAnchorEl(divRef.current);
    }, [divRef]);

    const generateDateFormat = () => {
        switch (views) {
            case 'year':
                return 'YYYY'
            default:
                return  'YYYY-MM-DD'
        }
    }

    return (
        <StyledFormControl ref={divRef}>
            <DatePicker
                {...props}
                error={!!error}
                value={value ? moment(value) : null}
                views={views ? [views]: ['year', 'month', 'date']}
                onChange={(e) => onChange(moment(e._d).format('YYYY-MM-DD'))}
                autoOk
                format={generateDateFormat()}
                variant="inline"
                label={label}
                PopoverProps={{
                    anchorEl,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    classes: {paper: 'select-dropdown'},
                }}
                inputVariant={variant || 'outlined'}
                TextFieldComponent={(inputProps) => <TextField {...inputProps} />}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}