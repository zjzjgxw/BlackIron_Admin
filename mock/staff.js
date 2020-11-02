export default {
  // 支持值为 Object 和 Array
  'GET /api/staffs/current': {
    msg: '操作成功',
    code: 200,
    data: {
      staff: {
        id: 3,
        businessId: 2,
        account: 'staff3',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        name: '员工3号',
        email: '2434345@qq.com',
        logoImg: 'http://www.etes.com',
        status: {
          index: 0,
          text: '可用',
        },
        departments: [
          {
            id: 2,
            businessId: 2,
            name: '研发',
            staffs: null,
          },
          {
            id: 3,
            businessId: 2,
            name: '采购',
            staffs: null,
          },
        ],
        roles: [
          {
            id: 2,
            businessId: 2,
            name: '采购组长',
            staffs: null,
          },
          {
            id: 3,
            businessId: 2,
            name: '初级工程师',
            staffs: null,
          },
        ],
        admin: false,
      },
    },
  },
};
