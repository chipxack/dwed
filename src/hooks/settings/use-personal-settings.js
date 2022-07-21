import {useCallback, useEffect} from "react";
import {useStore} from "effector-react";
import {$accountModel} from "../../models/accountModel";
import {PROFILE_TYPE} from "../../constants";
import {orgPersonalInfoMount, userPersonalInfoMount} from "../../models/settings-model";

export function usePersonalSettings() {
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const getUserInfo = useCallback((slug_name = null) => {
        if (slug_name) {
            userPersonalInfoMount()
        }
    }, [])

    const getOrgInfo = useCallback((slug_name = null) => {
        if (slug_name) {
            orgPersonalInfoMount(slug_name)
        }
    }, [])

    useEffect(() => {
        if (currentProfile) {
            if (currentProfile.type === PROFILE_TYPE.ORGANIZATION) {
                getOrgInfo(currentProfile.slug_name)
            }

            if (currentProfile.type === PROFILE_TYPE.USER) {
                getUserInfo(currentProfile.slug_name)
            }
        }
    }, [currentProfile, getUserInfo, getOrgInfo])

}