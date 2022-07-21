import React, {useState} from 'react'
import {Tabs} from 'antd'
import {ChatTemplateBlock} from '../atoms'
import {AllChats, CreateChatGroup} from '../organisms'
import {ModalCustom} from '../../modal/atoms'
import {useTranslation} from 'react-i18next'


export const ChatTemplate = ({chatVisible, setCount}) => {
    const {t} = useTranslation()
    const {TabPane} = Tabs
    const [visible, setVisible] = useState(false)
    // const [newChatVisible, setNewChatVisible] = useState(false)


    // const menu = (
    //     <ChatMenu>
    //         <ChatMenu.Item key="0" onClick={() => setNewChatVisible(true)}>
    //             <span><EditPenFillSvg/>{t('new_chat')}</span>
    //         </ChatMenu.Item>
    //         <ChatMenu.Item onClick={() => setVisible(true)} key="1">
    //             <span><PeopleSvg/>{t('new_group')}</span>
    //         </ChatMenu.Item>
    //     </ChatMenu>
    // );


    return (
        <ChatTemplateBlock status={chatVisible}>

            <ModalCustom
                title={t('create_chat_group')}
                footer={null}
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <CreateChatGroup closeModal={() => setVisible(false)}/>
            </ModalCustom>

            {/*<ModalCustom*/}
            {/*    width={904}*/}
            {/*    title={t('new_chat')}*/}
            {/*    footer={null}*/}
            {/*    visible={newChatVisible}*/}
            {/*    onCancel={() => setNewChatVisible(false)}*/}
            {/*>*/}
            {/*    <NewChat closeModal={() => setNewChatVisible(false)}/>*/}
            {/*</ModalCustom>*/}

            {/*<ChatTemplateBlockTitle>*/}
            {/*    <span>*/}
            {/*        {t('chats')}*/}
            {/*    </span>*/}
            {/*    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">*/}
            {/*        <ButtonUi><PlusSvg/></ButtonUi>*/}
            {/*    </Dropdown>*/}

            {/*</ChatTemplateBlockTitle>*/}
            <Tabs defaultActiveKey='1'>
                <TabPane tab={t('chats')} key='1'>
                    <AllChats setCount={setCount}/>
                </TabPane>
                {/* {
                    appData.prodsMode === ENVIRONMENT_MODE.DEVELOPMENT &&
                    <TabPane tab={t('chat_group')} key='2'>
                        <AllGroups/>
                    </TabPane>
                } */}

                {/*<TabPane tab="Папки" key="3">*/}
                {/*    Content of Tab Pane 3*/}
                {/*</TabPane>*/}
            </Tabs>
        </ChatTemplateBlock>
    )
}