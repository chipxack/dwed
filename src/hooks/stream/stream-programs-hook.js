import {useEffect, useState} from "react";
import {base64StringtoFile, fileToBase64} from "../../utils/cropUtils";
import stream from "../../service/stream";
import {useParams} from "react-router-dom";
import moment from "moment";
import {announcementListEvent} from "../../models/stream";
import {showMessage} from "../../UIComponents/message-notification";
import {MESSAGES} from "../../constants";

const getTime = (timeStr) => {
    return new Date(`${new Date().toDateString()} ${timeStr}`)
}


export const StreamProgramsHooks = () => {
    const {stream: streamName} = useParams()


    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(undefined);
    const [postCheck, setPostCheck] = useState(false);
    const [file, setFile] = useState([])
    const [date, setDate] = useState(getTime('00:00'))
    const [streamDate, setStreamDate] = useState(moment());
    const [loading, setLoading] = useState(false)
    const [postAnnounce, setPostAnnounce] = useState(false);

    useEffect(() => {
        if (streamName) {
            const date = moment(streamDate)
            const params = {
                channel_slug: streamName,
                limit: 50,
                date_gte: date.format('YYYY-MM-DDT00:00:00'),
                date_lte: date.add(1, 'days').format('YYYY-MM-DDT00:00:00')
            }

            announcementListEvent(params)
        }
    }, [streamName, streamDate]);

    useEffect(() => {
        if (typeof modalVisible !== 'boolean'){
            modalVisible.title && setName(modalVisible.title)
            modalVisible.description && setDescription(modalVisible.description)
            modalVisible.image && setFile(modalVisible.image)
            modalVisible.date && setDate(getTime(modalVisible.date.split('+')[1]))
            modalVisible.postCheck && setDate(modalVisible.postCheck)
        }
    }, [modalVisible])


    const setImageArr = (e) => {
        fileToBase64(e.target.files[0]).then(result => {
            setFile(result)
        })
    }

    const createAnnouncement = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', base64StringtoFile(file, `name.${file.split(';')[0].split('/')[1]}`))
        formData.append('title', name)
        formData.append('description', description)
        formData.append('create_post', `${postAnnounce}`)
        formData.append('date', `${moment(streamDate).format('YYYY-MM-DD')}T${moment(date).format('HH:mm:ss')}`)
        // formData.append('date', new Date())
        setLoading(true)
        stream.addAnnouncementChannel(streamName, formData)
            .then(response => {
                if (response.status === 201) {
                    const date = moment(streamDate)
                    const params = {
                        channel_slug: streamName,
                        limit: 10,
                        date_gte: date.format('YYYY-MM-DDT00:00:00'),
                        date_lte: date.add(1, 'days').format('YYYY-MM-DDT00:00:00')
                    }
                    announcementListEvent(params)
                    setLoading(false)
                    showMessage(MESSAGES.ANNOUNCEMENT_CREATED, 'success')
                    setModalVisible(false)
                    setName('')
                    setDescription('')
                    setFile([])
                    setDate(getTime('00:00'))
                }
            })
            .catch(error => {
                setLoading(false)
                console.error(error.response)
            })
    }

    const editAnnouncement = (e) => {
        e.preventDefault()
        const formData = new FormData()
        file !== modalVisible.image && formData.append('image', base64StringtoFile(file, `name.${file.split(';')[0].split('/')[1]}`))
        name !== modalVisible.title && formData.append('title', name)
        description !== modalVisible.description && formData.append('description', description)
        date !== getTime(modalVisible.date.split('+')[1]) && formData.append('date', `${moment(streamDate).format('YYYY-MM-DD')}T${moment(date).format('HH:mm:ss')}`)
        setLoading(true)
        stream.editAnnouncementChannel(streamName, modalVisible.id, formData)
            .then(response => {
                if (response.status === 200) {
                    const date = moment(streamDate)
                    const params = {
                        channel_slug: streamName,
                        limit: 50,
                        date_gte: date.format('YYYY-MM-DDT00:00:00'),
                        date_lte: date.add(1, 'days').format('YYYY-MM-DDT00:00:00')
                    }
                    announcementListEvent(params)
                    setLoading(false)
                    showMessage(MESSAGES.ANNOUNCEMENT_CREATED, 'success')
                    setModalVisible(false)
                    setName('')
                    setDescription('')
                    setFile([])
                    setDate(getTime('00:00'))
                }
            })
            .catch(error => {
                setLoading(false)
                console.error(error.response)
            })
    }

    const closeModal = () => {
        setModalVisible(false)
        setName('')
        setDescription('')
        setFile([])
        setDate(getTime('00:00'))
    }


    return {
        modalVisible,
        setModalVisible,
        closeModal,
        name,
        setName,
        description,
        setDescription,
        image,
        setImage,
        postCheck,
        setPostCheck,
        setImageArr,
        file,
        createAnnouncement,
        date,
        setDate,
        loading,
        streamDate,
        setStreamDate,
        postAnnounce,
        setPostAnnounce,
        editAnnouncement
    }
}