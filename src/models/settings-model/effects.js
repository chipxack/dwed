import {createEffect} from "effector/effector.cjs";
import account from "../../service/account";
import org from "../../service/org";

export const fetchUserPersonalInfo = createEffect({
    handler: account.getAccount
})

export const fetchOrgPersonalInfo = createEffect({
    handler: org.getOrgDetail
})

export const fetchUserAvatar = createEffect({
    handler: account.getAccountAvatars
})