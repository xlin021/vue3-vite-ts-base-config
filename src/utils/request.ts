import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3001'
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 统一设置用户身份
    console.log(config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  response => {
    // 统一处理接口响应错误
    console.log(response)
    return response
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    return Promise.reject(error)
  }
)

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export default <T = any>(config: AxiosRequestConfig) => request(config)
  .then(res => res.data as ResponseData<T>)
