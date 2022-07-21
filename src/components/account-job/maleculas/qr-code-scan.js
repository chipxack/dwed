import React, {useState} from 'react'
import {QRCodeModal} from './qr-code-modal'
import {useTranslation} from 'react-i18next'
import {Modal} from '../../modal'
import {Space} from 'antd'
import {QrIcon} from '../../../icons/qr'
import {IconBox} from '../../../UIComponents/global-styles'

export const SpecialistQrCodeScan = ({jobId}) => {
    const {t} = useTranslation()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                title={t('scan_qr_code')}
                setModalIsOpen={() => setModalIsOpen(false)}
                component={(
                    <QRCodeModal jobId={jobId} modalIsOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
                )}
            />
            <Space style={{cursor: 'pointer'}} onClick={() => setModalIsOpen(true)}>
                <IconBox>
                    <QrIcon />
                </IconBox>
                <IconBox>
                    {t('read_qrcode')}
                </IconBox>
            </Space>
        </>
    )
}
