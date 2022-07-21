import {createEffect} from "effector";
import account from "../../service/account";
import org from "../../service/org";

export const fetchAccountPData = createEffect({
    handler: account.getAccountPData
})

export const fetchAccountInfo = createEffect({
    handler: account.getAccount
});

export const fetchAccountAvatars = createEffect({
    handler: account.getAccountAvatars
})

export const fetchAccountVideoVerify = createEffect({
    handler: account.getAccountVideoVerify
})

export const fetchAccountNewVideoVerify = createEffect({
    handler: account.createAccountVideoVerify
})

export const fetchAccountNewAvatar = createEffect({
    handler: account.createAccountAvatar
})

export const fetchAccountNewPData = createEffect({
    handler: account.updateAccountPData
})

export const fetchAccountUpdate = createEffect({
    handler: account.updateAccount
})

export const fetchOrgUpdate = createEffect({
    handler: org.updateOrgInfo
})

export const fetchCreateOrganization = createEffect({
    handler: org.createOrganization
})

export const fetchRemovedLinkedUser = createEffect({
    handler: account.removeLinkedUser
})