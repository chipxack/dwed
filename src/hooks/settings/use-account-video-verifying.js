import {useState} from 'react'
import {accountInfoMount} from '../../models/accountModel'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import account from '../../service/account'
import {showMessage} from '../../UIComponents/message-notification'

export function useAccountVideoVerifying() {
    const [initialValues] = useState({
        video: null
    })
    const {location: {pathname}, push} = useHistory()

    const {t} = useTranslation()

    const validationSchema = Yup.object().shape({
        video: Yup.mixed().required(t('required_field'))
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit({video}, {setSubmitting}) {
            const actions = () => {
                push({
                    pathname,
                })
                setSubmitting(false)
                showMessage('data_sent_for_moderation', 'success')
            }
            const formData = new FormData()
            formData.append('file', video.file)
            account.createAccountVideoVerify(formData)
                .then((res) => {
                    if (res) {
                        accountInfoMount({actions})
                    }
                })
                .catch(() => {
                    setSubmitting(false)
                })
        }
    })

    // useEffect(() => {
    //     if (data && data.length > 0) {
    //         setInitialValues({
    //             video: data[0].file
    //         })
    //     }
    // }, [data])

    return {formik}
}