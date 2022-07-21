import {combine, createStore} from "effector";
import {fetchGetOrgTapeList, fetchGetTapeList, fetchGetUserTapeList} from "./effects";
import {
    changeTextForm,
    createFileForm,
    editFileForm,
    removeMyPost,
    removePost,
    removePostFile,
    resetFileForm
} from "./events";


const $tapeList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchGetTapeList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchGetTapeList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchGetTapeList.finally, (state, res) => {
        const params = res.params?.params

        return {
            ...state,
            error: false,
            data: {
                ...res.result.data,
                results: params && params.offset === 0 ? res.result.data.results : res.params && res.params.offset === 0 ? res.result.data.results : [
                    ...state.data.results,
                    ...res.result.data.results
                ]
            },
            forceLoading: false
        }
    })
    .on(removePost, (state, pending) => {
        return {
            ...state,
            data: {
                ...state.data,
                results: [...state.data.results.filter(value => value.block_data.id !== pending)]
            }
        }
    })

const $userTapeList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchGetUserTapeList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchGetUserTapeList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchGetUserTapeList.finally, (state, res) => {

        return {
            ...state,
            error: false,
            data: {
                ...res.result.data,
                results: res.params.offset === 0 ? res.result.data.results : [
                    ...state.data.results,
                    ...res.result.data.results
                ]
            },
            forceLoading: false
        }
    })
    .on(removeMyPost, (state, pending) => {
        return {
            ...state,
            data: {
                ...state.data,
                results: [...state.data.results.filter(value => value.block_data.id !== pending)]
            }
        }
    })

const $orgTapeList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchGetOrgTapeList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchGetOrgTapeList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchGetOrgTapeList.finally, (state, res) => {

        return {
            ...state,
            error: false,
            data: {
                ...res.result.data,
                results: res.params.offset === 0 ? res.result.data.results : [
                    ...state.data.results,
                    ...res.result.data.results
                ]
            },
            forceLoading: false
        }
    })
    .on(removeMyPost, (state, pending) => {
        return {
            ...state,
            data: {
                ...state.data,
                results: [...state.data.results.filter(value => value.block_data.id !== pending)]
            }
        }
    })

const $postForm = createStore({text: '', file: [], })
    .on(resetFileForm, (state, response) => {
        return {
            ...state,
            file: []
        }
    })
    .on(createFileForm, (state, response) => {
        return {
            ...state,
            file: [
                ...state.file,
                response
            ]
        }
    })
    .on(removePostFile, (state, response) => {
        const data = []
        for (let i = 0; i < state.file.length; i++) {
            if (Number(response) !== i) {
                data.push(state.file[i])
            }
        }
        return {
            ...state,
            file: data
        }
    })
    .on(editFileForm, (state, response) => {
        return {
            ...state,
            file: state.file.map(item => item.uuid === response.uuid ? {...item, ...response} : item)
        }
    })
    .on(changeTextForm, (state, response) => {
        return {
            ...state,
            text: response
        }
    })

export const $isDataPending = combine({
    $tapeList,
    $userTapeList,
    $postForm,
    $orgTapeList
})