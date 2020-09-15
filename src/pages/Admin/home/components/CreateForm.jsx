import React, {useState} from 'react';
import {Input, Modal, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import ProForm, {ProFormText, ProFormUploadButton, ProFormRadio} from '@ant-design/pro-form';
import FormItem from "antd/es/form/FormItem";
import {isSuccess} from "@/utils/utils";


const CreateForm = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);


  const handleChange = info => {

    if (info.file.status === 'uploading') {
      console.log('uploading');
      console.log(info);
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log('done');
      console.log(info);
      setLoading(false);
      const res = info.file.response;
      if(isSuccess(res)){
        setImageUrl(res.data.filePath);
      }

    }
  };

  const normFile = e => {
    console.log('Upload event:', e);
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
  )
  return (
    <Modal
      destroyOnClose
      title="创建管理员"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(values) => onSubmit(values)}>
        <ProFormText name="account" label="账号" tip="最长为 24 位" placeholder="请输入账号" rules={[
          {required: true, message: '请输入账号'},
          {min: 6, max: 20, message: '账号保持在6-20个字符之内'},
          {pattern: new RegExp('^[0-9a-zA-Z_]{1,}$', 'g'), message: '只允许包含数字、字母、下划线'},
        ]}/>
        <FormItem
          name="password"
          label="密码"
          rules={[
            {required: true, message: '请输入密码！'},
            {pattern: new RegExp('^[0-9a-zA-Z_]{1,}$', 'g'), message: '只允许包含数字、字母、下划线'},
            {min: 6, max: 25, message: '密码长度请保持在6-20个字符之内'},
          ]}>
          <Input.Password placeholder="请输入密码"/>
        </FormItem>
        <ProFormText name="name" label="用户名称" placeholder="请输入用户名称" rules={[
          {required: true, message: '请输入用户名称！'},
          {min: 1, max: 25, message: '用户名长度请保持在6-20个字符之内'},
        ]}/>
        <ProFormRadio.Group
          name="adminFlag"
          label="是否为超级管理员"
          options={[
            {
              label: '否',
              value: 0,
            },
            {
              label: '是',
              value: 1,
            },

          ]}
          rules={[{required: true, message: '请选择是否为超级管理员'},
          ]}
        />
        <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[
          {required: true, type: 'email'},
        ]}/>

        <FormItem
          name="avatar"
          label="头像"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/upload/img"
            onChange={(info)=>handleChange(info)}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
          </Upload>
        </FormItem>


      </ProForm>


    </Modal>
  );
};

export default CreateForm;
