import React from 'react'
import {Col, Row} from 'antd'
import {FinanceIndicatorItem} from '../atoms'
import {useTranslation} from 'react-i18next'
import {IncomeIcon} from '../../../icons/income'
import {Title} from '../../../UIComponents/typography'
import {useStore} from 'effector-react'
import {$statisticModel} from '../../../models/statistic-model'
import {$accountModel} from '../../../models/accountModel'
import {getLocalCost, langFormat} from '../../../utils/app-utils'
import {ExpenseIcon} from '../../../icons/expense'
import {SwapIcon} from '../../../icons/swap'

export const FinanceIndicator = () => {
    const {t} = useTranslation()
    const {$financeList: {result}} = useStore($statisticModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)


    return (
        <Row gutter={16} wrap={false}>
            <Col span={8}>
                <FinanceIndicatorItem style={{color: '#fff', backgroundColor: 'var(--info-dwed)'}}>
                    <div className='finance-indicator-title'>
                        <IncomeIcon/>
                        {t('income')}
                    </div>
                    <Title level={4} color={'#fff'}>
                        {
                            result.income
                                ? (
                                    <>
                                        {
                                            result.income.current
                                                ? getLocalCost(
                                                result.income.current,
                                                currentProfile.currency.code,
                                                langFormat(currentProfile.lang)
                                                )
                                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                                        }
                                    </>
                                )
                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                        }
                    </Title>
                </FinanceIndicatorItem>
            </Col>
            <Col span={8}>
                <FinanceIndicatorItem style={{color: '#fff', backgroundColor: 'var(--danger-dwed)'}}>
                    <div className='finance-indicator-title'>
                        <ExpenseIcon/>
                        {t('expense')}
                    </div>
                    <Title level={4} color={'#fff'}>
                        {
                            result.income
                                ? (
                                    <>
                                        {
                                            result.expense.current
                                                ? getLocalCost(
                                                result.expense.current,
                                                currentProfile.currency.code,
                                                langFormat(currentProfile.lang)
                                                )
                                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                                        }
                                    </>
                                )
                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                        }
                    </Title>
                </FinanceIndicatorItem>
            </Col>
            <Col span={8}>
                <FinanceIndicatorItem style={{color: 'var(--primary-dwed)', backgroundColor: '#fff'}}>
                    <div className='finance-indicator-title'>
                        <SwapIcon/>
                        {t('average_check')}
                    </div>
                    <Title level={4} color={'var(--primary-dwed)'}>
                        {
                            result.average_check
                                ? (
                                    <>
                                        {
                                            result.average_check.current
                                                ? getLocalCost(
                                                result.average_check.current,
                                                currentProfile.currency.code,
                                                langFormat(currentProfile.lang)
                                                )
                                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                                        }
                                    </>
                                )
                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                        }
                    </Title>
                </FinanceIndicatorItem>
            </Col>
        </Row>
    )
}