import React from 'react'
import {
    Container,
    ContentInfoBlock,
    ContentSection,
    LeftInfoBlockWrap,
    TemplateInfoBlock,
    TemplateInfoContent
} from "../atoms";

export const SettingsWireframe = ({sidebar, content, header}) => {
    return (
        <Container>
            <TemplateInfoBlock>
                <LeftInfoBlockWrap>
                    {sidebar ? sidebar : 'this place for sidebar'}
                </LeftInfoBlockWrap>
                <ContentInfoBlock>
                    <ContentSection>
                        {header ? header : 'this place for content header'}
                    </ContentSection>
                    <TemplateInfoContent>
                        {content ? content : 'this place for content'}
                    </TemplateInfoContent>
                </ContentInfoBlock>
            </TemplateInfoBlock>
        </Container>
    )
}