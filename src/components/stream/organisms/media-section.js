import {Col, Row} from "antd";
import {StreamBlock} from "../molecules";
import {MediaContent} from "../atoms";
import React from "react";
import {useStore} from "effector-react";
import {$isDataPending} from "../../../models/stream";
import {useParams} from "react-router-dom";


export const MediaContentSection = () => {
    const isDataPending = useStore($isDataPending)
    const streamList = isDataPending.$streamList.result
    const {account} = useParams()


    return (
        <MediaContent>
            <Row gutter={[25, 25]}>
                {
                    streamList && streamList.results &&
                    streamList.results.map((item, index) =>
                        <Col key={index} span={8}>
                            <StreamBlock url={`/@${account}/media/${item.channel_slug}`} data={item}/>
                        </Col>
                    )
                }
            </Row>
        </MediaContent>
    )
}