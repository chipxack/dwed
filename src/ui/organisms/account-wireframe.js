import React from 'react'
import {
    AccountWireframeHeader,
    Container,
    AccountWireframeContent,
    AccountWireframeMenu,
    TemplateBlock
} from "../atoms";

export const AccountWireframe = ({header, menu, content}) => {
    return (
        <Container>
            <TemplateBlock>
                <AccountWireframeHeader>
                    {header}
                </AccountWireframeHeader>
                <AccountWireframeMenu>
                    {menu}
                </AccountWireframeMenu>
                <AccountWireframeContent>
                    {content}
                </AccountWireframeContent>
            </TemplateBlock>
        </Container>
    )
}