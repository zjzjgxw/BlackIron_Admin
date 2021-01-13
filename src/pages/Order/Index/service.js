import request from '@/utils/request';


export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}
export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'post' },
  });
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'update' },
  });
}

export async function queryOrders(params) {
  return request('/api/orders', {
    method: 'GET',
    params:{
      ...params
    }
  });
}

export async function queryExpress() {
  return request('/api/expresses', {
    method: 'GET',
  });
}


export async function sendOrder(params) {
  return request('/api/orders/send', {
    method: 'POST',
    data: { ...params},
  });
}

export async function queryStat() {
  return request('/api/orders/stat', {
    method: 'GET',
  });
}
