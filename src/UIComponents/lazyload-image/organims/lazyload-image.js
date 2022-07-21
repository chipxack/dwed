import React, {useState} from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

export const LazyloadImage = ({alt, imgUrl, effect, height, saveHeight}) => {
    const [loading, setIsLoading] = useState(true)
    return (
        <LazyLoadImage
            alt={alt}
            effect={effect || 'opacity'}
            src={imgUrl}
            afterLoad={() => setIsLoading(false)}
            height={saveHeight ? height : loading ? height : undefined}
            threshold={200}
        />
    )
}