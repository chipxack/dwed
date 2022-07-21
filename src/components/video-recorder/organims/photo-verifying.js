import React from 'react'
import {GridBasic} from '../../../ui/atoms'
import {PhotoVerifyingWrapper} from '../atoms'
import {PhotoActionRender, PhotoInstruction} from '../moleculas'

export const PhotoVerifying = ({handleChange, onlyTakePhoto}) => {
    return (
        <PhotoVerifyingWrapper>
            {
                onlyTakePhoto
                    ? <PhotoActionRender onlyTakePhoto={onlyTakePhoto} sendPhoto={(data) => handleChange(data)}/>
                    : (
                        <GridBasic perColumn={2} gap={48}>
                            <PhotoActionRender sendPhoto={(data) => handleChange(data)}/>
                            <PhotoInstruction/>
                        </GridBasic>
                    )
            }
        </PhotoVerifyingWrapper>
    )
}