import {useCallback, useEffect} from 'react'
import {db, idbGet} from '../../config/db'
import {onlineUserMountFromIDB} from '../../models/user-models'
import {useStore} from 'effector-react'
import {$appModel} from '../../models/app'
import {IDB_OBJ_STORE} from '../../constants/idb'

export function useAppDb() {
    const {$app: {token}} = useStore($appModel)
    const getOnlineAccounts = useCallback(() => {
        if (token) {
            idbGet('online_accounts', 'online_accounts')
                .then((res) => {
                    if (res) {
                        const data = JSON.parse(res)
                        onlineUserMountFromIDB(data)
                    }
                })
        }
    }, [token])

    const getObjStoreName = useCallback(async () => {
        try {
            const storeNames = Object.values((await db).objectStoreNames)
            if (storeNames.length !== Object.values(IDB_OBJ_STORE).length) {

            }
            localStorage.setItem('store_names', JSON.stringify(storeNames))

        } catch (e) {

        }
    }, [])


    useEffect(() => {
        getObjStoreName()
    }, [getObjStoreName])

    useEffect(() => {
        getOnlineAccounts()
    }, [getOnlineAccounts])
}