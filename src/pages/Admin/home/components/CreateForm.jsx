import React from 'react';
import {Input, Modal} from 'antd';
import ProForm, {ProFormText, ProFormSelect, ProFormRadio} from '@ant-design/pro-form';
import FormItem from "antd/es/form/FormItem";

const CreateForm = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;
  return (
    <Modal
      destroyOnClose
      title="创建管理员"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(values) => onSubmit(values)}>
        <ProFormText name="account" label="账号" tip="最长为 24 位" placeholder="请输入账号" rules={[
          {required: true, message: '请输入账号'},
          {min: 6, max: 20, message: '账号保持在6-20个字符之内'},
          {pattern: new RegExp('^[0-9a-zA-Z_]{1,}$', 'g'), message: '只允许包含数字、字母、下划线'},
        ]}/>
        <FormItem
          name="password"
          label="密码"
          rules={[
            {required: true, message: '请输入密码！'},
            {pattern: new RegExp('^[0-9a-zA-Z_]{1,}$', 'g'), message: '只允许包含数字、字母、下划线'},
            {min: 6, max: 25, message: '密码长度请保持在6-20个字符之内'},
          ]}>
          <Input.Password placeholder="请输入密码"/>
        </FormItem>
        <ProFormText name="name" label="用户名称" placeholder="请输入用户名称" rules={[
          {required: true, message: '请输入用户名称！'},
          {min: 1, max: 25, message: '用户名长度请保持在6-20个字符之内'},
        ]}/>
        <ProFormRadio.Group
          name="adminFlag"
          label="是否为超级管理员"
          options={[
            {
              label: '否',
              value: 0,
            },
            {
              label: '是',
              value: 1,
            },

          ]}
          rules={[{required: true, message: '请选择是否为超级管理员'},
          ]}
        />
        <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[
          {required: true, type: 'email'},
        ]}/>

      </ProForm>


    </Modal>
  );
};

export default CreateForm;
