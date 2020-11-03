export default {
  'GET  /api/category': {
    msg: '操作成功',
    code: 200,
    data: {
      categories: [
        {
          id: 11,
          businessId: 2,
          name: '新类目',
          parentId: 0,
          deleteFlag: 1,
        },
        {
          id: 12,
          businessId: 2,
          name: '类别8',
          parentId: 11,
          deleteFlag: 0,
        },
        {
          id: 13,
          businessId: 2,
          name: '类别9',
          parentId: 11,
          deleteFlag: 0,
        },
      ],
    },
  },
  'DELETE /api/category/11': {
    data: {},
    code: 200,
    msg: '',
  },
  'PUT /api/category/11': {
    data: {},
    code: 200,
    msg: '',
  },
  'POST /api/category': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },

  'POST /api/category/attributes': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },

  'POST /api/category/attributes/options': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 9,
      },
    });
  },

  'DELETE /api/category/attributes/options/3': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'PUT /api/category/attributes/1': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'DELETE /api/category/attributes/1': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'GET /api/category/attributes': {
    msg: '操作成功',
    code: 200,
    data: {
      attributes: [
        {
          id: 1,
          categoryId: 2,
          name: '颜色',
          options: [
            {
              id: 2,
              attributeId: 1,
              content: '红色',
            },
            {
              id: 3,
              attributeId: 1,
              content: '蓝色',
            },
          ],
        },
        {
          id: 2,
          categoryId: 2,
          name: '品牌',
          options: [],
        },
      ],
    },
  },

  'DELETE /api/category/specifications/1': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'PUT /api/category/specifications/1': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'POST /api/category/specifications': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },

  'POST /api/category/specifications/options': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },

  'DELETE /api/category/specifications/options/1': (req, res) => {
    res.send({
      code: 200,
      msg: '',
      data: {},
    });
  },

  'GET /api/category/specifications': {
    msg: '操作成功',
    code: 200,
    data: {
      list: [
        {
          id: 1,
          categoryId: 2,
          name: '尺寸',
          options: [],
        },
        {
          id: 2,
          categoryId: 2,
          name: '颜色',
          options: [
            {
              id: 1,
              specificationId: 2,
              content: '红色',
            },
            {
              id: 2,
              specificationId: 2,
              content: '绿色',
            },
            {
              id: 3,
              specificationId: 2,
              content: '蓝色',
            },
          ],
        },
        {
          id: 3,
          categoryId: 2,
          name: '大小',
          options: [],
        },
      ],
    },
  },
};
