import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {CreditCardSelect, CreditCardSelectDropdown} from '../atoms'
import {useTranslation} from 'react-i18next'
import {useOutsideClicker} from '../../../hooks/common'
import {ChevronDownIcon} from '../../../icons/arrows'
import {FormControlLabel, Radio, RadioGroup} from '@material-ui/core'
import {Col, Row} from 'antd'
import {IconBox} from '../../../UIComponents/global-styles'
import {getCreditCardsListEvent} from '../../../models/payment-model/events'
import {FETCHING_STATUS} from '../../../constants'
import {useStore} from 'effector-react'
import {$paymentModel} from '../../../models/payment-model'
import {CirclePlusIcon} from '../../../icons/plus'
import {getCommonApiParams} from '../../../utils/app-utils'
import {ReactComponent as Humo} from '../../../assets/images/humo-color.svg'
import {ReactComponent as UzCard} from '../../../assets/images/uzcard-color.svg'

export const OrderSelectCreditCard = ({selected, onChange}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const {clicked} = useOutsideClicker(ref)
    const {t} = useTranslation()
    const {$creditCardList: {data}} = useStore($paymentModel)

    const handleChange = useCallback((e) => {
        onChange(e.target.value)
        setOpen(false)
    }, [onChange])

    const getCard = useCallback((item) => {
        let tmp = ''
        const number = item.card_number
        for (let i = 0; i < number.length; i++) {
            if (i % 4 === 0) {
                tmp += ' ' + number[i]
            } else {
                tmp += number[i]
            }
        }
        return (
            <div className="card-info">
                {
                    number.indexOf('8600') !== -1 ? <UzCard /> : <Humo />
                }
                {
                    `${tmp} - ${item.name}`
                }
            </div>
        )
    }, [])

    const selectedItemName = useMemo(() => {
        const item = selected && data.find(item => item.id === Number(selected))
        return item
            ? getCard(item)
            : t('select_your_card')
    }, [selected, t, getCard, data])

    useEffect(() => {
        if (clicked) {
            setOpen(false)
        }
    }, [clicked])

    useEffect(() => {
        const data = {
            status: FETCHING_STATUS.INIT,
            params: getCommonApiParams().params,
        }
        getCreditCardsListEvent(data)
    }, [])

    return (
        <CreditCardSelect open={open} onClick={() => setOpen(!open)}>
            {selectedItemName}
            <IconBox className='card-chevron'>
                <ChevronDownIcon />
            </IconBox>
            <CreditCardSelectDropdown ref={ref} open={open}>
                <Row gutter={[0, 8]}>
                    {
                        data.length > 0 && (
                            <Col span={24}>
                                <RadioGroup
                                    defaultValue="0"
                                    onChange={handleChange}
                                    value={selected ? Number(selected) : '0'}
                                >
                                    {
                                        data.map(item => (
                                            <FormControlLabel
                                                key={item.id}
                                                className="card-radio"
                                                value={item.id}
                                                control={<Radio color="primary" />}
                                                label={getCard(item)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </Col>
                        )
                    }
                    <Col>
                        <IconBox className="add-card">
                            <CirclePlusIcon />
                            {t('add_card')}
                        </IconBox>
                    </Col>
                </Row>
            </CreditCardSelectDropdown>
        </CreditCardSelect>
    )
}
