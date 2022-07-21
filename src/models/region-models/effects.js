import {createEffect} from "effector";
import {getRegionList} from "../../api/country-api";

export const fetchCountryList = createEffect({
    handler: getRegionList
});