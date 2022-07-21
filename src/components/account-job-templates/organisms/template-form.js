import React, {useEffect, useState} from 'react'
import {Col, Row} from 'antd'
import {ButtonUI} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {useFormik} from 'formik'
import {InputUI} from '../../../UIComponents/inputs'
import * as Yup from 'yup'
import specialism from '../../../service/specialism'
import {NoteDescription, NoteDescriptionItem} from '../../account-job/atoms'
import {StyledInputError} from '../../../UIComponents/inputs/atoms'
import {$jobModel, orgSpecSavedCommentsListMount, orgSpecSavedCommentsMount} from '../../../models/job-model'
import {useStore} from 'effector-react'

export const TemplateForm = ({setShowForm, spec_id, templateId}) => {
    const {t} = useTranslation()
    const [initialValues, setInitialValues] = useState({name: '', text: ''})
    const {$spcSaveComments: {data}} = useStore($jobModel)

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('required_field')),
        text: Yup.string().required(t('required_field'))
    })

    const formik = useFormik({
        validationSchema,
        enableReinitialize: true,
        initialValues,
        onSubmit(values, {setSubmitting, resetForm}) {
            const params = {
                specialism_id: spec_id,
                data: values
            }
            if(templateId) {
                params.id = templateId
                specialism.updateOrgSpecSavedComments(params)
                    .then((res) => {
                        if(res) {
                            const data = {
                                specialism_id: spec_id,
                                clear: true,
                                params: {
                                    limit: 10,
                                    offset: 0,
                                },
                            }
                            orgSpecSavedCommentsListMount(data)
                            setShowForm()
                        }
                    })
                    .finally(() => setSubmitting(false))
            }else {
                specialism.createOrgSpecSavedComments(params)
                    .then((res) => {
                        resetForm()
                        const data = {
                            specialism_id: spec_id,
                            clear: true,
                            params: {
                                limit: 10,
                                offset: 0,
                            },
                        }
                        orgSpecSavedCommentsListMount(data)
                    })
                    .finally(() => setSubmitting(false))
                    .catch(() => {
                        setSubmitting(false)
                    })
            }
        }
    })

    useEffect(() => {
        if(templateId && Object.values(data).length > 0) {
            setInitialValues({
                name: data.name,
                text: data.text
            })
        }
    }, [data, templateId])

    useEffect(() => {
        if(templateId && spec_id) {
            orgSpecSavedCommentsMount({specialism_id: spec_id, id: templateId})
        }
    }, [templateId, spec_id])

    return (
        <form style={{display: 'flex', flexDirection: 'column', flex: 1}} onSubmit={formik.handleSubmit}>
            <Row gutter={[0, 16]} style={{flexDirection: 'column', flex: 1}}>
                <Col span={24}>
                    <InputUI
                        name='name'
                        label={t('template_name')}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name}
                    />
                </Col>
                <Col span={24} style={{display: 'flex', flexDirection: 'column'}} flex={1}>
                    <NoteDescription>
                        <NoteDescriptionItem>
                            <textarea
                                name='text'
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('enter_text')}
                            />
                            {
                                formik.touched.text && <StyledInputError>{formik.errors.text}</StyledInputError>
                            }
                        </NoteDescriptionItem>
                    </NoteDescription>
                </Col>
                <Col span={24}>
                    <Row gutter={24} justify='end'>
                        <Col>
                            <ButtonUI size='lg' onClick={setShowForm} buttonstyle='link'>
                                {t('go_back')}
                            </ButtonUI>
                        </Col>
                        <Col>
                            <ButtonUI htmlType='submit' size='lg'>
                                {t('save')}
                            </ButtonUI>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}
