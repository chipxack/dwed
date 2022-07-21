import React, {useCallback, useState} from 'react'
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropUtils";
import {ButtonGrid, ButtonGroup, ButtonUI} from "../../../ui/atoms";
import {CropContainer, CropImageWrapper} from "../atoms";
import {useTranslation} from "react-i18next";
import {hideModal} from "../../../models/widgets";

export const AdvancedCrop = ({imgData, setShowAdvancedCrop, handleResult}) => {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [aspect] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const {t} = useTranslation()

    const handleCropImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imgData.stringUrl,
                croppedAreaPixels,
                rotation,
                imgData.file.type
            )
            handleResult(croppedImage, 'cropped')
            if (setShowAdvancedCrop) {
                setShowAdvancedCrop(false)
            }

            hideModal()
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation, imgData, handleResult, setShowAdvancedCrop])


    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    return (
        <>
            <CropImageWrapper>
                <CropContainer>
                    <Cropper
                        image={imgData.stringUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        cropShape='round'
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onRotationChange={setRotation}
                        onZoomChange={setZoom}
                    />
                </CropContainer>
            </CropImageWrapper>
            <ButtonGroup>
                <ButtonGrid column={2}>
                    {
                        setShowAdvancedCrop
                            ? (
                                <ButtonUI
                                    buttonstyle='link'
                                    size='lg'
                                    onClick={() => setShowAdvancedCrop(false)}
                                >
                                    {t('back')}
                                </ButtonUI>
                            )
                            : (
                                <ButtonUI
                                    buttonstyle='link'
                                    size='lg'
                                    onClick={() => hideModal()}
                                >
                                    {t('cancel')}
                                </ButtonUI>
                            )
                    }

                    <ButtonUI
                        buttonstyle='primary'
                        size='lg'
                        onClick={handleCropImage}
                    >
                        {t('apply')}
                    </ButtonUI>
                </ButtonGrid>
            </ButtonGroup>
        </>
    )
}