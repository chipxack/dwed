import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {CouponCard} from '../atoms'
import {Title} from '../../../UIComponents/typography'
import {InputUI} from '../../../UIComponents/inputs'
import {useTranslation} from 'react-i18next'
import moment from 'moment'
import {InfinitySvg} from '../../../media/infinity'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import {ActiveColor, ColorHex} from '../../../UIComponents/global-styles'
import {appColors} from '../../../constants/theme'
import {CheckLineSvg} from '../../../media'
import {NavLink, useLocation, useParams} from 'react-router-dom'
import {URL_KEYS, URL_VALUES} from '../../../constants'
import {useUrlParams} from '../../../hooks/common'
import {CouponOfferingList} from './coupon-offering-list'
import {CouponGroupList} from './coupon-group-list'
import {ButtonUI} from '../../../ui/atoms'
import {useOrgCoupon, useOrgCouponForm} from '../../../hooks/settings'
import {useOrgSpecialist} from '../../../hooks/org'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'

export const CouponForm = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {coupon_id} = useParams()
    const {formik} = useOrgCouponForm(coupon_id)
    const {onSpecSearch, loadMoreSpec} = useOrgSpecialist(currentProfile?.slug_name)
    useOrgCoupon({slug: currentProfile?.slug_name, id: coupon_id})
    const {t} = useTranslation()
    const {pathname} = useLocation()
    const {urlData} = useUrlParams()
    const tab_type = urlData[URL_KEYS.TAB]
    const options = [
        {
            value: 1,
            label: t('unlimited')
        },
        {
            value: 2,
            label: t('limited')
        }
    ]

    const handleChangePercent = useCallback((value) => {
        if (value > 100) {
            formik.setFieldValue('offerings_discount', 100)
        } else if (value < 0) {
            formik.setFieldValue('offerings_discount', 1)
        } else {
            formik.setFieldValue('offerings_discount', value)
        }
    }, [formik])

    const getCouponRage = useCallback(() => {
        const fromDate = formik.values.from_date
        const toDate = formik.values.to_date

        if (!!fromDate && !toDate) {
            return (
                <Row align='middle' gutter={4} wrap={false}>
                    <Col>
                        {`${moment(fromDate).format('YYYY-MM-DD')}`}
                    </Col>
                    <Col>
                        -
                    </Col>
                    <Col style={{display: 'flex', alignItems: 'center'}}>
                        <InfinitySvg/>
                    </Col>
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

    }, [formik])


    const handleValidate = useCallback((field, value) => {
        const time = new Date(moment(value).format('YYYY-MM-DD')).getTime()
        const toDate = formik.values.to_date && new Date(formik.values.to_date).getTime()
        const fromDate = formik.values.from_date && new Date(formik.values.from_date).getTime()

        if (field === 'from_date') {
            if (!!toDate && time > toDate) {
                formik.setFieldValue('to_date', null)
            }
            formik.setFieldValue(field, moment(value).format('YYYY-MM-DD'))
        }

        if (field === 'to_date') {
            if (!!fromDate && fromDate > time) {
                formik.setFieldValue('to_date', null)
            } else {
                formik.setFieldValue(field, moment(value).format('YYYY-MM-DD'))
            }
        }
    }, [formik])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row gutter={[0, 32]} style={{width: '100%'}}>
                <Col span={24}>
                    <Row gutter={24} wrap={false}>
                        <Col>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <CouponCard color={formik.values.background_color}>
                                        <Title weight={400} className='coupon-name'>
                                            {formik.values.title.length > 0 ? formik.values.title : '-'}
                                        </Title>
                                        <Title weight={600} className='coupon-percent'>
                                            {`${formik.values.offerings_discount}% off`}
                                        </Title>
                                        <Title weight={400} className='coupon-offerings'>
                                            {
                                                formik.values.limit_per_user || t('unlimited')
                                            }
                                        </Title>
                                        <Title weight={400} className='coupon-range'>
                                            {getCouponRage()}
                                        </Title>
                                    </CouponCard>
                                </Col>
                                <Col span={24}>
                                    <Title
                                        weight={400}
                                        color={'var(--grey-basic)'}
                                        style={{marginBottom: 12}}
                                    >
                                        {t('select-coupon-color')}
                                    </Title>
                                    <Splide
                                        options={{
                                            rewind: true,
                                            arrows: false,
                                            pagination: false,
                                            perPage: 8,
                                            keyboard: false
                                        }}
                                    >
                                        {
                                            appColors.map((item, idx) => (
                                                <SplideSlide className='color-' key={`${idx + 1}`}>
                                                    <ColorHex
                                                        onClick={() => formik.setFieldValue('background_color', item)}
                                                        color={item} size={32}
                                                    >
                                                        {
                                                            formik.values.background_color === item && (
                                                                <ActiveColor>
                                                                    <CheckLineSvg/>
                                                                </ActiveColor>
                                                            )
                                                        }
                                                    </ColorHex>
                                                </SplideSlide>
                                            ))
                                        }
                                    </Splide>
                                </Col>
                            </Row>
                        </Col>
                        <Col flex={1}>
                            <Row gutter={[0, 16]}>
                                <Col span={24}>
                                    <InputUI
                                        variant='standard'
                                        name='title'
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        label={t('coupon_name')}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.title && formik.errors.title}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        type='number'
                                        variant='standard'
                                        name='offerings_discount'
                                        value={formik.values.offerings_discount}
                                        onChange={(e) => handleChangePercent(Number(e.target.value))}
                                        label={`${t('discount')}(%)`}
                                        step='.01'
                                        min='0.1'
                                        max='100'
                                        error={formik.touched.offerings_discount && formik.errors.offerings_discount}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <InputUI
                                                variant='standard'
                                                inputType='keyboardDate'
                                                name='from_date'
                                                value={formik.values.from_date}
                                                onChange={(value) => handleValidate('from_date', value)}
                                                label={t('from')}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.from_date && formik.errors.from_date}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <InputUI
                                                variant='standard'
                                                inputType='keyboardDate'
                                                name='to_date'
                                                value={formik.values.to_date}
                                                onChange={(value) => handleValidate('to_date', value)}
                                                label={t('to')}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <InputUI
                                        inputType='select'
                                        variant='standard'
                                        value={formik.values.limit_per_user === null ? 1 : 2}
                                        onChange={(e) => formik.setFieldValue('limit_per_user', e.target.value === 1 ? null : 1)}
                                        label={t('limit_quantity')}
                                        options={options}
                                    />
                                </Col>
                                {
                                    formik.values.limit_per_user !== null && (
                                        <Col span={24}>
                                            <InputUI
                                                type='number'
                                                variant='standard'
                                                name='limit_per_user'
                                                value={formik.values.limit_per_user || ''}
                                                onChange={formik.handleChange}
                                                label={t('limit_quantity')}
                                            />
                                        </Col>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <NavLink
                                isActive={() => !tab_type || (tab_type && tab_type === URL_VALUES.OFFERINGS)}
                                to={{pathname, search: `${URL_KEYS.TAB}=${URL_VALUES.OFFERINGS}`}}
                                className='coupon-link'
                            >
                                {t(URL_VALUES.OFFERINGS)}
                            </NavLink>
                        </Col>
                        <Col>
                            <NavLink
                                isActive={() => tab_type && tab_type === URL_VALUES.GROUPS}
                                to={{pathname, search: `${URL_KEYS.TAB}=${URL_VALUES.GROUPS}`}}
                                className='coupon-link'
                            >
                                {t('offering_groups')}
                            </NavLink>
                        </Col>
                        <Col span={24}>
                            {
                                (!tab_type || (tab_type && tab_type === URL_VALUES.OFFERINGS)) && (
                                    <CouponOfferingList
                                        formik={formik}
                                        onSpecSearch={onSpecSearch}
                                        loadMoreSpec={loadMoreSpec}
                                    />
                                )
                            }
                            {
                                tab_type && tab_type === URL_VALUES.GROUPS && (
                                    <CouponGroupList
                                        formik={formik}
                                        onSpecSearch={onSpecSearch}
                                        loadMoreSpec={loadMoreSpec}
                                    />
                                )
                            }
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <ButtonUI htmlType='submit' style={{marginLeft: 'auto'}} size='lg'>
                        {t('save')}
                    </ButtonUI>
                </Col>
            </Row>
        </form>
    )
}