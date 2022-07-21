import React from 'react'
import {Container, SectionWrapper, TemplateInfoBlock, TemplateInfoContent} from "../../global-styles";
import {useStore} from "effector-react";
import {$appModel} from "../../../models/app";

export const ReviewsWireframe = ({children}) => {
    const {$app: {searchFocus}} = useStore($appModel)
    return (
        <SectionWrapper focused={searchFocus}>
            <Container>
                <TemplateInfoBlock style={{flexDirection: 'column'}}>
                    <TemplateInfoContent>
                        {children}
                    </TemplateInfoContent>
                </TemplateInfoBlock>
            </Container>
        </SectionWrapper>
    )
}