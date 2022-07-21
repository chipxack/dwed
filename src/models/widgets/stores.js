import { combine, createStore } from "effector";
import { weekdays } from "../../helper/data/weekdays";
import {
    addWeekday,
    deleteWeekday,
    hideImageEditor,
    hideModal,
    showImageEditor,
    showModal,
    toggleAuthModal
} from "./events";

const $weekdays = createStore({ all: weekdays, list: weekdays.filter(item => item.key !== 0), selected: [weekdays[0]] })
    .on(addWeekday, (state, newSelected) => {
        const newList = state.all.filter(val => !newSelected.includes(val));
        return {
            ...state,
            selected: newSelected.sort((a, b) => a.key - b.key),
            list: newList
        }
    })
    .on(deleteWeekday, (state, id) => {
        const newSelected = state.selected.filter(item => item.id !== id)
        const newList = state.all.filter(val => !newSelected.includes(val));
        return {
            ...state,
            selected: newSelected.sort((a, b) => a - b),
            list: newList
        }
    })

const modalDefaultState = {open: false, title: '', component: null, props: null, authModalVisible: false}
const $modal = createStore(modalDefaultState)
    .on(showModal, (state, payload) => ({...state, ...payload}))
    .on(hideModal, () => (modalDefaultState))
    .on(toggleAuthModal, (state, modalStatus) => ({...state, authModalVisible: modalStatus}))


const imageEditorDefaultState = {open: false, imgUrl: null, methods: {}}
const $imageEditor = createStore(imageEditorDefaultState)
    .on(showImageEditor, (state, payload) => ({...state, ...payload}))
    .on(hideImageEditor, () => (imageEditorDefaultState))

export const $widgets = combine({
    $weekdays,
    $modal,
    $imageEditor
})