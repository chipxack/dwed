import React from 'react'
import {ReviewForm, ReviewSpecialistInfo} from "../atoms";
import {useTranslation} from "react-i18next";
import {Col, Row} from "antd";
import {RateProgress, ReviewInput} from "../maleculas";
import {useReviewForm} from "../../../hooks/reviews";
import {ButtonGroup, ButtonUI} from "../../../ui/atoms";
import {ShortAccountCard, ShortAccountCardSkeleton} from "../../../components/card";
import {useStore} from "effector-react";
import {$orderModel} from "../../../models/order-models";

export const ReviewsForm = () => {
    const {formik} = useReviewForm()
    const {t} = useTranslation()
    const {$orderInfo: {data, loading}} = useStore($orderModel)

    return (
        <ReviewForm onSubmit={formik.handleSubmit}>
            <Row gutter={[24, 24]} justify='center'>
                <Col span={16}>
                    <Row gutter={24} justify='center'>
                        <Col span={12}>
                            {
                                loading && <ShortAccountCardSkeleton size={160} direction='vertical'/>
                            }
                            {
                                !loading && data.responsible
                                && (
                                    <ReviewSpecialistInfo>
                                        <ShortAccountCard
                                            imgSize={160}
                                            direction='vertical'
                                            text={data.responsible.job.name}
                                            imgUrl={data.responsible.user.avatar}
                                            name={data.responsible.user.full_name}
                                            isOfficial={data.responsible.user.is_official}
                                        />
                                    </ReviewSpecialistInfo>
                                )
                            }
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <RateProgress formik={formik}/>
                </Col>
                <Col span={16}>
                    <ReviewInput formik={formik}/>
                </Col>
                <Col span={16}>
                    <ButtonGroup style={{justifyContent: 'flex-end'}}>
                        <ButtonUI
                            size='lg'
                            htmlType='submit'
                        >
                            {t('save')}
                        </ButtonUI>
                    </ButtonGroup>
                </Col>
            </Row>
        </ReviewForm>
    )
}