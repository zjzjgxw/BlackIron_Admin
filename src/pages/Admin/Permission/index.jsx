import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect, useRef} from 'react';
import styles from './index.less';
import {Button, Tag, Space, message} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import ProTable from "@ant-design/pro-table";
import {isSuccess} from "@/utils/utils";
import Popconfirm from "antd/es/popconfirm";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import {addPermission, editPermission, queryAllGroups, queryPermissions} from "@/pages/Admin/Permission/service";
import CreateForm from "@/pages/Admin/Permission/components/CreateForm";
import UpdateForm from "@/pages/Admin/Permission/components/UpdateForm";

const tagColor = {
  'get': 'green',
  'post': 'gold',
  'put': 'blue',
  'delete': 'red',
  'patch': 'orange'
};

export default () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [groups, setGroups] = useState({});
  const [permissionValues, setPermissionValues] = useState({});


  const queryPermissionsData = async (params) => {

    // 获取所有权限组，用于展示权限组选择列表
    const groupRes = await queryAllGroups();
    if (isSuccess(groupRes)) {
      const groupDict = {};
      if (groupRes.data.groups instanceof Array) {
        for (let i = 0; i < groupRes.data.groups.length; i += 1) {
          groupDict[groupRes.data.groups[i].id] = groupRes.data.groups[i].name;
        }
        setGroups(groupDict);
      }
    }

    // 获取权限列表
    const res = await queryPermissions(params);
    if (isSuccess(res)) {
      const data = {
        data: res.data.rows,
        total: res.data.total,
        success: true
      };
      return data;
    }
    return {}
  };

  const actionRef = useRef();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '权限名',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '路径',
      dataIndex: 'path',
      hideInSearch: true,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      hideInSearch: true,
      render: (_, row) => (
        <Space>
          <Tag color={tagColor[row.method]} key={row.id}>
            {row.method}
          </Tag>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'info',
      hideInSearch: true,
    },
    {
      title: '权限组',
      dataIndex: 'groupId',
      hideInTable: true,
      valueEnum: groups
    },
    {
      title: '权限组',
      dataIndex: 'groupName',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, _) => [
        <a key={row.id} onClick={() => {
          handleUpdateModalVisible(true);
          setPermissionValues(row);
        }}>
          编辑
        </a>,
        <Popconfirm key={row.id} title="确定删除？" icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                    onConfirm={async () => {
                    }}>
          <a key={row.id}>删除</a>
        </Popconfirm>
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
          request={(params, sorter, filter) => queryPermissionsData({...params, sorter, filter})}
          rowKey="id"
          toolBarRender={() => [
            <Button key="addPermissionButton" type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined/>
              新建
            </Button>,
          ]}
        />

        <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
                    groupOptions={groups}
                    onSubmit={async (fields) => {
                      try {
                        await addPermission({...fields});
                        message.success('添加成功');
                        handleModalVisible(false);
                        return true;
                      } catch (error) {
                        message.error('添加失败请重试！');
                        return false;
                      }
                    }}/>

        {permissionValues && Object.keys(permissionValues).length ? (
          <UpdateForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setPermissionValues({});
            }}
            modalVisible={updateModalVisible}
            values={permissionValues}
            groupOptions={groups}
            onSubmit={async (fields) => {
              try {
                await editPermission({...fields});
                message.success('修改成功');
                return true;
              } catch (error) {
                message.error('添加失败请重试！');
                return false;
              } finally {
                setPermissionValues({});
                handleUpdateModalVisible(false);
              }
            }}
          />) : null}

      </div>
    </PageContainer>
  );
};
