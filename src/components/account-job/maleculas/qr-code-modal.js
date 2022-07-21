import React, {useState} from 'react'
import {QRCodeActionWrapper, QRCodeButton} from '../atoms'
import {ImageFillSvg} from '../../../media'
import {CameraSvg} from '../../../media/camera'
import {QRCodeScanFromPhoto, QRCodeScanFromWebCam} from '../../qr-code-reader'
import {useTranslation} from 'react-i18next'
import {useQRCodeRead} from '../../../hooks/job'

export const QRCodeModal = ({onClose, modalIsOpen, jobId}) => {
    const [type, setType] = useState('webcam')
    const {t} = useTranslation()
    const {handleValidate, isReading} = useQRCodeRead({onClose, jobId})

    const handleClick = (type) => {
        setType(type)
    }

    return (
        <>
            <QRCodeActionWrapper>
                <QRCodeButton
                    activestatus={type && type === 'webcam' ? 1 : 0}
                    onClick={() => handleClick('webcam')}
                    size='lg'
                >
                    <CameraSvg/>
                    {t('camera')}
                </QRCodeButton>
                <QRCodeButton
                    size='lg'
                    activestatus={type && type === 'photo' ? 1 : 0}
                    onClick={() => handleClick('photo')}
                >
                    <ImageFillSvg/>
                    {t('photo')}
                </QRCodeButton>
            </QRCodeActionWrapper>
            {
                type && modalIsOpen
                && (
                    <>
                        {
                            type === 'webcam'
                                ? <QRCodeScanFromWebCam isReading={isReading} handleValidate={handleValidate}/>
                                : <QRCodeScanFromPhoto isReading={isReading} handleValidate={handleValidate}/>
                        }
                    </>
                )
            }
        </>
    )
}
