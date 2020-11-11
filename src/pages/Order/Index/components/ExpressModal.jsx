import React from 'react';
import {Form, Modal, Select, Input} from 'antd';
import ProForm from '@ant-design/pro-form';

const FormItem = Form.Item;


const ExpressModal = (props) => {
  const {modalVisible, onCancel, onSubmit, info, expresses} = props;

  return (
    <Modal
      destroyOnClose
      title="发货"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(field) => onSubmit(field)} initialValues={{
        id: info.orderId,
        expressCode: info.expressCode,
        expressId: info.expressId !== 0 ? info.expressId : null
      }}>
        <FormItem hidden name="id" label="订单id">
          <Input/>
        </FormItem>

        <Form.Item
          name="expressId"
          label="快递公司"
          rules={[
            {
              required: true,
              message: '请选择快递公司',
            },
          ]}
        >
          <Select placeholder="请选择">
            {expresses && expresses.length > 0 ? expresses.map((item) => {
              return (<Select.Option value={item.id}>{item.name}</Select.Option>
              )
            }) : null}
          </Select>
        </Form.Item>

        <Form.Item
          name="expressCode"
          label="快递单号"
          rules={[
            {
              required: true,
              message: '请输入快递单号',
            },
          ]}
        >
          <Input placeholder="请输入快递单号"/>
        </Form.Item>
      </ProForm>
    </Modal>
  );
};

export default ExpressModal;
