import React, {useEffect, useRef, useState} from 'react'
import {Slider} from 'antd'
import Hls from 'hls.js'
import {
    AnimateButtonsBlock,
    DwedPlayerBlock,
    PlayerControlBar,
    PlayerControlLeft,
    PlayerControlRight,
    PlayerVolumeBlock
} from './atoms'
import {
    DwedFullScreenMaximizeSvg,
    DwedFullScreenMinimizeSvg, DwedInfoSvg,
    DwedPauseSvg,
    DwedPlaySvg, DwedRollingSvg,
    DwedVolumeDownSvg,
    DwedVolumeMuteSvg,
    DwedVolumeUpSvg,
} from "./media";
import {VideoError} from "./atoms/block";
import {useTranslation} from "react-i18next";
import {ButtonUI} from "../../ui/atoms";


export const DwedPlayer = (props) => {
    const {
        url,
        hotKey
    } = props
    const {t} = useTranslation()
    const playerRef = useRef(null)
    const playerBlockRef = useRef(null)

    const [volume, setVolume] = useState(10);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [animateButton, setAnimateButton] = useState(undefined);
    const [error, setError] = useState(false);
    const [showControl, setShowControl] = useState(false);

    const playVideo = () => {
        setAnimateButton('play')
        console.log('playerRef.current', playerRef.current)
        // playerRef?.current?.play()
        setPaused(false)
        setTimeout(() => {
            setAnimateButton(undefined)
        }, 300)
        // playerRef.current.muted = true
    }

    const pauseVideo = () => {
        setAnimateButton('pause')
        playerRef?.current?.pause()
        setPaused(true)
        setTimeout(() => {
            setAnimateButton(undefined)
        }, 300)
        // playerRef.current.muted = false
    }
    const togglePlayPauseVideo = () => {
        if (playerRef?.current?.paused || playerRef?.current?.ended) {
            playVideo()
        } else {
            pauseVideo()
        }
    }
    //
    // const toggleControls = () => {
    //     playerRef.current.controls = !playerRef.current.controls;
    // }

    const changeFullScreen = () => {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            setFullScreen(false)
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            setFullScreen(true)
            const element = playerBlockRef?.current;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }
    const muteVideo = () => {
        playerRef.current.muted = !playerRef.current.muted
        setMuted(!muted)
    }

    const changeVolume = (e) => {
        setVolume(e)
        if (e === 0) {
            setMuted(true)
            playerRef.current.muted = true
        } else {
            setMuted(false)
            playerRef.current.muted = false
        }
        playerRef.current.volume = (e / 10)
    }

    // function togglePictureInPicture() {
    //     if (document.pictureInPictureElement) {
    //         console.log('noP')
    //         document.exitPictureInPicture()
    //     } else {
    //         console.log('yes')
    //         if (document.pictureInPictureEnabled) {
    //             console.log('yesP')
    //             playerRef.current.requestPictureInPicture()
    //         }
    //     }
    // }


    function vidCtrl(e) {
        if (document.getElementsByTagName('body')[0] === document.activeElement) {
            e.preventDefault()
            const key = e.code;
            if (key === 'Space') {
                togglePlayPauseVideo()
            }
            if (key === 'KeyF') {
                changeFullScreen()
            }
        } else {
            return e
        }
    }

    useEffect(() => {
        if (!error &&playerRef && playerRef.current) {
            if (hotKey) {
                window.addEventListener('keydown', vidCtrl)
            }

            setVolume(playerRef.current.volume * 10)
            setPaused(playerRef.current.paused)
            setMuted(playerRef.current.muted)
            playerRef.current.removeAttribute('controls')
            //
            if (playerRef?.current?.canPlayType('application/vnd.apple.mpegurl')) {
                setError(false)
                playerRef.current.src = url;
                playerRef.current.addEventListener('waiting', function (e) {
                    setLoading(true)
                })
                playerRef.current.addEventListener('canplay', function (e) {
                    setLoading(false)
                })
                playerRef.current.onloadeddata = () => {
                    setLoading(false)
                    playVideo()
                }
                playerRef.current.addEventListener('error', function (e) {
                    setLoading(false)
                    setError(true)
                })

            } else if (Hls.isSupported()) {
                const hls = new Hls({
                    enableWorker: false,
                    debug: true,
                    xhrSetup: function (xhr,url) {
                        xhr.withCredentials = true; // do send cookie
                        xhr.setRequestHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With");
                        xhr.setRequestHeader("Origin","https://dwed.biz");
                        xhr.setRequestHeader("Access-Control-Allow-Credentials","true");
                    }
                })
                hls.attachMedia(playerRef.current);
                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    hls.loadSource(url)
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        setLoading(false)
                        playVideo()
                    })
                })


                hls.on(Hls.Events.ERROR, function (event, data) {
                    if (data.fatal) {
                        setLoading(false)
                        setError(true)
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                hls.recoverMediaError();
                                break;
                            default:
                                // _initPlayer();
                                break;
                        }
                    }
                })

            } else {
                alert('Please use a modern browser to play the video');
            }

        }

        return () => {
            window.removeEventListener('keydown', vidCtrl)
        }

    }, [playerRef, error]);

    let timeout
    const mouseMoveEvent = () => {
        !showControl && setShowControl(true)
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout && clearTimeout(timeout)
            setShowControl(false)
        }, 5000)
    }

    // useEffect(() => {
    //     let timeout = null
    //     window.addEventListener('mousemove', (e) => {
    //         if (playerBlockRef && playerBlockRef.current && playerBlockRef.current.contains(e.target)) {
    //             setHideControl(true)
    //             timeout = setTimeout(() => {
    //                 setHideControl(false)
    //             },5000)
    //         }
    //     })
    //
    //     return () => {
    //       window.removeEventListener('mousemove', () => false)
    //         clearTimeout(timeout)
    //     }
    //
    // }, [playerBlockRef])

    // playerRef?.current?.ontimeupdate((e) => console.log('time', e))
    return (
        <DwedPlayerBlock
            className={`${fullScreen ? 'full-screen' : ''} ${showControl ? 'active' : ''}`}
            ref={playerBlockRef}
        >
            {
                !error ?
                    <>
                        <AnimateButtonsBlock
                            onClick={() => togglePlayPauseVideo()}
                            onMouseMove={() => mouseMoveEvent()}
                        >
                            {
                                loading && <DwedRollingSvg/>
                            }
                            {
                                !loading && animateButton &&
                                animateButton === 'play' ?
                                    <div className={'animate'}>
                                        <DwedPlaySvg/>
                                    </div>
                                    : animateButton === 'pause' ?
                                        <div className={'animate'}>
                                            <DwedPauseSvg/>
                                        </div> : null

                            }
                        </AnimateButtonsBlock>
                        <video
                            autoPlay={true}
                            playsInline
                            onClick={() => togglePlayPauseVideo()}
                            // tabIndex="-1"
                            ref={playerRef}
                        />
                        <PlayerControlBar
                            onMouseMove={() => {
                                timeout && clearTimeout(timeout)
                                !showControl && setShowControl(true)
                            }}
                        >
                            <PlayerControlLeft>
                                <button id='playButton' className={'player-buttons'}
                                        onClick={() => paused ? playVideo() : pauseVideo()}>
                                    {
                                        paused ?
                                            <DwedPlaySvg/> :
                                            <DwedPauseSvg/>
                                    }
                                </button>
                                <PlayerVolumeBlock>
                                    <button className={'player-buttons'} onClick={() => muteVideo()}>
                                        {
                                            !muted && volume > 5 ?
                                                <DwedVolumeUpSvg/> :
                                                !muted && volume > 0 ?
                                                    <DwedVolumeDownSvg/> :
                                                    <DwedVolumeMuteSvg/>
                                        }
                                    </button>
                                    <Slider
                                        min={0}
                                        max={10}
                                        onChange={changeVolume}
                                        defaultValue={10}
                                        value={volume}
                                        tipFormatter={null}
                                    />
                                </PlayerVolumeBlock>
                            </PlayerControlLeft>
                            <PlayerControlRight>
                                <button className={'player-buttons'} onClick={() => changeFullScreen()}>
                                    {
                                        fullScreen ?
                                            <DwedFullScreenMinimizeSvg/> :
                                            <DwedFullScreenMaximizeSvg/>
                                    }
                                </button>
                            </PlayerControlRight>
                        </PlayerControlBar>
                    </> :
                    <VideoError>
                        <div>
                            <DwedInfoSvg/>
                            {t('error')}
                        </div>
                        <ButtonUI
                            style={{'background': '#7F92A0', borderColor: '#7F92A0', marginTop: 17, textTransform: 'initial'}}
                            onClick={() => {
                                setError(false)
                            }}
                        >
                            {t('try-again')}
                        </ButtonUI>
                    </VideoError>
            }

        </DwedPlayerBlock>
    )

}
