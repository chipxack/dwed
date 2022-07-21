import React, {Fragment, useMemo} from 'react'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {useJob} from '../../../hooks/job'
import {Col, Row, Space} from 'antd'
import {AccountJobItem} from '../maleculas'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'
import {Title} from '../../../UIComponents/typography'
import {TapeSvg} from '../../../media/tape'
import {IconBox} from '../../../UIComponents/global-styles'
import {useTranslation} from 'react-i18next'
import {SpecialistQrCodeScan} from '../maleculas/qr-code-scan'
import {Link, useLocation, useParams} from 'react-router-dom'

export const AccountJobList = () => {
    const {t} = useTranslation()
    useJob()
    const {job_id} = useParams()
    const {urlData} = useUrlParams()
    const {state} = useLocation()
    const {$profiles: {specialisms, currentProfile}} = useStore($accountModel)
    const jobId = job_id ? job_id : urlData[URL_KEYS.JOB_ID] || (state && state.jobId)

    const acceptedSpecialisms = useMemo(() => {
        return specialisms.filter(item => item.settings.accepted)
    }, [specialisms])

    const selectedJob = useMemo(() => {
        return jobId && specialisms.find(item => item.id === Number(jobId))
    }, [jobId, specialisms])

    return (
        <>
            {
                acceptedSpecialisms.length > 0 && (
                    <Row gutter={[16, 16]} style={{marginBottom: 24}}>
                        {
                            acceptedSpecialisms.map((item, idx) => (
                                (
                                    <Fragment key={idx + 1}>
                                        {
                                            item.settings.accepted
                                            && (
                                                <Col span={6}>
                                                    <AccountJobItem item={item} />
                                                </Col>
                                            )
                                        }
                                    </Fragment>
                                )
                            ))
                        }
                    </Row>
                )
            }
            <Row gutter={24} align="middle" style={{marginBottom: 24}}>
                <Col>
                    <Title level={5}>
                        {selectedJob?.name}
                    </Title>
                </Col>
                <Col style={{marginLeft: 'auto'}}>
                    <Link to={{
                        pathname: `/@${currentProfile.slug_name}/jobs/${jobId}/templates`,
                    }}>
                        <Space>
                            <IconBox>
                                <TapeSvg />
                            </IconBox>
                            <IconBox>
                                {t('templates')}
                            </IconBox>
                        </Space>
                    </Link>
                </Col>
                <Col>
                    <SpecialistQrCodeScan jobId={jobId} />
                </Col>
            </Row>
        </>

    )
}
