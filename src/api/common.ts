/**
 * 公共基础请求模块
 */
import request from '@/utils/request'

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request.get<ResponseData<{
  login_logo: string
}>>('/login/info')
