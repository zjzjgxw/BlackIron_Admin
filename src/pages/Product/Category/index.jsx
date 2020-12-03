import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useRef } from 'react';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import { isSuccess } from '@/utils/utils';
import { history } from 'umi';
import Popconfirm from 'antd/es/popconfirm';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import {
  addCategory,
  deleteCategory,
  queryProductCategory,
  updateCategory,
} from '@/pages/Product/Category/service';
import UpdateCategoryForm from '@/pages/Product/Category/components/UpdateCategoryForm';
import { Button, message } from 'antd';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import CreateForm from '@/pages/Product/Category/components/CreateForm';

const queryCategory = async (params) => {
  const res = await queryProductCategory(params);
  if (isSuccess(res)) {
    const data = {
      data: res.data.categories,
      total: res.data.categories.length,
      success: true,
    };
    return data;
  }
  return {};
};

export default () => {
  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [category, setCategory] = useState({});

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '类目名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, _, action) => [
        <a
          key={row.id}
          onClick={() => {
            history.push(`/product/category/${row.id}/attribute`);
          }}
        >
          属性管理
        </a>,
        <a
          key={row.id}
          onClick={() => {
            history.push(`/product/category/${row.id}/specifications`);
          }}
        >
          规格管理
        </a>,
        <a
          key={row.id}
          onClick={() => {
            handleUpdateModalVisible(true);
            setCategory(row);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={row.id}
          title="确定删除？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteCategory(row.id);
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
          request={(params, sorter, filter) => queryCategory({ ...params, sorter, filter })}
          rowKey="id"
          toolBarRender={() => [
            <Button key="addCategoryButton" type="primary" onClick={() => handleModalVisible(true)}>
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
              await addCategory(fields.name);
              message.success('添加成功');
              handleModalVisible(false);
              return true;
            } catch (error) {
              console.log(error);
              message.error('添加失败请重试！');
              return false;
            }
          }}
        />

        {category && Object.keys(category).length ? (
          <UpdateCategoryForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setCategory({});
            }}
            values={category}
            modalVisible={updateModalVisible}
            onSubmit={async (fields) => {
              try {
                const res =  await updateCategory(fields.id, fields.name);
                if(isSuccess(res)){
                  message.success('更新成功');
                  handleUpdateModalVisible(false);
                  setCategory({});
                  actionRef.current.reload();
                }
                return true;
              } catch (error) {
                message.error('更新失败请重试！');
                handleUpdateModalVisible(false);
                setCategory({});
                return false;
              }
            }}
          />
        ) : null}
      </div>
    </PageContainer>
  );
};
