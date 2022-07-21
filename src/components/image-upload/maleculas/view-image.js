import React, {useState} from 'react'
import {SimpleImageCrop} from "./simple-crop";
import {AdvancedCrop} from "./advanced-crop";

export const DropzoneViewImage = ({imgData, handleResult}) => {
    const [showAdvancedCrop, setShowAdvancedCrop] = useState(false)

    return (
        <>
            {
                !showAdvancedCrop
                && (
                    <SimpleImageCrop
                        imgData={imgData}
                        setShowAdvancedCrop={setShowAdvancedCrop}
                        handleResult={handleResult}
                    />
                )
            }
            {
                showAdvancedCrop && (
                    <AdvancedCrop
                        imgData={imgData}
                        setShowAdvancedCrop={setShowAdvancedCrop}
                        handleResult={handleResult}
                    />
                )
            }
        </>
    )
}