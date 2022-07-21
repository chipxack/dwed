import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ShortAccountCard} from '../../../components/card'
import {FilterModalContent, FilterModalItem} from '../atoms'
import {useOutsideClicker} from '../../../hooks/common'
import {EditPenFillSvg} from '../../../media'
import {TrashSvg} from '../../../media/trash'
import {useHistory, useParams} from 'react-router-dom'
import {ModalItemMenu} from './modal-item-menu'
import {Avatar} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {useOrgBasic} from '../../../hooks/org'
import {deleteConfirm} from '../../../UIComponents/modal'
import {useStore} from 'effector-react'
import {$appModel} from '../../../models/app'
import {PERMISSIONS, PROFILE_TYPE} from '../../../constants'
import {useOfferingBasic} from '../../../hooks/offers'

export const SpecialistModalItem = ({activeSpecId, handleSelectSpec, item, direction, size}) => {
    const {push} = useHistory()
    const {organization} = useParams()
    const [show, setShow] = useState(false)
    const divRef = useRef(null)
    const {clicked} = useOutsideClicker(divRef)
    const {$app: {allow}} = useStore($appModel)
    const {removeSpec} = useOrgBasic(organization)

    useEffect(() => {
        if (clicked) {
            setShow(false)
        }
    }, [clicked])

    const actions = [
        {
            type: 'edit',
            onClick: (id) => {
                push(`/${organization}/offerings/specialist/edit/${id}`)
            },
            icon: <EditPenFillSvg/>,
            color: 'var(--primary-dwed)'
        },
        {
            type: 'remove',
            onClick: (id) => deleteConfirm(() => removeSpec(id)),
            icon: <TrashSvg/>,
            color: 'var(--danger-dwed)'
        }
    ]

    const getActiveClassName = useCallback((id) => {
        return activeSpecId && activeSpecId === id ? 'active' : ''
    }, [activeSpecId])

    return (
        <FilterModalContent ref={divRef}>
            <FilterModalItem
                className={getActiveClassName(item.id)}
                onClick={() => handleSelectSpec(item.id)}
            >
                <ShortAccountCard
                    direction={direction}
                    name={item.user.full_name}
                    imgUrl={item.user.avatar}
                    imgSize={size || 60}
                    text={item.job.name}
                    rating={item.rating}
                />
            </FilterModalItem>
            {
                (allow[PERMISSIONS.GRAND] || allow[PERMISSIONS.SPECIALISTS]) && (
                    <ModalItemMenu id={item.id} actions={actions} show={show} setShow={setShow}/>
                )
            }
        </FilterModalContent>
    )
}

export const SpecCatModalItem = ({activeSpecCatId, handleSelectSpecCat, item}) => {
    const {organization} = useParams()
    const {push} = useHistory()
    const [show, setShow] = useState(false)
    const divRef = useRef(null)
    const {clicked} = useOutsideClicker(divRef)
    const {removeSpecCat} = useOrgBasic(organization)
    const {$app: {allow}} = useStore($appModel)

    useEffect(() => {
        if (clicked) {
            setShow(false)
        }
    }, [clicked])


    const actions = [
        {
            type: 'edit',
            onClick: (id) => {
                push(`/${organization}/offerings/specialist_category/edit/${id}`)
            },
            icon: <EditPenFillSvg/>,
            color: 'var(--primary-dwed)'
        },
        {
            type: 'remove',
            onClick: (id) => deleteConfirm(() => removeSpecCat(id)),
            icon: <TrashSvg/>,
            color: 'var(--danger-dwed)'
        }
    ]

    const getActiveClassName = useCallback((id) => {
        return activeSpecCatId && activeSpecCatId === id ? 'active' : ''
    }, [activeSpecCatId])

    return (
        <FilterModalContent ref={divRef}>
            <FilterModalItem
                style={{display: 'block', padding: '8px 16px'}}
                className={getActiveClassName(item.id)}
                onClick={() => handleSelectSpecCat(item.id)}
            >
                {item.name}
            </FilterModalItem>
            {
                (allow[PERMISSIONS.GRAND] || allow[PERMISSIONS.SPECIALISTS]) && (
                    <ModalItemMenu id={item.id} actions={actions} show={show} setShow={setShow}/>
                )
            }
        </FilterModalContent>
    )
}

export const ModalGroupItem = ({activeGroupId, handleSelectGroup, item}) => {
    const {organization} = useParams()
    const {push} = useHistory()
    const [show, setShow] = useState(false)
    const divRef = useRef(null)
    const {clicked} = useOutsideClicker(divRef)
    const {$app: {allow}} = useStore($appModel)
    const {removeOrgOfferGroup} = useOfferingBasic({type: PROFILE_TYPE.ORGANIZATION, slug: organization})

    useEffect(() => {
        if (clicked) {
            setShow(false)
        }
    }, [clicked])

    const actions = [
        {
            type: 'edit',
            onClick: (id) => {
                push(`/${organization}/offerings/offerings_group/edit/${id}`)
            },
            icon: <EditPenFillSvg/>,
            color: 'var(--primary-dwed)'
        },
        {
            type: 'remove',
            onClick: (id) => deleteConfirm(() => removeOrgOfferGroup(id)),
            icon: <TrashSvg/>,
            color: 'var(--danger-dwed)'
        }
    ]

    const getActiveClassName = useCallback((id) => {
        return activeGroupId && activeGroupId === id ? 'active' : ''
    }, [activeGroupId])

    return (
        <FilterModalContent ref={divRef}>
            <FilterModalItem
                className={getActiveClassName(item.id)}
                onClick={() => handleSelectGroup(item.id)}
            >
                <Avatar style={{borderRadius: 6, marginBottom: 8}} src={item.image} size={80}/>
                <Title style={{textAlign: 'center', lineHeight: '1.2'}}>{item.name}</Title>
                {
                    (allow[PERMISSIONS.GRAND] || allow[PERMISSIONS.OFFERINGS]) && (
                        <ModalItemMenu id={item.id} actions={actions} show={show} setShow={setShow}/>
                    )
                }
            </FilterModalItem>
        </FilterModalContent>
    )
}