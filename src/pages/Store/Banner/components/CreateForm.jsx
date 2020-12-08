import React, {useEffect, useState} from 'react';
import {Button, InputNumber, Modal, Radio, Select, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import ProForm, {ProFormText, ProFormRadio} from '@ant-design/pro-form';
import FormItem from "antd/es/form/FormItem";
import {isSuccess} from "@/utils/utils";
import {queryProductCategory} from "@/pages/Product/Category/service";
import SearchModal from "@/pages/Product/Search/SearchModal";


const CreateForm = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [jumpType, setJumpType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productsModalVisible, setProductsModalVisible] = useState(false);

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const res = info.file.response;
      if(isSuccess(res)){
        setImageUrl(res.data.url);
      }
    }
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );

  const handleCategoryChange = async (categoryId) => {
    console.log(categoryId);
    return null;
  };

  const categorySelected = (
    <FormItem
      label="类目"
      name="categoryId"
    >
      <Select onChange={handleCategoryChange}>
        {categories.map((item) => {
          return (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    </FormItem>
  );


  const productsButton = (
    <FormItem
      label="商品"
      name="productId"
    >
      <Button
        htmlType="button"
        style={{ margin: '8px 0px' }}
        onClick={() => {
          setProductsModalVisible(true);
        }}
      >
        选择商品
      </Button>
    </FormItem>
  );

  const handleJumpTypeChange = (e) => {
    setJumpType(e.target.value);
    return e.target.value;
  };

  const queryCategory = async (params) => {
    const res = await queryProductCategory(params);
    if (isSuccess(res)) {
      return res.data.categories;
    }
    return [];
  };

  useEffect(()=>{
    queryCategory().then(data=>{
      setCategories(data);
    });
  },[]);

  return (
    <Modal
      destroyOnClose
      title="创建Banner"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(values) => onSubmit(values)}>
        <FormItem
          name="images"
          label="头像"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/files/images/localUpload"
            onChange={(info)=>handleChange(info)}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
          </Upload>
        </FormItem>

        <FormItem
          label="序号（越小越靠前）"
          name="indexNo"
          rules={[
            {
              required: true,
              message: '请输入序号',
            },
          ]}
        >
          <InputNumber min={0} precision={0} placeholder="请输入序号"/>
        </FormItem>

        <FormItem label="跳转类型" name="jumpType">
          <div>
            <Radio.Group value={jumpType} onChange={handleJumpTypeChange}>
              <Radio value={1}>商品</Radio>
              <Radio value={0}>类目</Radio>
            </Radio.Group>
          </div>
        </FormItem>

        {jumpType === 0 ? categorySelected : productsButton}

        <SearchModal
          key="searchModel"
          modalVisible={productsModalVisible}
          onCancel={() => {
            setProductsModalVisible(false);
          }}
          onSubmit={(values) => {
            setProductsModalVisible(false);
            console.log(values);
          }}
        />

      </ProForm>


    </Modal>
  );
};

export default CreateForm;
