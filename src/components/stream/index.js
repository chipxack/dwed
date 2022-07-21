import React from "react";
import {Modal} from "../modal";
import {MediaContentSection, StreamConfig} from './organisms'
import {MediaBlock, MediaBlockHeader} from "./atoms";
import {PlusSvg} from "../../media";
import {StreamHooks} from "../../hooks/stream";
import {CreateChannel} from "./organisms";
import {Route, Switch} from "react-router-dom";
import {useTranslation} from "react-i18next";


export const StreamComponent = () => {
    const {t} = useTranslation()


    const {
        modalVisible,
        setModalVisible,
        formik,
        handleChange,
        slugNameStatus
    } = StreamHooks()


    return (
        <MediaBlock>
            <Modal
                width={820}
                title={t('create_channel')}
                modalIsOpen={modalVisible}
                setModalIsOpen={setModalVisible}
                component={<CreateChannel slugNameStatus={slugNameStatus} handleChange={handleChange} formik={formik}/>}
            />
            <MediaBlockHeader>
                <div/>
                <button onClick={() => setModalVisible(true)}><PlusSvg /></button>
            </MediaBlockHeader>
            <Switch>
                <Route exact path='/@:account/media' component={MediaContentSection}/>
                <Route exact path='/@:account/media/:stream' component={StreamConfig}/>
            </Switch>

        </MediaBlock>
    )
}