import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';

import {
  addAdmin,
  changeAdminStatus,
  deleteAdmin,
  queryAdmins,
  updateAdmin,
} from '@/pages/Admin/home/service';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import CreateForm from '@/pages/Admin/home/components/CreateForm';
import Popconfirm from 'antd/es/popconfirm';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import { isSuccess } from '@/utils/utils';
import styles from './index.less';
import UpdateForm from '@/pages/Admin/home/components/UpdateForm';

const queryAdminsData = async (params) => {
  const res = await queryAdmins({ ...params, pageNum: params.current });
  if (isSuccess(res)) {
    const data = {
      data: res.data.rows,
      total: res.data.total,
      success: true,
    };
    return data;
  }
  return {};
};

export default () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [adminValues, setAdminValues] = useState({});

  const actionRef = useRef();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInForm: true,
      search: false,
    },
    {
      title: '账号',
      dataIndex: 'account',
      copyable: true,
      search: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      copyable: true,
      search: false,
    },
    {
      title: '是否为管理员',
      dataIndex: 'admin',
      search: false,
      render: (_, record) => {
        const { admin } = record;
        if (admin) {
          return '是';
        }
        return '否';
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      search: false,
      render: (_, record) => {
        const { status } = record;
        return status.text;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, _, action) => [
        <a
          key={row.id}
          onClick={async () => {
            let status = row.status.index;
            if (status === 0) {
              status = 1;
            } else {
              status = 0;
            }
            const res = await updateAdmin({ id: row.id, status });
            if (isSuccess(res)) {
              action.reload();
            }
          }}
        >
          {row.status.index === 0 ? '禁用' : '启用'}
        </a>,
        <a
          key={row.id}
          onClick={() => {
            handleUpdateModalVisible(true);
            setAdminValues(row);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={row.id}
          title="确定删除？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteAdmin(row.id);
            if (isSuccess(res)) {
              action.reload();
            }
          }}
        >
          <a key={row.id}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer className={styles.main}>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <ProTable
          size="small"
          columns={columns}
          actionRef={actionRef}
          request={(params, sorter, filter) => queryAdminsData({ ...params, sorter, filter })}
          rowKey="id"
          toolBarRender={() => [
            <Button key="addAdminButton" type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />

        <CreateForm
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          onSubmit={async (fields) => {
            let logoImg = '';
            if (fields.hasOwnProperty('avatar')) {
              logoImg = fields.avatar[0].response.data.path;
            }
            const hide = message.loading('正在添加');
            try {
              const res = await addAdmin({ ...fields, status: 1, logoImg });
              if (isSuccess(res)) {
                actionRef.current.reload();
                hide();
                message.success('添加成功');
                handleModalVisible(false);
                return true;
              }
            } catch (error) {
              hide();
              message.error('添加失败请重试！');
              return false;
            }
          }}
        />
        {adminValues && Object.keys(adminValues).length ? (
          <UpdateForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setAdminValues({});
            }}
            modalVisible={updateModalVisible}
            values={adminValues}
            onSubmit={async (fields) => {
              try {
                const res = await updateAdmin({ ...fields });
                if (isSuccess(res)) {
                  actionRef.current.reload();
                  message.success('修改成功');
                  setAdminValues({});
                  handleUpdateModalVisible(false);
                  return true;
                }
              } catch (error) {
                message.error('添加失败请重试！');
                return false;
              }
            }}
          />
        ) : null}
      </div>
    </PageContainer>
  );
};
