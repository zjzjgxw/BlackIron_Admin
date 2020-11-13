export default {
  'GET /api/discounts': {
    msg: '操作成功',
    code: 200,
    data: {
      total: 4,
      rows: [
        {
          id: 7,
          staffId: 3,
          businessId: 2,
          name: '双十一促销',
          content: '部分1折优惠',
          discount: 10,
          startTime: '2020-10-28 23:10:59',
          endTime: '2020-11-24 00:00:00',
          mode: 1,
          products: [14, 15, 16],
          deleteFlag: 0,
          createTime: '2020-10-25 10:47:28',
        },
        {
          id: 6,
          staffId: 3,
          businessId: 2,
          name: '双十一大促销',
          content: '部分6折优惠',
          discount: 60,
          startTime: '2020-10-28 00:00:00',
          endTime: '2020-11-26 00:00:00',
          mode: 0,
          products: [1, 15, 16],
          deleteFlag: 0,
          createTime: '2020-10-24 15:52:36',
        },
        {
          id: 3,
          staffId: 5,
          businessId: 2,
          name: '双十一促销',
          content: '部分4折优惠',
          discount: 40,
          startTime: '2020-10-28 19:00:00',
          endTime: '2020-11-23 18:00:00',
          mode: 1,
          products: [14, 15],
          deleteFlag: 0,
          createTime: '2020-10-24 15:33:12',
        },
        {
          id: 1,
          staffId: 5,
          businessId: 2,
          name: '双十一促销',
          content: '全场5折优惠',
          discount: 50,
          startTime: '2020-10-28 19:00:00',
          endTime: '2020-11-23 18:00:00',
          mode: 0,
          products: [],
          deleteFlag: 0,
          createTime: '2020-10-24 15:32:21',
        },
      ],
    },
  },

  'POST /api/discounts': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },
  'DELETE /api/discounts/7': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },
  'PUT /api/discounts': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'POST /api/coupons': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },
  'DELETE /api/coupons/12': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },
  'PUT /api/coupons': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'GET /api/coupons': {
    msg: '操作成功',
    code: 200,
    data: {
      total: 6,
      rows: [
        {
          id: 12,
          staffId: 3,
          businessId: 2,
          name: '满10减3',
          content: '满10减3',
          price: 300,
          targetPrice: 1000,
          startTime: '2020-10-24 00:00:00',
          endTime: '2020-11-24 00:00:00',
          mode: 0,
          num: 100,
          products: [],
          users: [],
          deleteFlag: 0,
          createTime: '2020-10-25 16:17:21',
        },
        {
          id: 11,
          staffId: 3,
          businessId: 2,
          name: '满200减10',
          content: '满200减10',
          price: 1000,
          targetPrice: 20000,
          startTime: '2020-10-24 00:00:00',
          endTime: '2020-11-24 00:00:00',
          mode: 1,
          num: 99,
          products: [14],
          users: [],
          deleteFlag: 0,
          createTime: '2020-10-25 16:09:24',
        },
      ],
    },
  },
};
