import request from '@/utils/request';

export const getSignature = () => {
  return request.get('/wx/jspai/signature')
}