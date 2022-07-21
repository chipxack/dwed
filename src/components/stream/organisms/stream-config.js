import React from "react";
import {NavLink, useLocation, useParams} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {StreamConfigRouts, StreamConfigSection} from "../atoms";
import {useUrlParams} from "../../../hooks/common";
import {EditChannel, StreamPrograms} from "../molecules";
import {StreamEditHook} from "../../../hooks/stream";


export const StreamConfig = () => {
    const {t} = useTranslation()
    const location = useLocation()


    const {stream, account} = useParams()

    const {urlData} = useUrlParams(location.search)

    StreamEditHook(stream)


    return (
        <StreamConfigSection>
            <StreamConfigRouts>
                <NavLink
                    isActive={() => urlData && (urlData.type === undefined || urlData.type === 'settings')}
                    to={`/@${account}/media/${stream}?type=settings`}
                >
                    {t('stream-settings')}
                </NavLink>
                {/*<NavLink*/}
                {/*    isActive={() => urlData && urlData.type && urlData.type === 'analytics'}*/}
                {/*    to={`/@${account}/media/${stream}?type=analytics`}*/}
                {/*>*/}
                {/*    {t('analytics')}*/}
                {/*</NavLink>*/}
                <NavLink
                    isActive={() => urlData && urlData.type && urlData.type === 'program'}
                    to={`/@${account}/media/${stream}?type=program`}
                >
                    {t('program')}
                </NavLink>
            </StreamConfigRouts>
            {
                urlData && (urlData.type === undefined || urlData.type === 'settings') ?
                    <EditChannel/> :
                    urlData.type === 'program' &&
                    <StreamPrograms/>
            }


        </StreamConfigSection>
    )
}