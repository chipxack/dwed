import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import {PERSIMMON} from '../../constants/theme'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import moment from 'moment'
import org from '../../service/org'
import {useStore} from 'effector-react'
import {$accountModel} from '../../models/accountModel'
import {FETCHING_STATUS, PROFILE_TYPE, URL_KEYS} from '../../constants'
import {
    $organizationModel,
    getOrgCouponEvent,
    getOrgCouponListEvent,
    getOrgCouponReceiversListEvent
} from '../../models/organization-models'
import {useUrlParams} from '../common'
import {useHistory} from 'react-router-dom'
import {getCommonApiParams} from '../../utils/app-utils'

const defaultValues = {
    title: '',
    offerings: {},
    offerings_reverse: false,
    offer_groups: {},
    offerings_discount: '0',
    from_date: null,
    to_date: null,
    limit_per_user: null,
    background_color: PERSIMMON
}

export function useOrgCouponForm(coupon_id) {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$orgCouponStore: {data}} = useStore($organizationModel)

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t('required_field')),
        from_date: Yup.mixed().required(t('required_field')),
        offerings_discount: Yup.number().min(0.1, t('min_value', {n: 0.1})).required(t('required_field'))
    })

    const [initialValues, setInitialValues] = useState(defaultValues)

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {resetForm, setSubmitting}) {
            const {
                title,
                from_date,
                offerings_discount,
                offerings,
                offerings_reverse,
                offer_groups,
                limit_per_user,
                background_color,
                to_date
            } = values

            const data = {
                title,
                from_date: moment(from_date).format('YYYY-MM-DD HH:mm'),
                offerings_discount: offerings_discount,
                offerings: Object.keys(offerings),
                offer_groups: Object.keys(offer_groups),
                offerings_reverse,
                limit_per_user,
                background_color,
                to_date: to_date ? moment(to_date).format('YYYY-MM-DD HH:mm') : null
            }
            if (currentProfile?.type === PROFILE_TYPE.ORGANIZATION) {
                if (coupon_id) {
                    org.updateOrgCoupon({id: coupon_id, organization: currentProfile?.slug_name, data})
                        .then((res) => {
                            if (res) {
                                push('/settings/coupon')
                            }
                        })
                        .finally(() => setSubmitting(false))
                } else {
                    org.createOrgCoupon({organization: currentProfile?.slug_name, data})
                        .then((res) => {
                            if (res) {
                                resetForm()
                            }
                        })
                        .finally(() => {
                            setSubmitting(false)
                        })
                }
            }

        }
    })

    useEffect(() => {
        if (coupon_id && Object.values(data).length > 0) {
            const {offerings, offer_groups, from_date, to_date, ...others} = data

            setInitialValues({
                ...defaultValues,
                ...others,
                from_date: from_date ? moment(from_date).format('YYYY-MM-DD') : null,
                to_date: to_date ? moment(to_date).format('YYYY-MM-DD') : null,
                offerings: offerings.length > 0
                    ? offerings.reduce((acc, item) => {
                        acc[item] = item
                        return acc
                    }, {})
                    : {},
                offer_groups: offer_groups.length > 0
                    ? offer_groups.reduce((acc, item) => {
                        acc[item] = item
                        return acc
                    })
                    : {}
            })
        }
    }, [coupon_id, data])

    return {
        formik
    }
}

export function useOrgCouponList(slug) {
    const {push, location: {pathname}} = useHistory()
    const {urlData} = useUrlParams()
    const p = Number(urlData?.[URL_KEYS.PAGE]) || 1
    const status = urlData[URL_KEYS.STATUS]

    const getList = useCallback((params) => {
        if (slug) {
            const data = {
                organization: slug,
                ...params
            }
            getOrgCouponListEvent(data)
        }

    }, [slug])

    const onPageChange = useCallback((_page) => {
        push({
            pathname,
            search: `${URL_KEYS.PAGE}=${_page}`
        })
    }, [pathname, push])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            const data = {
                status: FETCHING_STATUS.INIT,
                params: {
                    ...getCommonApiParams(4).params
                }
            }

            if (status) {
                data.params.status = status
            } else {
                delete data.params.status
            }

            data.params.offset = p === 1 ? 0 : (p - 1) * 4
            getList(data)
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getList, p, status])

    return {
        onPageChange
    }
}

export function useOrgCoupon({id, slug}) {
    useEffect(() => {
        if (id && slug) {
            const data = {
                organization: slug,
                id
            }
            getOrgCouponEvent(data)
        }

    }, [id, slug])
}

export function useOrgCouponReceiversList({slug, coupon_id}) {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const getList = useCallback((params) => {
        if (slug && coupon_id) {
            const data = {
                ...params,
                organization: slug,
                id: coupon_id
            }

            getOrgCouponReceiversListEvent(data)
        }
    }, [coupon_id, slug])

    useEffect(() => {
        const data = {
            status: FETCHING_STATUS.INIT,
            params: {
                limit: 10,
                offset: page === 1 ? 0 : (page - 1) * 20
            }
        }
        if (search.length > 2) {
            data.params.search = search
        } else {
            delete data.params.search
        }
        getList(data)
    }, [page, getList, search])

    return {
        page,
        setPage,
        search,
        setSearch
    }
}
