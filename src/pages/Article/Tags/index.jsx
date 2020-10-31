import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import styles from './index.less';
import {Form, Select} from 'antd';
import {searchOwns} from "@/pages/Article/ListSearchArticles/service";
import {isSuccess} from "@/utils/utils";
import StandardFormRow from "@/pages/Article/ListSearchArticles/components/StandardFormRow";

const {Option} = Select;
const FormItem = Form.Item;

export default () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();


  const handleSearch = async (value) => {
    const res = await searchOwns({name: value});
    if (isSuccess(res)) {
      setData(res.data.rows);
    }
  };

  const options = data.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>);
  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Form
          layout="inline"
          form={form}
        >
          <FormItem name="tags">

            <Select
              style={{width: 120}}
              showSearch
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              notFoundContent={null}
            >
              {options}
            </Select>
          </FormItem>


        </Form>


      </div>
    </PageContainer>
  );
};
