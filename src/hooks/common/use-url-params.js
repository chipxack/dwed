import {useCallback, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

export const useUrlParams = (param) => {
    const location = useLocation();
    const [urlParams, setUrlParams] = useState(null);
    const [urlData, setUrlData] = useState({})

    const generateUrlParams = useCallback(() => {
        const paramsString = location.search;
        const searchParams = new URLSearchParams(paramsString);
        let newUrl = {}
        for (let pair of searchParams.entries()) {
            newUrl[pair[0]] = pair[1]
        }
        setUrlData(newUrl)

        if (Array.isArray(param) && param.length) {
            param.forEach(item => searchParams.delete(item))
        } else if (typeof param === 'string') {
            searchParams.delete(param)
        }

        if (searchParams.toString().trim().length > 0) {
            setUrlParams(searchParams.toString())
        } else {
            setUrlParams(null)
        }

    }, [location.search, param]);


    useEffect(() => {
        generateUrlParams()
    }, [generateUrlParams]);

    return {
        urlParams,
        urlData,
    }
};
