import {useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$userModel} from '../../models/user-models'

export function useUserOnline(username) {
    const [isOnline, setIsOnline] = useState(false)
    const {$onlineUser: {data}} = useStore($userModel)

    useEffect(() => {
        let timeout = null
        if (username && data[username]) {
            timeout = setInterval(() => {
                const time = data[username].time
                const now = new Date().getTime()
                if(now - time <= 11000) {
                    setIsOnline(true)
                }else {
                    setIsOnline(false)
                }
            }, 1000)
        }

        return () => {
            clearInterval(timeout)
            timeout = null
        }
    }, [data, username])

    return {isOnline}

}