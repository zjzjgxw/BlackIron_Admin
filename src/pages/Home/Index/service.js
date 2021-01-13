import request from '@/utils/request';

export async function queryOrderToday() {
  return request('/api/orders/stat/today');
}

export async function queryOrderStatTime(startTime, endTime) {
  return request('/api/orders/stat/time',{
    params:{
      startTime,
      endTime
    }
  });
}

export async function queryAccessStat(startTime, endTime) {
  return request('/api/products/stat',{
    params:{
      startTime,
      endTime
    }
  });
}

export async function queryNewUserStat(startTime, endTime) {
  return request('/api/users/stat',{
    params:{
      startTime,
      endTime
    }
  });
}

