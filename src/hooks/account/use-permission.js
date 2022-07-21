import {useCallback, useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$accountModel} from "../../models/accountModel";
import {useHistory, useParams} from "react-router-dom";
import {PERMISSIONS, PROFILE_TYPE} from "../../constants";

export function usePermission({redirectPath, permission, path}) {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [loading, setLoading] = useState(true)
    const {push} = useHistory()
    const {account, organization} = useParams()

    const allPathIncludes = (
        !path.includes('settings') &&
        !path.includes('create-organization') &&
        !path.includes('records') &&
        !path.includes('reviews')
    )

    const tokenRequiredPathIncludes = (
        !path.includes('settings') &&
        !path.includes('create-organization')
    )

    const redirect = useCallback(() => {
        if (redirectPath) {
            push(redirectPath)
        } else {
            push('/')
        }
    }, [push, redirectPath])

    const userPermission = useCallback((data) => {
        if (data.slug_name === account) {
            setLoading(false)
            console.log(1)
        } else {
            redirect()
        }
    }, [account, redirect])

    const orgPermission = useCallback((data) => {
        if (data.slug_name === organization) {
            const perms = data.perms
            if (perms.indexOf(PERMISSIONS.GRAND) !== -1) {
                setLoading(false)
            } else if (perms.indexOf(permission) !== -1) {
                setLoading(false)
            } else {
                redirect()
            }
        } else {
            redirect()
        }
    }, [redirect, organization, permission])

    useEffect(() => {
        if (currentProfile) {
            if (allPathIncludes) {
                if (currentProfile.type === PROFILE_TYPE.USER) {
                    userPermission(currentProfile)
                }
                if (currentProfile.type === PROFILE_TYPE.ORGANIZATION) {
                    orgPermission(currentProfile)
                }
            } else {
                if (tokenRequiredPathIncludes) {
                    if (currentProfile.status !== undefined) {
                        setLoading(false)
                    } else {
                        redirect()
                    }
                } else {
                    setLoading(false)
                }
            }
        } else {
            redirect()
        }
    }, [currentProfile, orgPermission, userPermission, redirect, path, allPathIncludes, tokenRequiredPathIncludes])
    return {loading}
}