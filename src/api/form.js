import request from '@/utils/request'

export function sendFormData (data) {
  return request({
    url: '/recordForm',
    method: 'post',
    data
  })
}
