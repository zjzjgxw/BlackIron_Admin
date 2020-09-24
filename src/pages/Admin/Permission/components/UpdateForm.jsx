import React from 'react';
import {Form, Modal, Radio } from 'antd';
import ProForm, {ProFormSelect, ProFormText} from '@ant-design/pro-form';

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
    groupOptions
  } = props;


  return (
    <Modal
      destroyOnClose
      title="修改权限"
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
          name: values.name,
          path: values.path,
          method: values.method,
          info: values.info,
          groupId:values.groupId.toString()
        }}
      >

        <FormItem hidden name="id" label="id">
          <input  />
        </FormItem>

        <ProFormText name="name" label="权限名称" placeholder="请输入权限名称" rules={[
          {required: true, message: '请输入权限名称！'},
          {min: 1, max: 25, message: '权限名长度请保持在1-25个字符之内'},
        ]}/>
        <ProFormText name="path" label="路径" placeholder="请输入路径" rules={[
          {required: true, message: '请输入路径！'},
        ]}/>

        <ProFormSelect
          request={async () => [
            {
              value: 'get',
              label: 'get',
            },{
              value: 'post',
              label: 'post',
            },{
              value: 'put',
              label: 'put',
            },{
              value: 'delete',
              label: 'delete',
            },{
              value: 'patch',
              label: 'patch',
            },
          ]}
          hasFeedback
          name="method"
          label="请求方法"
          rules={[
            {required: true, message: '请选择请求方式！'},
          ]}
        />
        <ProFormText name="info" label="描述" placeholder="请输入权限描述内容" rules={[
          {required: true, message: '请输入权限描述内容！'},
        ]}/>
        <ProFormSelect
          valueEnum={groupOptions}
          name="groupId"
          label="权限组"
          rules={[
            {required: true, message: '请选择权限组！'},
          ]}
        />

      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
