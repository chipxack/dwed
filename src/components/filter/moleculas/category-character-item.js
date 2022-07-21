import React, {useState} from 'react'
import {Title} from "../../../UIComponents/typography";
import {OFFERING_CAT_CHARACTER} from "../../../constants";
import {ColorFieldCharacterItem, CommonFieldCharacterItem} from "./category-character-type";
import {useStore} from "effector-react";
import {$categoryModel} from "../../../models/categories-models";
import {CharacterItem} from "../atoms";
import SlideDown from "react-slidedown";
import {ChevronDownSvg} from "../../../media";
import {IconBox, CommonSearchFilter} from "../../../UIComponents/global-styles";
import {InputSystem} from "../../../ui/molecules";
import {SearchSvg} from "../../../media/search";
import {useTranslation} from "react-i18next";
import {debounce} from "../../../utils/debounceUtils";

export const CategoryCharacterItem = ({item, values, onChange, getAllValues, onSearch}) => {
    const {
        $charactersPreparedValues: {data, result},
        $colorList: {p_data, p_result},
        $charactersCustomValues: {data: c_data, result: c_result}
    } = useStore($categoryModel)
    const [closed, setClosed] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [showAll, setShowAll] = useState(false)
    const {t} = useTranslation()

    const showSearch = (info) => showAll && info && info.count > 10

    const renderSearchInput = () => {
        const {character_type} = item
        switch (character_type) {
            case OFFERING_CAT_CHARACTER.SELECT_FIELD:
            case OFFERING_CAT_CHARACTER.NUMBER_FIELD:
            case OFFERING_CAT_CHARACTER.COLOUR_FIELD:
            case OFFERING_CAT_CHARACTER.CHAR_FIELD:
            case OFFERING_CAT_CHARACTER.YEAR_FIELD:
                return (
                    <CommonSearchFilter style={{width: '80%', marginBottom: 12}}>
                        <InputSystem
                            value={searchText}
                            change={handleChange}
                            placeholder={t('search')}
                            icon={<SearchSvg/>}
                        />
                    </CommonSearchFilter>
                )
            default:
                return ''
        }
    }

    const renderParam = () => {
        const {character_type, id} = item
        switch (character_type) {
            case OFFERING_CAT_CHARACTER.SELECT_FIELD:
                return (
                   <>
                       {
                           showSearch(result[id]) && renderSearchInput()
                       }
                       <CommonFieldCharacterItem
                           id={id}
                           type='p'
                           data={data[id]}
                           values={values}
                           showAll={showAll}
                           result={result[id]}
                           onChange={onChange}
                           getAllValues={() => getAllValues(character_type, id, () => setShowAll(true))}
                       />
                   </>
                )
            case OFFERING_CAT_CHARACTER.COLOUR_FIELD:
                return (
                    <>
                        {
                            showSearch(p_result[id]) && renderSearchInput()
                        }
                        <ColorFieldCharacterItem
                            id={id}
                            values={values}
                            showAll={showAll}
                            data={p_data[id]}
                            onChange={onChange}
                            result={p_result[id]}
                            getAllValues={() => getAllValues(character_type, id, () => setShowAll(true))}
                        />
                    </>
                )
            default:
                return (
                    <>
                        {
                            showSearch(c_result[id]) && renderSearchInput()
                        }
                        <CommonFieldCharacterItem
                            id={id}
                            type='c'
                            showAll={showAll}
                            values={values}
                            data={c_data[id]}
                            onChange={onChange}
                            result={c_result[id]}
                            getAllValues={() => getAllValues(character_type, id, () => setShowAll(true))}
                        />
                    </>
                )
        }
    }

    const handleChange = (value) => {
        setSearchText(value)
        debounce(onSearch(item.character_type, item.id, value), 300)
    }

    return (
        <CharacterItem showContent={closed}>
            <Title level={5} weight={500} onClick={() => setClosed(!closed)}>
                <div>{item.name}</div>
                <IconBox>
                    <ChevronDownSvg/>
                </IconBox>
            </Title>
            <SlideDown closed={closed} transitionOnAppear={false}>
                {renderParam()}
            </SlideDown>
        </CharacterItem>
    )
}