import React, {useEffect} from 'react'
import ImageUploading from 'react-images-uploading';
import {ImageLoadContainer, ImageLoadDragContainer, UploadedImage} from "../atoms"
import QrcodeDecoder from 'qrcode-decoder';
import {useStore} from "effector-react";
import {$widgets} from "../../../models/widgets";

export const QRCodeScanFromPhoto = ({handleValidate}) => {
    const [images, setImages] = React.useState([]);
    const {$modal: {open}} = useStore($widgets)
    const qr = new QrcodeDecoder();

    const onChange = (imageList) => {
        const imgFile = imageList[0].data_url
        setImages(imageList);
        qr.decodeFromImage(imgFile)
            .then((result) => {
                console.log(result);
                handleValidate(result.data)
            });
    };

    useEffect(() => {
        if(!open) {
            setImages([])
        }
    }, [open])

    return (
        <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
        >
            {({
                  imageList,
                  onImageUpload,
                  isDragging,
                  dragProps,
              }) => (
                <ImageLoadContainer>
                    {
                        images.length === 0
                        && (
                            <ImageLoadDragContainer
                                isDragging={isDragging}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </ImageLoadDragContainer>
                        )
                    }
                    {imageList.map((image, index) => (
                        <UploadedImage key={index}>
                            <img src={image['data_url']} alt="qrcode"/>
                        </UploadedImage>
                    ))}
                </ImageLoadContainer>
            )}
        </ImageUploading>
    )
}