import {InfoCircleOutlined} from '@ant-design/icons';
import {Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip} from 'antd';
import {connect, FormattedMessage, formatMessage} from 'umi';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {queryProductCategory} from "@/pages/Product/Category/service";
import {isSuccess} from "@/utils/utils";
import {queryProductCategorySpecification} from "@/pages/Product/Category/Specification/service";
import {queryProductDetails} from "@/pages/Product/Images/service";
import {queryStockInfo} from "@/pages/Product/Stock/service";
import SpecificationTable from "@/pages/Product/Stock/components/SpecificationTable";
import styles from './style.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

const Stock = props => {
  const {submitting, match} = props;
  const [form] = Form.useForm();
  const [specifications, setSpecifications] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [secondName, setSecondName] = useState(null);

  const [selectDict, setSelectedDict] = useState({});
  const [tableDataSource, setTableDataSource] = useState([]);

  const [priceDict,setPriceDict] = useState({});

  const queryStockData = async () => {
    const res = await queryStockInfo(match.params.id);
    if (isSuccess(res)) {
      return res.data.info;
    }
    return {};
  };


  const querySpecifications = async (productId) => {
    const res = await queryProductCategorySpecification(productId);
    if (isSuccess(res)) {
      return res.data.list;
    }
    return [];
  };


  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 10,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    console.log(priceDict);
  };

  const onFinishFailed = errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {

  };


  const handleSpecificationChange = (value, name) => {
    // console.log(value, name);
    selectDict[name] = value;
    // console.log(selectDict);
    const tableData = [];

    selectDict[firstName].forEach((firstValue) => {
      if (selectDict[secondName].length > 0) {
        selectDict[secondName].forEach((secondValue) => {
          tableData.push({
            firstName,
            firstValue,
            secondName,
            secondValue
          })
        })
      } else {
        tableData.push({
          firstName,
          firstValue,
          secondName: null,
          secondValue: null
        })
      }
    });
    setTableDataSource(tableData);
  };

  const handlePrice = (firstTitle, secondTitle, firstValue, secondValue, value) => {
    console.log({firstTitle, secondTitle, firstValue, secondValue, value});
    if(secondValue != null){
      priceDict[`${firstValue}_${secondValue}`] = value;
    }else{
      priceDict[`${firstValue}`] = value;
    }
  };

  const handleLastNum = (firstTitle, secondTitle, firstValue, secondValue, value) => {
    console.log({firstTitle, secondTitle, firstValue, secondValue, value});
  };
  const handleSku = (firstTitle, secondTitle, firstValue, secondValue, value) => {
    console.log({firstTitle, secondTitle, firstValue, secondValue, value});
  };

  useEffect(() => {
    if (match.params.id) {
      queryStockData().then((data) => {
        form.setFieldsValue({...data});
      });
      querySpecifications(match.params.id).then(data => {
        console.log(data);
        setSpecifications(data);
        let dict = {};
        for (let i = 0; i < data.length; i += 1) {
          if (i === 0) {
            setFirstName(data[i].name);
          } else {
            setSecondName(data[i].name);
          }
          dict = {...dict, [data[i].name]: []}
        }
        setSelectedDict(dict);
      });
    }
  }, []);


  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >

          <FormItem hidden name="id" label="id">
            <input/>
          </FormItem>
          <FormItem hidden name="productId" label="productId">
            <input/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="币种"
            name="currencyCode"
            hidden
          >
            <Input placeholder="请输入币种" value="CNY"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="价格"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入价格',
              },
            ]}
          >
            <Input placeholder="请输入价格"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮费"
            name="expressPrice"
            rules={[
              {
                required: true,
                message: '请输入邮费',
              },
            ]}
          >
            <Input placeholder="请输入邮费"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="库存"
            name="lastNum"
            rules={[
              {
                required: true,
                message: '请输入库存数量',
              },
            ]}
          >
            <Input placeholder="请输入库存数量"/>
          </FormItem>

          {specifications && Object.keys(specifications).length
            ? specifications.map((specification) => {
              if (specification.options.length > 0) {
                return (
                  <FormItem
                    {...formItemLayout}
                    label={specification.name}
                    name={`specification_${specification.name}`}
                    key={`${specification.id}`}
                    rules={[
                      {
                        required: true,
                        message: '请选择一个选项',
                      },
                    ]}
                  >
                    <Select mode="multiple" onChange={(value) => handleSpecificationChange(value, specification.name)}>
                      {specification.options.map((option) => {
                        return (
                          <Option value={option.content} key={`${specification.id}_${option.id}`}>
                            {option.content}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                );
              }
              return null;
            })
            : null}

          {firstName ?
            <FormItem
              {...formItemLayout}
              label="规格详情"
              name="Specifications"
            >
              <SpecificationTable key='SpecificationTable'
                                  firstTitle={firstName}
                                  secondTitle={secondName}
                                  dataSource={tableDataSource}
                                  handlePrice={handlePrice}
                                  handleLastNum={handleLastNum}
                                  handleSku={handleSku}
              />

            </FormItem>
            : null}


          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({loading}) => ({
  submitting: loading.effects['productAndStock/submitRegularForm'],
}))(Stock);
