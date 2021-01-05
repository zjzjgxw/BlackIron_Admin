import React from 'react';
import {Form, Modal, Radio } from 'antd';
import ProForm, {ProFormText} from '@ant-design/pro-form';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = (props) => {
  const [form] = Form.useForm();
  const {
    onSubmit,
    onCancel,
    modalVisible,
    values,
  } = props;


  return (
    <Modal
      destroyOnClose
      title="员工信息编辑"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        {...formLayout}
        form={form}
        onFinish={(fields) => onSubmit(fields)}
        initialValues={{
          id:values.id,
          account: values.account,
          name: values.name,
          admin: values.admin,
          email: values.email,
        }}
      >

        <FormItem hidden name="id" label="id">
          <input  />
        </FormItem>

        <FormItem name="account" label="账号">
          <input disabled/>
        </FormItem>

        <ProFormText name="name" label="用户名称" placeholder="请输入用户名称" rules={[
          {required: true, message: '请输入用户名称！'},
          {min: 1, max: 25, message: '用户名长度请保持在6-20个字符之内'},
        ]}/>

        <FormItem name="admin" label="管理员">
          <RadioGroup>
            <Radio value={false}>否</Radio>
            <Radio value={true}>是</Radio>
          </RadioGroup>
        </FormItem>
        <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[
          {required: true, type: 'email'},
        ]}/>
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
