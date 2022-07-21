import React, {useCallback, useEffect, useState} from 'react'
import useOnlineStatus from 'react-use-online-status'
import {useWSApi} from '../common'
import {onlineUserMount} from '../../models/user-models'
import {notificationCountFromSocket} from '../../models/notification-model/events'
import {Avatar, Col, notification, Row} from 'antd'
import {Trans, useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$accountModel} from '../../models/accountModel'
import {Text} from '../../UIComponents/typography'


export function useUserStatus() {
    const [time, setTime] = useState(null)
    const [closed, setClosed] = useState({})
    const [tabVisibility, setTabVisibility] = useState(null)
    const onlineStatus = useOnlineStatus()
    const {push} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const {t} = useTranslation()


    const {
        message,
        sendMessage,
        status
    } = useWSApi(`/user/general`)

    useEffect(() => {
        if (status === 'open') {
            setClosed({})
        } else if (status === 'close') {
            setClosed({general: true})
        }
    }, [status])

    useEffect(() => {
        if (message) {
            if (message.type === 'online_status') {
                const msg = {
                    [message.object.username]: {isOnline: true, time: new Date().getTime()}
                }
                onlineUserMount(msg)
            }

            if (message.type === 'notification') {
                if (message.counters) {
                    notificationCountFromSocket(message.counters.notifications)
                }

                if (message.object && message.object.ntype === 4 && currentProfile) {
                    console.log(message.object.subject)

                    const template = (
                        <Row onClick={() => push({
                            pathname: `/@${currentProfile.slug_name}/jobs/request/${message.object.object.id}`,
                            state: {jobId: message.object.object.responsible.id}
                        })}
                             gutter={16} justify='space-between' style={{width: '100%'}}
                        >
                            <Col>
                                <Row gutter={12} wrap={false}>
                                    <Col>
                                        <Avatar size={48} src={message.object.subject.avatar}/>
                                    </Col>
                                    <Col flex={1} style={{lineHeight: 1.1}}>
                                        <Trans i18nKey='new_order_from' values={{n: message.object.subject.name}}>
                                            <span style={{fontWeight: 500}}/>
                                        </Trans>
                                        <Text
                                            style={{cursor: 'pointer', textAlign: 'right'}}
                                        >
                                            {t('go_over')}
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )
                    notification.open({message: template, duration: 10})
                }

            }
        }
    }, [message, currentProfile, push, t])

    const getTabVisibility = useCallback(() => {
        if (!!document.visibilityState) {
            setTabVisibility(document.visibilityState)
        } else {
            setTabVisibility(null)
        }
    }, [])

    useEffect(() => {
        getTabVisibility()
        window.addEventListener('visibilitychange', getTabVisibility)

        return () => window.removeEventListener('visibilityChange', getTabVisibility)
    }, [getTabVisibility])

    useEffect(() => {
        let timeout = null
        if (onlineStatus && status === 'open') {

            if (!time) {
                setTime(new Date().getTime())
            }
            if (tabVisibility && tabVisibility === 'visible' && !closed['general']) {
                timeout = setInterval(() => {
                    const now = new Date()
                    if (time && now.getTime() - time > 10000) {
                        const data = {
                            im_online: '1'
                        }
                        setTime(now.getTime())
                        sendMessage(JSON.stringify(data))
                    }
                }, 10000)
            }
        }

        return () => {
            clearInterval(timeout)
            timeout = null
        }
    }, [onlineStatus, time, sendMessage, tabVisibility, closed, status])
}