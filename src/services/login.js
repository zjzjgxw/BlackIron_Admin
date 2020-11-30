import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/sso/staffs/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function currentStaff() {
  return request('/api/staffs/current', {
    method: 'GET',
  });
}
