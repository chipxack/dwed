import React from 'react'
import {Text, Title} from "../../../UIComponents/typography";
import {ExampleItem, ExampleType, VerifyingInstruction} from "../atoms";
import {useTranslation} from "react-i18next";
import {Col, Row} from "antd";
import example1 from '../../../assets/images/example1.jpg'
import example2 from '../../../assets/images/example2.jpg'
import {CheckLineSvg, CloseSvg} from "../../../media";

export const PhotoInstruction = () => {
    const {t} = useTranslation()
    return (
        <VerifyingInstruction>
            <Title level={4}>{t('instruction')}</Title>
            <Row gutter={24}>
                <Col span={12}>
                    <ExampleItem>
                        <img src={example1} alt="example1"/>
                        <ExampleType type='success'>
                            {t('true')}
                            <CheckLineSvg />
                        </ExampleType>
                    </ExampleItem>
                </Col>
                <Col span={12}>
                    <ExampleItem>
                        <img src={example2} alt="example2"/>
                        <ExampleType type='danger'>
                            {t('false')}
                            <CloseSvg />
                        </ExampleType>
                    </ExampleItem>
                </Col>
            </Row>
            <div style={{marginBottom: 8}}>
                <Title level={5}>
                    {t('attention')}
                </Title>
            </div>
            <div style={{marginBottom: 16}}>
                <Text size={14} color='var(--dark-basic)' lineHeight={20}>
                    {t('photo_suggestion_sentence')}
                </Text>
            </div>
        </VerifyingInstruction>
    )
}