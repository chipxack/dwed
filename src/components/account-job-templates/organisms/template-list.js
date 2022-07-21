import React, {useCallback, useEffect, useState} from 'react'
import {$jobModel, orgSpecSavedCommentsListMount} from '../../../models/job-model'
import {AntTable, ButtonUI, TableTitle} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {CircularProgress} from '@material-ui/core'
import {PlusSvg} from '../../../media'
import {AccountDropdownMenuBtn} from '../../account-menu/atoms'
import {IconBox} from '../../../UIComponents/global-styles'
import {TrashSvg} from '../../../media/trash'
import {Checkbox, Col, Row, Space, Tooltip} from 'antd'
import specialism from '../../../service/specialism'
import {deleteConfirm} from '../../../UIComponents/modal'
import {EditIcon} from '../../../icons/edit'
import {TrashIcon} from '../../../icons/trash'

export const TemplateList = ({spec_id, setShowForm, onSelect, handleEdit}) => {
    const {$spcSavedCommentsList: {data, loading, result}} = useStore($jobModel)
    const {t} = useTranslation()
    const [limit] = useState(10)
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState(null)
    const [columns, setColumns] = useState([])

    const getList = useCallback(() => {
        const data = {
            specialism_id: spec_id,
            clear: true,
            params: {
                limit: limit,
                offset: page === 1 ? 0 : (page - 1) * limit,
            },
        }
        orgSpecSavedCommentsListMount(data)
    }, [page, spec_id, limit])

    useEffect(() => {
        getList()
    }, [getList])

    const onChange = useCallback((item) => {
        if (selected && selected.id === item.id) {
            setSelected(null)
        } else {
            setSelected(item)
        }
    }, [selected])

    const handleRemove = useCallback((id) => {
        const data = {
            specialism_id: spec_id,
            id,
        }
        specialism.removeOrgSpecSavedComments(data)
            .then((res) => {
                if (res) {
                    getList()
                }
            })
    }, [getList, spec_id])

    useEffect(() => {
        if (handleEdit) {
            setColumns([
                {
                    title: t('template_name'),
                    key: 'name',
                    dataIndex: 'name',
                    render: (name, item) => <TableTitle onClick={() => onChange(item)}>{name}</TableTitle>,
                },
                {
                    title: (
                        <Tooltip title={t('new')}>
                            <AccountDropdownMenuBtn onClick={setShowForm} size="sm">
                                <PlusSvg />
                            </AccountDropdownMenuBtn>
                        </Tooltip>
                    ),
                    key: '',
                    dataIndex: '',
                    render: (_, {id}) => <TableTitle>
                        <Space>
                            <IconBox className="has-hover" onClick={() => handleEdit(id)}>
                                <EditIcon />
                            </IconBox>
                            <IconBox
                                className="has-hover"
                                color="var(--danger-dwed)"
                                onClick={() => deleteConfirm(() => handleRemove(id))}
                            >
                                <TrashIcon />
                            </IconBox>
                        </Space>
                    </TableTitle>,
                    width: 49,
                },
            ])
        } else {
            setColumns([
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    render: (name, item) => <TableTitle>
                        <Checkbox
                            checked={selected && selected.id === item.id}
                            onChange={() => onChange(item)}
                        />
                    </TableTitle>,
                    width: 30,
                },
                {
                    title: t('template_name'),
                    key: 'name',
                    dataIndex: 'name',
                    render: (name, item) => <TableTitle onClick={() => onChange(item)}>{name}</TableTitle>,
                },
                {
                    title: (
                        <Tooltip title={t('new')}>
                            <AccountDropdownMenuBtn onClick={setShowForm} size="sm">
                                <PlusSvg />
                            </AccountDropdownMenuBtn>
                        </Tooltip>
                    ),
                    key: '',
                    dataIndex: '',
                    render: (_, {id}) => <TableTitle>
                        <IconBox className="has-hover" color="var(--danger-dwed)"
                                 onClick={() => deleteConfirm(() => handleRemove(id))}>
                            <TrashSvg />
                        </IconBox>
                    </TableTitle>,
                    width: 49,
                },
            ])
        }
    }, [handleEdit, handleRemove, onChange, t, setShowForm, selected])

    const handleAccept = useCallback(() => {
        if (selected) {
            onSelect(selected.text)
        }
    }, [selected, onSelect])

    return (
        <Row gutter={[0, 24]}>
            <Col span={24} style={{minHeight: 250}}>
                <AntTable
                    columns={columns}
                    loading={{spinning: loading, indicator: <CircularProgress size={24} />}}
                    dataSource={data.map(item => ({...item, key: item.id}))}
                    pagination={{
                        pageSize: limit,
                        onChange: (p) => setPage(p),
                        current: page,
                        hideOnSinglePage: true,
                        showLessItems: true,
                        showSizeChanger: false,
                        total: result.count,
                    }}
                />
            </Col>
            {
                !handleEdit && (
                    <Col span={24}>
                        <Row gutter={24} justify="end">
                            <Col>
                                <ButtonUI onClick={handleAccept} size="lg">
                                    {t('accept')}
                                </ButtonUI>
                            </Col>
                        </Row>
                    </Col>
                )
            }
        </Row>
    )
}
