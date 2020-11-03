import { PageContainer } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { isSuccess } from '@/utils/utils';
import { queryProducts } from '@/pages/Product/List/service';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import { Button, Image, Popconfirm } from 'antd';
import { deleteRole } from '@/pages/Admin/Role/service';
import { queryProductCategory } from '@/pages/Product/Category/service';
import { history } from 'umi';

const statusTypeEnum = {
  1: {
    text: '上架',
    status: 'Success',
  },
  2: {
    text: '下架',
    status: 'Error',
  },
};

export default () => {
  const actionRef = useRef();
  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  };
  const [categories, setCategories] = useState([]);

  const queryProductData = async (params) => {
    const res = await queryProducts(params);
    if (isSuccess(res)) {
      const result = await queryProductCategory({});
      if (isSuccess(result)) {
        setCategories(result.data.categories);
        if (categories.length === 0) {
          return {};
        }
      }
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
      title: 'Id',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '商品',
      dataIndex: 'name',
      render: (_, row) => {
        return (
          <div>
            <Image
              width={50}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <a>{row.name}</a>
          </div>
        );
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      search: false,
      render: (_, row) => {
        return (
          <div>
            <label>原价:{row.originalPrice}</label>
            <br />
            <label>现价:{row.price}</label>
          </div>
        );
      },
    },
    {
      title: '销量',
      dataIndex: 'saleNum',
      search: false,
      sorter: (a, b) => a.saleNum - b.saleNum,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'statusType',
      valueEnum: statusTypeEnum,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, _, action) => [
        <a key={row.id}>库存管理</a>,
        <a key={row.id}>编辑</a>,
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

  const rowSelection = {
    onChange: onSelectChange,
  };

  return (
    <PageContainer className={styles.main}>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <ProTable
          rowSelection={rowSelection}
          size="small"
          columns={columns}
          actionRef={actionRef}
          request={(params, sorter, filter) => queryProductData({ ...params, sorter, filter })}
          rowKey="id"
          toolBarRender={() => [
            <Button
              key="addProductButton"
              type="primary"
              onClick={() => {
                history.push(`/product/detail`);
              }}
            >
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
      </div>
    </PageContainer>
  );
};
