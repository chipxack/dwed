import {createEffect} from 'effector'
import statistics from '../../service/statistics'

export const fetchClientList = createEffect({
    handler: statistics.getClientList
})

export const fetchOfferStatisticList = createEffect({
    handler: statistics.getOfferingsList
})

export const fetchEmployeeList = createEffect({
    handler: statistics.getEmployees
})

export const fetchFinanceList = createEffect({
    handler: statistics.getFinanceList
})

export const fetchRequestList = createEffect({
    handler: statistics.getRequestList
})