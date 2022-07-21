import {useCallback, useEffect, useMemo, useState} from 'react'
import {LISTS} from '../../constants/lists'
import {
    $categoryModel,
    categoryForceLoading,
    getMediaCatsEvent,
    getOfferCatsEvent,
    getOrgCatsEvent,
    getUserCatsEvent,
    resetCategoryModelEvent,
} from '../../models/categories-models'
import {useStore} from 'effector-react'
import {$regionModel, regionListEvent, resetRegionModelEvent} from '../../models/region-models'
import {$widgets} from '../../models/widgets'

const commonParams = {
    params: {
        limit: 20,
        offset: 0,
        show_empties: '1',
    },
    parent: 0,
}

export const useSelectionList = ({type, handleChange, onClose}) => {
    const {$modal} = useStore($widgets)
    const {$categoryList} = useStore($categoryModel)
    const {$regionList} = useStore($regionModel)
    const [parent, setParent] = useState(0)
    const [list, setList] = useState({})
    const [selected, setSelected] = useState(null)
    const [breadcrumb, setBreadCrumb] = useState([])
    const [search, setSearch] = useState('')

    const resetList = useCallback(() => {
        if (type === LISTS.MEDIA_CATEGORY || type === LISTS.ORG_CATEGORY || type === LISTS.USER_CATEGORY) {
            resetCategoryModelEvent()
        }

        if (type === LISTS.REGION) {
            resetRegionModelEvent()
        }
    }, [type])

    const getList = useCallback((params = commonParams) => {
        if (type === LISTS.ORG_CATEGORY) {
            getOrgCatsEvent(params)
        }

        if (type === LISTS.REGION) {
            regionListEvent(params)
        }

        if (type === LISTS.USER_CATEGORY) {
            getUserCatsEvent(params)
        }

        if (type === LISTS.OFFERING_CATEGORY) {
            getOfferCatsEvent(params)
        }

        if (type === LISTS.MEDIA_CATEGORY) {
            getMediaCatsEvent(params)
        }
    }, [type])

    const getChildren = useCallback((data) => {
        const $breadcrumb = [...breadcrumb, {...data}]
        const parentId = data.slug ? data.slug : data.id
        categoryForceLoading()
        const dataParams = {
            ...commonParams,
            parent: parentId,
            clear: true,
        }
        setBreadCrumb($breadcrumb)
        setParent(parentId)
        dataParams['params']['search'] = ''
        getList(dataParams)
    }, [getList, breadcrumb])

    const loadList = useCallback((data) => {
        const params = {
            ...commonParams,
            parent,
            params: {
                limit: 20,
                offset: (data * 20),
                show_empties: '1',
            },
        }
        getList(params)
    }, [getList, parent])

    const renderList = useCallback(() => {
        if (type === LISTS.MEDIA_CATEGORY || type === LISTS.ORG_CATEGORY || type === LISTS.USER_CATEGORY || LISTS.OFFERING_CATEGORY) {
            setList($categoryList)
        }

        if (type === LISTS.REGION) {
            setList($regionList)
        }
    }, [$categoryList, type, $regionList])

    const onSelect = useCallback((data) => {
        if (selected && selected.id === data.id) {
            setSelected(null)
        } else {
            setSelected({...data, type})
        }
    }, [selected, type])

    const breadcrumbAction = useCallback((id) => {
        const data = {
            ...commonParams,
            parent: id,
            clear: true,
        }
        if (id === 0) {
            data.params.search = search
            setBreadCrumb([])
        } else {
            const idx = breadcrumb.findIndex(item => item.id === id)
            const newData = [...breadcrumb.slice(0, idx + 1)]
            data.params.search = ''
            setBreadCrumb(newData)
        }

        categoryForceLoading()
        setParent(id)
        getList(data)
    }, [getList, breadcrumb, search])

    const handleAccept = useCallback(() => {
        if (selected) {
            handleChange(selected)
        } else {
            handleChange(null)
        }
        resetList()
        setBreadCrumb([])
        setParent(0)
        setSearch('')
        setSelected(null)
        if(onClose) {
            onClose()
        }
    }, [handleChange, selected, resetList, onClose])


    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            const data = {
                ...commonParams,
                clear: true,
            }
            categoryForceLoading()
            data['params']['search'] = search
            data['parent'] = 0
            if (search.trim().length === 0 || search.trim().length > 2) {
                getList(data)
            }
        }, 300)
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getList, search, $modal.open])

    useMemo(() => {
        renderList()
    }, [renderList])

    useEffect(() => {
        if (!$modal.open) {
            setSelected(null)
            setParent(0)
            setBreadCrumb([])
            setSearch('')
        }
    }, [$modal.open])

    return {
        getChildren,
        loadList,
        list,
        onSelect,
        selected,
        breadcrumb,
        breadcrumbAction,
        handleAccept,
        search,
        setSearch,
    }
}
