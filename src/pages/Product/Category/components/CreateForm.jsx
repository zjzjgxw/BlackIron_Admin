import React from 'react';
import { Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const CreateForm = (props) => {
  const { modalVisible, onCancel, onSubmit } = props;

  return (
    <Modal
      destroyOnClose
      title="创建类目"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(values) => onSubmit(values)}>
        <ProFormText
          name="name"
          label="类目名称"
          placeholder="请输入类目名称"
          rules={[
            { required: true, message: '请输入类目名称！' },
            { min: 1, max: 5, message: '类目名长度请保持在1-5个字符之内' },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
