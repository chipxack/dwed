import styled from "styled-components";
import {ButtonUI} from "../../../ui/atoms";
import {StyledText} from "../../../UIComponents/typography/atoms";
import {IconBox} from "../../../UIComponents/global-styles";

export const StyledDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--input-bg);
  border: 2px dashed ${(
          {
            isDragActive,
            error
          }
  ) => error ? 'var(--danger-dwed)' : isDragActive ? 'var(--primary-dwed)' : 'var(--grey-dwed)'};
  border-radius: 4px;
  padding: 6px;
  position: relative;
  outline: none;
  cursor: pointer;
  width: 190px;
  height: 190px;
  transition: .2s all ease;

  &:hover {
    border-color: var(--primary-dwed);
  }
`

export const DropzoneUploadedImg = styled.div`
  background-image: url("${({imgUrl}) => imgUrl}");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`

export const UploadIcon = styled.div`
  position: absolute;
  right: -8px;
  bottom: -8px;
  z-index: 2;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: var(--primary-dwed);
  color: #fff;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const AddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  svg {
    color: var(--grey-basic);
    width: 32px;
    height: 32px;
  }
`

export const DropzoneText = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.25px;
  color: var(--grey-basic);
`

export const CropContainer = styled.div`
  position: relative;
  height: 300px;
`

export const CropImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`

export const ImageViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: auto;
  }
`

export const EditUploadImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${ButtonUI} {
    color: #fff;
    background-color: rgba(0, 0, 0, .3);
    padding: 0;
    width: 50px !important;
    height: 50px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: rgba(0, 0, 0, .5);
      color: #fff;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const DropzoneWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${StyledText} {
    color: #636366;
  }
`

export const SecondDropzoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.size === 'fluid' ? '100%' : props.size === 'middle' ? '293px' : props.size === 'small' ? '130px' : 'initial'};

  ${StyledText} {
    color: #636366;
  }

  ${UploadIcon} {
    border-radius: 4px;
    height: 40px;
    display: inline-flex;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    bottom: -64px;
    left: 0;
    width: 188px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
  }

  ${StyledDropzone} {
    width: 100%;
    height: ${props => props.size === 'fluid' ? '100%' : props.size === 'middle' ? '214px' : props.size === 'small' ? '96px' : 'initial'};
    margin-bottom: 64px;
  }
`

export const GalleryImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
`

export const GalleryImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({imgUrl}) => imgUrl ? `url("${imgUrl}")` : 'unset'};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`

export const UploadAction = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--grey-basic);
  cursor: pointer;
  transition: .2s ease all;

  &:hover {
    color: var(--primary-dwed);

    ${StyledText} {
      color: var(--primary-dwed);
    }
  }

  input {
    display: none;
  }

  svg {
    margin-bottom: 8px;
  }
`

export const GalleryMainImage = styled.div`
  position: absolute;
  z-index: 5;
  width: 14px;
  height: 14px;
  background-color: #fff;
  border: 1px solid var(--primary-dwed);
  border-radius: 50%;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: .2s ease all;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--primary-dwed);
    border-radius: 50%;
    opacity: ${({active}) => active ? 1 : 0};
    transition: .2s ease-in all;
  }
`

export const GalleryImageAction = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  display: flex;
  align-items: center;
  transition: .2s ease;
  transform: translate(-50%, -50%);

  ${IconBox} {
    margin: 0 4px;
    background-color: #fff;
    padding: 2px;
    border-radius: 2px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .1);

    &:first-child {
      color: var(--primary-dwed)
    }

    &:last-child {
      color: var(--danger-dwed)
    }
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

export const GalleryImageItem = styled.div`
  width: 100%;
  height: 100px;
  border: 2px solid #E4E9F2;
  box-shadow: var(--shadow-dwed);
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  transition: .2s ease all;
  position: relative;

  &:hover {
    border-color: var(--primary-dwed);

    ${GalleryImageAction} {
      opacity: 1;
    }

    ${GalleryMainImage}, ${IconBox} {
      opacity: 1;
    }
  }
`

export const MainImage = styled.div`
  border-radius: 4px;
  border: 1px dashed var(--grey-basic);
  background-color: var(--input-bg);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--grey-basic);
  width: 300px;
  height: 340px;
  padding: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }

  svg {
    margin-bottom: 16px;
  }
`

export const MainImgBg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${({imgUrl}) => imgUrl}");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`

export const GalleryImageUploadWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 24px;
`
export const AvatarUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: var(--input-bg) ${({imgUrl}) => imgUrl && `url("${imgUrl}")`} no-repeat center center;
  background-size: cover;
  position: relative;
  cursor: pointer;
  color: var(--grey-basic);

  svg {
    width: 60px;
    height: 60px;
  }

  input[type="file"] {
    display: none;
  }
`

export const AvatarUploadBox = styled.div`
  width: 32px;
  height: 32px;
  background-color: var(--primary-dwed);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: absolute;
  right: 0;
  bottom: 0;

  svg {
    width: 14px;
    height: 14px;
    color: #fff;
  }
`
