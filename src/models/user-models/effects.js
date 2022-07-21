import {createEffect} from "effector";
import account from "../../service/account";
import user from "../../service/user";
import stream from '../../service/stream'

/*New effects*/
export const getUserEffect = createEffect({
    handler: account.getUserAccount
});

export const getUserListEffect = createEffect({
    handler: user.getAllUser
});

/*Old Effects*/

export const fetchAllStreams = createEffect({
    handler: stream.getAllStreamList
})

export const fetchUserSubscribe = createEffect({
    handler: user.getUserSubscribeMy
})

export const fetchUserSubsMe = createEffect({
    handler: user.getUserSubscribe
})

export const fetchUserSubsMy = createEffect({
    handler: user.getUserSubscribeMy
})