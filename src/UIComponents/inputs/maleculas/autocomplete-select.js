import React, {useState} from 'react'
import {Autocomplete} from '@material-ui/lab'
import {StyledFormControl, StyledHelperText, StyledInputError} from '../atoms'
import {CommonAvatar} from '../../avatar'
import {ChevronDownSvg} from '../../../media'
import {debounce} from '../../../utils/debounceUtils'
import {TextField} from '@material-ui/core'

export const AutocompleteSelect = (
    {
        label,
        error,
        onChange,
        options,
        helperText,
        onLoadMore,
        onSearch,
        loading,
        defaultValue,
        search,
        hideErrorText,
        onBlur,
        ...props
    }
) => {
    const [inputValue, setInputValue] = useState('')
    const renderOption = (option) => {
        return (
            <>
                {option.image && <CommonAvatar imgUrl={option.image} size={24}/>}
                {option.label}
            </>
        )
    }

    const handleChange = (e, newValue) => {
        setInputValue('')
        debounce(onSearch(''), 300)
        onChange(newValue)
    }

    const handleBlur = () => {
        if (inputValue.length > 0) {
            // debounce(onSearch(''), 300)
            // setInputValue('')
        }
        onBlur()
    }

    return (
        <StyledFormControl>
            <Autocomplete
                {...props}
                limitTags={2}
                options={options}
                onBlur={handleBlur}
                autoComplete
                loading={loading}
                includeInputInList
                popupIcon={<ChevronDownSvg/>}
                renderOption={renderOption}
                filterOptions={(v) => v}
                classes={{paper: 'select-dropdown'}}
                getOptionLabel={option => option.label}
                ListboxProps={{onScroll: onLoadMore, style: {maxHeight: 30 * 8 + 8}}}
                onChange={(e, value) => handleChange(e, value)}
                getOptionSelected={(option, values) => props.multiple ? option.value === values.value : !!option.value && !!values.value}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                debounce(onSearch(e.target.value), 300)
                            }}
                            label={label}
                            variant='outlined'
                            error={!!error}
                        />
                    )
                }}
            />
            {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
            {!hideErrorText && error && <StyledInputError>{error}</StyledInputError>}
        </StyledFormControl>
    )
}