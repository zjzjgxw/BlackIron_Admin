import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import ProTable from "@ant-design/pro-table";
import {queryCustomer} from "@/pages/Customer/List/service";
import {isSuccess} from "@/utils/utils";
import VipSelect from "@/pages/Customer/components/VipSelect";


const UserSearchModal = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  useEffect(()=>{
    setSelectedRowKeys([]);
  },[modalVisible]);

  const onSelectChange = keys => {
    setSelectedRowKeys(keys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const queryCustomerData = async (params) => {
    const res = await queryCustomer({...params, pageNum: params.current});
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

  const actionRef = useRef();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '昵称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '会员等级',
      dataIndex: 'vip',
      search: false,
      render: (_, record) => {
        return record.vip.name;
      },
    },
    {
      title: '会员等级',
      hideInTable: true,
      dataIndex: 'vipId',
      renderFormItem: (_, {type, defaultRender, formItemProps, fieldProps, ...rest}, form) => {
        if (type === 'form') {
          return null;
        }
        return <VipSelect  {...rest}/>;
      }
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
  ];


  return (
    <Modal
      destroyOnClose
      title="用户选择模块"
      visible={modalVisible}
      width={1280}
      onCancel={() => onCancel()}
      onOk={()=>onSubmit(selectedRowKeys)}
    >
      <ProTable
        size="small"
        columns={columns}
        actionRef={actionRef}
        rowSelection={rowSelection}
        request={(params, sorter, filter) => queryCustomerData({...params, sorter, filter})}
        rowKey="id"
      />


    </Modal>
  );
};

export default UserSearchModal;
