import React from "react";
import {Row, Col} from 'antd'
import {PostOrgItem, PostOrgsBlock} from "../atoms";
import {useTranslation} from "react-i18next";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {CommonProgress} from "../../../components/progres";
import {ChevronLeftSvg, ChevronRightSvg} from "../../../media";
import {Link} from 'react-router-dom'


export const PostOrgsList = ({data}) => {
    const {t} = useTranslation()

    return (
        <PostOrgsBlock>
            <h1>{t('popular_orgs')}</h1>
            {
                data && data.length > 0 &&
                <CarouselProvider
                    style={{marginTop: 16}}
                    naturalSlideWidth={170}
                    naturalSlideHeight={234}
                    totalSlides={data.length}
                    visibleSlides={5}
                    infinite={true}
                    className='pure-slider'
                >
                    <Slider>
                        {
                            data.map((item, key) =>
                                <Slide key={key} index={key}>
                                    <PostOrgItem>
                                        <img src={item.logo} alt={item.name}/>
                                        <Link to={`/${item.slug_name}/offerings`}>{item.name}</Link>
                                        <span>{item.category.name}</span>
                                        <div style={{display: 'block', width: '100%'}}>
                                            <Row gutter={16}>
                                                <Col span={8}>
                                                    <CommonProgress
                                                        item={{
                                                            color: '#2BCBBA',
                                                            score: item.rating.professional.score,
                                                            remaining_score: item.rating.professional.remaining_score,
                                                            level: item.rating.professional.level,
                                                            column: true
                                                        }}
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <CommonProgress
                                                        item={{
                                                            color: '#706FD3',
                                                            score: item.rating.ethics.score,
                                                            remaining_score: item.rating.ethics.remaining_score,
                                                            level: item.rating.ethics.level,
                                                            column: true
                                                        }}
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <CommonProgress
                                                        item={{
                                                            color: '#FD9644',
                                                            score: item.rating.aesthetics.score,
                                                            remaining_score: item.rating.aesthetics.remaining_score,
                                                            level: item.rating.aesthetics.level,
                                                            column: true
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </PostOrgItem>
                                </Slide>
                            )
                        }
                    </Slider>
                    <ButtonBack className='slider-buttons slider-buttons-left'><ChevronLeftSvg/></ButtonBack>
                    <ButtonNext className='slider-buttons slider-buttons-right'><ChevronRightSvg/></ButtonNext>
                </CarouselProvider>
            }

        </PostOrgsBlock>
    )
}