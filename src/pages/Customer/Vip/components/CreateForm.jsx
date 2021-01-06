import React, { useState} from 'react';
import {Form, Modal, Radio, Select} from 'antd';
import ProForm, {ProFormText, ProFormDigit} from "@ant-design/pro-form";
import FormItem from "antd/es/form/FormItem";

const CreateForm = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;
  const [freeExpress, setFreeExpress] = useState(0);
  const [form] = Form.useForm();



  const handleFreeExpressChange = (e) => {
    form.setFieldsValue({freeExpress: e.target.value});
    setFreeExpress(e.target.value);
    return e.target.value;
  };


  return (
    <Modal
      destroyOnClose
      title="新建Vip规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(values) => onSubmit(values)}>
        <ProFormDigit
          name="level"
          label="等级"
          initialValue={1}
          placeholder="请输入等级"
          width="xs"
          rules={[
            {required: true, message: '请输入等级！'},
          ]}
          fieldProps={{precision: 0}}

        />
        <ProFormText
          name="name"
          label="等级名称"
          placeholder="请输入等级名称"
          rules={[
            {required: true, message: '请输入等级名称！'},
            {min: 1, max: 5, message: '等级名称长度请保持在1-5个字符之内'},
          ]}
        />

        <FormItem label="是否包邮" name="freeExpress"
                  rules={[
                    {
                      required: true,
                      message: '请选择是否包邮',
                    },
                  ]}>
          <div>
            <Radio.Group value={freeExpress} onChange={handleFreeExpressChange}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </div>
        </FormItem>

        <ProFormDigit
          name="discount"
          label="折扣（%）"
          initialValue={100}
          placeholder="请输入折扣"
          width="xs"
          rules={[
            {required: true, message: '请输入折扣！'},
          ]}
          min={1}
          max={100}
          fieldProps={{precision: 0}}

        />

        <ProFormDigit
          name="consumePrice"
          label="满足消费金额(元）"
          initialValue={0}
          placeholder="请输入消费金额"
          width="s"
          rules={[
            {required: true, message: '请输入消费金额！'},
          ]}
          min={0}
          fieldProps={{precision: 0}}
        />


      </ProForm>
    </Modal>
  );
};

export default CreateForm;
