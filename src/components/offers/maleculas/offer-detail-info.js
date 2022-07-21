import React from 'react'
import {Title} from '../../../UIComponents/typography'
import {useStore} from 'effector-react'
import {$offeringModel} from '../../../models/offering-model'
import {OfferingDetail, OfferingDetailItem, OfferingSeperate} from '../atoms'
import {useTranslation} from 'react-i18next'
import {UNITS_OF_MEASUREMENT} from '../../../helpers'
import {ButtonUI} from '../../../ui/atoms'
import {useHistory, useParams} from 'react-router-dom'
import {Col, Row} from 'antd'
import {ColorHex, IconBox} from '../../../UIComponents/global-styles'
import {useCreateCart} from '../../../hooks/order'
import {InfinitySvg} from '../../../media/infinity'
import {ShortAccountCard} from '../../card'
import {OfferDetailSkeleton} from './offer-detail-skeleton'

export const OfferDetailInfo = ({onClose}) => {
    const {$offerDetailStore: {data, skeleton}, $offeringParams} = useStore($offeringModel)
    const {handleChangeCart} = useCreateCart({fromDetail: true})
    const {offering_id} = useParams()
    const {push} = useHistory()
    const {t} = useTranslation()

    const getMeasurement = (unitId) => {
        if (unitId === undefined || unitId === null) {
            return ''
        } else {
            const unitInfo = UNITS_OF_MEASUREMENT.find(item => item.value === unitId)
            return unitInfo ? t(unitInfo.label) : ''
        }
    }

    const colorParams = $offeringParams.data.filter(item => item.character.character_type === 11 && item.value)

    const getSellerInfo = (item) => {
        let obj = {}
        if (item.user) {
            obj = {
                name: item.user.name,
                text: item.user.main_cat.name,
                imgUrl: item.user.avatar,
                is_official: item.user.is_official,
                path: `/@${item.user.username}/offerings`
            }
        }

        if (item.org) {
            obj = {
                name: item.org.name,
                text: item.org.category.name,
                imgUrl: item.org.logo,
                is_official: item.org.is_official,
                redirectPath: `/${item.org.slug_name}/offerings`
            }
        }
        return obj
    }

    const handleClick = (item) => {
        push(getSellerInfo(item).redirectPath)
        onClose()
    }

    return (
        <>
            {
                skeleton === false && Object.values(data).length > 0
                && (
                    <OfferingDetail>
                        <OfferingSeperate>
                            {
                                !offering_id
                                && (
                                    <OfferingDetailItem onClick={() => handleClick(data)}>
                                        <ShortAccountCard
                                            imgSize={40}
                                            truncateLength={28}
                                            {...getSellerInfo(data)}
                                        />
                                    </OfferingDetailItem>
                                )
                            }
                            <OfferingDetailItem>
                                <Title className='offer-title' weight={500}>
                                    {data.name}
                                </Title>
                            </OfferingDetailItem>
                        </OfferingSeperate>
                        <OfferingSeperate>
                            <OfferingDetailItem>
                                <Title level={5} weight={500} color='var(--grey-basic)'>
                                    {t('quantity')}:
                                </Title>
                                <Title level={5} weight={400}>
                                    {
                                        data.qty
                                            ? `${data.qty} ${getMeasurement(data.measurement)}`
                                            : (
                                                <IconBox color='var(--dark-basic)'>
                                                    <InfinitySvg/>
                                                </IconBox>
                                            )
                                    }
                                </Title>
                            </OfferingDetailItem>
                            {
                                colorParams.length > 0
                                && (
                                    <OfferingDetailItem>
                                        <Title level={5} weight={500} color='var(--grey-basic)'>
                                            {t('color')}:
                                        </Title>
                                        <Row gutter={24}>
                                            {
                                                colorParams.map((item, idx) => {
                                                    const index = item.value.indexOf('|')
                                                    const hex = item.value.substr(index + 1)
                                                    return (
                                                        <Col key={`${idx + 1}`} span='auto'>
                                                            <ColorHex color={`#${hex}`}/>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </OfferingDetailItem>
                                )
                            }
                        </OfferingSeperate>
                        <ButtonUI size='lg' onClick={() => handleChangeCart(data)}>
                            {t('checkout_now')}
                        </ButtonUI>
                    </OfferingDetail>
                )
            }
            {
                (skeleton === undefined || !!skeleton) && <OfferDetailSkeleton/>
            }
        </>
    )
}