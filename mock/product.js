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
  'GET /api/category/attributes': (req, res) => {
    const { categoryId } = req.query;
    if (categoryId === '11') {
      res.send({
        code: 200,
        msg: '',
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
              options: [
                {
                  id: 4,
                  attributeId: 1,
                  content: '汪汪',
                },
                {
                  id: 6,
                  attributeId: 1,
                  content: '海王',
                },
              ],
            },
          ],
        },
      });
    } else {
      res.send({
        code: 200,
        msg: '',
        data: {
          attributes: [
            {
              id: 3,
              categoryId: 12,
              name: '尺寸',
              options: [
                {
                  id: 5,
                  attributeId: 1,
                  content: '大',
                },
                {
                  id: 6,
                  attributeId: 1,
                  content: '小',
                },
              ],
            },
          ],
        },
      });
    }
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
          id: 2,
          categoryId: 2,
          name: '尺寸',
          options: [
            {
              id: 4,
              specificationId: 2,
              content: '大',
            },
            {
              id: 6,
              specificationId: 2,
              content: '中',
            },
            {
              id: 5,
              specificationId: 2,
              content: '小',
            },
          ],
        },
      ],
    },
  },

  'GET /api/products': (req, res) => {
    const { pageNum } = req.query;

    const dataSource = [];
    if (pageNum > 3) {
      const result = {
        data: {
          total: 100,
          rows: [],
        },
        msg: '操作成功',
        code: 200,
      };
      return res.json(result);
    }
    for (let i = 0; i < 6; i += 1) {
      dataSource.push({
        id: pageNum * 10 + i,
        businessId: 2,
        name: `新商品${pageNum}_${i}`,
        categoryId: 2,
        mode: 1,
        stockType: 1,
        statusType: 2,
        description: '美6',
        coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        price: '50.00',
        originalPrice: '100.00',
        expressPrice: '5.00',
        saleNum: 0,
        lastNum: 107,
        deleteFlag: 0,
        createTime: '2020-10-26 20:39:42',
        attributes: null,
        detailImages: null,
        mainImages: null,
      });
    }

    const result = {
      data: {
        total: 100,
        rows: dataSource,
      },
      msg: '操作成功',
      code: 200,
    };
    return res.json(result);
  },

  // 'GET /api/products': {
  //   msg: '操作成功',
  //   code: 200,
  //   data: {
  //     total: 5,
  //     rows: [
  //       {
  //         id: 17,
  //         businessId: 2,
  //         name: '新商品17',
  //         categoryId: 2,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 2,
  //         description: '美6',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         price: '50.00',
  //         originalPrice: '100.00',
  //         expressPrice: '5.00',
  //         saleNum: 0,
  //         lastNum: 107,
  //         deleteFlag: 0,
  //         createTime: '2020-10-26 20:39:42',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },
  //       {
  //         id: 16,
  //         businessId: 2,
  //         name: '新商品555',
  //         categoryId: 2,
  //         mode: 1,
  //         stockType: 2,
  //         statusType: 1,
  //         description: '美丽333',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //         price: '40.00',
  //         originalPrice: '400.00',
  //         expressPrice: '5.00',
  //         saleNum: 2,
  //         lastNum: 107,
  //         deleteFlag: 0,
  //         createTime: '2020-10-20 16:17:46',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },
  //       {
  //         id: 15,
  //         businessId: 2,
  //         name: '新商品3',
  //         categoryId: 13,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 1,
  //         description: '美丽333',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         price: '30.00',
  //         originalPrice: '300.00',
  //         saleNum: 0,
  //         lastNum: 1022,
  //         deleteFlag: 0,
  //         createTime: '2020-10-20 13:12:42',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },
  //       {
  //         id: 14,
  //         businessId: 2,
  //         name: '新商品2',
  //         categoryId: 12,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 1,
  //         description: '好东西',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //         price: '20.00',
  //         originalPrice: '200.00',
  //         expressPrice: '5.00',
  //         saleNum: 1,
  //         lastNum: 101,
  //         deleteFlag: 0,
  //         createTime: '2020-10-20 13:12:05',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },
  //       {
  //         id: 13,
  //         businessId: 2,
  //         name: '新商品1',
  //         categoryId: 11,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 1,
  //         description: '好东西a',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         price: '50.00',
  //         originalPrice: '100.00',
  //         expressPrice: '5.00',
  //         saleNum: 25,
  //         lastNum: 13,
  //         deleteFlag: 0,
  //         createTime: '2020-10-19 14:16:20',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },{
  //         id: 10,
  //         businessId: 2,
  //         name: '新商品1',
  //         categoryId: 11,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 1,
  //         description: '好东西a',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         price: '50.00',
  //         originalPrice: '100.00',
  //         expressPrice: '5.00',
  //         saleNum: 25,
  //         lastNum: 13,
  //         deleteFlag: 0,
  //         createTime: '2020-10-19 14:16:20',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },{
  //         id: 131,
  //         businessId: 2,
  //         name: '新商品1',
  //         categoryId: 11,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 1,
  //         description: '好东西a',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         price: '50.00',
  //         originalPrice: '100.00',
  //         expressPrice: '5.00',
  //         saleNum: 25,
  //         lastNum: 13,
  //         deleteFlag: 0,
  //         createTime: '2020-10-19 14:16:20',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },{
  //         id: 132,
  //         businessId: 2,
  //         name: '新商品1',
  //         categoryId: 11,
  //         mode: 1,
  //         stockType: 1,
  //         statusType: 1,
  //         description: '好东西a',
  //         coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //         price: '50.00',
  //         originalPrice: '100.00',
  //         expressPrice: '5.00',
  //         saleNum: 25,
  //         lastNum: 13,
  //         deleteFlag: 0,
  //         createTime: '2020-10-19 14:16:20',
  //         attributes: null,
  //         detailImages: null,
  //         mainImages: null,
  //       },
  //     ],
  //   },
  // },

  'GET /api/products/detail/13': {
    msg: '操作成功',
    code: 200,
    data: {
      detail: {
        id: 13,
        businessId: 2,
        name: '新商品1',
        categoryId: 11,
        mode: 1,
        stockType: '1',
        statusType: '1',
        description: 'xsfd',
        coverUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        price: '50.00',
        originalPrice: '100.00',
        expressPrice: '5.00',
        saleNum: 25,
        lastNum: 13,
        deleteFlag: 0,
        createTime: '2020-10-19 14:16:20',
        attributes: [
          {
            id: 18,
            detailId: 13,
            name: '颜色',
            content: '红色',
          },
          {
            id: 19,
            detailId: 13,
            name: '品牌',
            content: '海王',
          },
        ],
        detailImages: [
          {
            id: 18,
            detailId: 13,
            imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            indexNo: 2,
          },
          {
            id: 19,
            detailId: 13,
            imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            indexNo: 1,
          },
        ],
        mainImages: [
          {
            id: 14,
            detailId: 13,
            imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            indexNo: 1,
          },
          {
            id: 15,
            detailId: 13,
            imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            indexNo: 2,
          },
        ],
      },
    },
  },
};
