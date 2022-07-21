import React from 'react'
import {ButtonGroup, ButtonUI} from "../../../ui/atoms";
import {HomeFilterHeading} from "../atoms";
import {useTranslation} from "react-i18next";

export const HomeFilterHeader = ({resetFilter, handleAccept}) => {
    const {t} = useTranslation()
    return (
        <HomeFilterHeading>
            <div/>
            <ButtonGroup>
                <ButtonUI
                    type='link'
                    buttonstyle='link'
                    onClick={handleAccept}>
                    {t('apply')}
                </ButtonUI>
                <ButtonUI
                    type='link'
                    buttonstyle='link'
                    onClick={() => resetFilter()}
                >
                    {t('reset_all')}
                </ButtonUI>
            </ButtonGroup>
        </HomeFilterHeading>
    )
}