import {createEvent} from "effector";
import {fetchCountryList} from "./effects";

export const regionListEvent = createEvent();
export const resetRegionModelEvent = createEvent()

regionListEvent.watch(fetchCountryList);