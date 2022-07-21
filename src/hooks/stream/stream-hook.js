import {useCallback, useState, useEffect} from "react";
import {useStore} from "effector-react";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import stream from "../../service/stream";
import {showMessage} from "../../UIComponents/message-notification";
import {MESSAGES} from "../../constants";
import {slugify} from "../../utils/stringUtils";
import {debounce} from "@material-ui/core";
import {
    streamChatListEvent,
    streamChatMessageEvent,
    streamListEvent,
    streamInfoEvent,
    $isDataPending, announcementListEvent
} from "../../models/stream";
import {useParams} from "react-router-dom";
import {useWSApi} from "../common";
import {moreStreamChatListEvent} from "../../models/stream/events";
import moment from "moment";

export const StreamHooks = () => {
    const {t} = useTranslation()
    const [slugNameStatus, setSlugNameStatus] = useState(-1)


    const [modalVisible, setModalVisible] = useState(false)
    const validationSchema = Yup.object().shape({
        channel_name: Yup.string().required(t('required_field')),
        channel_slug: Yup.string().required(t('required_field')),
        channel_description: Yup.string().required(t('required_field')),
        region_id: Yup.mixed().required(t('required_field')),
        category: Yup.mixed().required(t('required_field')),
        logo: Yup.mixed().required(t('required_field')),
        thumbnail: Yup.mixed().required(t('required_field')),
        age_restrictions: Yup.mixed().required(t('required_field')),
    })

    const formik = useFormik({
        initialValues: {
            channel_name: '',
            channel_slug: '',
            channel_description: '',
            region_id: undefined,
            category: undefined,
            logo: null,
            thumbnail: null,
            age_restrictions: null
        },
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const {
                logo,
                channel_slug,
                channel_name,
                channel_description,
                category,
                region_id,
                thumbnail,
                age_restrictions
            } = values

            let data = new FormData();
            data.append('logo', logo.file);
            data.append('thumbnail', thumbnail.file);
            data.append('channel_slug', channel_slug);
            data.append('channel_name', channel_name);
            data.append('channel_description', channel_description);
            data.append('category', category.id);
            data.append('region_id', region_id.id);
            data.append('age_restrictions', age_restrictions)

            stream.createChannel(data)
                .then((res) => {
                    if (res.status === 201) {
                        streamListEvent()
                        resetForm()
                        showMessage(MESSAGES.CHANNEL_CREATED, 'success')
                        setModalVisible(false)
                    }

                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    setSubmitting(false)
                })
        }
    })

    const validateSlugName = useCallback((value) => {
        stream.validateSlugName({channel_slug: value.toLowerCase()})
            .then(res => {
                const errors = formik.errors
                const touched = formik.touched
                if (res.data.status) {
                    setSlugNameStatus(1)
                    delete errors['channel_slug']
                    delete touched["channel_slug"]
                    formik.setTouched({...touched})
                    formik.setErrors({...errors})
                } else {
                    setSlugNameStatus(0)
                    formik.setTouched({...touched, slug_name: true})
                    formik.setFieldError('channel_slug', res.data.error.message)
                }

                if (value.trim().length === 0) {
                    setSlugNameStatus(-1)
                }
            })
    }, [formik])

    const debounceFunc = debounce(validateSlugName, 400)

    const handleChange = (value, name) => {
        if (name === 'channel_name' || name === 'channel_slug') {
            formik.setFieldValue(name, value)
            formik.setFieldValue('channel_slug', slugify(value))
            debounceFunc(slugify(value))
        } else {
            formik.setFieldValue(name, value)
        }
    }

    useEffect(() => {
        streamListEvent()
    }, []);


    return {
        modalVisible,
        setModalVisible,
        formik,
        handleChange,
        slugNameStatus
    }
}

export const StreamPageHook = (inputRef) => {
    const isDataPending = useStore($isDataPending)
    const streamInfo = isDataPending.$streamInfo.result

    const {channel_slug} = useParams()
    const [text, setText] = useState('')
    const chatMessage = useWSApi(`/stream/${channel_slug}/chat`).message
    const streamMessage = useWSApi(`/stream/${channel_slug}`).message
    const [sendMessageLoading, setSendMessageLoading] = useState(false)
    const [liveCount, setLiveCount] = useState(0)

    useEffect(() => {
        if (streamInfo.live_watchers) {
            setLiveCount(streamInfo.live_watchers)
        }
    }, [streamInfo])

    useEffect(() => {
        if (streamMessage && streamMessage.action === 'live_watchers') {
            setLiveCount(streamMessage.count)
        }
    }, [streamMessage])

    useEffect(() => {
        if (channel_slug) {
            const data = {
                channel_slug
            }
            streamInfoEvent(data)
            data.limit = 5
            streamChatListEvent(data)
        }
    }, [channel_slug])

    useEffect(() => {
        streamChatMessageEvent(chatMessage)
    }, [chatMessage])

    useEffect(() => {
        if (channel_slug) {
            const params = {
                channel_slug,
                limit: 50,
                date_gte: moment().format('YYYY-MM-DDT00:00:00'),
                date_lte: moment().add(1, 'days').format('YYYY-MM-DDT00:00:00')
            }
            announcementListEvent(params)
        }
    }, [channel_slug]);


    const loadMoreChatList = (chatLength) => {
        const data = {
            channel_slug,
            limit: 20,
            offset: chatLength
        }

        moreStreamChatListEvent(data)
    }


    const sendMessage = (e) => {
        e.preventDefault()
        if (text.length > 2) {
            const data = {
                channel_slug,
                text
            }
            setSendMessageLoading(true)
            stream.sendMessageStreamChat(data)
                .then(response => {
                    if (response.status === 201) {
                        setSendMessageLoading(false)
                        setText('')
                        inputRef?.current?.focus()
                    }
                })
                .catch(_ => {
                    setSendMessageLoading(false)
                })
        }
    }

    return {
        text,
        setText,
        sendMessage,
        sendMessageLoading,
        loadMoreChatList,
        liveCount
    }
}