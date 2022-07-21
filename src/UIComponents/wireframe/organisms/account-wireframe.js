import React from 'react'
import {AccountWireframeContent, AccountWireframeHeader, AccountWireframeMenu,} from '../atoms'
import {Container, SectionWrapper} from '../../global-styles'
import {useStore} from 'effector-react'
import {$appModel} from '../../../models/app'

export const AccountWireframe = ({header, menu, content}) => {
    const {$app: {searchFocus}} = useStore($appModel)
    return (
        <SectionWrapper focused={searchFocus}>
            <Container>
                {
                    header && (
                        <AccountWireframeHeader>
                            {header}
                        </AccountWireframeHeader>
                    )
                }

                {
                    menu && (
                        <AccountWireframeMenu>
                            {menu}
                        </AccountWireframeMenu>
                    )
                }
                <AccountWireframeContent>
                    {content}
                </AccountWireframeContent>
            </Container>
        </SectionWrapper>
    )
}