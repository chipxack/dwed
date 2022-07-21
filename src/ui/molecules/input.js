import {withTheme} from "styled-components";
import React from "react";
import InputMask from 'react-input-mask';
import {DatePickerUI, HelperText} from "../atoms/input";
import {ErrorMessage, InputBlock} from "../atoms";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {IconBox} from "../../UIComponents/global-styles";

const InputSystemView = (props) => {
    const {
        name,
        label,
        placeholder,
        type,
        disabled,
        icon,
        change,
        value,
        noUpperCase,
        error,
        onBlur,
        onFocus,
        mask,
        helperText,
        readOnly,
        onClick,
        style,
        refS,
        iD
    } = props;

    function toUpperCase(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <InputBlock
            style={style}
            error={!!error}
            icon={icon}
            status={!!error ? 'danger' : 'default'}
            theme={props.theme.main}
            onClick={() => onClick ? onClick() : false}
        >
            {
                label &&
                <label>{label}</label>
            }
            {
                type === 'phone' ?
                    <PhoneInput
                        id={iD}
                        ref={refS}
                        country={'uz'}
                        onlyCountries={['uz']}
                        masks={{uz: '.. ... .. ..'}}
                        value={value}
                        onChange={phone => change(phone)}
                        onBlur={onBlur}
                        inputProps={{onBlur, name}}
                        disabled={disabled ? disabled : false}
                        disableDropdown
                    />
                    :
                    type === 'date' ?
                        <DatePickerUI
                            id={iD}
                            ref={refS}
                            placeholder={placeholder}
                            value={value}
                            disabled={disabled ? disabled : false}
                            onChange={change}
                            onBlur={onBlur}
                            name={name}
                        /> :
                        type === 'active' ?
                            <InputMask
                                id={iD}
                                ref={refS}
                                onFocus={onFocus}
                                mask="***-***"
                                maskChar="_"
                                placeholder={placeholder}
                                disabled={disabled ? disabled : false}
                                onChange={(e) => change(e.target.value)}
                            /> :
                            type === 'mask' ?
                                <InputMask
                                    id={iD}
                                    ref={refS}
                                    name={name}
                                    onFocus={onFocus}
                                    mask={mask ? mask : '***-***'}
                                    value={value}
                                    maskChar="_"
                                    placeholder={placeholder}
                                    onBlur={onBlur}
                                    disabled={disabled ? disabled : false}
                                    onChange={(e) => change(e.target.value)}
                                >{(inputProps) => {
                                    const props = {...inputProps, onBlur, disabled}
                                    return <input {...props}/>
                                }}</InputMask> :
                                type === 'file' ?
                                    <input
                                        id={iD}
                                        ref={refS}
                                        type='file'
                                        onChange={(e) => change(e.target.files)}
                                    /> :
                                    type === "textarea" ?
                                        <textarea
                                            id={iD}
                                            ref={refS}
                                            onChange={(e) => change(e.target.value)}
                                            value={value}
                                            placeholder={placeholder}
                                            disabled={disabled ? disabled : false}
                                            rows={5}
                                            onBlur={onBlur}
                                            name={name}
                                        />
                                        : <input
                                            id={iD}
                                            ref={refS}
                                            readOnly={readOnly || false}
                                            name={name}
                                            onFocus={onFocus}
                                            value={value}
                                            onBlur={onBlur}
                                            autoComplete='off'
                                            onChange={(e) =>
                                                change(
                                                    noUpperCase ?
                                                        e.target.value :
                                                        toUpperCase(e.target.value.trimLeft())
                                                )
                                            }
                                            placeholder={placeholder}
                                            disabled={disabled ? disabled : false}
                                            type={type ? type : 'text'}
                                        />
            }

            {
                icon && <IconBox>{icon}</IconBox>
            }
            {helperText && <HelperText>{helperText}</HelperText>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputBlock>
    )
};

export const InputSystem = withTheme(InputSystemView);
