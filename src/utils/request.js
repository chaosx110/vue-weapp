import axios from 'axios';

import router from "../router";

const HTTP_CODE = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

const instance = new axios({
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/api',
  timeout: 100000,

})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(config => {
  // 为请求添加身份校验
  config.headers['Authorization'] = 'Bearer ' + localStorage.get('token') || ''
  // 添加时间戳，防止浏览器(IE)对get请求的缓存
  if(config.method === 'get') {
    config.params = {
      ...config.params,
      t: new Date().getTime()
    }
  }
  /**
   * download接口需要进行如下修改：
   * config.headers['responseType']='blob'
   * 
   * upload接口需要进行如下修改：
   * config.headers['Content-Type']='multipart/form-data'
   */
  return config
}, error => {
  // 请求出错时做什么
  return Promise.reject(error)
})

instance.interceptors.response.use(({ data }) => {
  return Promise.resolve(data)
}, ({ response: { status, statusText } }) => {
  const message = HTTP_CODE[status] || statusText
  if(status === 401) {
    router.push({ path: "/login" })
  } 
  return Promise.reject({
    code: 0,
    message
  })
})

export default instance;