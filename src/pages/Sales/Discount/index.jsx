import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import { queryDiscount, addDiscount, deleteDiscount, updateDiscount } from './service';
import { isSuccess } from '@/utils/utils';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import Popconfirm from 'antd/es/popconfirm';

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [currentDiscountValues, setCurrentDiscountValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();

  const queryDiscountData = async (params) => {
    const res = await queryDiscount(params);
    if (isSuccess(res)) {
      return {
        data: res.data.rows,
        total: res.data.total,
        success: true,
      };
    }
    return {};
  };

  const handleDelete = async (id) => {
    const res = await deleteDiscount(id);
    if (isSuccess(res)) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInForm: true,
      search: false,
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '活动名称为必填项',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'content',
      valueType: 'textarea',
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '描述为必填项',
          },
        ],
      },
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      search: false,
      valueType: () => ({
        type: 'percent',
      }),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '折扣为必填项',
          },
        ],
      },
      renderText: (val) => `${val}% `,
    },
    {
      title: '模式',
      dataIndex: 'mode',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择模式',
          },
        ],
      },
      valueEnum: {
        0: {
          text: '全场',
          status: 'Error',
        },
        1: {
          text: '指定商品',
          status: 'Success',
        },
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择活动开始时间',
          },
        ],
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择活动结束时间',
          },
        ],
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            key={`update_a_${record.id}`}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentDiscountValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            key={`delete_confirm_${record.id}`}
            title="确定删除？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.id)}
          >
            <a key={record.id}>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryDiscountData({ ...params, sorter, filter })}
        columns={columns}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit={async (values) => {
          const res = await addDiscount(values);
          if (isSuccess(res)) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      {currentDiscountValues && Object.keys(currentDiscountValues).length ? (
        <CreateForm
          onSubmit={async (value) => {
            const res = await updateDiscount(value);
            if (isSuccess(res)) {
              message.info('修改成功');
              handleUpdateModalVisible(false);
              setCurrentDiscountValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentDiscountValues({});
          }}
          modalVisible={updateModalVisible}
          info={currentDiscountValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
