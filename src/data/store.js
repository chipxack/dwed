export const defaultBasicState = {
    loading: true,
    error: false,
}

export const defaultStateForListWithKey = {
    ...defaultBasicState,
    result: {},
    status: {},
    skeleton: {},
    data: {}
}

export const defaultStoreState = {
    loading: false,
    error: false,
    result: {},
    data: [],
    status: undefined,
    skeleton: undefined
}