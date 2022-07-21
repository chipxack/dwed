import {InputUI} from "../../../UIComponents/inputs";
import {useTranslation} from "react-i18next";
import {useUserSearchHooks} from "../../../hooks/user";
import {SearchUsersBlock} from "../atoms";
import {CloseSvg} from "../../../media";

export const SearchUsers = () => {
    const {t} = useTranslation()

    const {
        userName,
        setUserName,
        clearSearch
    } = useUserSearchHooks()

    return (
        <SearchUsersBlock>
            <InputUI
                ref={inputRef => inputRef?.focus()}
                icon={userName && userName.length > 0 && <CloseSvg style={{cursor: 'pointer'}} onClick={() => clearSearch()}/>}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t('search')}
            />
        </SearchUsersBlock>

    )
}