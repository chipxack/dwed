import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react'
import {Col, Row} from 'antd'
import {CouponCard} from '../atoms'
import {Title} from '../../../UIComponents/typography'
import moment from 'moment'
import {InfinitySvg} from '../../../media/infinity'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {IconBox, ShadowBox, ShadowBoxActions} from '../../../UIComponents/global-styles'
import {DotsVerticalIcon} from '../../../icons/dots'
import {EditIcon} from '../../../icons/edit'
import {EyeHideIcon, EyeShowIcon} from '../../../icons/eye'
import {TrashIcon} from '../../../icons/trash'
import {useOutsideClicker} from '../../../hooks/common'
import {useHistory} from 'react-router-dom'
import {removeOrgCouponEvent, updateOrgCouponEvent} from '../../../models/organization-models'
import {UserAddIcon} from '../../../icons/user'
import {Modal} from '../../../components/modal'
import {CouponReceiversModalContent} from './coupon-receivers-modal'

export const CouponItem = ({item}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {push} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {t} = useTranslation()
    const actionsRef = useRef(null)
    const [show, setShow] = useState(false)
    const {clicked} = useOutsideClicker(actionsRef)

    const couponRange = useMemo(() => {
        const fromDate = item.from_date
        const toDate = item.to_date

        if (!!fromDate && !toDate) {
            return (
                <Row align='middle' gutter={4} wrap={false}>
                    <Col>{`${moment(fromDate).format('YYYY-MM-DD')}`}</Col>
                    <Col>-</Col>
                    <Col style={{display: 'flex', alignItems: 'center'}}><InfinitySvg/></Col>
                </Row>
            )
        }

        if (!!fromDate && !!toDate) {
            return (
                <Row align='middle' gutter={4} wrap={false}>
                    <Col>{`${moment(fromDate).format('YYYY-MM-DD')}`}</Col>
                    <Col>-</Col>
                    <Col>{`${moment(toDate).format('YYYY-MM-DD')}`}</Col>
                </Row>
            )
        }
        return '-'

    }, [item.from_date, item.to_date])

    const actsOn = useMemo(() => {
        if (item.offerings_reverse) {
            if (item.offerings.length === 0 && item.offer_groups.length === 0) {
                return t('for_all_offerings')
            } else {
                return t('fro_all_offerings_except', {n: item.offerings_count})
            }
        } else {
            return t('act_offerings_count', {n: item.offerings_count})
        }
    }, [t, item])

    const couponStatus = useMemo(() => {
        switch (item.status) {
            case 1:
                return {
                    title: t('valid'),
                    color: 'var(--info-dwed)'
                }
            case -1:
                return {
                    title: t('not_valid'),
                    color: 'var(--danger-dwed)'
                }
            case -2:
                return {
                    title: t('expired'),
                    color: 'var(--danger-dwed)'
                }
            default:
                return {
                    title: t('valid'),
                    color: 'var(--info-dwed)'
                }
        }
    }, [t, item.status])

    const boxActions = [
        {
            id: 'edit',
            onClick: () => {
                push(`/settings/coupon/edit/${item.id}`)
            },
            icon: <EditIcon/>
        },
        item.status !== -2 &&
        {
            id: item.status === 1 ? 'make_inactive' : 'make_active',
            onClick: () => {
                updateOrgCouponEvent({
                    organization: currentProfile?.slug_name,
                    data: {
                        status: item.status === 1 ? -1 : 1
                    },
                    id: item.id
                })
            },
            icon: item.status === 1 ? <EyeHideIcon/> : <EyeShowIcon/>
        },
        {
            id: 'remove',
            onClick: () => {
                removeOrgCouponEvent({
                    organization: currentProfile?.slug_name,
                    id: item.id
                })
            },
            icon: <TrashIcon/>
        }
    ]

    useEffect(() => {
        if (clicked) {
            setShow(false)
        }
    }, [clicked])


    return (
        <>
            <Modal
                title={t('send_coupon')}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                component={<CouponReceiversModalContent coupon_id={item.id}/>}
                width={700}
            />
            <ShadowBox>
                <IconBox className='box-actions' ref={actionsRef} onClick={() => setShow(!show)}>
                    <div className='box-icon'>
                        <DotsVerticalIcon/>
                        <ShadowBoxActions show={show}>
                            {
                                boxActions.map(item => (
                                    <Fragment key={item.id}>
                                        {
                                            !!item && (
                                                <div
                                                    className='box-action'
                                                    style={{color: item.id === 'remove' && 'var(--danger-dwed)'}}
                                                    onClick={item.onClick}
                                                >
                                                    <IconBox
                                                        className='action-icon'
                                                        color={item.id === 'remove' ? 'var(--danger-dwed)' : 'var(--dark-basic)'}
                                                    >
                                                        {item.icon}
                                                    </IconBox>
                                                    {t(item.id)}
                                                </div>
                                            )
                                        }
                                    </Fragment>
                                ))
                            }

                        </ShadowBoxActions>
                    </div>
                </IconBox>
                <IconBox className='add-users-to-coupon' onClick={() => setModalIsOpen(true)}>
                    <UserAddIcon/>
                </IconBox>
                <Row gutter={[16, 24]} wrap={false} align='middle'>
                    <Col>
                        <CouponCard color={item.background_color}>
                            <Title weight={400} className='coupon-name'>
                                {item.title}
                            </Title>
                            <Title weight={600} className='coupon-percent'>
                                {`${item.offerings_discount}% off`}
                            </Title>
                            <Title weight={400} className='coupon-offerings'>
                                {
                                    item.limit_per_user || t('unlimited')
                                }
                            </Title>
                            <Title weight={400} className='coupon-range'>
                                {couponRange}
                            </Title>
                        </CouponCard>
                    </Col>
                    <Col flex={1}>
                        <Row gutter={[12, 12]}>
                            <Col span={8}>
                                <Title color='var(--grey-basic)'>
                                    {t('organization')}:
                                </Title>
                            </Col>
                            <Col span={16}>
                                <Title weight={400}>
                                    {currentProfile?.name}
                                </Title>
                            </Col>
                            <Col span={8}>
                                <Title color='var(--grey-basic)'>
                                    {t('acts_on')}:
                                </Title>
                            </Col>
                            <Col span={16}>
                                <Title weight={400}>
                                    {actsOn}
                                </Title>
                            </Col>
                            <Col span={8}>
                                <Title color='var(--grey-basic)'>
                                    {t('restriction')}:
                                </Title>
                            </Col>
                            <Col span={16}>
                                <Title weight={400}>
                                    {
                                        item.limit_per_user || t('unlimited')
                                    }
                                </Title>
                            </Col>
                            <Col span={8}>
                                <Title color='var(--grey-basic)'>
                                    {t('status')}:
                                </Title>
                            </Col>
                            <Col span={16}>
                                <Title weight={400} color={couponStatus.color}>
                                    {couponStatus.title}
                                </Title>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ShadowBox>
        </>
    )
}
