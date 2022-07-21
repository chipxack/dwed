import React, {useEffect, useState} from 'react'
import {CascaderBlock} from "../atoms";

export const CascaderSystem = (props) => {
    const {
        getList,
        placeholder,
        change
    } = props;
    const [options, setOptions] = useState([]);

    const loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const selectedItem = selectedOptions[selectedOptions.length - 1]
        console.log(selectedItem)
        getList(selectedItem.slug !== undefined ? selectedItem.slug : selectedItem.value)
            .then(response => {
                if (response.status === 200) {
                    targetOption.loading = false;
                    targetOption.children = response.data.results.map(item => item.name && {
                        label: item.name,
                        value: item.id,
                        isLeaf: !item.has_subs,
                        slug: item.slug
                    })
                    setOptions([...options])
                }
            })
            .catch(error => console.error(error.response))

    };

    const onChange = (data) => {
        console.log(data, data[data.length - 1])
        if (data.length > 0) {
            change(data[data.length - 1]);
        }
    };

    useEffect(() => {
        if (options && options.length < 1) {
            getList(0)
                .then(response => {
                    if (response.status === 200) {
                        setOptions(response.data.results.map(item => item.name &&
                            {
                                label: item.name,
                                value: item.id,
                                isLeaf: !item.has_subs,
                                slug: item.slug
                            }
                        ))
                    }
                })
                .catch(error => console.error(error.response))
        }
    }, [getList, options]);


    return (
        <CascaderBlock
            className='qqqqqq'
            status='default'
            placeholder={placeholder}
            options={options}
            loadData={loadData}
            onChange={onChange}
            changeOnSelect
        />
    )
}




export const CascaderOffersSystem = (props) => {
    const {
        getList,
        placeholder,
        change
    } = props;
    const [options, setOptions] = useState([]);
    const [search] = useState(undefined);

    const loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const params = {
            search
        }
        getList(selectedOptions[selectedOptions.length - 1].value, params)
            .then(response => {
                if (response.status === 200) {
                    targetOption.loading = false;
                    targetOption.children = response.data.results.map(item => item.name && {
                        label: item.name,
                        value: item.id,
                        isLeaf: !item.has_subs,
                    })
                    setOptions([...options])
                }
            })
            .catch(error => console.error(error.response))

    };

    const onChange = (data) => {
        if (data.length > 0) {
            change(data[data.length - 1]);
        }
    };

    useEffect(() => {
        if (options && options.length < 1) {
            getList(0)
                .then(response => {
                    if (response.status === 200) {
                        setOptions(response.data.results.map(item => item.name &&
                            {
                                label: item.name,
                                value: item.id,
                                isLeaf: !item.has_subs,
                            }
                        ))
                    }
                })
                .catch(error => console.error(error.response))
        }
    }, [getList, options]);


    return (
        <CascaderBlock
            className='qqqqqq'
            status='default'
            placeholder={placeholder}
            options={options}
            loadData={loadData}
            onChange={onChange}
            changeOnSelect
        />
    )
}