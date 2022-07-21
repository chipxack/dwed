import {createStore} from "effector";
import {modalEvent} from "./events";


export const $modalStore = createStore({status: false})
    .on(modalEvent, (state, response) => {
        return {
            ...state,
            status: response
        }
    });