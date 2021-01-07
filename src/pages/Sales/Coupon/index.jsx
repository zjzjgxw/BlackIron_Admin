import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import {queryCoupons, deleteCoupon, addCoupon, updateCoupon, sendCoupon} from './service';
import {isSuccess, priceFormat} from '@/utils/utils';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import Popconfirm from 'antd/es/popconfirm';
import UserSearchModal from "@/pages/Customer/components/UserSearchModal";

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [userSearchModalVisible, setUserSearchModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [currentCouponValues, setCurrentCouponValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();

  const queryCouponData = async (params) => {
    const res = await queryCoupons(params);
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
    const res = await deleteCoupon(id);
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
      title: '优惠券',
      dataIndex: 'name',
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
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
      title: '抵扣金额',
      dataIndex: 'price',
      search: false,
      valueType: 'money',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '抵扣金额为必填项',
          },
        ],
      },
      render: (_, record) => {
        return priceFormat(record.price);
      }
    },
    {
      title: '满减金额',
      dataIndex: 'targetPrice',
      search: false,
      valueType: 'money',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '满减抵扣为必填项',
          },
        ],
      },
      render: (_, record) => {
        return priceFormat(record.targetPrice);
      }
    },
    {
      title: '剩余张数',
      dataIndex: 'num',
      search: false,
      valueType: 'digit',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '剩余张数为必填项',
          },
        ],
      },
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
              setCurrentCouponValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical"/>
          <a
            key={`send_${record.id}`}
            onClick={() => {
              setUserSearchModalVisible(true);
              setCurrentCouponValues(record);
            }}
          >
            发放优惠券
          </a>
          <Divider type="vertical"/>
          <Popconfirm
            key={`delete_confirm_${record.id}`}
            title="确定删除？"
            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
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
        headerTitle="优惠券列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryCouponData({...params, sorter, filter})}
        columns={columns}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit={async (values) => {
          const res = await addCoupon({...values, price: values.price * 100, targetPrice: values.targetPrice * 100});
          if (isSuccess(res)) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      <UserSearchModal   onCancel={() => setUserSearchModalVisible(false)}
                         modalVisible={userSearchModalVisible}
                         onSubmit={async (value) => {
                           if(value.length == 0){
                             setUserSearchModalVisible(false);
                             setCurrentCouponValues({});
                             return ;
                           }
                           const params = {
                             id: currentCouponValues.id,
                             userIds: value
                           };
                           const res = await sendCoupon(params);
                           if(isSuccess(res)){
                             message.info('发放成功');
                             setUserSearchModalVisible(false);
                             setCurrentCouponValues({});
                             if (actionRef.current) {
                               actionRef.current.reload();
                             }
                           }
                         }}
      />

      {currentCouponValues && Object.keys(currentCouponValues).length ? (
        <CreateForm
          onSubmit={async (value) => {
            const res = await updateCoupon({...value, price: value.price * 100, targetPrice: value.targetPrice * 100});
            if (isSuccess(res)) {
              message.info('修改成功');
              handleUpdateModalVisible(false);
              setCurrentCouponValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentCouponValues({});
          }}
          modalVisible={updateModalVisible}
          info={currentCouponValues}
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
