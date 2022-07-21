import {useCallback, useEffect, useState} from 'react'
import {debounce} from '../../utils/debounceUtils'

export const useHeader = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    const calculate = useCallback((e) => {
        const currentScrollPos = window.pageYOffset
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 10) || currentScrollPos < 60)

        setPrevScrollPos(currentScrollPos)
    }, [prevScrollPos])

    const handleScroll = debounce((e) => {
        calculate(e)
    }, 100)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [prevScrollPos, visible, handleScroll])

    return {visible}
}
