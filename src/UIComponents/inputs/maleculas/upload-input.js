import React, {useRef} from 'react'
import {UploadInputWrapper} from "../atoms";
import {ButtonUI} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";
import {AttachSvg} from "../../../media/attach";
import {IconBox} from "../../global-styles";
import {CloseSvg} from "../../../media";

export const UploadInput = ({value, onChange}) => {
    const {t} = useTranslation()
    const uploadRef = useRef(null)

    return (
        <UploadInputWrapper>
            <ButtonUI size='lg' onClick={() => uploadRef.current.click()}>
                <AttachSvg/>
                {t('files')}
            </ButtonUI>
            <input
                readOnly
                value={value ? value.name : ''}
                onChange={() => false}
                placeholder={t('select_photo_video_to_upload')}
            />
            {
                value && (
                    <IconBox onClick={() => onChange(null)}>
                        <CloseSvg/>
                    </IconBox>
                )
            }

            <input
                ref={uploadRef}
                type="file"
                onChange={(e) => onChange(e.target.files[0])}
                style={{display: 'none'}}
            />
        </UploadInputWrapper>
    )
}