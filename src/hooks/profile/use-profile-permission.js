import {useStore} from "effector-react";
import {$accountModel} from "../../models/accountModel";
import {useEffect, useState} from "react";
import {allowPermission} from '../../models/app';

export function useProfilePermission({slug_name}) {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [isMyAccount, setIsMyAccount] = useState(false)

    useEffect(() => {
        if (currentProfile && currentProfile.slug_name === slug_name) {
            setIsMyAccount(true)
        } else {
            setIsMyAccount(false)
        }
    }, [currentProfile, slug_name])

    useEffect(() => {
        const tmp = {}
        if (currentProfile && currentProfile.slug_name === slug_name) {
            const perms = currentProfile.perms
            for (let perm of perms) {
                tmp[perm] = true
            }
        }

        allowPermission(tmp)
    }, [currentProfile, slug_name])

    return {isMyAccount}
}