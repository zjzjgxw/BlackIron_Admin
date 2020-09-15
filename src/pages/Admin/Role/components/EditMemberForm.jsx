import React from 'react';
import {Form, Modal} from 'antd';
import ProForm, {ProFormSelect} from '@ant-design/pro-form';

const FormItem = Form.Item;


const EditMemberForm = (props) => {
  const {modalVisible, onCancel, onSubmit, request, values} = props;

  return (
    <Modal
      destroyOnClose
      title="编辑角色成员"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={(field) => onSubmit(field)}
               initialValues={{id: values.id, selectedAdmins: values.adminIds}}>
        <FormItem hidden name="id" label="账号">
          <input/>
        </FormItem>

        <ProFormSelect
          name="selectedAdmins"
          label="选择成员"
          mode="multiple"
          request={async () => request()}
          placeholder="Please select a country"
          rules={[{required: true, message: 'Please select your country!'}]}
        />
      </ProForm>
    </Modal>
  );
};

export default EditMemberForm;
