import React, {useCallback, useState} from 'react'
import {RecordForm} from './record-form'
import {Col, Row} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {RecordTab, RecordTabItem} from '../atoms'
import {useTranslation} from 'react-i18next'
import {Templates} from '../../account-job-templates'
import {useNote} from '../../../hooks/job'

export const AddNoteModal = ({id, order_id, onClose, title, spec_id}) => {
    const {t} = useTranslation()
    const [showTemplates, setShowTemplates] = useState(false)
    const {formik, checkAll, setCheckAll, loadingProgress} = useNote({id, order_id, onClose})

    const onSelect = useCallback((text) => {
        formik.setFieldValue('value', text)
        setShowTemplates(false)
    }, [formik])

    return (
        <>
            <Row gutter={24} style={{marginBottom: 24}}>
                <Col>
                    <Title level={4}>
                        {title}
                    </Title>
                </Col>
            </Row>
            <RecordTab style={{marginBottom: 12}}>
                <RecordTabItem onClick={() => setShowTemplates(false)} active={!showTemplates}>
                    {t('description')}
                </RecordTabItem>
                <RecordTabItem onClick={() => setShowTemplates(true)} active={showTemplates}>
                    {t('templates')}
                </RecordTabItem>
            </RecordTab>
            {
                showTemplates
                    ? <Templates spec_id={spec_id} onSelect={onSelect}/>
                    : <RecordForm
                        onClose={onClose}
                        formik={formik}
                        checkAll={checkAll}
                        setCheckAll={setCheckAll}
                        loadingProgress={loadingProgress}
                    />
            }

        </>
    )
}