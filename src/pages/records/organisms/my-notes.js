import React, {useState} from 'react'
import {useNotes} from '../../../hooks/order'
import {AntTable, TableLink, TableTitle} from '../../../ui/atoms'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../models/order-models'
import {CircularProgress} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {ShortAccountCard} from '../../../components/card'
import moment from 'moment'
import {truncateString} from '../../../utils/stringUtils'
import {getOrderStatus} from '../../../utils/accountUtils'
import {IconBox} from '../../../UIComponents/global-styles'
import {QrCodeUI, TableClose} from '../../../ui/atoms/table'
import {AlertCircleFillSvg, CloseSvg} from '../../../media'
import {OrderQrCodeModal} from '../maleculas'
import {QrCodeSvg} from '../../../media/qr-code'
import {Modal} from '../../../components/modal'

export const MyNotes = () => {
    const {$ordersList: {data, loading}} = useStore($orderModel)
    const {t} = useTranslation()
    const {updateOrder, handleShowQrCode} = useNotes()
    const [item, setItem] = useState(null)

    const columns = [
        {
            title: t('seller'),
            dataIndex: 'org',
            key: 'org',
            render: (org, {id}) => (
                <TableLink to={`/records/${id}`}>
                    <ShortAccountCard
                        imgUrl={org.logo}
                        imgSize={40}
                        name={org.name}
                        text={org.category.name}
                        truncateLength={40}
                        isOfficial={org.is_official}
                    />
                </TableLink>
            ),
        },
        {
            title: t('date_and_time'),
            dataIndex: 'date',
            key: 'date',
            render: (date, {id}) => (
                <TableLink color='var(--dark-basic)' to={`/records/${id}`}>
                    {moment(date).format('DD.MM.YYYY HH:mm')}
                </TableLink>
            ),
            width: 160
        },
        {
            title: t('specialist'),
            dataIndex: 'specialist',
            key: 'specialist',
            render: (specialist, {id}) => (
                <TableLink color='var(--dark-basic)' to={`/records/${id}`}>
                    {truncateString(specialist.full_name, 16)}
                </TableLink>
            ),
            width: 160
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: 'status',
            render: (status, {id}) => (
                <TableLink to={`/records/${id}`}>
                    <span
                        style={{
                            color: getOrderStatus(status).color,
                            textTransform: 'lowercase',
                            whiteSpace: 'nowrap'
                        }}>
                        {t(getOrderStatus(status).title)}
                    </span>
                </TableLink>
            ),
            width: 160
        },
        {
            title: t('qrcode'),
            dataIndex: 'qrcodeBase64',
            key: 'qrcodeBase64',
            render: (qrcodeBase64, data) => (
                <TableTitle>
                    <QrCodeUI>
                        <IconBox
                            style={{alignItems: 'flex-start'}}
                            color='var(--dark-basic)'
                            onClick={() => handleShowQrCode(data, setItem)}
                        >
                            {
                                !data.rates && data.status === 5
                                && <span><AlertCircleFillSvg/></span>
                            }
                            <QrCodeSvg/>
                        </IconBox>
                        {
                            data.status === 0
                            && (
                                <TableClose onClick={() => updateOrder(data.id)}>
                                    <CloseSvg/>
                                </TableClose>
                            )
                        }
                    </QrCodeUI>
                </TableTitle>
            ),
            width: 80
        },
    ]

    return (
        <>
            <Modal
                setModalIsOpen={() => setItem(null)}
                modalIsOpen={!!item}
                title={t('order_qr_code')}
                component={<OrderQrCodeModal data={item}/>}
                width={400}
            />
            <AntTable
                columns={columns}
                dataSource={data}
                loading={{spinning: loading, indicator: <CircularProgress size={24}/>}}
            />
        </>
    )
}