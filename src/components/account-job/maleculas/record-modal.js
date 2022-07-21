import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {ArrowRightSvg} from '../../../media/arrow'
import {NoteDescription, NoteDescriptionItem, RecordModalWrapper} from '../atoms'
import {IconBox} from '../../../UIComponents/global-styles'
import {DownloadSvg, FileSvg} from '../../../media'

export const RecordModal = ({record}) => {

    const getFileInfo = useCallback((file) => {
        const fileWithExtname = file.match(/([^\/]+)\/?$/)[1]
        const pointIndex = fileWithExtname.indexOf('.')
        const filename = fileWithExtname.substring(0, pointIndex)
        const extname = fileWithExtname.substring(pointIndex + 1)

        return {fileWithExtname, filename, extname}
    }, [])

    const renderFile = useCallback(() => {
        if (record.conclusion_file) {
            const {extname, fileWithExtname} = getFileInfo(record.conclusion_file)

            switch (extname) {
                default :
                    return (
                        <Row wrap={false} gutter={12} align='middle'>
                            <Col>
                                <IconBox>
                                    <FileSvg/>
                                </IconBox>
                            </Col>
                            <Col flex={1}>
                                {fileWithExtname}
                            </Col>
                            <Col>
                                <a href={record.conclusion_file} download target='_blank' rel='noreferrer'>
                                    <IconBox>
                                        <DownloadSvg/>
                                    </IconBox>
                                </a>
                            </Col>
                        </Row>
                    )
            }
        }
    }, [record.conclusion_file, getFileInfo])

    return (
        <RecordModalWrapper>
            {
                record && (
                    <Row gutter={[0, 24]} style={{flexDirection: 'column', flexGrow: 1}}>
                        <Col span={24}>
                            <div style={{paddingRight: 32}}>
                                <Row gutter={6}>
                                    <Col>
                                        <Title level={5}>
                                            {record.offering.org.name}
                                        </Title>
                                    </Col>
                                    <Col>
                                        <ArrowRightSvg style={{color: 'var(--primary-dwed)'}}/>
                                    </Col>
                                    <Col>
                                        <Title level={5}>
                                            {record.responsible.user.full_name}
                                        </Title>
                                    </Col>
                                    <Col>
                                        <ArrowRightSvg style={{color: 'var(--primary-dwed)'}}/>
                                    </Col>
                                    <Col>
                                        <Title level={5}>
                                            {record.offering.name}
                                        </Title>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={24} flex={1} style={{display: 'flex', flexDirection: 'column'}}>
                            <NoteDescription>
                                <NoteDescriptionItem>
                                    <textarea value={record.conclusion} />
                                </NoteDescriptionItem>
                            </NoteDescription>
                        </Col>
                        <Col span={24}>
                            {renderFile()}
                        </Col>
                    </Row>
                )
            }
        </RecordModalWrapper>
    )
}