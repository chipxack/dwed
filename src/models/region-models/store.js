import {combine, createStore} from "effector";
import {fetchCountryList} from "./effects";
import {resetRegionModelEvent} from "./events";

const $regionList = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchCountryList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchCountryList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}}))
    .on(fetchCountryList.done, (state, res) => {
        const newData = res.params.clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state,
            error: false,
            result: res.result.data,
            data: newData,
        }
    })
    .reset(resetRegionModelEvent)


export const $regionModel = combine({
    $regionList
});

