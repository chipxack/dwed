import React from "react";
// import {Row, Col} from 'antd'
import {Link} from 'react-router-dom'
import {PostStreamBlock, PostStreamLive, PostStreamSection, PostStreamWatcher, StreamThumbnail} from "../atoms";
import {useTranslation} from "react-i18next";
// import {LogoBlock} from "../../../ui/molecules";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {ChevronLeftSvg, ChevronRightSvg, EyeSvg} from "../../../media";


export const PostStreamsList = ({data}) => {
    const {t} = useTranslation()

    return (
        <PostStreamSection>
            <h1>{t('streams')}</h1>
            {/*<Row gutter={24}>*/}
                {
                    data && data.length > 0 &&
                    <CarouselProvider
                        // style={{marginTop: 16}}
                        naturalSlideWidth={170}
                        naturalSlideHeight={145}
                        totalSlides={data.length}
                        visibleSlides={3}
                        infinite={true}
                        className='pure-slider fullscreen'
                    >
                        <Slider>
                            {
                                data.map((item, key) =>
                                    <Slide key={key} index={key}>
                                        <PostStreamBlock>
                                            <Link to={`/stream/${item.channel_slug}`}>
                                                <img src={item.logo} alt={item.channel_name}/>
                                                {/*<LogoBlock style={{position: 'absolute', left: 0, top: 0}} image={item.logo} label={item.channel_name}/>*/}
                                                <PostStreamWatcher>
                                                    <EyeSvg/>
                                                    {item.live_watchers}
                                                </PostStreamWatcher>
                                                {
                                                    item.live_at &&
                                                    <PostStreamLive>Live</PostStreamLive>
                                                }

                                                <StreamThumbnail img={item.thumbnail} alt={item.channel_name}/>
                                                <h2>{item.live_schedule && item.live_schedule.title}</h2>
                                            </Link>
                                        </PostStreamBlock>
                                    </Slide>

                                )
                            }
                        </Slider>
                        <ButtonBack className='slider-buttons slider-buttons-left'><ChevronLeftSvg/></ButtonBack>
                        <ButtonNext className='slider-buttons slider-buttons-right'><ChevronRightSvg/></ButtonNext>
                    </CarouselProvider>

                }
            {/*</Row>*/}
        </PostStreamSection>
    )
}