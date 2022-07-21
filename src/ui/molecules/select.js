import React, {useEffect, useState} from 'react'
import {ErrorMessage, SelectBlock} from "../atoms";
import {withTheme} from "styled-components";
import {Avatar, Empty, Select, Tooltip} from 'antd';
import {debounce} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const {Option} = Select;

const SelectSystemView = (
    {
        options,
        theme,
        label,
        placeholder,
        change,
        value,
        onSearch,
        loading,
        mode,
        showSearch,
        onBlur,
        error,
        width,
        onPopupScroll,
        allowClear
    }
) => {
    const searchChange = (e) => {
        onSearch(e)
    };
    const {t} = useTranslation()
    const [selected, setSelected] = useState(undefined)

    useEffect(() => {
        if(value) {
            setSelected(value)
        }else {
            setSelected(undefined)
        }
    }, [value])

    return (
        <SelectBlock
            error={!!error}
            status={!!error ? 'danger' : 'default'}
            theme={theme.main}
        >
            {
                label &&
                <label>{label}</label>
            }
            <Select
                mode={mode}
                onBlur={onBlur}
                loading={loading}
                showSearch={showSearch}
                filterOption={false}
                placeholder={placeholder}
                onPopupScroll={onPopupScroll}
                onChange={(e) => change(e)}
                allowClear={allowClear || false}
                dropdownMatchSelectWidth={width || true}
                value={selected}
                onSearch={showSearch && debounce(searchChange, 300)}
                notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')} />}
            >
                {
                    options && options.length > 0 ? options.map((item, idx) => (
                        <Option key={`${idx + 1}`} value={item.value}>
                            {
                                item.title
                                    ? (
                                        <Tooltip title={item.title}>
                                            {
                                                item.image && (
                                                    <Avatar src={item.image} size={24} style={{marginRight: 8}}/>
                                                )
                                            }
                                            {item.label}
                                        </Tooltip>
                                    )
                                    : (
                                        <>
                                            {
                                                item.image && (
                                                    <Avatar src={item.image} size={24} style={{marginRight: 8}}/>
                                                )
                                            }
                                            {item.label}
                                        </>
                                    )
                            }

                        </Option>)) : null
                }
            </Select>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </SelectBlock>
    )
};

export const SelectSystem = withTheme(SelectSystemView);
