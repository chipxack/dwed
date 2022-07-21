import React from 'react'
import {CsLink} from './atoms'
import classNames from 'classnames'
import {useHistory} from 'react-router-dom'
import {debounce} from '../../utils/debounceUtils'

export const CustomLink = ({path, onAction, children, isActive, wait}) => {
    const {push} = useHistory()
    const className = classNames({
        'custom-link': true,
        'active': !!isActive
    })

    const handleClick = (e) => {
        e.preventDefault()

        if (onAction) {
            onAction()
        }

        debounce(push(path), wait || 200)
    }

    return (
        <CsLink
            href={path}
            className={className}
            onClick={handleClick}
        >
            {
                children
            }
        </CsLink>
    )
}