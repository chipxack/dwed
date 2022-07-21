import React from 'react'
import {IconBox} from '../../../UIComponents/global-styles'
import {MoreVerticalSvg} from '../../../media'
import {FilterModalActionWrapper, OfferingFilterActions, OfferingFilterActionsInnerWrapper} from '../atoms'
import {useTranslation} from 'react-i18next'

export const ModalItemMenu = ({show, setShow, actions, id}) => {
    const {t} = useTranslation()

    return (
        <OfferingFilterActions>
            <OfferingFilterActionsInnerWrapper>
                <IconBox onClick={() => setShow(!show)}>
                    <MoreVerticalSvg/>
                </IconBox>
                <FilterModalActionWrapper show={show}>
                    {
                        actions.map((action, x) => (
                            <IconBox
                                onClick={() => action.onClick(id)}
                                key={`${x + 1}`}
                                style={{color: action.color}}
                            >
                                {action.icon}
                                {t(action.type)}
                            </IconBox>
                        ))
                    }
                </FilterModalActionWrapper>
            </OfferingFilterActionsInnerWrapper>
        </OfferingFilterActions>
    )
}