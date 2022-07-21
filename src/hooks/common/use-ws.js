import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$appModel} from "../../models/app";


export const useWSApi = (url) => {
    const {$app: {token}} = useStore($appModel)
    // const [token] = useState(Cookies.get("token"))
    // const [chatsUrl, setChatsUrl] = useState(null)

    const [message, setMessage] = useState(undefined)
    const [status, setStatus] = useState(undefined);
    const [socketUrl, setSocketUrl] = useState(null)

    const {sendMessage} = useWebSocket(socketUrl, {
        share: true,
        retryOnError: true,
        onMessage: (e) => {
            setMessage(JSON.parse(e.data))
        },
        onOpen: () => {
            setStatus('open')
        },
        onClose: () => {
            setStatus('close')
            // let reason
            // let code
            //     code = 1000
            //     reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
            // } else if (closeData.code === 1001) {
            //     code = 1001
            //     reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
            // } else if (closeData.code === 1002) {
            //     code = 1002
            //     reason = "An endpoint is terminating the connection due to a protocol error";
            // } else if (closeData.code === 1003) {
            //     code = 1003
            //     reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
            // } else if (closeData.code === 1004) {
            //     code = 1004
            //     reason = "Reserved. The specific meaning might be defined in the future.";
            // } else if (closeData.code === 1005) {
            //     code = 1005
            //     reason = "No status code was actually present.";
            // } else if (closeData.code === 1006) {
            //     code = 1006
            //     reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
            // } else if (closeData.code === 1007) {
            //     code = 1007
            //     reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
            // } else if (closeData.code === 1008) {
            //     code = 1008
            //     reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
            // } else if (closeData.code === 1009) {
            //     code = 1009
            //     reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
            // } else if (closeData.code === 1010) { // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
            //     code = 1010
            //     reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + closeData.reason;
            // } else if (closeData.code === 1011) {
            //     code = 1011
            //     reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
            // } else if (closeData.code === 1015) {
            //     code = 1015
            //     reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
            // } else if (closeData.code === 4401) {
                // const refreshToken = Cookies.get('refresh-token');

                // account.refreshToken({refresh: refreshToken})
                //     .then(response => {
                //         console.log('response.data', response.data)
                //         const data = response.data
                //         const tokens = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : {}
                //         tokens[jwtDecode(data.access).username] = {
                //             access: data.access,
                //             refresh: data.refresh
                //         }
                //         Cookies.set('users', JSON.stringify(tokens))
                //         Cookies.set('token', data.access);
                //         Cookies.set('refresh-token', data.refresh);
                //         setToken(data.access)
                //         // setSocketUrl(`wss://py.dwed.biz/ws/v1.0${url}/?token=${data.access}`)
                //     })
                //     .catch(error => {
                //         Cookies.remove('token');
                //         Cookies.remove('refresh-token');
                //     })
            // } else {
                // code = closeData.code
                // reason = "Unknown reason";
            // }
            // openNotificationWithIcon('warning', `Ошибка: ${code}`, reason)
            // code !== 1000 && openNotificationWithIcon('warning', `Ошибка: ${code}`, reason)
        },
        onError: (e) => {
            console.log('error: ', e)
            setStatus('error')
        }
    });

    // useEffect(() => {
    //     if (url) {
    //         setSocketUrl(`wss://py.dwed.biz/ws/v1.0${url}/?token=${token}`)
    //     }
    // }, [url])

    useEffect(() => {
        if (token && url) {
            setSocketUrl(`${process.env.REACT_APP_WS_BASE_URL + url}/?token=${token}`)
        } else if(url) {
            setSocketUrl(`${process.env.REACT_APP_WS_BASE_URL + url}/`)
        } else{
            setSocketUrl(null)
        }
    }, [token, url])

    return {
        sendMessage,
        message,
        status
    }

}