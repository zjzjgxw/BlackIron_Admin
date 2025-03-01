import { PageContainer } from '@ant-design/pro-layout';
import React, { useRef } from 'react';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import { isSuccess, priceFormat } from '@/utils/utils';
import { changeCustomerStatus, queryCustomer } from '@/pages/Customer/List/service';

const queryCustomerData = async (params) => {
  console.log(params);
  const res = await queryCustomer({...params,pageNum:params.current});
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
  const actionRef = useRef();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      search:false,
    },
    {
      title: '账号',
      dataIndex: 'account',
      copyable: true,
    },
    {
      title: '昵称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '会员等级',
      dataIndex: 'vip',
      search:false,
      render: (_, record) => {
        return record.vip.name;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      copyable: true,
    },
    {
      title: '关注数',
      dataIndex: 'idolNum',
      search:false,
    },
    {
      title: '粉丝数',
      dataIndex: 'fansNum',
      search:false,
    },
    {
      title: '总消费金额',
      dataIndex: 'consumePrice',
      search:false,
      render: (_, record) => {
        return priceFormat(record.consumePrice);
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      search:false,
      valueEnum: {
        0: {
          text: '正常',
          status: 'Success',
        },
        1: {
          text: '禁用',
          status: 'Error',
        },
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
            const res = await changeCustomerStatus(row.id);
            if (isSuccess(res)) {
              action.reload();
            }
          }}
        >
          {row.status === 0 ? '禁用' : '启用'}
        </a>,
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
          request={(params, sorter, filter) => queryCustomerData({ ...params, sorter, filter })}
          rowKey="id"
        />
      </div>
    </PageContainer>
  );
};
