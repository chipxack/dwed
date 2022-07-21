import React from 'react'
import {InputSystem} from "../../../ui/molecules";
import {useTranslation} from "react-i18next";
import {SearchSvg} from "../../../media/search";
import debounce from "lodash/debounce";

export const ListSearch = ({value, onSearch}) => {
    const {t}= useTranslation()

    return (
        <div>
            <InputSystem
                value={value}
                change={debounce(onSearch, 100)}
                placeholder={t('search')}
                icon={<SearchSvg />}
            />
        </div>
    )
}