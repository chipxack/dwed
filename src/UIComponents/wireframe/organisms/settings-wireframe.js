import React from 'react'
import {ContentInfoBlock, ContentSection, LeftInfoBlockWrap,} from '../atoms'
import {Container, SectionWrapper, TemplateInfoContent} from '../../global-styles'
import {useStore} from 'effector-react'
import {$appModel} from '../../../models/app'
import {Col, Row} from 'antd'
import {Title} from '../../typography'

export const SettingsWireframe = ({sidebar, content, header, title}) => {
    const {$app: {searchFocus}} = useStore($appModel)
    return (
        <SectionWrapper focused={searchFocus}>
            <Container>
                <Row gutter={[48, 24]}>
                    <Col span={24}>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Title level={3} weight={600}>
                                    {title}
                                </Title>
                            </Col>
                            <Col span={18}>
                                <ContentSection>
                                    {header ? header : 'this place for content header'}
                                </ContentSection>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{borderRight: '1px solid var(--input-bg)'}}>
                        <LeftInfoBlockWrap>
                            {sidebar ? sidebar : 'this place for sidebar'}
                        </LeftInfoBlockWrap>
                    </Col>
                    <Col span={18}>
                        <ContentInfoBlock>
                            <TemplateInfoContent>
                                {content ? content : 'this place for content'}
                            </TemplateInfoContent>
                        </ContentInfoBlock>
                    </Col>
                </Row>
            </Container>
        </SectionWrapper>
    )
}