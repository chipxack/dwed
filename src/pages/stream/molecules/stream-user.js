import React from "react";
import {StreamLogoBlock, StreamUserBlock, StreamUserBody, StreamUserTitle} from "../atoms";
import {EyeSvg, LiveSvg} from "../../../media";


export const StreamUser = ({data, currentSchedule}) => {

    return (
        <StreamUserBlock live={data.live_at}>
            <>
                <StreamLogoBlock live={data.live_at}>
                    <img src={data && data.logo} alt={data && data.channel_name}/>
                    {
                        data.live_at &&
                        <LiveSvg/>
                    }
                </StreamLogoBlock>
                <StreamUserTitle>
                    <h1>
                        {currentSchedule?.title || data?.channel_name}
                    </h1>
                    <span>
                        <EyeSvg/>
                        {
                            data.live_watchers
                        }
                    </span>
                    <div>
                        {
                            data?.user?.full_name
                        }
                    </div>
                </StreamUserTitle>
                <StreamUserBody>
                    {
                        currentSchedule?.description || data?.description
                    }
                </StreamUserBody>
            </>
        </StreamUserBlock>
    )
}