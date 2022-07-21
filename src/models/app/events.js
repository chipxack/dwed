import {createEvent} from "effector";
import {fetchCurrencyList, fetchRegionDetect} from './effects'

export const toggleSearchFocus = createEvent()
export const currencyListMount = createEvent()
export const tokenMount = createEvent()
export const allowPermission = createEvent()
export const regionDetectMount = createEvent()
export const fastAuthVisibleStatus = createEvent()

currencyListMount.watch(fetchCurrencyList)
regionDetectMount.watch(fetchRegionDetect)
