import {useCallback} from "react";
import {useUrlParams} from "./use-url-params";
import {useLocation} from "react-router-dom";

export function usePathGeneration(props = null) {
    const {urlData} = useUrlParams()
    const {pathname} = useLocation()

    const generatePath = useCallback((data, activeParam) => {
        const {id, param} = activeParam
        const tmp = []

        for (let i of data) {
            if (urlData[i]) {
                tmp.push(`${i}=${urlData[i]}`)
            }
        }

        if(id) {
            if (!urlData[param] || urlData[param] !== id) {
                tmp.push(`${param}=${id}`)
            }
        }

        return {
            pathname: (props && props.custom_pathname) || pathname,
            search: tmp.join('&'),
            href: `${(props && props.custom_pathname) || pathname}?${tmp.join('&')}`
        }
    }, [pathname, props, urlData])

    return {generatePath}
}