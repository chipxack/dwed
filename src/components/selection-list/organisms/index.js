import React from 'react'
import {useSelectionList} from "../../../hooks/common/use-selection-list";
import {List, ListHeader} from "../moleculas";
import {ButtonGroup, ButtonUI} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";

export const SelectionList = ({type, handleChange, onClose}) => {
    const {
        list,
        loadList,
        onSelect,
        selected,
        getChildren,
        breadcrumb,
        breadcrumbAction,
        handleAccept,
        setSearch,
        search
    } = useSelectionList({type, handleChange, onClose})

    const {t} = useTranslation()
    return (
        <>
            <ListHeader
                type={type}
                breadcrumb={breadcrumb}
                breadcrumbAction={breadcrumbAction}
                search={search}
                onSearch={setSearch}
            />
            <List
                onSelect={onSelect}
                selected={selected}
                list={list}
                loadList={loadList}
                getChildren={getChildren}
            />

            <ButtonGroup>
                <ButtonUI
                    buttonstyle='link'
                    size='lg'
                    onClick={onClose}
                >
                    {t('cancel')}
                </ButtonUI>
                <ButtonUI
                    size='lg'
                    onClick={handleAccept}
                    disabled={!selected}
                >
                    {t('apply')}
                </ButtonUI>
            </ButtonGroup>
        </>
    )
}