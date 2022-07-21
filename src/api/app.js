import axios from 'axios'

export const refreshToken = (refreshToken) => {
    return axios.post('/account/token-refresh/', {refresh: refreshToken})
}