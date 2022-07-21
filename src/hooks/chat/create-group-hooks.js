import {useEffect, useState} from "react";
import Cookies from 'js-cookie'
import user from '../../service/user'
import jwtDecode from "jwt-decode";
import chat from "../../service/chat";


export const ChatGroupHooks = (closeModal) => {
    const [usersList, setUsersList] = useState(undefined)
    const [checkedUsers, setCheckedUsers] = useState([])
    const [nextStatus, setNextStatus] = useState(undefined)
    const [groupName, setGroupName] = useState(undefined)
    const token = Cookies.get('token')

    useEffect(() => {

        if (token) {
            console.log('token', jwtDecode(token).username)
            const params = {
                limit: 20
            }
            const username = jwtDecode(token).username
            user.getUserSubscribe({username, params})
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                        if (response.data && response.data.results && response.data.results.length > 0) {
                            const data = response.data.results.map(item => ({
                                user_name: item.follower_user.full_name,
                                avatar: item.follower_user.avatar,
                                slug: item.follower_user.username
                            }))
                            setUsersList(data)
                        }
                    }
                })
                .catch(error => {
                    console.error(error.response)
                })
        }
    }, [token])

    useEffect(() => {
        setNextStatus(undefined)
    }, [])


    const createGroup = () => {
        const data = {
            name: groupName
        }
        chat.createGroup(data)
            .then(response => {
                if (response.status === 201) {
                    console.log(response.data)
                }
            })
            .catch(error => console.error(error.response))
    }

    const addPeopleToGroup = (groupId) => {
        const data = []
        checkedUsers.map(item => data.push({
            user_username: item
        }))
        chat.addMembersToGroup(groupId, data)
            .then(response => {
                if (response.status === 201) {
                    closeModal()
                }
            })
            .catch(error => {
                console.error(error)
            })
    }


    const checkUser = (user) => {
        const data = []
        if (checkedUsers && checkedUsers.indexOf(user) !== -1) {
            checkedUsers.map(item => item !== user && data.push(item))
        } else {
            checkedUsers.map(item => data.push(item))
            data.push(user)
        }
        setCheckedUsers(data)
    }

    return {
        usersList,
        checkedUsers,
        nextStatus,
        setNextStatus,
        createGroup,
        groupName,
        setGroupName,
        addPeopleToGroup,
        checkUser
    }
}