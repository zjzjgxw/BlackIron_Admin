import React from 'react';
import { Form, Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const FormItem = Form.Item;

const UpdateCategoryForm = (props) => {
  const { modalVisible, onCancel, onSubmit, values } = props;

  return (
    <Modal
      destroyOnClose
      title="更新类目"
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
          label="类目名称"
          placeholder="请输入类目名称"
          rules={[
            { required: true, message: '请输入类目名称！' },
            { min: 1, max: 5, message: '类目名称度请保持在1-5个字符之内' },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default UpdateCategoryForm;
