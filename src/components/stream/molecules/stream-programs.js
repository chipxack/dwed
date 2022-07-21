import React from "react";
import {Modal} from "../../modal";
import {useStore} from "effector-react";
import {$isDataPending} from "../../../models/stream";
import {
    AddAnnounce,
    FormTimeBlock,
    StreamProgramForm,
    StreamProgramsBody,
    StreamProgramsHead,
    StreamProgramsSection
} from "../atoms";
import {useTranslation} from "react-i18next";
import {ImageSvg, PlusSvg} from "../../../media";
import {StreamProgramsHooks} from "../../../hooks/stream";
import {Timebox} from "../../account-job/atoms";
import {ClockSvg} from "../../../media/clock";
import {InputUI} from "../../../UIComponents/inputs";
import {ButtonUi} from "../../../ui/atoms";
import {AnnouncementSection} from "../../stream-blok";
import {DatePicker, Row, Col} from "antd";
import locale from 'antd/es/date-picker/locale/ru_RU';
import {SquareCheckBoxSystem} from "../../../ui/molecules";
import {TapeFormContent, TapeFormFooter} from "../../post-block/atoms";


export const StreamPrograms = () => {
    const {t} = useTranslation()
    const isDataPending = useStore($isDataPending)
    const data = isDataPending.$myStreamInfo.result
    const announcementList = isDataPending.$announcementList.data && isDataPending.$announcementList.data.results

    const dateFormat = 'DD.MM.YYYY';

    const {
        modalVisible,
        setModalVisible,
        closeModal,
        // setPostCheck,
        // postCheck,
        // setImage,
        // image,
        setDescription,
        description,
        setName,
        name,
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
    } = StreamProgramsHooks()


    return (
        <StreamProgramsSection>
            <Modal
                // width={820}
                title={t('create_announcement')}
                modalIsOpen={modalVisible}
                setModalIsOpen={() => closeModal()}
                component={
                    <StreamProgramForm onSubmit={typeof modalVisible === 'boolean' ? createAnnouncement : editAnnouncement}>
                        {
                            file && file.length > 0 && <img src={file} alt="announcement"/>
                        }
                        <FormTimeBlock>
                            <span>{t('time')}</span>
                            <ClockSvg/>
                            <Timebox value={date} onChange={(e) => setDate(e)} mode="24h"/>
                        </FormTimeBlock>
                        <InputUI
                            style={{marginTop: 28}}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('announcement_name')}
                        />
                        <InputUI
                            style={{marginTop: 16}}
                            inputType={'textarea'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t('description')}
                        />
                        <TapeFormContent>
                            <span>
                                {t('adding_to_post')}
                            </span>
                            <span>
                                <label htmlFor="image">
                                    <input
                                        onChange={(e) => setImageArr(e)}
                                        hidden type='file' id={'image'}
                                    />
                                    <ImageSvg/>{t('photo&video')}
                                </label>
                            </span>
                        </TapeFormContent>
                        <TapeFormFooter>
                            <span>
                                <SquareCheckBoxSystem
                                    change={setPostAnnounce}
                                    value={postAnnounce}
                                    id='check'
                                    label={t('post_to_tape')}
                                />
                            </span>
                            <ButtonUi
                                disabled={!name || !description || !date || (file && file.length === 0) || loading}
                                loading={loading}
                                style={{display: 'inline-flex'}}
                                htmlType='submit'
                            >
                                {t('submit')}
                            </ButtonUi>
                        </TapeFormFooter>
                    </StreamProgramForm>
                }
            />
            <StreamProgramsHead>
                <div>
                    <img src={data.thumbnail} alt={data.channel_name}/>
                    <span>{data.channel_name}</span>
                </div>
               <div>
                   <DatePicker
                       locale={locale}
                       value={streamDate}
                       onChange={setStreamDate}
                       format={dateFormat}
                   />
               </div>
            </StreamProgramsHead>
            <StreamProgramsBody>
                <h1>{t('announcement')}</h1>
                <Row gutter={16} style={{width: '100%'}}>
                    {
                        announcementList && announcementList.length > 0 &&
                        announcementList.map((item, key) =>
                            <Col span={12} key={key}><AnnouncementSection modal={setModalVisible} data={item}/></Col>
                        )
                    }
                </Row>

                <AddAnnounce>
                    <button onClick={() => setModalVisible(true)}>
                        <span><PlusSvg/></span>{t('add_announcement')}
                    </button>
                </AddAnnounce>
            </StreamProgramsBody>
        </StreamProgramsSection>
    )
}