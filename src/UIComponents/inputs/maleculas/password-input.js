import React, {useState} from 'react'
import {TextField} from '@material-ui/core'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'
import {IconBox} from '../../global-styles'
import {EyeOffSvg, EyeSvg} from '../../../media'

export const PasswordInput = ({label, error, helperText, hideErrorText, readOnly, icon, variant, staticError, ...props}) => {
    const [type, setType] = useState(true)

    return (
        <StyledFormControl
            error={!!error}
        >
            <TextField
                {...props}
                label={label}
                error={!!error}
                variant={variant || 'outlined'}
                type={type ? 'password' : 'text'}
                InputProps={{
                    readOnly: readOnly || false,
                    endAdornment: props.value && props.value.length > 0 ?
                        <IconBox onClick={() => setType(!type)}>{type ? <EyeSvg/> : <EyeOffSvg/>}</IconBox> : <></>
                }}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError staticError={staticError}>{error}</StyledInputError>}
        </StyledFormControl>
    )
}