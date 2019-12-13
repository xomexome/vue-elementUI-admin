import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)  //登录成功后将token存储在cookie之中
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
