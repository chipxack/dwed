import React, {useRef} from 'react'
import {
    GalleryImage,
    GalleryImageAction,
    GalleryImageItem,
    GalleryImageUploadWrapper,
    GalleryImageWrapper,
    GalleryMainImage,
    MainImage,
    MainImgBg,
    UploadAction
} from "../atoms";
import {Text} from "../../../UIComponents/typography";
import {useTranslation} from "react-i18next";
import {EditPenFillSvg, PlusSvg} from "../../../media";
import {base64StringtoFile, fileToBase64, resizeFile} from "../../../utils/cropUtils";
import {Tooltip} from "antd";
import {CameraProfSvg} from "../../../media/camera-proffesional";
import {IconBox} from "../../../UIComponents/global-styles";
import {TrashSvg} from "../../../media/trash";
import {v4 as uuidv4} from 'uuid';
import {showImageEditor} from "../../../models/widgets";

export const GalleryImageUpload = ({values, handleChange, changeMainGalleryImage, deleteGalleryImage}) => {
    const {t} = useTranslation()
    const fileUploadRef = useRef(null)

    const onCompleted = (base64Url, id) => {
        const stringUrl = base64Url
        const file = base64StringtoFile(base64Url, 'filename.png')
        const data = {stringUrl, file}
        handleChange(data, id)
    }

    const renderImageEditer = (url, id) => ({
        open: true,
        imgUrl: url,
        methods: {onCompleted: (e) => onCompleted(e, id)}
    })

    const editGalleryImage = (data) => {
        showImageEditor(renderImageEditer(data.stringUrl, data.id))
    }

    const onChange = async (e) => {
        const files = e.target.files
        try {
            if (files.length > 1) {
                const data = []
                for (let i = 0; i < files.length; i++) {
                    const file = await resizeFile(files[i], 'file')
                    const stringUrl = await fileToBase64(file)
                    data.push({stringUrl, file: files[i], main: i === 0, id: uuidv4()})
                }
                handleChange(data)
            } else {
                const file = await resizeFile(files[0], 'file')
                const stringUrl = await fileToBase64(file)
                showImageEditor(renderImageEditer(stringUrl, uuidv4()))
            }


        } catch (e) {
            console.log(e);
        }
    }

    const handleClick = () => {
        fileUploadRef.current.click()
    }

    const mainImage = values && values.length > 0 ? values.find(item => item.main) : null

    return (
        <GalleryImageUploadWrapper>
            <MainImage onClick={handleClick}>
                {
                    mainImage
                        ? <MainImgBg imgUrl={mainImage.stringUrl}/>
                        : (
                            <>
                                <CameraProfSvg/>
                                <Text>
                                    {t('add_photo')}
                                </Text>
                            </>
                        )
                }
            </MainImage>
            <div>
                <GalleryImageWrapper>
                    {
                        values.length > 0 && values.map((value, idx) => (
                            <GalleryImageItem key={`${idx + 1}`}>
                                <GalleryImage imgUrl={value.stringUrl}/>
                                <Tooltip title={t(value.main ? 'main_photo' : 'make_main_photo')}>
                                    <GalleryMainImage
                                        onClick={() => changeMainGalleryImage(value)}
                                        active={value.main}
                                    />
                                </Tooltip>
                                <GalleryImageAction>
                                    <Tooltip title={t('edit')}>
                                        <IconBox onClick={() => editGalleryImage(value)}>
                                            <EditPenFillSvg/>
                                        </IconBox>
                                    </Tooltip>
                                    <Tooltip title={t('delete')}>
                                        <IconBox onClick={() => deleteGalleryImage(value)}>
                                            <TrashSvg/>
                                        </IconBox>
                                    </Tooltip>
                                </GalleryImageAction>

                            </GalleryImageItem>
                        ))
                    }
                    {
                        values && values.length < 16
                        && (
                            <GalleryImageItem>
                                <UploadAction onClick={handleClick}>
                                    <PlusSvg/>
                                    <Text>{t('add')}</Text>
                                    <input
                                        type="file"
                                        accept='.jpg, .jpeg, .png'
                                        ref={fileUploadRef}
                                        onChange={onChange}
                                        readOnly
                                        multiple
                                    />
                                </UploadAction>
                            </GalleryImageItem>
                        )
                    }
                </GalleryImageWrapper>
            </div>
        </GalleryImageUploadWrapper>
    )
}