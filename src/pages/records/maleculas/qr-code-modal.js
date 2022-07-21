import React, {useCallback, useRef} from 'react'
import {Col, Row} from 'antd'
import {ButtonGroup} from '../../../ui/atoms'
import {downloadURI} from '../../../utils/qrUtils'
import {OrderQRActionButton} from '../atoms'
import {useTranslation} from 'react-i18next'
import {DownloadSvg, PrinterSvg} from '../../../media'
import moment from 'moment'
import {toJpeg} from 'html-to-image'
import {useReactToPrint} from 'react-to-print'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'

export const OrderQrCodeModal = React.memo(({data}) => {
    const {t} = useTranslation()
    const ref = useRef(null)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    })

    const hStyle = {
        fontSize: 16,
    }

    const pStyle = {
        marginBottom: 0,
        fontSize: 14,
    }

    const handleDownload = useCallback(() => {
        if (ref) {
            toJpeg(ref.current, {backgroundColor: '#fff'})
                .then((dataUrl) => {
                    downloadURI(dataUrl, moment(new Date()).format('YYYY-MM-DD-HH-mm-ss'))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <div ref={ref} style={{textAlign: 'center', lineHeight: 1.1,}}>
                    <img style={{width: '85%', height: 'auto', marginBottom: 16}} src={data.qrcodeBase64} alt='qr-code'/>
                    <div>
                        <p style={pStyle}>
                            {t('organization')}
                        </p>
                        <h6 style={hStyle}>
                            {data.org.name}
                        </h6>
                        <p style={pStyle}>
                            {t('specialist')}
                        </p>
                        <h6 style={hStyle}>
                            {`${data.specialist.full_name}`}
                        </h6>
                        <p style={pStyle}>
                            {t('branch')}
                        </p>
                        <h6 style={hStyle}>
                            {`${data.specialist.spec_cat.name}`}
                        </h6>
                        <h6 style={hStyle}>
                            <span style={pStyle}>{t('date')}:</span>
                            {` ${moment(data.date).format('YYYY-MM-DD')} `}
                        </h6>
                        <h6 style={hStyle}>
                            <span style={pStyle}>{t('time')}:</span>
                            {` ${data.print_date}`}
                        </h6>
                        <h6 style={hStyle}>
                            <span style={pStyle}>{t('client')}:</span>
                            {` ${currentProfile?.name}`}
                        </h6>
                    </div>
                </div>
            </Col>
            <Col span={24}>
                <ButtonGroup>
                    <OrderQRActionButton size='lg' onClick={handleDownload}>
                        <DownloadSvg/>
                        {t('download')}
                    </OrderQRActionButton>
                    <OrderQRActionButton size='lg' onClick={handlePrint}>
                        <PrinterSvg/>
                        {t('print')}
                    </OrderQRActionButton>
                </ButtonGroup>
            </Col>
        </Row>
    )
})