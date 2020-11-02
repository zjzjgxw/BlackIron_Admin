import React from 'react';
import { Form, Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const FormItem = Form.Item;

const UpdateForm = (props) => {
  const { modalVisible, onCancel, onSubmit, values } = props;

  return (
    <Modal
      destroyOnClose
      title="更新属性"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        onFinish={(field) => onSubmit(field)}
        initialValues={{ id: values.id, name: values.name }}
      >
        <FormItem hidden name="id" label="id">
          <input />
        </FormItem>

        <ProFormText
          name="name"
          label="属性名称"
          placeholder="请输入属性名称"
          rules={[
            { required: true, message: '请输入属性名称！' },
            { min: 1, max: 5, message: '属性长度请保持在1-5个字符之内' },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
