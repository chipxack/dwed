import {useCallback, useEffect, useState} from 'react'
import {$accountModel} from '../../models/accountModel'
import {useStore} from 'effector-react'
import {PROFILE_TYPE, URL_KEYS} from '../../constants'
import {useHistory} from 'react-router-dom'

const initialAllowToNav = {1: 1, 2: 0, 3: 0}

export function useVerificationSteps() {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [allowToNav, setAllowToNav] = useState(initialAllowToNav)
    const [mounted, setMounted] = useState(false)
    const {push} = useHistory()

    const redirectPath = useCallback((id = null) => {
        return {
            pathname: '/settings/verification',
            search: id ? `${URL_KEYS.VERIFICATION_STEP}=${id}` : '',
        }
    }, [])

    const redirectToUserVerifyingStep = useCallback((status) => {
        if (status < 3) {
            let tmp = initialAllowToNav
            push(redirectPath(status + 1))
            if (status === 1) {
                tmp['1'] = 2
                tmp['2'] = 1
            } else if (status === 2) {
                tmp['1'] = 2
                tmp['2'] = 2
                tmp['3'] = 1
            }
            setAllowToNav(tmp)
        }

        if (status > 2) {
            push(redirectPath())
        }
    }, [redirectPath, push])


    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (currentProfile?.type === PROFILE_TYPE.USER && !mounted) {
                setMounted(true)
                redirectToUserVerifyingStep(currentProfile?.status)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [redirectToUserVerifyingStep, currentProfile?.type, currentProfile?.status, mounted])

    return {allowToNav}
}
