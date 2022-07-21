import {useParams} from "react-router-dom";
import {useCallback, useEffect} from 'react'
import {getUserEvent, getUserFromIDBEvent} from '../../models/user-models'
import {idbGet} from '../../config/db'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {getDiffDate} from '../../utils/dateUtils'
import {FETCHING_STATUS} from '../../constants'
import {storeNames} from '../../utils/app-utils'

export const useAccount = () => {
    const {account} = useParams();

    const getUserSideEffect = useCallback(async (username) => {
        if(storeNames && storeNames.indexOf(IDB_OBJ_STORE.USER_INFO) !== -1) {
            try {
                const dataFromIdb = await idbGet(IDB_OBJ_STORE.USER_INFO, username)
                if (dataFromIdb) {
                    const diff = getDiffDate(dataFromIdb.date)
                    if (diff > 20) {
                        getUserEvent({status: FETCHING_STATUS.INIT, account: username})
                    } else {
                        if (dataFromIdb.store.status === FETCHING_STATUS.FILTER || dataFromIdb.store.status === FETCHING_STATUS.NEXT_FILTER) {
                            getUserEvent({status: FETCHING_STATUS.INIT, account: username})
                        } else {
                            getUserFromIDBEvent(dataFromIdb.store)
                        }
                    }
                } else {
                    getUserEvent({status: FETCHING_STATUS.INIT, account: username})
                }
            } catch (e) {

            }
        }else {
            getUserEvent({status: FETCHING_STATUS.INIT, account: username})
        }
    }, [])

    useEffect(() => {
        if (account) {
            getUserSideEffect(account)
        }
    }, [account, getUserSideEffect]);
}