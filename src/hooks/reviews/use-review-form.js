import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import {orderInfoMount} from "../../models/order-models";
import {useHistory, useParams} from "react-router-dom";
import order from "../../service/order";
import {debounce} from "../../utils/debounceUtils";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";

const defaultValues = {
    text: '',
    type: 1,
    professional: 0,
    ethics: 0,
    aesthetics: 0
}

export function useReviewForm() {
    const {orderId} = useParams()
    const [initialValues] = useState(defaultValues)
    const {push} = useHistory()
    const {t} = useTranslation()

    const updateOrder = useCallback((data, actions) => {
        order.updateOrder(data)
            .then((res) => {
                if (res) {
                    actions()
                }
            })
            .catch(() => {
                actions(true)
            })
    }, [])

    const validationSchema = Yup.object().shape({
        text: Yup.string().required(t('required_field'))
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit(values, {setSubmitting, resetForm}) {
            setSubmitting(true)
            const data = {
                review_status: values.type,
                review: values.text,
                rates: {
                    professional: values.professional || 1,
                    ethics: values.ethics || 1,
                    aesthetics: values.aesthetics || 1
                }
            }

            const actions = (error = false) => {
                if (!error) {
                    setSubmitting(false)
                    resetForm()
                    debounce(push('/merchandise/'), 400)
                }
            }

            updateOrder({data, id: orderId}, actions)
        }
    })

    useEffect(() => {
        if (orderId) {
            orderInfoMount(orderId)
        }
    }, [orderId])

    return {formik}
}