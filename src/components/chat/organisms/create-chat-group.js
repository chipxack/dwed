import React from "react";
import {InputSystem} from "../../../ui/molecules";
import {SearchSvg} from "../../../media/search";
import {ChatGroupHooks} from "../../../hooks/chat";
import {ChatGroupSection, CreateGroupUserItem, CreateGroupUserList} from "../atoms";
import {ButtonUi} from "../../../ui/atoms";
import {useTranslation} from "react-i18next";


export const CreateChatGroup = ({groupId, closeModal}) => {
    const {t} = useTranslation()

    const {
        usersList,
        checkedUsers,
        nextStatus,
        setNextStatus,
        createGroup,
        groupName,
        setGroupName,
        addPeopleToGroup,
        checkUser
    } = ChatGroupHooks(closeModal)

    return (
        !nextStatus ?
        <ChatGroupSection>
            <InputSystem
                placeholder={`${t('search')}...`}
                // search={}
                icon={<SearchSvg/>}
            />
            <CreateGroupUserList>
                {
                    usersList && usersList.length > 0 &&
                    usersList.map((item, index) =>
                        <CreateGroupUserItem onClick={() => checkUser(item.slug)} status={checkedUsers.indexOf(item.slug) !== -1} key={index}>
                            <img src={item.avatar} alt={item.user_name}/>
                            <span>{item.user_name}</span>
                        </CreateGroupUserItem>
                    )
                }
            </CreateGroupUserList>
            {
                groupId ?
                    <ButtonUi onClick={() => addPeopleToGroup(groupId)}>{t('add')}</ButtonUi> :
                    <ButtonUi onClick={() => setNextStatus('next')}>{t('next')}</ButtonUi>
            }
        </ChatGroupSection> :
            <ChatGroupSection>
                <InputSystem
                    value={groupName}
                    change={setGroupName}
                    placeholder={t('group_name')}
                />
                <ButtonUi onClick={() => createGroup()}>{t('create')}</ButtonUi>
            </ChatGroupSection>
    )
}