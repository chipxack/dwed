import React from "react";
import {Row, Col} from 'antd'
import {
    AddOfferCategoryList,
    AddOfferToPostSection,
    AddPostOfferBlock,
    OfferCatBlock,
    OfferSpecBlock,
    OfferToPostHeader,
    OfferToPostLeft
} from "../atoms";
import {ArrowLeftSvg, CheckMarkSquareCheckedSvg, CheckMarkSquareUncheckedSvg} from "../../../media";
import {useTranslation} from "react-i18next";
import {InputSystem} from "../../../ui/molecules";
import {SearchSvg} from "../../../media/search";
import {OfferToPostHooks} from "../../../hooks/tape";
import InfiniteScroll from "react-infinite-scroller";
import {useStore} from "effector-react";
import Masonry from "react-responsive-masonry"
import {$organizationModel} from "../../../models/organization-models";
import {$offeringModel} from "../../../models/offering-model";
import {$accountModel} from "../../../models/accountModel";


export const AddOfferToPost = ({back, selectOffer, selectSpecId, setSelectSpecId, setSelectOffer}) => {
    const {t} = useTranslation()
    const orgModel = useStore($organizationModel)
    const offersModel = useStore($offeringModel)
    const accountModel = useStore($accountModel)
    const currentProfile = accountModel.$profiles && accountModel.$profiles.currentProfile
    const slugName = currentProfile.slug_name
    const profileType = currentProfile.type
    const currency = currentProfile && currentProfile.currency && currentProfile.currency.code
    const lang = currentProfile && currentProfile.lang
    const offersData = offersModel.$allOfferingList && offersModel.$allOfferingList.data
    const categoriesData = offersModel.$offeringGroupList && offersModel.$offeringGroupList.data
    const moreList = offersModel.$offeringGroupList.result && offersModel.$offeringGroupList.result.next
    const loading = offersModel.$offeringGroupList.loading
    const orgSpecialistsCategoryList = orgModel.$specialistCategoryList && orgModel.$specialistCategoryList.data
    const moreSpecialistsCat = orgModel.$specialistCategoryList && orgModel.$specialistCategoryList.result && orgModel.$specialistCategoryList.result.next
    const loadingSpecialistsCat = orgModel.$specialistCategoryList.loading
    const orgSpecialistsList = orgModel.$specialistsOrganization && orgModel.$specialistsOrganization.data
    const moreSpecialists = orgModel.$specialistsOrganization && orgModel.$specialistsOrganization.result && orgModel.$specialistsOrganization.result.next
    const loadingSpecialists = orgModel.$specialistsOrganization.loading

    const {
        changeSpecId,
        handleScrollOffersCats,
        more,
        handleScrollSpecialistsCats,
        handleScrollSpecialists,
        selectCategory,
        selectOfferCat,
        changeSpecCatId,
        changeOfferId,
    } = OfferToPostHooks(slugName, profileType, selectOffer, selectSpecId, setSelectSpecId, setSelectOffer)

    return (
        <AddOfferToPostSection>
            <OfferToPostHeader>
                <span onClick={() => back()}>
                    <ArrowLeftSvg/>
                    {t('back')}
                </span>
                <InputSystem
                    icon={<SearchSvg/>}
                    style={{width: 200}}
                    placeholder='Поиск'
                />
            </OfferToPostHeader>
            <Row gutter={32}>
                <Col span={8}>
                    <OfferToPostLeft>
                        <h1>{t('offers_cats')}</h1>
                        <AddOfferCategoryList>
                            <InfiniteScroll
                                // loader={<Spin indicator={antIcon}/>}
                                hasMore={
                                    !more && !loading && moreList
                                }
                                useWindow={false}
                                className='scroll-chat'
                                initialLoad={false}
                                pageStart={0}
                                loadMore={() => handleScrollOffersCats(categoriesData)}
                            >
                                {
                                    categoriesData && categoriesData.length > 0 &&
                                    categoriesData.map((item, key) =>
                                        !more ?
                                            <OfferCatBlock
                                                status={selectOfferCat === item.id}
                                                onClick={() => selectCategory(item.id)}
                                                key={item.id}
                                            >
                                                <span>
                                                    <img src={item.image} alt={item.name}/>
                                                </span>
                                                <span>{item.name}</span>
                                            </OfferCatBlock> : key < 5 &&
                                            <OfferCatBlock
                                                status={selectOfferCat === item.id}
                                                onClick={() => selectCategory(item.id)}
                                                key={item.id}
                                            >
                                                    <span>
                                                        <img src={item.image} alt={item.name}/>
                                                    </span>
                                                <span>{item.name}</span>
                                            </OfferCatBlock>
                                    )
                                }
                                {/*{*/}
                                {/*    !more && <ButtonUi>{t('all')}</ButtonUi>*/}
                                {/*}*/}
                            </InfiniteScroll>

                        </AddOfferCategoryList>
                    </OfferToPostLeft>

                    <OfferToPostLeft>
                        <h1>{t('specialists_cats')}</h1>
                        <AddOfferCategoryList>
                            <InfiniteScroll
                                // loader={<Spin indicator={antIcon}/>}
                                hasMore={
                                    !more && !loadingSpecialistsCat && moreSpecialistsCat
                                }
                                useWindow={false}
                                className='scroll-chat'
                                initialLoad={false}
                                pageStart={0}
                                loadMore={() => handleScrollSpecialistsCats(orgSpecialistsCategoryList)}
                            >
                                {
                                    orgSpecialistsCategoryList && orgSpecialistsCategoryList.length > 0 &&
                                    orgSpecialistsCategoryList.map((item, key) =>
                                        !more ?
                                            <OfferCatBlock onClick={() => changeSpecCatId(item.id)}
                                                           key={item.id}>
                                                <span dangerouslySetInnerHTML={{__html: item.image}}/>
                                                <span>{item.name}</span>
                                            </OfferCatBlock> : key < 5 &&
                                            <OfferCatBlock onClick={() => changeSpecCatId(item.id)}
                                                           key={item.id}>
                                                <span dangerouslySetInnerHTML={{__html: item.image}}/>
                                                <span>{item.name}</span>
                                            </OfferCatBlock>
                                    )
                                }
                                {/*{*/}
                                {/*    !more && <ButtonUi>{t('all')}</ButtonUi>*/}
                                {/*}*/}
                            </InfiniteScroll>

                        </AddOfferCategoryList>
                    </OfferToPostLeft>

                    <OfferToPostLeft>
                        <h1>{t('specialists')}</h1>
                        <AddOfferCategoryList>
                            <InfiniteScroll
                                // loader={<Spin indicator={antIcon}/>}
                                hasMore={
                                    !more && !loadingSpecialists && moreSpecialists
                                }
                                useWindow={false}
                                className='scroll-chat'
                                initialLoad={false}
                                pageStart={0}
                                loadMore={() => handleScrollSpecialists(orgSpecialistsList)}
                            >
                                {
                                    orgSpecialistsList && orgSpecialistsList.length > 0 &&
                                    orgSpecialistsList.map((item, key) =>
                                        !more ?
                                            <OfferSpecBlock
                                                onClick={() => changeSpecId(item.id)}
                                                key={item.id}
                                                status={selectSpecId === item.id}
                                            >
                                                <img src={item.image} alt={item.name}/>
                                                <div>
                                                    <h1>{item.name}</h1>
                                                    <span>{item.text}</span>
                                                </div>
                                            </OfferSpecBlock> : key < 5 &&
                                            <OfferSpecBlock
                                                onClick={() => changeSpecId(item.id)}
                                                key={item.id}
                                                status={selectSpecId === item.id}
                                            >
                                                <img src={item.image} alt={item.name}/>
                                                <div>
                                                    <h1>{item.name}</h1>
                                                    <span>{item.text}</span>
                                                </div>
                                            </OfferSpecBlock>
                                    )
                                }
                                {/*{*/}
                                {/*    !more && <ButtonUi>{t('all')}</ButtonUi>*/}
                                {/*}*/}
                            </InfiniteScroll>

                        </AddOfferCategoryList>
                    </OfferToPostLeft>
                </Col>
                <Col span={16}>
                    <InfiniteScroll
                        // loader={<Spin indicator={antIcon}/>}
                        hasMore={
                            !more && !loadingSpecialists && moreSpecialists
                        }
                        useWindow={false}
                        className='scroll-chat'
                        initialLoad={false}
                        pageStart={0}
                        loadMore={() => handleScrollSpecialists(orgSpecialistsList)}
                    >
                        <Masonry gutter='24px' columnsCount={3}>
                            {
                                offersData && offersData.length > 0 &&
                                offersData.map(item =>
                                    <AddPostOfferBlock
                                        status={selectOffer.indexOf(item.id) !== -1}
                                        onClick={() => changeOfferId(item.id)}
                                        key={item.id}
                                    >
                                        <img src={item.image} alt={item.name}/>
                                        <h1>
                                            <span>{item.name}</span>
                                            {
                                                selectOffer.indexOf(item.id) !== -1 ?
                                                    <CheckMarkSquareCheckedSvg/> :
                                                    <CheckMarkSquareUncheckedSvg/>
                                            }
                                        </h1>
                                        <span>
                                            {
                                                lang && currency && item.cost.toLocaleString(lang, {
                                                    style: 'currency',
                                                    currency
                                                })
                                            }
                                        </span>
                                    </AddPostOfferBlock>
                                )
                            }
                        </Masonry>
                    </InfiniteScroll>
                </Col>
            </Row>
        </AddOfferToPostSection>
    )
}