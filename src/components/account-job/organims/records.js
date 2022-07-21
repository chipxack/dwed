import React, {useCallback, useState} from 'react'
import {CalendarFilter, RequestHeading} from '../atoms'
import {AntTable, TableTitle} from '../../../ui/atoms'
import {CircularProgress} from '@material-ui/core'
import {useStore} from 'effector-react'
import {$jobModel} from '../../../models/job-model'
import {useTranslation} from 'react-i18next'
import {truncateString} from '../../../utils/stringUtils'
import {CalendarSvg} from '../../../media/calendar'
import {Title} from '../../../UIComponents/typography'
import {Modal} from '../../modal'
import {RecordModal} from '../maleculas'
import moment from 'moment'

export const RequestRecords = () => {
    const {$records: {loading, data}} = useStore($jobModel)
    const {t} = useTranslation()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [record, setRecord] = useState(null)

    const handleClick = useCallback((id) => {
        setModalIsOpen(true)
        const item = data.find(x => x.id === id)
        if (item) {
            setRecord(item)
        }
    }, [data])

    const onClose = () => {
        setModalIsOpen(false)
        setRecord(null)
    }

    const columns = [
        {
            title: (
                <CalendarFilter style={{display: 'flex', alignItems: 'center'}}>
                    {t('date_and_time')}
                    <CalendarSvg/>
                </CalendarFilter>
            ),
            dataIndex: 'conclusion_date',
            key: 'conclusion_date',
            render: (conclusion_date, {id}) => (<TableTitle onClick={() => handleClick(id)}>
                {moment(conclusion_date).format('DD/MM/YYYY HH:mm')}
            </TableTitle>),
            width: 150
        },
        {
            title: t('seller'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering, {id}) => (
                <TableTitle onClick={() => handleClick(id)}>
                    {truncateString(offering.org.name, 35)}
                </TableTitle>
            ),
        },
        {
            title: t('specialist'),
            dataIndex: 'responsible',
            key: 'responsible',
            render: (responsible, {id}) => (
                <TableTitle onClick={() => handleClick(id)}>
                    {truncateString(responsible.user.full_name, 20)}
                </TableTitle>
            ),
            width: 160
        },
        {
            title: t('offerings'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering, {id}) => (
                <TableTitle onClick={() => handleClick(id)}>
                    {truncateString(offering.name, 40)}
                </TableTitle>
            ),
        },
    ]

    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={onClose}
                component={<RecordModal record={record}/>}
                width='100%'
                style={{top: 32}}
                bodyStyle={{
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            />
            <RequestHeading>
                <Title level={5}>
                    {t('records')}
                </Title>
            </RequestHeading>
            <AntTable
                columns={columns}
                dataSource={data}
                loading={{spinning: loading, indicator: <CircularProgress size={24}/>}}
            />
        </>
    )
}