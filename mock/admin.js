
export default {
  // 支持值为 Object 和 Array
  'POST /sso/admins/login': (req, res) => {
    const { password, account, type } = req.body;

    if (password === '123456' && account === 'admin') {
      res.send({
        code: 200,
        data: {
          accessToken:"eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVUaW1lIjoxNTk5NzEwOTEwNDM3LCJuYW1lIjoi566h55CG5ZGYMSIsImlkIjoxfQ.ogq5pR7MIRHL6wpSrpOm2JJfjx7X1DRGf0uZ2OAEyh2ITs-lnQKixm_BhEPAiamNB3EAAJ2j_GTiyDpOMan-sw",
          refreshToken:"eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVUaW1lIjoxNTk5NzcwOTEwNDM3LCJuYW1lIjoi566h55CG5ZGYMSIsImlkIjoxfQ.nABrcxvjuYSMJ3nJvbLxzEE7yZIe7jp8TiLH4VhsYBjLPPF0ehyGgqrIuHkzrqCU5agQf6cmvHQ_PiTIcZKDvA"
        },
      });
    }else{
      res.send({
        code: 400,
        msg: '账号密码错误'
      });
    }
  },

  'GET /api/admins':
    {
      data:[
        {
          id: 1,
          account: 'admin1',
          name: '管理员1',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },
        {
          id: 2,
          account: 'admin2',
          name: '管理员2',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },
        {
          id: 8,
          account: 'admin8',
          name: '管理员8',
          adminFlag: true,
          email:'gxw@qq.com',
          status:1
        },
        {
          id: 3,
          account: 'admin3',
          name: '管理员3',
          adminFlag: false,
          email:'gxw@qq.com',
          status:1
        },
        {
          id: 4,
          account: 'admin4',
          name: '管理员4',
          adminFlag: true,
          email:'gxw@qq.com',
          status:0
        },
        {
          id: 5,
          account: 'admin5',
          name: '管理员5',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },
        {
          id: 6,
          account: 'admin6',
          name: '管理员6',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },
        {
          id: 7,
          account: 'admin7',
          name: '管理员7',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },
        {
          id: 9,
          account: 'admin9',
          name: '管理员9',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },{
          id: 10,
          account: 'admin10',
          name: '管理员10',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        },{
          id: 11,
          account: 'admin11',
          name: '管理员11',
          adminFlag: false,
          email:'gxw@qq.com',
          status:0
        }
      ],
      total:11,
      success: true,

    }


};
