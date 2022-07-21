import React from 'react'
import {
    BreakAction,
    BreakItem,
    ProcIntervalSlider,
    RoundClock,
    ScheduleTitle,
    ScheduleWrapper,
    Timebox,
    TimeSplit,
    ToggleBreak
} from '../atoms'
import {PlusSvg} from '../../../media'
import {TrashSvg} from '../../../media/trash'
import {CheckmarkSvg} from '../../../media/checkmark'
import {Col, Row, Tooltip} from 'antd'
import {RoundClockSvg} from '../../../media/round-clock'
import {useJobSchedule} from '../../../hooks/job'
import {useTranslation} from 'react-i18next'

export const ScheduleItem = ({scheduleId}) => {
    const {t} = useTranslation()
    const {
        handleProcInterval,
        handleToggleBreak,
        handleChange,
        hour_24,
        active24Hour,
        toggleBreak,
        procInterval,
        start,
        changeBreaks,
        addBreak,
        deleteBreak,
        setProsInterval,
        end,
        breaks
    } = useJobSchedule({scheduleId})

    return (
        <ScheduleWrapper>
            <Row gutter={16}>
                <Col span={6}>
                    <ScheduleTitle>
                        <RoundClock
                            active={hour_24}
                            onClick={() => active24Hour(!hour_24)}
                        >
                            <RoundClockSvg/>
                        </RoundClock>
                        {t('working_hours')}
                    </ScheduleTitle>
                    <Row gutter={4}>
                        <Col>
                            <Timebox
                                mode='24h'
                                onChange={(e) => handleChange(e, 'start')}
                                value={start}
                            />
                        </Col>
                        <Col>
                            <TimeSplit>-</TimeSplit>
                        </Col>
                        <Col>
                            <Timebox
                                mode='24h'
                                value={end}
                                onChange={(e) => handleChange(e, 'end')}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <ScheduleTitle>
                        <Tooltip title={t('break_mode')}>
                            <ToggleBreak active={toggleBreak} onClick={() => handleToggleBreak(toggleBreak)}>
                                <CheckmarkSvg/>
                            </ToggleBreak>
                        </Tooltip>
                        {t('break')}
                    </ScheduleTitle>
                    {
                        breaks.length > 0 && breaks.map((item, idx) => (
                            <BreakItem key={idx} disabled={!toggleBreak}>
                                <Row gutter={4} style={{marginBottom: 8}}>
                                    <Col>
                                        <Timebox
                                            mode='24h'
                                            onChange={(e) => toggleBreak && changeBreaks(e, idx, 'start')}
                                            value={item.from}
                                        />
                                    </Col>
                                    <Col>
                                        <TimeSplit>-</TimeSplit>
                                    </Col>
                                    <Col>
                                        <Timebox
                                            mode='24h'
                                            value={item.to}
                                            onChange={(e) => toggleBreak && changeBreaks(e, idx, 'end')}
                                        />
                                    </Col>
                                </Row>
                                {
                                    idx === 0
                                        ? (
                                            <BreakAction onClick={addBreak}>
                                                <PlusSvg/>
                                            </BreakAction>
                                        )
                                        : (
                                            <BreakAction type='delete' onClick={() => deleteBreak(idx)}>
                                                <TrashSvg/>
                                            </BreakAction>
                                        )
                                }
                            </BreakItem>
                        ))
                    }
                </Col>
                <Col span={12}>
                    <ScheduleTitle>
                        {t('time_interval')}
                    </ScheduleTitle>
                    <ProcIntervalSlider
                        value={procInterval}
                        max={60}
                        min={1}
                        step={1}
                        onChange={(value) => setProsInterval(value)}
                        onAfterChange={(value) => handleProcInterval(value)}
                        tooltipVisible
                        tooltipPlacement='bottom'
                        tipFormatter={(value) => `${value} ${t('min')}`}
                    />
                </Col>
            </Row>
        </ScheduleWrapper>
    )
}