import Cookies from 'js-cookie'
import {useCallback} from "react";
import jwtDecode from 'jwt-decode'
import {useHistory, useLocation} from 'react-router-dom'
import {
    accountAvatarsMount,
    accountPDataMount,
    accountVideoVerifyMount,
    getCurrentProfile,
} from "../../models/accountModel";
import account from "../../service/account";
import {tokenMount} from "../../models/app";
import {showMessage} from "../../UIComponents/message-notification";
import {PROFILE_TYPE} from "../../constants";

export const useProfile = () => {
    const {push} = useHistory()
    const {pathname} = useLocation()
    const tokens = Cookies.get('users') && JSON.parse(Cookies.get('users'))

    const changeOrgProfile = useCallback((item) => {
        getCurrentProfile({slug_name: item.slug_name, type: PROFILE_TYPE.ORGANIZATION})
        push(`/${item.slug_name}/offerings`)
    }, [push])

    const changeUserProfile = useCallback((username) => {
        if (tokens && tokens[username]) {
            const refreshExpired = jwtDecode(tokens[username].refresh).exp
            const isTrue = new Date(new Date().getTime() + refreshExpired) - new Date().getTime() > 0
            if (isTrue) {
                account.refreshToken({refresh: tokens[username].refresh})
                    .then(response => {
                        const data = response.data
                        if (tokens) {
                            tokens[jwtDecode(data.access).username] = {
                                access: data.access,
                                refresh: data.refresh
                            }

                            Cookies.set('users', JSON.stringify(tokens))
                        }
                        Cookies.set('token', data.access);
                        Cookies.set('refresh-token', data.refresh);
                        tokenMount(data.access)
                        if (!pathname.includes('create-organization') || !pathname.includes('sign-in')) {
                            push(`/@${username}/tape`)
                        }

                        if (pathname.includes('sign-in')) {
                            push('/')
                        }

                        getCurrentProfile({slug_name: username, type: PROFILE_TYPE.USER})

                        if (pathname.includes('settings')) {
                            accountPDataMount()
                            accountAvatarsMount()
                            accountVideoVerifyMount()
                        }
                    })
                    .catch(() => {
                        push('/sign-in')
                    })
            } else {
                push('/sign-in')
            }
        } else {
            push({
                pathname: '/sign-in',
                state: {username}
            })
        }
    }, [pathname, push, tokens])

    const changeAccount = useCallback((username, messageText = null, redirect = false) => {
        if (!messageText) {
            changeUserProfile(username)
        } else {
            showMessage(messageText, 'danger')
        }
    }, [changeUserProfile])

    return {changeAccount, changeOrgProfile}
}