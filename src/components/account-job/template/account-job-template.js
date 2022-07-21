import React, {useCallback, useState} from 'react'
import {useParams} from 'react-router-dom'
import {TemplateList} from '../../account-job-templates/organisms/template-list'
import {Modal} from '../../modal'
import {TemplateForm} from '../../account-job-templates/organisms/template-form'
import {useTranslation} from 'react-i18next'
import {AccountJobList} from '../organims'

export const AccountJobTemplate = () => {
    const {t} = useTranslation()
    const {job_id} = useParams()
    const [showForm, setShowForm] = useState(false)
    const [templateId, setTemplateId] = useState(null)
    const handleEdit = useCallback((id) => {
        setTemplateId(id)
        setShowForm(true)
    }, [])

    const onClose = useCallback(() => {
        setTemplateId(false)
        setShowForm(false)
    }, [])

    return (
        <>
            <Modal
                title={t('Шаблоны')}
                modalIsOpen={showForm}
                setModalIsOpen={onClose}
                component={<TemplateForm
                    templateId={templateId}
                    spec_id={job_id}
                    setShowForm={() => setShowForm(false)}
                />}
                width="100%"
                style={{top: 32}}
                bodyStyle={{
                    minHeight: 'calc(100vh - 100px)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            />
            <AccountJobList/>
            <TemplateList edit handleEdit={handleEdit} setShowForm={setShowForm} spec_id={job_id} />
        </>
    )
}
