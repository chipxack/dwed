import React from 'react'
import QrReader from 'react-web-qr-reader'
import {QrCodeScanCamera} from '../../account-job/atoms'

export const QRCodeScanFromWebCam = ({handleValidate, isReading}) => {
    const handleScan = result => {
        if (result && !isReading) {
            handleValidate(result.data)
        }
    }

    const handleError = (error) => {
        console.log(error)
    }

    return (
        <QrCodeScanCamera>
            <QrReader
                delay={100}
                onError={handleError}
                onScan={handleScan}
            />
        </QrCodeScanCamera>
    )
}