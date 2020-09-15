import React from 'react';
import {Form, Modal} from 'antd';
import ProForm, {ProFormText} from '@ant-design/pro-form';

const FormItem = Form.Item;


const UpdateForm = (props) => {
  const {modalVisible, onCancel, onSubmit, values} = props;

  return (
    <Modal
      destroyOnClose
      title="更新角色"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(field) => onSubmit(field)} initialValues={{id: values.id, name: values.name}}>
        <FormItem hidden name="id" label="账号">
          <input/>
        </FormItem>

        <ProFormText name="name" label="角色名称" placeholder="请输入角色名称"
                     rules={[
                       {required: true, message: '请输入用户名称！'},
                       {min: 1, max: 25, message: '用户名长度请保持在6-20个字符之内'},
                     ]}/>
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
