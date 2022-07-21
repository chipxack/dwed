import React, {useEffect, useState} from "react";
import {TreeSelect} from 'antd'
import {ThreeSelectBlock} from "../atoms";
import {theme} from "../../theme";


export const TreeSelectSystem = (props) => {
    const {
        value,
        getList,
        label,
        status,
        placeholder,
        change
    } = props
    const [options, setOptions] = useState([]);

    const loadData = (treeNode) => {
        // const { id } = treeNode.props;
        // const targetOption = selectedOptions[selectedOptions.length - 1];
        // targetOption.loading = true;
        // const selectedItem = selectedOptions[selectedOptions.length - 1]
        console.log('treeNode', treeNode)

        // getList(treeNode.slug !== undefined ? treeNode.slug : treeNode.value)
        //     .then(response => {
        //         if (response.status === 200) {
        //             // targetOption.loading = false;
        //             const data = options.map(item => item.id === id ?
        //                 {
        //                     ...item,
        //                     children: response.data.results.map(item => item.name && {
        //                         title: item.name,
        //                         value: item.id,
        //                         id: item.id,
        //                         isLeaf: !item.has_subs,
        //                         slug: item.slug
        //                     })
        //                 }:
        //                 item
        //             )
        //             console.log('dataaaaaaa', data)
        //             // setOptions([...data])
        //         }
        //     })
        //     .catch(error => console.error(error.response))

    };

    console.log('optionsssss', options)

    // const onChange = (data) => {
    //     console.log(data, data[data.length - 1])
    //     if (data.length > 0) {
    //         change(data[data.length - 1]);
    //     }
    // };

    useEffect(() => {
        if (options && options.length < 1) {
            getList(0)
                .then(response => {
                    if (response.status === 200) {
                        setOptions(response.data.results.map(item => item.name &&
                            {
                                title: item.name,
                                value: item.id,
                                id: item.id,
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
        <ThreeSelectBlock status={status ? status : 'default'} theme={theme.main}>
            {
                label &&
                <label>{label}</label>
            }
            <TreeSelect
                treeDataSimpleMode
                style={{width: '100%'}}
                value={value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                onChange={change}
                loadData={loadData}
                treeData={options}
                placeholder={placeholder}
            />
        </ThreeSelectBlock>
    )
}