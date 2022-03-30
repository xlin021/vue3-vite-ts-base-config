/**
 * 公共基础请求模块
 */
import request from '@/utils/request'
import { ILoginInfo } from './types/common'

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request<ILoginInfo>({
  method: 'GET',
  url: '/login/info'
}).then(res => res.data)
