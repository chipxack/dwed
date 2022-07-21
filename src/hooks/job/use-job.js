import {useUrlParams} from '../common'
import {URL_KEYS} from '../../constants'
import {useEffect} from 'react'
import {selfJobMount, specJobMount} from '../../models/job-model'
import {useHistory, useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$accountModel} from '../../models/accountModel'

export function useJob() {
    const {urlData} = useUrlParams()
    const {job_id: id_from_param} = useParams()
    const {push, location: {state}} = useHistory()
    const jobId = urlData[URL_KEYS.JOB_ID] || (state && state.jobId)
    const {$profiles: {specialisms}} = useStore($accountModel)
    const {account} = useParams()

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if(!id_from_param) {
                if (jobId) {
                    specJobMount(jobId)
                } else {
                    selfJobMount()
                }
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [jobId, id_from_param])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if(!id_from_param) {
                const haveSuggestionJob = specialisms.findIndex(item => !item.settings.accepted)
                if (haveSuggestionJob === -1 && !jobId && specialisms.length > 0 && account) {
                    push({
                        pathname: `/@${account}/jobs`,
                        search: `${URL_KEYS.JOB_ID}=${specialisms[0].id}`
                    })
                }
            }
        }, 400)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [jobId, specialisms, account, push, id_from_param])
}
