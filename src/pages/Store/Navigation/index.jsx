import { PageContainer } from '@ant-design/pro-layout';
import React, {useState, useRef} from 'react';
import {Button, Image, message, Popconfirm} from 'antd';
import styles from './index.less';
import {isSuccess} from "@/utils/utils";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import ProTable from "@ant-design/pro-table";
import {PlusOutlined} from "@ant-design/icons";
import {createNavigation, deleteNavigation, queryNavigations, updateNavigation} from "@/pages/Store/Navigation/service";
import CreateForm from "@/pages/Store/Navigation/components/CreateForm";
import UpdateForm from "@/pages/Store/Navigation/components/UpdateForm";


export default () => {
  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [navigation, setNavigation] = useState({});

  const queryNavigationsData = async (params) => {
    const res = await queryNavigations(params);
    if (isSuccess(res)) {
      return {
        data: res.data.navigations,
        total: res.data.navigations.length,
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
      title: '图片',
      dataIndex: 'imgUrl',
      search: false,
      render: (_, row) => {
        return (
          <div>
            <Image
              width={250}
              height={125}
              src={row.imgUrl}
            />
          </div>
        );
      },
    },
    {
      title: '跳转路径',
      dataIndex: 'url',
      search: false,
    },
    {
      title: '序号',
      dataIndex: 'indexNo',
      search: false,
      sorter: (a, b) => a.indexNo - b.indexNo,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      valueType: 'dateTime',
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
            setNavigation(row);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={row.id}
          title="确定删除？"
          icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
          onConfirm={async () => {
            const res = await deleteNavigation(row.id);
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
    <PageContainer  className={styles.main}>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <ProTable
          headerTitle="导航项 列表"
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
          request={(params, sorter, filter) => queryNavigationsData({...params, sorter, filter})}
          columns={columns}
        />

        <CreateForm
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          onSubmit={async (fields) => {
            const res = await createNavigation(fields);
            if (isSuccess(res)) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />


        {navigation && Object.keys(navigation).length ? (
          <UpdateForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setNavigation({});
            }}
            modalVisible={updateModalVisible}
            values={navigation}
            onSubmit={async (fields) => {
              try {
                const res = await updateNavigation(fields);
                if (isSuccess(res)) {
                  actionRef.current.reload();
                  message.success('修改成功');
                  setNavigation({});
                  handleUpdateModalVisible(false);
                }
                return true;
              } catch (error) {
                message.error('修改失败请重试！');
                return false;
              }
            }}
          />
        ) : null}
      </div>
    </PageContainer>
  );
};
