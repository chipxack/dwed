import React, {useState} from "react";
import {PostOrgItem, PostOrgItemAvatar, PostOrgsBlock} from "../atoms";
import {useTranslation} from "react-i18next";
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {ChevronLeftSvg, ChevronRightSvg, OfficialSvg} from "../../../media";
import user from "../../../service/user";
import {Link} from 'react-router-dom'


const SubBlock = ({userName, t}) => {
    const [status, setStatus] = useState(false);

    const subs = () => {
        if (!status) {
            user.subscribeToUser(userName)
                .then(response => {
                    if (response.status === 201) {
                        setStatus(true)
                    }
                })
        }

    }


    return (
        <span onClick={() => subs()}
              className={`subscribe ${status && 'subscribed'}`}>{t(status ? 'subscribed' : 'subscribe')}</span>
    )
}


export const PostUsersList = ({data}) => {
    const {t} = useTranslation()


    return (
        <PostOrgsBlock>
            <h1>{t('maybe_users')}</h1>
            {
                data && data.length > 0 &&
                <CarouselProvider
                    style={{marginTop: 16}}
                    naturalSlideWidth={310}
                    naturalSlideHeight={380}
                    totalSlides={data.length}
                    visibleSlides={3}
                    infinite={true}
                    className='pure-slider'
                >
                    <Slider>
                        {
                            data.map((item, key) =>
                                <Slide key={key} index={key}>
                                    <PostOrgItem to={`/@${item.username}/offerings`}>
                                        <PostOrgItemAvatar>
                                            <img src={item.avatar} alt={item.full_name}/>
                                            {
                                                item.is_official &&
                                                <OfficialSvg/>
                                            }
                                        </PostOrgItemAvatar>
                                        <Link to={`/@${item.username}/offerings`}>{item.full_name}</Link>
                                        <span>{item.main_cat.name}</span>
                                        {/*<div style={{display: 'block', width: '100%'}}>*/}
                                        {/*    <Row gutter={16}>*/}
                                        {/*        <Col span={8}>*/}
                                        {/*            <CommonProgress*/}
                                        {/*                item={{*/}
                                        {/*                    color: '#2BCBBA',*/}
                                        {/*                    score: item.rating.professional.score,*/}
                                        {/*                    remaining_score: item.rating.professional.remaining_score,*/}
                                        {/*                    level: item.rating.professional.level,*/}
                                        {/*                    column: true*/}
                                        {/*                }}*/}
                                        {/*            />*/}
                                        {/*        </Col>*/}
                                        {/*        <Col span={8}>*/}
                                        {/*            <CommonProgress*/}
                                        {/*                item={{*/}
                                        {/*                    color: '#706FD3',*/}
                                        {/*                    score: item.rating.ethics.score,*/}
                                        {/*                    remaining_score: item.rating.ethics.remaining_score,*/}
                                        {/*                    level: item.rating.ethics.level,*/}
                                        {/*                    column: true*/}
                                        {/*                }}*/}
                                        {/*            />*/}
                                        {/*        </Col>*/}
                                        {/*        <Col span={8}>*/}
                                        {/*            <CommonProgress*/}
                                        {/*                item={{*/}
                                        {/*                    color: '#FD9644',*/}
                                        {/*                    score: item.rating.aesthetics.score,*/}
                                        {/*                    remaining_score: item.rating.aesthetics.remaining_score,*/}
                                        {/*                    level: item.rating.aesthetics.level,*/}
                                        {/*                    column: true*/}
                                        {/*                }}*/}
                                        {/*            />*/}
                                        {/*        </Col>*/}
                                        {/*    </Row>*/}
                                        {/*</div>*/}
                                        <SubBlock userName={item.username} t={t}/>
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