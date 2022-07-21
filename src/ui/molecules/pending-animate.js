import React from "react";
import {PendingAnimateUI} from "../atoms";
// import pendingSound from '../../media/1111.aac'


export const PendingAnimate = () => {

    // useEffect(() => {
    //     if (pendingSound){
    //         const audio = new Audio()
    //         audio.src = pendingSound;
    //         audio.play()
    //     }
    // }, [pendingSound])

    return(
        <PendingAnimateUI>
            <span />
            <span />
            <span />
            {/*<audio src={pendingSound} autoPlay={true} controls={true} />*/}
        </PendingAnimateUI>
    )
}