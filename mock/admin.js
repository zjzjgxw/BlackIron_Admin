const genRole = (current, pageSize) => {
  const tableListDataSource = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: `角色 ${index}`,
      admins: [
        {
          id: (index % 10) + 1,
          name: `管理员${(index % 10) + 1}`,
        },
        {
          id: ((index + 1) % 10) + 1,
          name: `管理员${((index + 1) % 10) + 1}`,
        },
      ],
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableRoleListDataSource = genRole(1, 40);

export default {
  // 支持值为 Object 和 Array
  'POST /sso/admins/login': (req, res) => {
    const { password, account, type } = req.body;

    if (password === '123456' && account === 'admin') {
      res.send({
        code: 200,
        data: {
          accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVUaW1lIjoxNTk5NzEwOTEwNDM3LCJuYW1lIjoi566h55CG5ZGYMSIsImlkIjoxfQ.ogq5pR7MIRHL6wpSrpOm2JJfjx7X1DRGf0uZ2OAEyh2ITs-lnQKixm_BhEPAiamNB3EAAJ2j_GTiyDpOMan-sw',
          refreshToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVUaW1lIjoxNTk5NzcwOTEwNDM3LCJuYW1lIjoi566h55CG5ZGYMSIsImlkIjoxfQ.nABrcxvjuYSMJ3nJvbLxzEE7yZIe7jp8TiLH4VhsYBjLPPF0ehyGgqrIuHkzrqCU5agQf6cmvHQ_PiTIcZKDvA',
        },
      });
    } else {
      res.send({
        code: 400,
        msg: '账号密码错误',
      });
    }
  },

  'POST /api/admins': (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req);
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },
  'PATCH /api/admins/1': {
    data: {},
    code: 200,
    msg: '',
  },
  'PATCH /api/admins/2': {
    data: {},
    code: 400,
    msg: '请求失败，请稍后再试',
  },
  'DELETE /api/admins/1': {
    data: {},
    code: 200,
    msg: '',
  },
  'DELETE /api/admins/2': {
    data: {},
    code: 400,
    msg: '删除失败，请稍后再试',
  },

  'GET /api/admins': {
    code: 200,
    msg: '',
    data: {
      admins: [
        {
          id: 1,
          account: 'admin1',
          name: '管理员1',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 2,
          account: 'admin2',
          name: '管理员2',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 8,
          account: 'admin8',
          name: '管理员8',
          adminFlag: true,
          email: 'gxw@qq.com',
          status: 1,
        },
        {
          id: 3,
          account: 'admin3',
          name: '管理员3',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 1,
        },
        {
          id: 4,
          account: 'admin4',
          name: '管理员4',
          adminFlag: true,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 5,
          account: 'admin5',
          name: '管理员5',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 6,
          account: 'admin6',
          name: '管理员6',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 7,
          account: 'admin7',
          name: '管理员7',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 9,
          account: 'admin9',
          name: '管理员9',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 10,
          account: 'admin10',
          name: '管理员10',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
        {
          id: 11,
          account: 'admin11',
          name: '管理员11',
          adminFlag: false,
          email: 'gxw@qq.com',
          status: 0,
        },
      ],
      total: 11,
    },
  },

  'GET /api/admins/roles': (req, res) => {
    const result = {
      data: {
        roles: tableRoleListDataSource,
      },
      code: 200,
      msg: '',
    };
    return res.json(result);
  },

  'POST /api/admins/roles': (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req);
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },

  'PUT /api/admins/roles': {
    data: {},
    code: 200,
    msg: '',
  },

  'DELETE /api/admins/roles/1': {
    data: {},
    code: 200,
    msg: '',
  },
  'DELETE /api/admins/roles/2': {
    data: {},
    code: 400,
    msg: '删除失败，请稍后再试',
  },

  'POST /api/admins/roleRel': {
    data: {},
    code: 200,
    msg: '',
  },

  'GET /api/admins/roles/permissions': {
    data: {
      9: [6, 7, 8],
      8: [9],
    },
    code: 200,
    msg: '',
  },

  'GET /api/permissions/groups': {
    msg: '操作成功',
    code: 200,
    data: {
      groups: [
        {
          id: 9,
          name: '管理权限',
          type: 2,
          permissions: [
            {
              id: 6,
              name: '添加管理员',
            },
            {
              id: 7,
              name: '删除管理员',
            },
            {
              id: 8,
              name: '修改管理员',
            },
          ],
        },
        {
          id: 8,
          name: '角色权限',
          type: 2,
          permissions: [
            {
              id: 9,
              name: '修改角色',
            },
            {
              id: 10,
              name: '新增角色',
            },
          ],
        },
        {
          id: 7,
          name: '财务权限',
          type: 2,
          permissions: [
            {
              id: 11,
              name: '查看财务报表',
            },
          ],
        },
        {
          id: 6,
          name: '操作权限',
          type: 2,
          permissions: [],
        },
      ],
    },
  },
  'GET /api/permissions': {
    msg: '操作成功',
    code: 200,
    data: {
      total: 6,
      rows: [
        {
          id: 11,
          type: 2,
          name: '查看财务报表',
          path: '/admins/report',
          method: 'get',
          info: '查看财务报表',
          groupId: 7,
          groupName: '财务权限',
        },
        {
          id: 10,
          type: 2,
          name: '新增角色',
          path: '/admins/roles',
          method: 'post',
          info: '新增管理员角色权限',
          groupId: 8,
          groupName: '角色权限',
        },
        {
          id: 9,
          type: 2,
          name: '修改角色',
          path: '/admins/roles',
          method: 'put',
          info: '修改管理员角色权限',
          groupId: 8,
          groupName: '角色权限',
        },
        {
          id: 8,
          type: 2,
          name: '修改管理员',
          path: '/admins',
          method: 'put',
          info: '修改管理员权限',
          groupId: 9,
          groupName: '管理权限',
        },
        {
          id: 7,
          type: 2,
          name: '删除管理员',
          path: '/admins',
          method: 'delete',
          info: '删除管理员权限',
          groupId: 9,
          groupName: '管理权限',
        },
        {
          id: 6,
          type: 2,
          name: '添加管理员',
          path: '/admins',
          method: 'post',
          info: '添加管理员权限',
          groupId: 9,
          groupName: '管理权限',
        },
      ],
    },
  },
  'POST /api/permissions': (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req);
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },
  'PUT /api/permissions': (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req);
    res.send({
      code: 200,
      msg: '',
      data: {
        id: 1,
      },
    });
  },
};
