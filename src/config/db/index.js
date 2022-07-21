import {openDB, deleteDB} from 'idb'
import {IDB_OBJ_STORE} from '../../constants/idb'

deleteDB('DWED_DB')

export const db = openDB('DWED_DB', 1, {
    upgrade(database, oldVersion, newVersion, transaction) {
        database.createObjectStore(IDB_OBJ_STORE.ONLINE_ACCOUNTS)
        // database.createObjectStore(IDB_OBJ_STORE.ORG_INFO)
        // database.createObjectStore(IDB_OBJ_STORE.ORG_LIST)
        // database.createObjectStore(IDB_OBJ_STORE.OFFERING_INFO)
        // database.createObjectStore(IDB_OBJ_STORE.USER_INFO)
        // database.createObjectStore(IDB_OBJ_STORE.USER_CART)
        // database.createObjectStore(IDB_OBJ_STORE.ACCOUNT_OFFERINGS)
        // database.createObjectStore(IDB_OBJ_STORE.OFFERING_GROUPS)
        // database.createObjectStore(IDB_OBJ_STORE.ORG_SPEC_LIST)
        // database.createObjectStore(IDB_OBJ_STORE.ORG_SPEC_CAT_LIST)
        // database.createObjectStore(IDB_OBJ_STORE.OFFERING_GALLERY)
        // database.createObjectStore(IDB_OBJ_STORE.OFFERING_PARAMS)
    },
    blocking() {
        alert(2)
    },
    blocked() {
        alert(2)
    },
    terminated() {

    }
})


export async function idbGet(objectStore, key) {
    return (await db).get(objectStore, key)
}

export async function idbSet(objectStore, key, val) {
    return (await db).put(objectStore, val, key)
}

export async function idbDel(objectStore, key) {
    return (await db).delete(objectStore, key)
}

export async function idbClear(objectStore) {
    return (await db).clear(objectStore)
}

export async function idbKeys(objectStore) {
    return (await db).getAllKeys(objectStore)
}

export async function idbValues(objectStore) {
    return (await db).getAll(objectStore)
}

export async function idbCreateObjectStore(objectStore) {
    return (await db).createObjectStore(objectStore, {autoIncrement: true, keyPath: objectStore})
}

export async function idbDelObjectStore(objectStore) {
    return (await db).deleteObjectStore(objectStore)
}

