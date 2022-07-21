import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from "react-dropzone";
import {base64StringtoFile, fileToBase64} from "../../../utils/cropUtils";
import {
    AddIcon,
    DropzoneText,
    DropzoneUploadedImg,
    SecondDropzoneWrapper,
    StyledDropzone,
    UploadIcon,
} from "../atoms";
import {ErrorMessage} from "../../../ui/atoms";
import {Text} from "../../../UIComponents/typography";
import {showImageEditor} from "../../../models/widgets";
import {PictureSvg} from "../../../media/picture";

export const SecondSimpleImageUpload = ({onChange, error, onBlur, label, dropZoneText, size, uploadButtonText, value}) => {
    const [result, setResult] = useState(null)

    const onCompleted = useCallback((base64Url) => {
        const params = {
            stringUrl: base64Url,
            file: base64StringtoFile(base64Url, 'filename.png')
        }
        setResult(params)
        onChange(params)
    }, [onChange])

    const renderImageEditor = useCallback((url) => ({
        open: true,
        imgUrl: url,
        methods: {onCompleted}
    }), [onCompleted])

    const onDrop = useCallback(async (file) => {
        try {
            const stringUrl = await fileToBase64(file[0])
            const params = {
                stringUrl,
                file: file[0]
            }
            setResult(params)
            onChange(params)
            showImageEditor(renderImageEditor(stringUrl))
        } catch (e) {
            console.log(e);
        }
    }, [onChange, renderImageEditor])

    const onFileDialogCancel = () => {
        onBlur()
    }

    const options = {
        onDrop,
        onFileDialogCancel,
        accept: ['image/x-png', 'image/jpeg', 'image/png'],
    }

    useEffect(() => {
        if (value) {
            setResult(value)
        } else {
            setResult(null)
        }
    }, [value])

    const {getRootProps, getInputProps, isDragActive} = useDropzone(options)

    return (
        <SecondDropzoneWrapper size={size}>
            <StyledDropzone
                error={!!error}
                {...getRootProps()}
                isDragActive={isDragActive}
            >
                <input {...getInputProps()} />
                {
                    result && result.stringUrl
                        ? <DropzoneUploadedImg imgUrl={result.stringUrl}/>
                        : (
                            <>
                                <AddIcon>
                                    <PictureSvg/>
                                </AddIcon>
                                <DropzoneText>
                                    {dropZoneText}
                                </DropzoneText>
                            </>
                        )
                }
                <UploadIcon>
                    {uploadButtonText}
                </UploadIcon>
            </StyledDropzone>
            {label && <Text size={14}>{label}</Text>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </SecondDropzoneWrapper>
    )
}