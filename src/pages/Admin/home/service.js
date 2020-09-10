import request from '@/utils/request';

export async function queryAdmins(params) {
  return request('/api/admins', {
    params,
  });
}
