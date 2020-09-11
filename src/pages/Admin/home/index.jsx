import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect, useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import {Button, message} from 'antd';

import {addAdmin, changeAdminStatus, deleteAdmin, queryAdmins} from "@/pages/Admin/home/service";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import CreateForm from "@/pages/Admin/home/components/CreateForm";
import Popconfirm from "antd/es/popconfirm";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import {isSuccess} from "@/utils/utils";
import styles from './index.less';
import UpdateForm from "@/pages/Admin/home/components/UpdateForm";

const queryAdminsData = async (params) => {
    const res = await queryAdmins(params);
    if (isSuccess(res)) {
        const data = {
            data: res.data.admins,
            total: res.data.total,
            success: true
        };
        return data;
    }
    return {}
};

export default () => {

    const [createModalVisible, handleModalVisible] = useState(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [adminValues, setAdminValues] = useState({});

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
            title: '操作',
            valueType: 'option',
            dataIndex: 'id',
            render: (text, row, _, action) => [
                <a key={row.id} onClick={async () => {
                    const res = await changeAdminStatus(row.id);
                    if (isSuccess(res)) {
                        action.reload();
                    }
                }}>
                    {row.status === 0 ? '禁用' : '启用'}
                </a>,
                <a key={row.id} onClick={() => {
                    handleUpdateModalVisible(true);
                    setAdminValues(row);
                }}>
                    编辑
                </a>,
                <Popconfirm key={row.id} title="确定删除？" icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                            onConfirm={async () => {
                                const res = await deleteAdmin(row.id);
                                if (isSuccess(res)) {
                                    action.reload();
                                }
                            }}>
                    <a key={row.id}>删除</a>
                </Popconfirm>
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
                    request={(params, sorter, filter) => queryAdminsData({...params, sorter, filter})}
                    rowKey="id"
                    toolBarRender={() => [
                        <Button key="addAdminButton" type="primary" onClick={() => handleModalVisible(true)}>
                            <PlusOutlined/>
                            新建
                        </Button>,
                    ]}
                />

                <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
                            onSubmit={async (fields) => {
                                console.log(fields);
                                const hide = message.loading('正在添加');
                                try {
                                    await addAdmin({...fields});
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
                {adminValues && Object.keys(adminValues).length ? (
                <UpdateForm
                    onCancel={() => {
                        handleUpdateModalVisible(false);
                        setAdminValues({});
                    }}
                    modalVisible={updateModalVisible}
                    values={adminValues}
                    onSubmit={async (fields) => {
                        console.log(fields);
                        try {
                            // await addAdmin({...fields});
                            message.success('修改成功');
                            setAdminValues({});
                            handleUpdateModalVisible(false);
                            return true;
                        } catch (error) {
                            message.error('添加失败请重试！');
                            return false;
                        }
                    }}
                />): null}

            </div>
        </PageContainer>
    )
        ;
};
