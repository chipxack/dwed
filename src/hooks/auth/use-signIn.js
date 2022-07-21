import {useFormik} from "formik";
import * as Yup from 'yup'
import Cookies from "js-cookie";
import {useHistory, useLocation} from 'react-router-dom'
import account from "../../service/account";
import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useState} from "react";
import {tokenMount} from "../../models/app";
import {showMessage} from "../../UIComponents/message-notification";
import {getCurrentProfile} from "../../models/accountModel";
import {hideModal} from "../../models/widgets";

const fields = {
    username: '',
    password: ''
}

export const useSignIn = (closeAuthModal) => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const [initialValues, setInitialValues] = useState(fields)
    const {state} = useLocation()

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(t('required_field')),
        password: Yup.string().required(t('required_field'))
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit({username, password}, {setSubmitting, resetForm}) {
            setSubmitting(true)
            account.getToken({password, username})
                .then(response => {
                    let timeout = null
                    let users = {}
                    Cookies.remove('currentProfile')
                    getCurrentProfile()
                    if (Cookies.get('users')) {
                        const oldUsers = JSON.parse(Cookies.get('users'))
                        users = {...oldUsers}
                    }
                    users[username] = response.data
                    Cookies.set('users', JSON.stringify(users));
                    Cookies.set('token', response.data.access);
                    Cookies.set('refresh-token', response.data.refresh);
                    tokenMount(response.data.access)
                    timeout = setTimeout(() => {
                        resetForm()
                        closeAuthModal ?
                            hideModal() : push('/');
                        showMessage('you_have_successfully_logged_in')
                    }, 100)

                    return () => {
                        clearTimeout(timeout)
                        timeout = null
                    }
                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    setSubmitting(false)
                })
        }
    })

    useEffect(() => {
        if (state && state.username) {
            setInitialValues({...fields, username: state.username})
        }
    }, [state])

    const disabled = useCallback(() => {
        return formik.isSubmitting
            || (formik.touched.username && !!formik.errors.username)
            || (formik.touched.password && !!formik.errors.password)
    }, [formik])

    return {
        formik,
        disabled
    }
}