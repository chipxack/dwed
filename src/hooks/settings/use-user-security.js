import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import {showMessage} from '../../UIComponents/message-notification'
import {updateAccountInfo} from '../../models/accountModel'

export function useUserSecurity() {
    const {t} = useTranslation()

    const validationSchema = Yup.object().shape({
        new_password: Yup.string()
            .min(8, t('password_must_contain_at_least_eight_characters'))
            .required(t('required_field')),
        confirm_password: Yup.string()
            .min(8, t('password_must_contain_at_least_eight_characters'))
            .oneOf([Yup.ref('new_password'), null], t('passwords_do_not_match'))
            .required(t('required_field')),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: {
            old_password: null,
            new_password: '',
            confirm_password: '',
        },
        onSubmit({old_password, new_password}, {setSubmitting}) {
            const data = {
                old_password,
                new_password,
            }

            const actions = (err) => {
                setSubmitting(false)
                if (!err) {
                    showMessage('password_changed_successfully', 'success')
                }
            }

            updateAccountInfo({data, actions})
        },
    })

    return {
        formik,
    }
}
