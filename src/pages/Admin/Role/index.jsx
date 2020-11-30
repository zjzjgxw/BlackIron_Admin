import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Spin } from 'antd';
import styles from './index.less';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import { isSuccess } from '@/utils/utils';
import Popconfirm from 'antd/es/popconfirm';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import {
  queryRoles,
  addRole,
  deleteRole,
  addRoleMember,
  updateRole,
} from '@/pages/Admin/Role/service';
import CreateForm from '@/pages/Admin/Role/components/CreateForm';
import EditMemberForm from '@/pages/Admin/Role/components/EditMemberForm';
import UpdateForm from '@/pages/Admin/Role/components/UpdateForm';
import { queryAdmins } from '@/pages/Admin/home/service';

const queryRoleData = async (params) => {
  const res = await queryRoles(params);
  if (isSuccess(res)) {
    const data = {
      data: res.data.roles,
      total: res.data.roles.length,
      success: true,
    };
    return data;
  }
  return {};
};

const queryAdminsData = async () => {
  const res = await queryAdmins({});
  if (isSuccess(res)) {
    const data = [];
    const admins = res.data.rows;
    for (let i = 0; i < admins.length; i += 1) {
      data.push({ label: admins[i].name, value: admins[i].id });
    }
    return data;
  }
  return {};
};

export default () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [editMemberModalVisible, handleEditMemberModalVisible] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});
  const [role, setRole] = useState({});

  const actionRef = useRef();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '角色名',
      dataIndex: 'name',
      copyable: true,
    },
    {
      dataIndex: 'staffs',
      title: '用户',
      render: (_, record) => {
        const { staffs = [] } = record;

        const names = [];
        staffs.forEach((item) => {
          names.push(item.name);
        });
        return names && names.length > 0 ? names.join('、') : '无';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, _, action) => [
        <a
          key={row.id}
          onClick={() => {
            handleUpdateModalVisible(true);
            setRole(row);
          }}
        >
          更新
        </a>,
        <a
          key={row.id}
          onClick={() => {
            handleEditMemberModalVisible(true);
            const ids = [];
            for (let i = 0; i < row.staffs.length; i += 1) {
              ids.push(row.staffs[i].id);
            }
            setMemberInfo({ id: row.id, adminIds: ids });
          }}
        >
          管理成员
        </a>,
        <a
          key={row.id}
          onClick={() => {
            history.push(`/admin/role/${row.id}/permission`);
          }}
        >
          权限管理
        </a>,
        <Popconfirm
          key={row.id}
          title="确定删除？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteRole(row.id);
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
          request={(params, sorter, filter) => queryRoleData({ ...params, sorter, filter })}
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
            try {
              const res = await addRole({ ...fields });
              if (isSuccess(res)) {
                message.success('添加成功');
                actionRef.current.reload();
                handleModalVisible(false);
              }
              return true;
            } catch (error) {
              message.error('添加失败请重试！');
              return false;
            }
          }}
        />

        {memberInfo && Object.keys(memberInfo).length ? (
          <EditMemberForm
            onCancel={() => {
              handleEditMemberModalVisible(false);
              setMemberInfo({});
            }}
            values={memberInfo}
            modalVisible={editMemberModalVisible}
            request={() => queryAdminsData()}
            onSubmit={async (fields) => {
              console.log(fields);
              try {
                const params = [];
                for (let i = 0; i < fields.selectedAdmins.length; i += 1) {
                  params.push({ roleId: fields.id, staffId: fields.selectedAdmins[i] });
                }
                const res = await addRoleMember(params);
                if (isSuccess(res)) {
                  message.success('添加成功');
                  handleEditMemberModalVisible(false);
                  setMemberInfo({});
                  actionRef.current.reload();
                }
                return true;
              } catch (error) {
                message.error('添加失败请重试！');
                handleEditMemberModalVisible(false);
                setMemberInfo({});
                return false;
              }
            }}
          />
        ) : null}

        {role && Object.keys(role).length ? (
          <UpdateForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setRole({});
            }}
            values={role}
            modalVisible={updateModalVisible}
            onSubmit={async (fields) => {
              try {
                const res = await updateRole(fields);
                if (isSuccess(res)) {
                  message.success('更新成功');
                  actionRef.current.reload();
                  handleUpdateModalVisible(false);
                  setRole({});
                }
                return true;
              } catch (error) {
                message.error('更新失败请重试！');
                handleUpdateModalVisible(false);
                setRole({});
                return false;
              }
            }}
          />
        ) : null}
      </div>
    </PageContainer>
  );
};
