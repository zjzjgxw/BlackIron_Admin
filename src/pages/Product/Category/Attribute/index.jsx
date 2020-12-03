import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useRef } from 'react';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import { isSuccess } from '@/utils/utils';
import Popconfirm from 'antd/es/popconfirm';
import QuestionCircleOutlined from '@ant-design/icons/lib/icons/QuestionCircleOutlined';
import { Button, message } from 'antd';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import {
  addAttributeOption,
  addAttributes,
  deleteAttribute,
  deleteAttributeOption,
  queryProductCategoryAttribute,
  updateAttribute,
} from '@/pages/Product/Category/Attribute/service';
import CreateForm from '@/pages/Product/Category/Attribute/components/CreateForm';
import UpdateForm from '@/pages/Product/Category/Attribute/components/UpdateForm';
import EditOptionForm from '@/pages/Product/Category/Attribute/components/EditOptionForm';

const queryCategoryAttribute = async (categoryId) => {
  const res = await queryProductCategoryAttribute(categoryId);
  if (isSuccess(res)) {
    const data = {
      data: res.data.attributes,
      total: res.data.attributes.length,
      success: true,
    };
    return data;
  }
  return {};
};

export default (props) => {
  const { match } = props;
  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [optionModalVisible, handleOptionModalVisible] = useState(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [attribute, setAttribute] = useState({});

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '属性名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '选项',
      dataIndex: 'options',
      hideInSearch: true,
      render: (_, row) => {
        const { options = [] } = row;

        const values = [];
        options.forEach((item) => {
          values.push(item.content);
        });
        return values && values.length > 0 ? values.join('、') : '无';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, _, action) => [
        <a
          key={row.id}
          onClick={() => {
            handleOptionModalVisible(true);
            setAttribute(row);
          }}
        >
          选项管理
        </a>,
        <a
          key={row.id}
          onClick={() => {
            handleUpdateModalVisible(true);
            setAttribute(row);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={row.id}
          title="确定删除？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteAttribute(row.id);
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
          request={() => queryCategoryAttribute(match.params.id)}
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
              const res = await addAttributes({ name: fields.name, categoryId: match.params.id });
              if(isSuccess(res)){
                message.success('添加成功');
                handleModalVisible(false);
                actionRef.current.reload();
              }
              return true;
            } catch (error) {
              message.error('添加失败请重试！');
              return false;
            }
          }}
        />

        {attribute && Object.keys(attribute).length ? (
          <EditOptionForm
            onCancel={() => {
              handleOptionModalVisible(false);
              setAttribute({});
            }}
            attribute={attribute}
            modalVisible={optionModalVisible}
            onDelete={deleteAttributeOption}
            onAdd={addAttributeOption}
          />
        ) : null}

        {attribute && Object.keys(attribute).length ? (
          <UpdateForm
            onCancel={() => {
              handleUpdateModalVisible(false);
              setAttribute({});
            }}
            values={attribute}
            modalVisible={updateModalVisible}
            onSubmit={async (fields) => {
              try {
                const res =  await updateAttribute(fields.id, fields.name);
                if(isSuccess(res)){
                  message.success('更新成功');
                  handleUpdateModalVisible(false);
                  setAttribute({});
                  actionRef.current.reload();
                }
                return true;
              } catch (error) {
                message.error('更新失败请重试！');
                handleUpdateModalVisible(false);
                setAttribute({});
                return false;
              }
            }}
          />
        ) : null}
      </div>
    </PageContainer>
  );
};
