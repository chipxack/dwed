import {ChatNotificationBlock} from "../atoms";
import {CloseSvg} from "../../../media";


export const ChatNotification = ({type, children, visible, closeNotification}) => {


    return (
        <ChatNotificationBlock type={type} visible={visible}>
            <CloseSvg onClick={closeNotification} className={'close-svg'}/>
            <div>
                {children}
            </div>
        </ChatNotificationBlock>
    )
}