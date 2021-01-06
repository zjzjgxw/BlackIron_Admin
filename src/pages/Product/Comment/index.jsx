import { PlusOutlined } from '@ant-design/icons';
import {Button, Image} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {queryComments} from './service';
import {isSuccess} from "@/utils/utils";



const TableList = () => {
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);


  const queryCommentData = async (params) => {
    const res = await queryComments({ ...params, pageNum: params.current });
    if (isSuccess(res)) {
      return {
        data: res.data.rows,
        total: res.data.total,
        success: true,
      };
    }
    return {};
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      search:false
    },
    {
      title: '订单id',
      dataIndex: 'orderId',
    },
    {
      title: '商品',
      dataIndex: 'productName',
      render: (_, row) => {
        return (
          <div>
            <Image
              width={50}
              src={row.product.coverUrl}
            />
            <a>{row.product.name}</a>
          </div>
        );
      },
    },
    {
      title: '用户',
      dataIndex: 'userName',
      render: (_, row) => {
        return (
          <div>
            <Image
              width={50}
              src={row.coverUrl}
            />
            <a>{row.userName}</a>
          </div>
        );
      },
    },
    {
      title: '评价',
      dataIndex: 'type',
      valueEnum: {
        1: {
          text: '好评',
          status: 'Success',
        },
        2: {
          text: '中评',
          status: 'Processing',
        },
        3: {
          text: '差评',
          status: 'Error',
        },
      },
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      search:false,
      render: (_, row) => {
        return (
          <div>
            <Image
              width={50}
              src={row.imgUrl}
            />
          </div>
        );
      },
    },
    {
      title: '评论内容',
      dataIndex: 'content',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      valueType: 'dateTime',
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
        request={(params, sorter, filter) => queryCommentData({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />


    </PageContainer>
  );
};

export default TableList;
