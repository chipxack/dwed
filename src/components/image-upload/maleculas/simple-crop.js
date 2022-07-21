import React from 'react'
import {EditUploadImage, ImageViewWrapper} from "../atoms";
import {ButtonGrid, ButtonGroup} from "../../../ui/atoms";
import {ButtonUI} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";
import {EditPenFillSvg} from "../../../media";
import {hideModal} from "../../../models/widgets";

export const SimpleImageCrop = ({imgData, setShowAdvancedCrop, handleResult}) => {
    const {t} = useTranslation()
    const handleClick = () => {
        handleResult(null, 'original')
        hideModal()
    }

    return (
        <>
            <ImageViewWrapper>
                <EditUploadImage onClick={() => (setShowAdvancedCrop(true))}>
                    <ButtonUI buttonstyle='link'>
                        <EditPenFillSvg/>
                    </ButtonUI>
                </EditUploadImage>
                {
                    imgData && <img src={imgData.stringUrl} alt="uploadImage"/>
                }

            </ImageViewWrapper>
            <ButtonGroup>
                <ButtonGrid column={2}>
                    <ButtonUI
                        buttonstyle='link'
                        size='lg'
                        onClick={() => hideModal()}
                    >
                        {t('cancel')}
                    </ButtonUI>
                    <ButtonUI
                        buttonstyle='primary'
                        size='lg'
                        onClick={handleClick}
                    >
                        {t('apply')}
                    </ButtonUI>
                </ButtonGrid>
            </ButtonGroup>
        </>

    )
}