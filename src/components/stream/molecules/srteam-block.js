import React from 'react'
import {StreamBg, StreamBody, StreamSection, StreamTitle} from '../atoms'
import {LiveSvg} from '../../../media'
import {useTranslation} from 'react-i18next'


export const StreamBlock = ({data, url}) => {
    const {t} = useTranslation()

    return (
        <StreamSection live={data.live_at} to={url}>
            <StreamBg image={data.thumbnail}>
                <div className={'bg'}/>
                {
                    data.live_at &&
                    <div className={'live-block'}>
                        <LiveSvg/>
                        <div>
                            <span>
                            {t('watching', {count: data.live_watchers})}
                        </span>
                        </div>

                    </div>
                }
            </StreamBg>
            <StreamBody>
                <img src={data.logo} alt={data.channel_name}/>
                <StreamTitle>
                    {
                        data.live_schedule ? data.live_schedule.title : data.channel_name
                    }
                    {
                        // data.live_schedule &&
                        <span>
                            {
                                data?.category?.name
                            }
                            {/*{`${t('watching')} ${data.live_watchers}`}*/}
                        </span>
                    }

                </StreamTitle>
                {/*{*/}
                {/*    data.live_at &&*/}
                {/*    <LiveWatchersBlock>*/}
                {/*        <LiveWatchers>*/}
                {/*            <EyeFillSvg/>*/}
                {/*            <span>{data.live_watchers}</span>*/}
                {/*        </LiveWatchers>*/}
                {/*    </LiveWatchersBlock>*/}
                {/*}*/}
            </StreamBody>
        </StreamSection>
    )
}