import {createEffect} from 'effector'
import app from '../../service/app'

export const fetchCurrencyList = createEffect({
    handler: app.getCurrencyList
})

export const fetchRegionDetect = createEffect({
    handler: app.getRegionDetect
})