import React from "react";
import {useStore} from "effector-react";
import {$isDataPending} from "../../../models/stream";
import {Row, Col, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {StreamBlock, StreamSkeleton} from '../../../components/stream/molecules'
import {HomeList} from "../atoms";
import {generateSkeleton} from '../../../utils/skeletonUtils'

const skeletonData = generateSkeleton(9)

export const StreamingList = ({loadList}) => {
    const {$allStreamsList: {data, result, skeleton, status, loading}} = useStore($isDataPending)
    // const [goToSlide, setGoToSlide] = useState(0);
    // const [offsetRadius, setOffsetRadius] = useState(4);

    return (
        <HomeList>
            {/*<Carousel*/}
            {/*    slides={this.slides}*/}
            {/*    goToSlide={goToSlide}*/}
            {/*    offsetRadius={offsetRadius}*/}
            {/*    showNavigation={true}*/}
            {/*    // animationConfig={config.gentle}*/}
            {/*/>*/}

            {/*<Splide options={ { rewind: true, perPage: 5, type: 'loop', focus: 'center'} }>*/}
            {/*    {*/}
            {/*        data?.length > 0 && data.map((item, index) =>*/}
            {/*            <SplideSlide key={index}>*/}
            {/*                <img src={item.thumbnail} alt={item.channel_name}/>*/}
            {/*            </SplideSlide>*/}

            {/*        )*/}
            {/*    }*/}
            {/*    <SplideSlide>*/}
            {/*        <img src="image1.jpg" alt="Image 1"/>*/}
            {/*    </SplideSlide>*/}
            {/*    <SplideSlide>*/}
            {/*        <img src="image2.jpg" alt="Image 2"/>*/}
            {/*    </SplideSlide>*/}
            {/*</Splide>*/}

            {
                skeleton === false && (
                    <InfiniteScroll
                        dataLength={result.nextOffset || 20}
                        next={() => loadList(result.nextOffset, status)}
                        hasMore={!loading && !!result.next}
                        loader={<Spin size='small' />}
                        style={{overflow: 'unset'}}
                    >
                        <Row gutter={[16, 16]}>
                            {
                                data.length > 0 && data.map((item, index) =>
                                    <Col span={8} key={index}>
                                        <StreamBlock
                                            data={item}
                                            url={`/stream/${item.channel_slug}`}
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                    </InfiniteScroll>
                )
            }
            {
                (skeleton === undefined || skeleton) && (
                    <Row gutter={[16, 16]}>
                        {
                            skeletonData.map((item, idx) => (
                                <Col span={8} key={`${idx + 1}`}>
                                    <StreamSkeleton />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </HomeList>
    )
}