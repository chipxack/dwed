import React from 'react'
import {useStore} from 'effector-react'
import {$jobModel} from '../../../models/job-model'
import {Trans, useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'
import {NoteDescription, NoteDescriptionItem, NoteOfferingCol} from '../atoms'
import {StyledInputError} from '../../../UIComponents/inputs/atoms'
import {InputUI} from '../../../UIComponents/inputs'
import {Text} from '../../../UIComponents/typography'
import {IconBox} from '../../../UIComponents/global-styles'
import {CheckMarkSquareCheckedSvg, CheckMarkSquareUncheckedSvg} from '../../../media'
import {ButtonUI} from '../../../ui/atoms'

export const RecordForm = ({formik, checkAll, setCheckAll, loadingProgress, onClose}) => {
    const {$accountSpec: {data: specData}} = useStore($jobModel)
    const {t} = useTranslation()

    return (
        <form style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}} onSubmit={formik.handleSubmit}>
            <Row gutter={[24, 16]} style={{flexDirection: 'column', flexGrow: 1}}>
                <Col span={24} flex={1} style={{display: 'flex', flexDirection: 'column'}}>
                    <NoteDescription>
                        <NoteDescriptionItem>
                            <textarea
                                name='value'
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('enter_text')}
                            />
                        </NoteDescriptionItem>
                    </NoteDescription>
                    {
                        formik.touched.value && !!formik.errors.value
                        && (
                            <StyledInputError>
                                {formik.errors.value}
                            </StyledInputError>
                        )
                    }
                </Col>
                <Col span={24}>
                    <Row gutter={16} align='middle'>
                        <Col span={18}>
                            <InputUI
                                inputType='upload'
                                value={formik.values.file}
                                onChange={(file) => formik.setFieldValue('file', file)}
                            />
                        </Col>
                        <Col span={6}>
                            <Text style={{fontSize: 14}}>
                                {loadingProgress ? t('uploaded', {n: `${loadingProgress}%`}) : null}
                            </Text>
                        </Col>
                    </Row>
                </Col>
                <Col span='auto' style={{cursor: 'pointer'}}>
                    <Row
                        gutter={10}
                        onClick={() => formik.setFieldValue('isPublic', !formik.values.isPublic)}
                        style={{color: 'var(--primary-dwed)'}}
                    >
                        <Col span='auto'>
                            <IconBox className='add-note-public'>
                                {
                                    formik.values.isPublic
                                        ? <CheckMarkSquareCheckedSvg/>
                                        : <CheckMarkSquareUncheckedSvg/>
                                }
                            </IconBox>
                        </Col>
                        <Col span='auto'>
                            {t('information_is_publicly_available')}
                        </Col>
                        <Col span={24}>
                            <Text weight={500}>
                                <Trans i18nKey='information_public_sentence'>
                                    <span style={{color: 'var(--primary-dwed)'}}/>
                                    {{n: specData && specData.job ? specData.job.name : ''}}
                                </Trans>
                            </Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <NoteOfferingCol isActive={checkAll} onClick={() => setCheckAll(!checkAll)}>
                        {
                            checkAll
                                ? <CheckMarkSquareCheckedSvg/>
                                : <CheckMarkSquareUncheckedSvg/>
                        }
                        {t('apply_entry_to_all_offers')}
                    </NoteOfferingCol>
                </Col>
                <Col span={24}>
                    <Row gutter={24} justify='end'>
                        <Col span='auto'>
                            <ButtonUI
                                size='lg'
                                buttonstyle='link'
                                onClick={onClose}
                            >
                                {t('close')}
                            </ButtonUI>
                        </Col>
                        <Col span='auto'>
                            <ButtonUI
                                size='lg'
                                htmlType='submit'
                                disabled={formik.isSubmitting || (formik.touched.value && !!formik.errors.value)}
                                loading={formik.isSubmitting}
                            >
                                {t('save')}
                            </ButtonUI>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </form>
    )
}