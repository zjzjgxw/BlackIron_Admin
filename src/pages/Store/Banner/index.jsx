import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect, useRef} from 'react';
import {Button, Image, message, Popconfirm, Spin} from 'antd';
import styles from './index.less';
import {PlusOutlined} from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {isSuccess} from "@/utils/utils";
import {createBanner, deleteBanner, queryBanners, updateBanner} from "@/pages/Store/Banner/service";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import {deleteProduct} from "@/pages/Product/List/service";
import CreateForm from "@/pages/Store/Banner/components/CreateForm";
import UpdateForm from "@/pages/Store/Banner/components/UpdateForm";

export default () => {
  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [banner, setBanner] = useState({});


  const queryBannersData = async (params) => {
    const res = await queryBanners(params);
    if (isSuccess(res)) {
      return {
        data: res.data.banners,
        total: res.data.banners.length,
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
              width={50}
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
            setBanner(row);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={row.id}
          title="确定删除？"
          icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
          onConfirm={async () => {
            const res = await deleteBanner(row.id);
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
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <ProTable
          headerTitle="Banner 列表"
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
          request={(params, sorter, filter) => queryBannersData({...params, sorter, filter})}
          columns={columns}
        />

        <CreateForm
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          onSubmit={async (fields) => {
            const params = {...fields, imgUrl: fields.images[0].response.data.path};
            const res = await createBanner(params);
            if (isSuccess(res)) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />


        {banner && Object.keys(banner).length ? (
          <UpdateForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setBanner({});
            }}
            modalVisible={updateModalVisible}
            values={banner}
            onSubmit={async (fields) => {
              try {
                const res = await updateBanner(fields);
                if (isSuccess(res)) {
                  actionRef.current.reload();
                  message.success('修改成功');
                  setBanner({});
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
