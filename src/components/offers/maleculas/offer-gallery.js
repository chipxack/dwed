import React from 'react'
import {useStore} from "effector-react";
import {$offeringModel} from "../../../models/offering-model";
import ImageGallery from 'react-image-gallery';
import {GalleryPhotoItem, LargePhoto, OfferingGallery} from "../atoms";
import {LazyloadImage} from '../../../UIComponents/lazyload-image'
import {SkeletonUI} from '../../../UIComponents/global-styles'

export const OfferGallery = () => {
    const {$offerGalleryStore: {data, skeleton}} = useStore($offeringModel)

    const renderData = () => {
        const tmp = []
        for (let i = 0; i < data.length; i++) {
            tmp.push({
                ...data[i],
                renderItem: (item) => (
                    <LargePhoto>
                        <LazyloadImage saveHeight imgUrl={item.thumbnail} height={300} />
                    </LargePhoto>
                ),
                renderThumbInner: (item) => <GalleryPhotoItem imgUrl={item.thumbnail}/>
            })
        }
        return tmp
    }

    return (
        <>
            {
                skeleton === false && data.length > 0
                && (
                    <OfferingGallery>
                        <ImageGallery
                            items={renderData()}
                            useBrowserFullscreen={false}
                            showPlayButton={false}
                            lazyLoad
                            showNav={false}
                            showFullscreenButton={false}
                            showThumbnails={data.length > 1}
                        />
                    </OfferingGallery>
                )
            }
            {
                (skeleton === undefined || !!skeleton  ) && (
                    <SkeletonUI
                        variant='rect'
                        width='100%'
                        height={300}
                    />
                )
            }
        </>
    )
}

