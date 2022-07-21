import {useState, useEffect} from "react";
import {getChatUsersListEvent, getNewUser} from "../../models/chat/events";


export const useUserSearchHooks = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (userName && userName.length > 3){
            const params = {
                search: userName
            }
            getNewUser({params})
        }
    }, [userName]);

    const clearSearch = () => {
        setUserName('')
        const params = {
            rtype: 'user',
            limit: 20,
            offset: 0
        }
        getChatUsersListEvent(params)
    }


    return {
        userName,
        setUserName,
        clearSearch
    }
}