import {useState} from "react";
import {PaperPlaneSvg} from "../../../media";
import {FastChatFormBlock} from "../atoms";
import {useTranslation} from "react-i18next";
import chat from "../../../service/chat";


export const FastChatForm = ({id, username}) => {
    const {t} = useTranslation()
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const sendMessage = () => {
        setLoading(true)
        const data = {
            text: message,
            reply_to_id: id
        }
        chat.sendMessage(username, data)
            .then(response => {
                if (response.status === 201) {
                    setMessage('')
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                console.error(error.response)
            })
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            sendMessage()
        }
    }



    return (
        <FastChatFormBlock>
            <input
                onKeyDown={onEnterPress}
                type="text"
                placeholder={t('reply')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMessage()} disabled={loading}><PaperPlaneSvg/></button>
        </FastChatFormBlock>
    )
}