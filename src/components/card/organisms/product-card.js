import React, {useCallback} from 'react'
import {
    ProdcutActionWrapper,
    ProductCardContent,
    ProductContent,
    ProductImg,
    ProductOverlay,
    ProductOverlayContent,
    ProductSelect
} from '../atoms'
import {Col, Tooltip} from 'antd'
import {useStore} from 'effector-react'
import {BasketSvg, OfficialSvg} from '../../../media'
import {useTranslation} from 'react-i18next'
import {PROFILE_TYPE} from '../../../constants'
import {InfinitySvg} from '../../../media/infinity'
import {UNITS_OF_MEASUREMENT} from '../../../helpers'
import {IconBox} from '../../../UIComponents/global-styles'
import {$accountModel} from '../../../models/accountModel'
import {LazyloadImage} from '../../../UIComponents/lazyload-image'
import noImage from '../../../assets/images/istockphoto-1216251206-612x612.jpg'
import {getRandom} from '../../../utils/skeletonUtils'
import {$appModel} from '../../../models/app'
import {getLocalCost, langFormat} from '../../../utils/app-utils'
import {numberFormat} from '../../../utils/numberUtils'

export const ProductCard = ({data, overlay, showDetail, path, select, onSelect, actions}) => {
    const ownerInfo = data.org ? data.org : data.user && data.user
    const {t} = useTranslation()
    const getMeasurement = (id) => UNITS_OF_MEASUREMENT.find(item => item.id === id).label
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$regionDetect: {currency: commonCurrency, lang}, $app: {token}} = useStore($appModel)

    const getPrice = useCallback((cost) => {
        if (token) {
            return getLocalCost(cost, currentProfile.currency.code, langFormat(currentProfile.lang))
        } else {
            if (commonCurrency && lang) {
                return getLocalCost(cost, commonCurrency, langFormat(lang))
            } else {
                return numberFormat(cost)
            }
        }

    }, [token, currentProfile, lang, commonCurrency])

    return (
        <ProductCardContent selected={currentProfile && currentProfile.type === PROFILE_TYPE.USER && select}>
            <ProductImg onClick={showDetail && showDetail} selected={select}>
                <ProductOverlay>
                    <ProductOverlayContent>
                        {
                            overlay && ownerInfo
                            && (
                                <>
                                    <ProductOverlay.Title>
                                        <span>{ownerInfo.full_name ? ownerInfo.full_name : ownerInfo.name}</span>
                                        {
                                            ownerInfo.is_official && <OfficialSvg/>
                                        }
                                    </ProductOverlay.Title>
                                </>
                            )
                        }
                        <ProductOverlay.Quantity>
                            {t('quantity')}
                            {
                                data.qty
                                    ? <span>{`${data.qty} ${t(getMeasurement(data.measurement))}`} </span>
                                    : <IconBox color='#fff'><InfinitySvg/></IconBox>
                            }
                        </ProductOverlay.Quantity>
                        {
                            actions
                            && (
                                <ProdcutActionWrapper gutter={12} justify='center'>
                                    {
                                        actions.map(action => (
                                            <Col span='auto' key={action.type}>
                                                <Tooltip title={t(action.type)}>
                                                    <IconBox
                                                        onClick={() => action.onClick(data.id)}
                                                        color={action.type === 'edit' ? 'var(--primary-dwed)' : 'var(--danger-dwed)'}
                                                    >
                                                        {action.icon}
                                                    </IconBox>
                                                </Tooltip>
                                            </Col>
                                        ))
                                    }
                                </ProdcutActionWrapper>
                            )
                        }
                    </ProductOverlayContent>
                </ProductOverlay>
                <LazyloadImage
                    imgUrl={data.image ? data.image : noImage}
                    alt={data.name}
                    effect='blur'
                    height={getRandom(80, 320)}
                />
            </ProductImg>
            <ProductContent>
                <ProductContent.Title to={path} title={data.name}>
                    <span>{data.name}</span>
                </ProductContent.Title>
                <ProductContent.Price>
                    {
                        data.cost === 0 ? t('free') : getPrice(data.cost)
                    }
                    {
                        currentProfile && currentProfile.type === PROFILE_TYPE.USER && onSelect && (
                            <ProductSelect selected={select} onClick={onSelect}>
                                <BasketSvg/>
                            </ProductSelect>
                        )
                    }
                </ProductContent.Price>
            </ProductContent>
        </ProductCardContent>
    )
}