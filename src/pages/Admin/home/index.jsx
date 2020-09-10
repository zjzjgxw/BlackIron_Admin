import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect, useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import {Button, message} from 'antd';

import styles from './index.less';
import {queryAdmins} from "@/pages/Admin/home/service";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import CreateForm from "@/pages/Admin/home/components/CreateForm";
import {addRule} from "@/pages/ListTableList/service";

export default () => {

    const [createModalVisible, handleModalVisible] = useState(false);
    const actionRef = useRef();


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            hideInForm: true,
        },
        {
            title: '账号',
            dataIndex: 'account',
            copyable: true,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            copyable: true,
            hideInSearch: true,
        },
        {
            title: '是否为超级管理员',
            dataIndex: 'adminFlag',
            hideInSearch: true,
            render: (_, record) => {
                const {adminFlag} = record;
                if (adminFlag) {
                    return '是';
                }
                return '否'

            },
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            copyable: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: true,
            hideInSearch: true,
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
            title: 'option',
            valueType: 'option',
            dataIndex: 'id',
            render: (text, row, _, action) => [
                <a key={row.id}
                   onClick={() => {
                       window.alert('确认删除？');
                       action.reload();
                   }}
                >
                    {row.status === 0 ? '禁用' : '启用'}
                </a>,
                <a key={row.id}
                   onClick={() => {
                       window.alert('确认刷新？');
                       action.reload();
                   }}
                >
                    删除
                </a>,
            ],
        },
    ];

    return (
        <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
            <div
                style={{
                    paddingTop: 100,
                    textAlign: 'center',
                }}
            >
                <ProTable
                    size="small"
                    columns={columns}
                    actionRef={actionRef}
                    request={(params, sorter, filter) => queryAdmins({...params, sorter, filter})}
                    rowKey="id"
                    toolBarRender={() => [
                        <Button key="addAdminButton" type="primary" onClick={() => handleModalVisible(true)}>
                            <PlusOutlined/>
                            新建
                        </Button>,
                    ]}
                />

                <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
                            onSubmitter={async (fields) => {
                                console.log(fields);
                                const hide = message.loading('正在添加');

                                try {
                                    // await addRule({...fields});
                                    hide();
                                    message.success('添加成功');
                                    handleModalVisible(false)
                                    return true;
                                } catch (error) {
                                    hide();
                                    message.error('添加失败请重试！');
                                    return false;
                                }
                            }}/>

            </div>
        </PageContainer>
    )
        ;
};
