/**
 * 公共基础请求模块
 */
import request from '@/utils/request'

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request({
  method: 'GET',
  url: '/login/info'
})
