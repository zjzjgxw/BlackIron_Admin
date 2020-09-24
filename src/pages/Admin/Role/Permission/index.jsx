import {PageContainer} from '@ant-design/pro-layout';
import React, {Component, useState, useEffect} from 'react';
import styles from './index.less';
import ProForm, {ProFormCheckbox} from "@ant-design/pro-form";
import {connect, history} from "umi";
import {Form, Button} from "antd";


const groupItem = (group) => {
  const {id, name, permissions} = group;
  const options = [];
  for (let i = 0; i < permissions.length; i += 1) {
    options.push({label: permissions[i].name, value: permissions[i].id});
  }
  return <ProFormCheckbox.Group
    key={id}
    name={id}
    label={name}
    options={options}
  />;
};


class Permissions extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dispatch, match} = this.props;

    dispatch({
      type: 'permission/queryAll',
      payload: {},
    });
    dispatch({
      type: 'permission/queryRolePermissions',
      payload: {roleId: match.params.id}
    }).then(res => {
      this.formRef.current.setFieldsValue(res);
    });
  }


  render() {
    const {permission} = this.props;
    const {groups} = permission;

    const onFinish = values => {
      console.log('Received values of form: ', values);
      history.goBack();
    };

    return (
      <PageContainer className={styles.main}>
        <div
          style={{
            padding: 24,
          }}
        >
          <Form ref={this.formRef} onFinish={onFinish}>
            {
              groups && groups.map((item) => {
                return groupItem(item);
              })
            }

            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageContainer>
    );
  }
}

export default connect(({permission}) => ({
  permission,
}))(Permissions);
