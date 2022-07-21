import {useEffect, useRef, useState} from "react";
import {streamListEvent} from "../../models/stream";
import * as Yup from "yup";
import {useFormik} from "formik";
import stream from "../../service/stream";
import {showMessage} from "../../UIComponents/message-notification";
import {MESSAGES} from "../../constants";
import {useTranslation} from "react-i18next";

const channel = stream


export const StreamConfigHook = (channelInfo) => {
    const {t} = useTranslation()
    const keyRef = useRef(null);
    const [channel_name, setChannelName] = useState('')

    const [initialValues, setInitialValues] = useState({
        channel_name: '',
        channel_slug: '',
        channel_description: '',
        region_id: undefined,
        category: undefined,
        logo: null,
        thumbnail: null,
        age_restrictions: null
    })

    useEffect(() => {
        if (channelInfo){
            setInitialValues({
                channel_name: channelInfo.channel_name,
                channel_slug: channelInfo.channel_slug,
                channel_description: channelInfo.channel_description,
                region_id: channelInfo.region_id,
                category: channelInfo.category,
                logo: {stringUrl: channelInfo.logo},
                thumbnail: {stringUrl: channelInfo.thumbnail},
                age_restrictions: channelInfo.age_restrictions
            })
        }

    }, [channelInfo])


    function myFunction() {
        if (keyRef){
            keyRef.current.select();
            keyRef.current.setSelectionRange(0, 99999);
            document.execCommand("copy");
        }

    }

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
        initialValues,
        enableReinitialize: true,
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
            // setInitialValues({
            //     channel_name: channelInfo.channel_name,
            //     channel_slug: channelInfo.channel_slug,
            //     channel_description: channelInfo.channel_description,
            //     region_id: channelInfo.region_id,
            //     category: channelInfo.category,
            //     logo: {stringUrl: channelInfo.logo},
            //     thumbnail: {stringUrl: channelInfo.thumbnail},
            //     age_restrictions: channelInfo.age_restrictions
            // })

            logo.file && data.append('logo', logo.file);
            thumbnail.file && data.append('thumbnail', thumbnail.file);
            data.append('channel_slug', channel_slug);
            data.append('channel_name', channel_name);
            channelInfo.channel_description !== channel_description && data.append('channel_description', channel_description);
            category.id && data.append('category', category.id);
            region_id.id && data.append('region_id', region_id.id);
            channelInfo.age_restrictions !== age_restrictions && data.append('age_restrictions', age_restrictions)

            channel.editChannel(channel_slug, data)
                .then((res) => {
                    if (res.status === 200) {
                        streamListEvent()
                        resetForm()
                        showMessage(MESSAGES.CHANNEL_UPDATED, 'success')
                    }

                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    setSubmitting(false)
                })
        }
    })

    const handleChange = (value, name) => {
        if (name === 'channel_name' || name === 'channel_slug') {
            formik.setFieldValue(name, value)
        } else {
            formik.setFieldValue(name, value)
        }
    }

    return {
        myFunction,
        keyRef,
        channel_name,
        setChannelName,
        formik,
        handleChange
    }

}