import React from "react";
import {PostOfferBlock, PostOfferItem, PostOfferOrg, PostPrice} from "../atoms";
import {useTranslation} from "react-i18next";
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {ChevronLeftSvg, ChevronRightSvg, ShoppingBagSvg} from "../../../media";
import {useStore} from "effector-react";
import {$accountModel} from "../../../models/accountModel";
import {ButtonUI} from "../../../ui/atoms";
import {useCreateCart} from "../../../hooks/order";


class PostSellerBlock extends React.Component {
    render() {
        return null;
    }
}

export const PostOffersItem = ({data}) => {
    const {t} = useTranslation()
    const accountModel = useStore($accountModel)
    const currentProfile = accountModel.$profiles && accountModel.$profiles.currentProfile
    const currency = currentProfile && currentProfile.currency && currentProfile.currency.code
    const lang = currentProfile && currentProfile.lang

    const {handleChangeCart} = useCreateCart({fromDetail: true})

    return (
        <PostOfferBlock>
            <h1>{t('top_offers')}</h1>
            {
                data && data.length > 0 &&
                <CarouselProvider
                    style={{marginTop: 16}}
                    naturalSlideWidth={170}
                    naturalSlideHeight={200}
                    totalSlides={data.length}
                    visibleSlides={3}
                    infinite={true}
                    className='pure-slider'
                >
                    <Slider>
                        {
                            data.map((item, key) =>
                                <Slide key={key} index={key}>
                                    <PostOfferItem to={`/${item.slug_name}/offerings`}>
                                        <img src={item.image} alt={item.name}/>
                                        <h1>{item.name}</h1>
                                        {
                                            item.org !== null ?
                                                <PostSellerBlock>
                                                    <img src={item.org.logo} alt={item.org.name}/>
                                                </PostSellerBlock> :
                                                <PostSellerBlock>
                                                    <img src={item.user.logo} alt={item.user.name}/>
                                                </PostSellerBlock>

                                        }
                                        <PostOfferOrg>
                                            <img src={item.org.logo} alt={item.org.name}/>
                                            <span>{item.org.name}</span>
                                        </PostOfferOrg>
                                        <PostPrice>
                                            <span>
                                                {
                                                    lang && currency && item.cost.toLocaleString(lang, {style: 'currency', currency})
                                                }
                                            </span>
                                            <ButtonUI onClick={() => handleChangeCart(item)}><ShoppingBagSvg/></ButtonUI>
                                        </PostPrice>
                                    </PostOfferItem>
                                </Slide>
                            )
                        }
                    </Slider>
                    <ButtonBack className='slider-buttons slider-buttons-left'><ChevronLeftSvg/></ButtonBack>
                    <ButtonNext className='slider-buttons slider-buttons-right'><ChevronRightSvg/></ButtonNext>
                </CarouselProvider>
            }

        </PostOfferBlock>
    )
}