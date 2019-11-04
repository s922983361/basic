import Cookies from 'js-cookie'
//@nuxt/auth default cookie keyName
const TokenKey = 'JSD._token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}