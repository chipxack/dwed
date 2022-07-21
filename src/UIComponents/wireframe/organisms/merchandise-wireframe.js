import React from 'react'
import {Container, SectionWrapper} from '../../global-styles'
import {MerchandiseContent, MerchandiseHeader} from '../atoms'
import {useStore} from 'effector-react'
import {$appModel} from '../../../models/app'

export const MerchandiseWireframe = ({header, content}) => {
    const {$app: {searchFocus}} = useStore($appModel)
    return (
        <SectionWrapper focused={searchFocus}>
            <Container>
                <MerchandiseHeader>
                    {header}
                </MerchandiseHeader>
                <MerchandiseContent>
                    {content}
                </MerchandiseContent>
            </Container>
        </SectionWrapper>
    )
}