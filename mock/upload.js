export default {
  // 支持值为 Object 和 Array
  'POST /api/upload/img': (req, res) => {
    res.send({
      code: 200,
      data: {
        path: '/img.jpg',
        url: 'https://img95.699pic.com/photo/40100/6015.jpg_wh300.jpg',
      },
    });
  },
};
