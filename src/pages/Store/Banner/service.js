import request from '@/utils/request';

export async function queryBanners(params) {
  return request('/api/businesses/banners', {
    params,
  });
}

