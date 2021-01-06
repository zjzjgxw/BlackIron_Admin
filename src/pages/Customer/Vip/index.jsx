import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {isSuccess, priceFormat} from "@/utils/utils";
import {createVip, deleteVips, queryVips, updateVips} from "@/pages/Customer/Vip/service";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import Popconfirm from "antd/es/popconfirm";



const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [vipInfo, setVipInfo] = useState({});
  const actionRef = useRef();


  const queryVipsData = async (params) => {
    const res = await queryVips({...params, pageNum: params.current});
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
    const res = await deleteVips(id);
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
      search: false
    },
    {
      title: '等级',
      dataIndex: 'level',
      search: false
    },
    {
      title: '名称',
      dataIndex: 'name',
      search: false
    },
    {
      title: '邮费',
      dataIndex: 'freeExpress',
      search: false,
      valueEnum: {
        0: {
          text: '不包邮',
          status: 'Default',
        },
        1: {
          text: '包邮',
          status: 'Success',
        },
      },
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      search: false,
      render: (_, record) => {
        return `${record.discount}%`;
      }
    },{
      title: '满足消费金额',
      dataIndex: 'consumePrice',
      search: false,
      render: (_, record) => {
        return `${priceFormat(record.consumePrice)}`;
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a key={record.id}
            onClick={() => {
              handleUpdateModalVisible(true);
              setVipInfo(record);
            }}
          >
            编辑
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
        headerTitle="VIP列表"
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
        request={(params, sorter, filter) => queryVipsData({...params, sorter, filter})}
        columns={columns}
      />

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
                  onSubmit={async (values) => {
                    const res = await createVip({...values, consumePrice: values.consumePrice * 100});
                    if(isSuccess(res)){
                      handleModalVisible(false);
                      if (actionRef.current) {
                        actionRef.current.reload();
                      }
                    }
                  }}
      />

      {vipInfo && Object.keys(vipInfo).length ? (
        <UpdateForm
          onSubmit={async (values) => {
            const success = await updateVips({...values, consumePrice: values.consumePrice * 100});
            if (success) {
              message.success('修改成功');
              handleUpdateModalVisible(false);
              setVipInfo({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setVipInfo({});
          }}
          modalVisible={updateModalVisible}
          values={vipInfo}
        />
      ) : null}

    </PageContainer>
  );
};

export default TableList;
