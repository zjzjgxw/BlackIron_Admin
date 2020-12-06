import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'antd';
import ProForm, {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';
import moment from 'moment';
import SearchModal from '@/pages/Product/Search/SearchModal';

const FormItem = Form.Item;

const CreateForm = (props) => {
  const { modalVisible, onCancel, info, onSubmit } = props;
  const [form] = Form.useForm();

  const [showSelectButton, setShowSelectButton] = useState(false);

  const [productsModalVisible, setProductsModalVisible] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleValueChange = (changedValues) => {
    if (changedValues.hasOwnProperty('mode')) {
      // eslint-disable-next-line radix
      if (parseInt(changedValues.mode) === 1) {
        setShowSelectButton(true);
      } else {
        setShowSelectButton(false);
      }
    }
  };

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
      startTime: values.dateTimeRange[0],
      endTime: values.dateTimeRange[1],
      products: selectedProducts,
    });
  };

  useEffect(() => {
    if (typeof info !== 'undefined' && info) {
      form.setFieldsValue({
        id: info.id,
        name: info.name,
        content: info.content,
        price: info.price/100,
        targetPrice: info.targetPrice/100,
        num: info.num,
        mode: `${info.mode}`,
        dateTimeRange: [moment(info.startTime), moment(info.endTime)],
      });
      if (info.mode === 1) {
        setShowSelectButton(true);
      }
    }
  }, []);
  return (
    <Modal
      destroyOnClose
      title={info ? '修改优惠券' : '创建优惠券'}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        form={form}
        onFinish={(values) => handleSubmit(values)}
        onValuesChange={handleValueChange}
      >
        <FormItem hidden name="id" label="id">
          <input />
        </FormItem>

        <ProFormText
          name="name"
          label="优惠券名称"
          placeholder="请输入优惠券名称"
          rules={[
            { required: true, message: '请输入优惠券名称！' },
            { min: 1, max: 20, message: '优惠券名称长度请保持在1-20个字符之内' },
          ]}
        />
        <ProFormTextArea
          name="content"
          label="描述"
          width="l"
          placeholder="请输入优惠券描述"
          rules={[
            { required: true, message: '请输入优惠券描述！' },
            { min: 1, max: 100, message: '优惠券描述长度请保持在100个字符之内' },
          ]}
        />

        <ProFormDigit
          label="抵扣金额"
          name="price"
          min={1}
          fieldProps={{ precision: 2 }}
          rules={[{ required: true, message: '请输入满减' }]}
        />

        <ProFormDigit
          label="满减金额"
          name="targetPrice"
          min={0}
          fieldProps={{ precision: 2 }}
          rules={[{ required: true, message: '请输入满减' }]}
        />

        <ProFormDigit
          label="数量"
          name="num"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true, message: '请输入优惠券数量' }]}
        />

        <ProFormSelect
          name="mode"
          label="模式"
          valueEnum={{
            0: '全场',
            1: '指定商品',
          }}
          placeholder="请选择模式"
          rules={[{ required: true, message: '请选择模式' }]}
        />

        {showSelectButton ? (
          <Button
            htmlType="button"
            style={{ margin: '8px 0px' }}
            onClick={() => {
              setProductsModalVisible(true);
            }}
          >
            选择商品
          </Button>
        ) : null}

        <SearchModal
          key="searchModel"
          modalVisible={productsModalVisible}
          onCancel={() => {
            setProductsModalVisible(false);
          }}
          onSubmit={(values) => {
            setProductsModalVisible(false);
            setSelectedProducts(values);
          }}
        />

        <ProFormDateTimeRangePicker
          name="dateTimeRange"
          label="活动时间"
          rules={[{ required: true, message: '请选择活动时间' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
