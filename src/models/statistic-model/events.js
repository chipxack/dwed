import {createEvent} from 'effector'
import {
    fetchClientList,
    fetchEmployeeList,
    fetchFinanceList,
    fetchOfferStatisticList,
    fetchRequestList
} from './effects'

export const clientListMount = createEvent()
export const offerStatisticListMount = createEvent()
export const employeeListMount = createEvent()
export const financeListMount = createEvent()
export const requestListMount = createEvent()

clientListMount.watch(fetchClientList)
offerStatisticListMount.watch(fetchOfferStatisticList)
employeeListMount.watch(fetchEmployeeList)
financeListMount.watch(fetchFinanceList)
requestListMount.watch(fetchRequestList)




