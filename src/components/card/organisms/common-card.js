import React, {useEffect, useState} from 'react'
import {CommonCardImage, CommonCardItem, CommonCardItemCaption, CommonCardItemTitle,} from '../atoms'
import {OfficialSvg} from '../../../media'
import {LazyloadImage} from '../../../UIComponents/lazyload-image'
import {truncateString} from '../../../utils/stringUtils'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {PROFILE_TYPE} from '../../../constants'
import {Col, Row} from 'antd'
import {CardProgress} from '../maleculas'
import {$appModel} from '../../../models/app'
import {CustomLink} from '../../../UIComponents/custom-link'

export const CommonCard = ({link, data, subscribe, showProgress, onAction}) => {
    const {img, name, isOfficial, category, slug, itemSubs} = data
    const [subscribed, setSubscribed] = useState(undefined)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {t} = useTranslation()
    const {$app: {token}} = useStore($appModel)


    useEffect(() => {
        if (itemSubs && itemSubs.subscribed) {
            setSubscribed(itemSubs.subscribed)
        } else {
            setSubscribed(undefined)
        }
    }, [itemSubs])

    const handleClick = () => {
        subscribe(slug, () => setSubscribed(true))
    }

    return (
        <CommonCardItem>
            {
                token && currentProfile && currentProfile.type === PROFILE_TYPE.USER && !!currentProfile.status
                && currentProfile.slug_name !== data.slug && !subscribed && (
                    <Title
                        onClick={handleClick}
                        className='profile-subscribe'
                        weight={500}
                        color='var(--primary-dwed)'
                    >
                        {t('make_subscribe')}
                    </Title>
                )
            }
            <CustomLink onAction={onAction} className='account-card-link' path={link}>
                <Row gutter={16} align='middle' wrap={false}>
                    <Col span='auto'>
                        <CommonCardImage>
                            <LazyloadImage imgUrl={img} alt={name} effect='blur'/>
                        </CommonCardImage>
                    </Col>
                    <Col flex={1}>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <CommonCardItemTitle to={link}>
                                    {truncateString(name, 26)}
                                    {
                                        isOfficial && <OfficialSvg/>
                                    }
                                </CommonCardItemTitle>
                                <CommonCardItemCaption>{category}</CommonCardItemCaption>

                            </Col>
                            {
                                showProgress && (
                                    <Col span={24}>
                                        <CardProgress data={data.rating}/>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </CustomLink>
        </CommonCardItem>
    )
}