import React, {useState} from 'react';
import {Form, Modal, Radio, Upload} from 'antd';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import FormItem from "antd/es/form/FormItem";
import {isSuccess} from "@/utils/utils";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const CreateForm = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [showFlag, setShowFlag] = useState(null);
  const [form] = Form.useForm();


  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const res = info.file.response;
      if (isSuccess(res)) {
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

  const handleShowFlagChange = (e) => {
    form.setFieldsValue({showFlag: e.target.value});
    setShowFlag(e.target.value);
    return e.target.value;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );
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
            {required: true, message: '请输入类目名称！'},
            {min: 1, max: 5, message: '类目名长度请保持在1-5个字符之内'},
          ]}
        />

        <FormItem label="首页展示" name="showFlag"
                  rules={[
                    {
                      required: true,
                      message: '请选择一个售卖模式',
                    },
                  ]}>
          <div>
            <Radio.Group value={showFlag} onChange={handleShowFlagChange}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </div>
        </FormItem>

        <FormItem
          name="images"
          label="展示图（720 * 300）"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/files/images/localUpload"
            onChange={(info) => handleChange(info)}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
          </Upload>
        </FormItem>
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
