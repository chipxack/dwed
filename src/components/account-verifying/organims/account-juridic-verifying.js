import React from 'react'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'
import {AvatarUpload} from '../../image-upload'
import {useAccountJuridicVerifying} from '../../../hooks/settings'
import {InputUI} from '../../../UIComponents/inputs'
import {ButtonGroup, ButtonUI} from '../../../ui/atoms'
import {StyledInputError} from '../../../UIComponents/inputs/atoms'
import {PassportScan} from '../moleculas'

export const AccountJuridicVerifying = () => {
    const {t} = useTranslation()
    const {formik, handleChange, disabled} = useAccountJuridicVerifying()

    return (
        <form onSubmit={formik.handleSubmit}>
            <Title>
                {t('legal_data')}
            </Title>
            <Row gutter={[24, 24]}>
                <Col
                    span={24}
                    style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 8}}
                >
                    <AvatarUpload
                        imgUrl={formik.values.businessAva && formik.values.businessAva.stringUrl}
                        handleChange={(value) => handleChange('businessAva', value)}
                    />
                    <Title style={{color: 'var(--basic-dark)', marginTop: 10, marginBottom: 0, textTransform: 'unset'}}>
                        {t('business_ava')}
                    </Title>
                    {
                        formik.touched.businessAva
                        && <StyledInputError style={{marginTop: 4}}>{formik.errors.businessAva}</StyledInputError>
                    }
                </Col>
                <Col span={12}>
                    <InputUI
                        mask='aa'
                        hideErrorText
                        inputType='masked'
                        name='passport_series'
                        onBlur={formik.handleBlur}
                        label={t('passport_series')}
                        value={formik.values.passport_series}
                        error={formik.touched.passport_series && formik.errors.passport_series}
                        onChange={(e) => handleChange('passport_series', e.target.value)}
                    />
                </Col>
                <Col span={12}>
                    <InputUI
                        hideErrorText
                        name='passport_number'
                        onBlur={formik.handleBlur}
                        label={t('passport_number')}
                        value={formik.values.passport_number}
                        error={formik.touched.passport_number && formik.errors.passport_number}
                        onChange={(e) => handleChange('passport_number', e.target.value)}
                    />
                </Col>
                <Col span={24}>
                    {/*<Text size={14} weight={500} style={{marginBottom: 8}}>*/}
                    {/*    {t('upload_scan_or_passport_photo')}*/}
                    {/*</Text>*/}
                    {/*<SimpleImageUpload*/}
                    {/*    value={formik.values.passport_scan}*/}
                    {/*    onChange={(value) => handleChange('passport_scan', value)}*/}
                    {/*    error={formik.touched.passport_scan && formik.errors.passport_scan}*/}
                    {/*    onBlur={() => formik.setFieldTouched('passport_scan', true, true)}*/}
                    {/*/>*/}
                    <PassportScan
                        imgUrl={formik.values.passport_scan && formik.values.passport_scan.stringUrl}
                        handleChange={(value) => handleChange('passport_scan', value)}
                    />
                </Col>
                <Col span={24}>
                    <ButtonGroup style={{marginTop: 24, justifyContent: 'flex-end'}}>
                        <ButtonUI
                            buttonstyle='link'
                            size='lg'
                        >
                            {t('cancel')}
                        </ButtonUI>
                        <ButtonUI
                            size='lg'
                            htmlType='submit'
                            disabled={disabled()}
                            loading={formik.isSubmitting}
                        >
                            {t('continue')}
                        </ButtonUI>
                    </ButtonGroup>
                </Col>
            </Row>
        </form>
    )
}