import {useEffect} from "react";
import {myStreamInfoEvent} from "../../models/stream";


export const StreamEditHook = (stream) => {


    useEffect(() => {
        if (stream){
            const data = {
                chennel_slug: stream
            }

            myStreamInfoEvent(data)
        }

    }, [stream])
}