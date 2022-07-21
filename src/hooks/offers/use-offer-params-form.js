import {useFormik} from 'formik'
import {useStore} from 'effector-react'
import * as Yup from 'yup'
import {useUrlParams} from '../common'
import {useTranslation} from 'react-i18next'
import offering from '../../service/offering'
import {CHARACTER_FIELDS, MESSAGES, URL_KEYS} from '../../constants'
import {useHistory, useParams} from 'react-router-dom'
import {useCallback, useEffect, useState} from 'react'
import {$offeringModel, offeringDetailMount, offeringParamsMount, resetOffering} from '../../models/offering-model'
import {$categoryModel, colorsMount, offerCatCharactersMount, offerCatPrepsMount} from '../../models/categories-models'
import moment from 'moment'
import {showMessage} from '../../UIComponents/message-notification'
import {arrayDiff} from '../../utils/arrayUtils'
import {debounce} from '../../utils/debounceUtils'
import {resetOrg} from '../../models/organization-models'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useOfferParamsForm() {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {$offeringInfo, $offeringParams} = useStore($offeringModel)
    const {$categoryCharacters, $charactersPreparedValues, $colorList} = useStore($categoryModel)
    const [formParams, setFormParams] = useState([])
    const [validationParams, setValidationParams] = useState({})
    const [characsInitialValues, setCharacsInitialValues] = useState({})
    const {organization, account} = useParams()
    const {push} = useHistory()
    const [search, setSearch] = useState({})
    const [preparedData, setPreparedData] = useState([])
    const [searchColor, setSearchColor] = useState('')

    const offering_param_id = urlData[URL_KEYS.OFFERING_PARAM_ID]

    const validationSchema = Yup.object().shape({
        ...validationParams,
    })

    const redirectFunc = useCallback(() => {
        let path = '/'
        resetOffering()
        if (organization) {
            path = organization
            resetOrg()
        }

        if (account) {
            path = account
        }

        push(`/${path}/offerings`)

    }, [organization, account, push])

    const createOfferingCharacs = useCallback((data, {setSubmitting, resetForm, redirect}) => {
        setSubmitting(true)
        offering.createOfferingCharacters({offering_id: offering_param_id, data})
            .then((res) => {
                if (res) {
                    if (redirect) {
                        resetForm()
                        showMessage(MESSAGES.OFFERINGS_PARAMS_ADDED, 'success')
                        setSubmitting(false)
                        debounce(redirectFunc(), 300)
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [offering_param_id, redirectFunc])

    const updateOfferingCharacs = useCallback((data, {setSubmitting, resetForm, redirect}) => {
        setSubmitting(true)
        offering.updateOfferingCharacters({offering_id: offering_param_id, ...data})
            .then(res => {
                if (res) {
                    if (redirect) {
                        resetForm()
                        setSubmitting(false)
                        showMessage(MESSAGES.OFFERINGS_PARAMS_EDITED, 'success')
                        debounce(redirectFunc(), 300)
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [offering_param_id, redirectFunc])

    const removeOfferingCharacs = useCallback((data, {setSubmitting, resetForm, redirect}) => {
        setSubmitting(true)
        offering.removeOfferingCharacters({offering_id: offering_param_id, ...data})
            .then(res => {
                if (res) {
                    if (redirect) {
                        resetForm()
                        setSubmitting(false)
                        showMessage(MESSAGES.OFFERINGS_PARAMS_EDITED, 'success')
                        debounce(redirectFunc(), 300)
                    }
                }
            })
            .catch(() => {
                setSubmitting(false)
            })
    }, [offering_param_id, redirectFunc])

    const separatorFunc = (actions) => {
        for (let i = 0; i < preparedData.length; i++) {
            const {id, type, ...data} = preparedData[i]
            if (type) {
                const redirect = (i + 1) === preparedData.length
                if (type === 'create') {
                    createOfferingCharacs(data, {...actions, redirect})
                }
                if (type === 'update') {
                    const params = {id, data}
                    updateOfferingCharacs(params, {...actions, redirect})
                }

                if (type === 'delete') {
                    removeOfferingCharacs({id}, {...actions, redirect})
                }
            }
        }
    }

    const formik = useFormik({
        validationSchema,
        initialValues: {...characsInitialValues},
        enableReinitialize: true,
        onSubmit(values, actions) {
            separatorFunc(actions)
        }
    })

    const getCategoryCharacters = useCallback((params) => {
        if ($offeringInfo.data) {
            const data = {
                cat_id: $offeringInfo.data.category.id,
                params
            }
            offerCatCharactersMount(data)
        }
    }, [$offeringInfo.data])

    const generateValidation = useCallback((field) => {
        switch (field) {
            case CHARACTER_FIELDS['1']:
            case CHARACTER_FIELDS['9']:
                return Yup.mixed().required(t('required_field'))
            default:
                return Yup.string().required(t('required_field'))
        }
    }, [t])

    const generateCharacsInitialValue = useCallback((field, multi_values) => {
        switch (field) {
            case CHARACTER_FIELDS['1']:
                return multi_values ? [] : null
            case CHARACTER_FIELDS['9']:
                return undefined
            case CHARACTER_FIELDS['10']:
            case CHARACTER_FIELDS['12']:
                return moment(new Date()).format('YYYY-MM-DD')
            default:
                return ''
        }
    }, [])

    const getPreparedCharacters = useCallback((charac_id, params) => {
        if ($offeringInfo.data && $offeringInfo.data.category.id) {
            const data = {cat_id: $offeringInfo.data.category.id, charac_id, ...params}
            offerCatPrepsMount(data)
        }
    }, [$offeringInfo.data])

    const generateCharacsOption = useCallback(() => {
        if ($categoryCharacters.data.length > 0 && !$offeringParams.loading && $offeringParams.result) {
            const data = $categoryCharacters.data
            const addedValues = $offeringParams.result
            const f_params = []
            const v_params = {}
            const ch_values = {}

            for (let i = 0; i < data.length; i++) {
                const slug_key = data[i].id
                const field = CHARACTER_FIELDS[data[i]['character_type']]
                f_params.push({
                    field,
                    name: slug_key,
                    title: data[i].name,
                    id: data[i].id,
                    multi_values: data[i].multi_values
                })

                if (addedValues[slug_key]) {
                    ch_values[slug_key] = addedValues[slug_key].character.character_type === 1
                        ? addedValues[slug_key].custom_value
                        : !!addedValues[slug_key].value ? addedValues[slug_key].value : generateCharacsInitialValue(field)
                } else {
                    ch_values[slug_key] = generateCharacsInitialValue(field, data[i].multi_values)
                }

                if (data[i].required) {
                    v_params[slug_key] = generateValidation(field)
                }
                if (data[i]['character_type']) {
                    const params = {
                        params: {...initialParams},
                        clear: true
                    }
                    getPreparedCharacters(data[i].id, params)
                }
            }

            setFormParams(f_params)
            setValidationParams(v_params)
            setCharacsInitialValues(ch_values)
        }
    }, [$categoryCharacters.data, getPreparedCharacters, generateCharacsInitialValue, generateValidation, $offeringParams])

    const loadMore = (e, item) => {
        const config = $charactersPreparedValues.result[item.id]
        e.persist()
        const {target} = e
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && !$charactersPreparedValues.loading && !!config.next) {
            // API call (to load more data..........)
            const params = {
                params: {
                    ...initialParams,
                    offset: config.nextOffset,
                    search: search[item.id] || ''
                }
            }
            getPreparedCharacters(item.id, params)
        }
    }

    const onSearch = (e, item) => {
        const searchValues = {...search}
        const params = {
            clear: true,
            params: {
                ...initialParams,
                search: e
            }
        }
        if (e.length > 2) {
            searchValues[item.id] = e
        } else {
            delete searchValues[item.id]
        }
        setSearch(searchValues)
        getPreparedCharacters(item.id, params)
    }

    const generateApiData = (character_id, value, type = null, id = null) => ({
        character_id: character_id,
        value_prepared: value,
        type,
        id
    })

    const generatedData = ({field, multi_values, id}, valueData) => {
        const fetchedData = $offeringParams.result
        let preData = [...preparedData]
        preData = preData.filter(item => item.character_id !== id)
        let data = {}
        let removeData = []
        if (field === CHARACTER_FIELDS[1]) {
            if (multi_values) {
                if (valueData.length > 0) {
                    if (fetchedData && fetchedData[id]) {
                        const custom_value = fetchedData[id].custom_value
                        if (custom_value) {
                            const createdDiff = arrayDiff(custom_value, valueData) || []
                            const deletedDiff = arrayDiff(custom_value, valueData, true) || []
                            data = []
                            if (createdDiff.length > 0) {
                                for (let i = 0; i < createdDiff.length; i++) {
                                    data.push(generateApiData(id, createdDiff[i].value, 'create'))
                                }
                            }

                            if (deletedDiff.length > 0) {
                                for (let i = 0; i < deletedDiff.length; i++) {
                                    removeData.push(generateApiData(id, null, 'delete', deletedDiff[i].id))
                                }
                            }
                        } else {
                            data = []
                            for (let i = 0; i < valueData.length; i++) {
                                data.push(generateApiData(id, valueData[i].value, 'create'))
                            }
                        }
                    } else {
                        data = []
                        for (let i = 0; i < valueData.length; i++) {
                            data.push(generateApiData(id, valueData[i].value, 'create'))
                        }
                    }
                } else {
                    if (fetchedData && fetchedData[id]) {
                        const custom_value = fetchedData[id].custom_value
                        if (custom_value) {
                            data = []
                            for (let i = 0; i < custom_value.length; i++) {
                                data.push(generateApiData(id, null, 'delete', custom_value[i].id))
                            }
                        } else {
                            data = generateApiData(id, null, 'delete', fetchedData[id].id)
                        }
                    } else {
                        data = generateApiData(id, null)
                    }
                }
            } else {
                if (fetchedData && fetchedData[id]) {
                    const custom_value = fetchedData[id].custom_value
                    if (custom_value) {
                        if (valueData) {
                            if (custom_value.value === valueData.value) {
                                data = generateApiData(id, valueData.value)
                            } else {
                                data = generateApiData(id, custom_value.value, 'update', custom_value.id)
                            }
                        } else {
                            data = generateApiData(id, valueData, 'delete', custom_value.id)
                        }
                    } else {
                        data = generateApiData(id, valueData ? valueData.value : null, valueData ? 'update' : 'delete', fetchedData[id].id)
                    }
                } else {
                    data = generateApiData(id, valueData ? valueData.value : null, valueData ? 'create' : null)
                }
            }
        } else {
            data = {
                character_id: id,
                value_custom: valueData,
            }
            if (fetchedData[id]) {
                data.type = 'update'
                data.id = fetchedData[id].id
            } else {
                data.type = 'create'
            }
        }

        if (Array.isArray(data)) {
            preData = [...preData, ...data]
            if (removeData.length > 0) {
                preData = [...preData, ...removeData]
            }
            setPreparedData(preData)
        } else {
            if (Object.values(data).length > 0) {
                preData.push(data)
                setPreparedData(preData)
            }
        }
    }

    const handleChange = (item, value) => {
        generatedData(item, value)
        formik.setFieldValue(item.name, value)
    }

    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            if (offering_param_id) {
                offeringDetailMount(offering_param_id)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [offering_param_id])

    useEffect(() => {
        getCategoryCharacters({limit: 50, offset: 0})
    }, [getCategoryCharacters])

    useEffect(() => {
        generateCharacsOption()
    }, [generateCharacsOption])

    useEffect(() => {
        if (offering_param_id) {
            offeringParamsMount(offering_param_id)
        }
    }, [offering_param_id])

    const getColors = useCallback((params) => {
        colorsMount(params)
    }, [])

    const loadMoreColor = useCallback((e) => {
        const {result: {nextOffset, next}, loading} = $colorList
        e.persist()
        const {target} = e
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loading && !!next) {
            const data = {
                params: {
                    ...initialParams,
                    offset: nextOffset
                }
            }
            getColors(data)
        }
    }, [$colorList, getColors])

    useEffect(() => {
        if (formParams.findIndex(item => item.field === CHARACTER_FIELDS['11']) !== -1) {
            const data = {
                clear: true,
                params: {
                    ...initialParams
                }
            }

            if (searchColor.length > 2) {
                data['params']['search'] = searchColor
            } else {
                delete data['params']['search']
            }
            getColors(data)
        }
    }, [formParams, getColors, searchColor])

    return {formik, formParams, onSearch, loadMore, handleChange, loadMoreColor, setSearchColor, searchColor}
}