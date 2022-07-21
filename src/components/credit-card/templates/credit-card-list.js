import React, {useCallback, useState} from 'react'
import {useUserCreditCardList} from '../../../hooks/user'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import {useStore} from 'effector-react'
import {$paymentModel} from '../../../models/payment-model'
import {CreditCardItem} from '../atoms'
import {cardImages} from '../../../data/account'
import {Col, Row} from 'antd'
import {ReactComponent as UzCard} from '../../../assets/images/uzcard.svg'
import {ReactComponent as HumoCard} from '../../../assets/images/humo.svg'
import {IconBox} from '../../../UIComponents/global-styles'
import {EditSquareIcon} from '../../../icons/edit'
import {Title} from '../../../UIComponents/typography'
import {Modal} from '../../modal'
import {CreditCardForm} from './credit-card-form'
import {ButtonUI} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {TrashIcon} from '../../../icons/trash'
import {showMessage} from '../../../UIComponents/message-notification'
import {removeCreditCardEvent} from '../../../models/payment-model/events'

export const CreditCardList = () => {
    useUserCreditCardList()
    const {$creditCardList: {data}} = useStore($paymentModel)
    const [cardId, setCardId] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const {t} = useTranslation()

    const onClose = useCallback(() => {
        setCardId(false)
        setIsVerifying(false)
    }, [])

    const getCard = useCallback((number) => {
        let tmp = ''
        for (let i = 0; i < number.length; i++) {
            if (i % 4 === 0) {
                tmp += ' ' + number[i]
            } else {
                tmp += number[i]
            }
        }
        return tmp
    }, [])

    const handleBtnClick = useCallback((id) => {
        setCardId(id)
        setIsVerifying(true)
    }, [])

    const removeCard = useCallback((id) => {
        const action = (err = false) => {
            if (err) {

            } else {
                if (onClose) {
                    onClose()
                }
                showMessage('credit_card_remove_successfully', 'success')
            }
        }
        removeCreditCardEvent({id, action})
    }, [onClose])

    return (
        <>
            <Modal
                modalIsOpen={!!cardId}
                component={<CreditCardForm isVerifying={isVerifying} onClose={onClose} cardId={cardId} />}
                setModalIsOpen={onClose}
                width={400}
            />
            <Splide
                options={{
                    rewind: true,
                    arrows: false,
                    autoWidth: true,
                    pagination: false,
                    gap: 24,
                }}
            >
                {
                    data.length > 0 && data.map((item, idx) => (
                        <SplideSlide key={item.id}>
                            <CreditCardItem url={cardImages[idx]}>
                                {
                                    !item.verified && (
                                        <div className="not-verified">
                                            {t('not_verified')}
                                            <ButtonUI onClick={() => handleBtnClick(item.id)} size="sm"
                                                      buttonstyle="primary">
                                                {t('verify_now')}
                                            </ButtonUI>
                                        </div>
                                    )
                                }
                                {
                                    !item.verified && (
                                        <IconBox onClick={() => removeCard(item.id)} className='remove-card'>
                                            <TrashIcon />
                                        </IconBox>
                                    )
                                }
                                <Row wrap={false} justify="space-between" align="middle" style={{marginBottom: 16}}>
                                    <Col>
                                        {
                                            item.card_number.indexOf('8600') !== -1
                                                ? <UzCard />
                                                : <HumoCard />
                                        }
                                    </Col>
                                    {
                                        item.verified && (
                                            <Col>
                                                <IconBox color="#fff" onClick={() => setCardId(item.id)}>
                                                    <EditSquareIcon />
                                                </IconBox>
                                            </Col>
                                        )
                                    }
                            </Row>
                            <Row gutter={[0, 16]}>
                                <Col span={24}>
                                    <Title>
                                        {item.name}
                                    </Title>
                                </Col>
                                <Col span={24}>
                                    <Row justify="space-between" wrap={false}>
                                        <Col>{getCard(item.card_number)}</Col>
                                        <Col>{item.expire}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CreditCardItem>
                    </SplideSlide>
                    ))
                }
            </Splide>
        </>
    )
}
