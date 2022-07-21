import {useCallback, useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import tape from '../../service/tape'
import {$isDataPending, getTapeListEvent} from '../../models/tape'
import {getUserSubscribe} from '../../models/user-models'
import {showImageEditor} from '../../models/widgets'
import {base64StringtoFile, fileToBase64} from '../../utils/cropUtils'
import {useTranslation} from 'react-i18next'
import {
    changeTextForm,
    createFileForm,
    editFileForm,
    getOrgTapeListEvent,
    getUserTapeListEvent,
    removePostFile,
    resetFileForm,
} from '../../models/tape/events'
import {$accountModel} from '../../models/accountModel'


export const PostToTapeHook = (visible, setVisible) => {
    const {t} = useTranslation()
    const [title, setTitle] = useState(undefined)
    const [text, setText] = useState(undefined)
    const [fileArr, setFileArr] = useState([])
    const [offerStatus, setOfferStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)

    const accountModel = useStore($accountModel)
    const postForm = useStore($isDataPending).$postForm
    const currentProfile = accountModel.$profiles && accountModel.$profiles.currentProfile


    //ADD OFFERS
    const [selectSpecId, setSelectSpecId] = useState(undefined)
    const [selectOffer, setSelectOffer] = useState([])
    //======>>>>

    const removeItem = useCallback((key) => {
        removePostFile(key)
        if (visible && visible.id && postForm && postForm.file && postForm.file[key] && postForm.file[key].id) {
            const id = visible.id,
                imageId = postForm.file[key].id
            tape.deleteMediaForPost(id, imageId)
        }
    }, [postForm.file])

    const editImage = useCallback((imgUrl, key) => {
        showImageEditor({
            open: true, imgUrl, methods: {
                onCompleted: (e) => {
                    const data = postForm.file
                    data[key].value = e
                    editFileForm(data[key])
                },
            },
        })
    }, [postForm.file])


    useEffect(() => {
        if (postForm.file && postForm.file.length > 0) {
            // const fileData = postForm.file.map((item, key) => ({
            //     renderItem: () =>
            //         <TapeFormImageBlock>
            //             {
            //                 item.type === 'image' &&
            //                 <ButtonUI
            //                     className='effects'
            //                     onClick={() => editImage(item.value, key)}
            //                 >
            //                     <MagicWindSvg/>{t('effects')}
            //                 </ButtonUI>
            //             }
            //             <ButtonUI className='trash' onClick={() => removeItem(key)}><TrashSvg/></ButtonUI>
            //             {
            //                 item.loading &&
            //                 <Progress type="circle" percent={item.loading} width={80}/>
            //
            //             }
            //             {
            //                 item.type === 'image' ?
            //                     <img src={item.value} alt={'slide'}/> :
            //                     <video src={item.value} controls='hidden'/>
            //
            //             }
            //         </TapeFormImageBlock>,
            //     renderLeftNav(onClick, disabled) {
            //         return (
            //             <button
            //                 className='image-gallery-custom-left-nav'
            //                 disabled={disabled}
            //                 onClick={onClick}/>
            //         )
            //     },
            //     renderRightNav(onClick, disabled) {
            //         return (
            //             <button
            //                 className='image-gallery-custom-right-nav rrrr'
            //                 disabled={disabled}
            //                 onClick={onClick}/>
            //         )
            //     }
            // }))
            // setFileArr(fileData)
        } else {
            setFileArr([])
        }
    }, [postForm.file, editImage, removeItem, t])

    useEffect(() => {
        if (visible && visible.id) {
            changeTextForm(visible.text)

            visible.medias.map(item =>
                createFileForm({
                    id: item.id,
                    type: item.image !== null ? 'image' : 'video',
                    value: item.image !== null ? item.image : item.file,
                    error: false,
                }),
            )
        }
    }, [visible])


    const createPost = (e) => {
        e && e.preventDefault()
        const data = {
            text: postForm.text,
            offerings: selectOffer && selectOffer.length > 0 ? selectOffer : undefined,
            offerings_responsible: selectSpecId,
        }
        visible && visible.id ?
            tape.editPost(currentProfile.type === 'organization' && currentProfile.slug_name, visible.id, data)
                .then(response => {
                    if (response.status === 200) {
                        if (postForm.file && postForm.file.length > 0 && response && response.data && response.data.id) {
                            // file.map(item => {
                            //         const formData = new FormData()
                            //         formData.append('image', base64StringtoFile(item.value, `name.${item.value.split(';')[0].split('/')[1]}`))
                            //         tape.setMediaForPost(response.data.id, formData)
                            //         return []
                            //     }
                            // )

                            const data = []
                            postForm.file.map(item => data.push({gallery_id: item.id}))

                            tape.setMediaForPost(response.data.id, data)
                                .then(response => console.log('response', response))
                            resetFileForm()
                            setFileArr([])
                        }
                        changeTextForm('')
                        setLoading(false)
                        setVisible(false)
                        const params = {
                            limit: 10,
                            offset: 0,
                            slug_name: currentProfile.type === 'organization' && currentProfile.slug_name,
                        }
                        getTapeListEvent(params)
                    }
                })
                .catch(error => console.error(error.response)) :
            tape.createPost(currentProfile.type === 'organization' ? currentProfile.slug_name : undefined, data)
                .then(response => {
                    if (response.status === 201) {
                        if (postForm.file && postForm.file.length > 0 && response && response.data && response.data.id) {
                            // file.map(item => {
                            //         const formData = new FormData()
                            //         formData.append('image', base64StringtoFile(item.value, `name.${item.value.split(';')[0].split('/')[1]}`))
                            //         tape.setMediaForPost(response.data.id, formData)
                            //         return []
                            //     }
                            // )

                            const data = []
                            postForm.file.map(item => data.push({gallery_id: item.id}))

                            tape.setMediaForPost(response.data.id, data)
                                .then(response => console.log('response', response))
                            resetFileForm()
                            setFileArr([])
                        }
                        changeTextForm('')
                        setLoading(false)
                        setVisible(false)
                        const params = {
                            limit: 10,
                            offset: 0,
                            slug_name: currentProfile.type === 'organization' && currentProfile.slug_name,
                        }
                        getTapeListEvent(params)
                        getOrgTapeListEvent(params)
                    }
                })
                .catch(error => console.error(error.response))

    }
    const setImageArr = (e) => {
        const fileList = e.target.files

        for (let i = 0; i < fileList.length; i++) {
            const oneFile = fileList[i]
            const uuid = uuidv4()
            fileToBase64(oneFile).then(result => {
                const type = result.split(';')[0].split('/')[0].split(':')[1]
                createFileForm({
                    uuid,
                    loading: 0,
                    type,
                    value: result,
                    error: false,
                })

                const formData = new FormData()
                formData.append(type === 'video' ? 'file' : 'image', base64StringtoFile(result, `name.${result.split(';')[0].split('/')[1]}`))

                const onUploadProgress = (e) => {
                    const onePercentSize = e.total / 100
                    const loadingPercent = Math.round(e.loaded / onePercentSize)
                    editFileForm({
                        uuid,
                        loading: loadingPercent === 100 ? 99 : loadingPercent,
                    })
                }
                tape.createMediaForPost(formData, onUploadProgress)
                    .then(response => {
                        console.log(response.data)
                        if (response.status === 201) {
                            editFileForm({
                                uuid,
                                id: response.data.id,
                                loading: 100,
                            })
                        }
                    })
            })
        }
    }

    const closeModal = () => {
        resetFileForm()
        changeTextForm('')
        setVisible(false)
    }

    return {
        visible,
        setVisible,
        title,
        setTitle,
        createPost,
        text,
        setText,
        editImage,
        setImageArr,
        fileArr,
        offerStatus,
        setOfferStatus,
        loading,
        selectOffer,
        setSelectOffer,
        selectSpecId,
        setSelectSpecId,
        inputFocus,
        setInputFocus,
        closeModal,
        postForm,
        removeItem,
    }
}

export const TapeHooks = () => {
    const [offset, setOffset] = useState(0)
    const [subscribeOffset, setSubscribeOffset] = useState(0)
    const accountModel = useStore($accountModel)
    const currentProfile = accountModel.$profiles && accountModel.$profiles.currentProfile
    const currentProfileSlugName = currentProfile?.slug_name

    useEffect(() => {
        const paramsData = {
            params: {
                limit: 10,
                offset,
            },
            headers: currentProfileSlugName === 'organization' && currentProfileSlugName ? {'org-slug-name': currentProfileSlugName} : undefined,
        }

        getTapeListEvent(paramsData)
    }, [currentProfileSlugName, offset, currentProfile])

    const handleScroll = (list) => {
        if (list && list.length > 0) {
            setOffset(list.length)
        }
    }

    return {
        offset,
        setOffset,
        setSubscribeOffset,
        subscribeOffset,
        handleScroll,
    }
}

export const UserTapeHooks = () => {
    const {account} = useParams()
    const [subscribeOffset, setSubscribeOffset] = useState(0)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (account) {
            const data = {
                username: account,
                params: {
                    limit: 4,
                    offset: subscribeOffset,
                },
            }
            getUserSubscribe(data)
        }
    }, [account, subscribeOffset])

    useEffect(() => {
        const params = {
            limit: 10,
            offset,
            author: account,
        }

        getUserTapeListEvent(params)

    }, [account, offset])

    const handleScroll = (list) => {
        if (list && list.length > 0) {
            setOffset(list.length)
        }
    }

    return {
        subscribeOffset,
        setSubscribeOffset,
        handleScroll,
    }
}

export const OrgTapeHooks = () => {
    const {organization} = useParams()
    const [subscribeOffset, setSubscribeOffset] = useState(0)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (organization) {
            const data = {
                username: organization,
                params: {
                    limit: 4,
                    offset: subscribeOffset,
                },
            }
            getUserSubscribe(data)
        }
    }, [organization, subscribeOffset])

    useEffect(() => {
        const params = {
            limit: 10,
            offset,
            author: organization,
        }

        getOrgTapeListEvent(params)

    }, [organization, offset])

    const handleScroll = (list) => {
        if (list && list.length > 0) {
            setOffset(list.length)
        }
    }

    return {
        subscribeOffset,
        setSubscribeOffset,
        handleScroll,
    }
}
