import { Button, Card, Form, InputNumber, Select, notification, message } from 'antd';
import { connect, history } from 'umi';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { isSuccess } from '@/utils/utils';
import { queryProductCategorySpecificationOfProduct } from '@/pages/Product/Category/Specification/service';
import { createStockInfo, queryStockInfo, updateStockInfo } from '@/pages/Product/Stock/service';
import SpecificationTable from '@/pages/Product/Stock/components/SpecificationTable';

const FormItem = Form.Item;
const { Option } = Select;

const Stock = (props) => {
  const { submitting, match } = props;
  const [form] = Form.useForm();
  const [specifications, setSpecifications] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [secondName, setSecondName] = useState(null);

  const [selectDict, setSelectedDict] = useState({});
  const [tableDataSource, setTableDataSource] = useState([]);
  const [initSpecifications, setInitSpecifications] = useState([]);

  const [priceDict] = useState({});
  const [lastNumDict] = useState({});
  const [skuDict] = useState({});

  const queryStockData = async () => {
    const res = await queryStockInfo(match.params.id);
    if (isSuccess(res)) {
      return res.data.info;
    }
    return {};
  };

  const querySpecifications = async (productId) => {
    const res = await queryProductCategorySpecificationOfProduct(productId);
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

  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const getTableDataSource = (check) => {
    const tableData = [];
    let hasError = false;
    selectDict[firstName].forEach((firstValue) => {
      if (check && hasError) {
        return;
      }
      if (secondName != null && selectDict[secondName].length > 0) {
        selectDict[secondName].forEach((secondValue) => {
          if (check && hasError) {
            return;
          }
          const price = priceDict[`${firstValue}_${secondValue}`];
          const lastNum = lastNumDict[`${firstValue}_${secondValue}`];
          const sku = skuDict[`${firstValue}_${secondValue}`];
          if (check) {
            if (price === undefined) {
              notification.error({
                message: `请求失败`,
                description: `请完善价格信息`,
              });
              hasError = true;
              return;
            }
            if (lastNum === undefined) {
              notification.error({
                message: `请求失败`,
                description: `请完善库存信息`,
              });
              hasError = true;
              return;
            }
          }
          tableData.push({
            firstName,
            firstValue,
            secondName,
            secondValue,
            detail: {
              price,
              lastNum,
              sku,
            },
          });
        });
      } else {
        const price = priceDict[`${firstValue}`];
        const lastNum = lastNumDict[`${firstValue}`];
        const sku = skuDict[`${firstValue}`];
        if (check) {
          if (price === undefined) {
            hasError = true;
            notification.error({
              message: `请求失败`,
              description: `请完善价格信息`,
            });
            return;
          }
          if (lastNum === undefined) {
            hasError = true;
            notification.error({
              message: `请求失败`,
              description: `请完善库存信息`,
            });
            return;
          }
        }
        tableData.push({
          firstName,
          firstValue,
          secondName: null,
          secondValue: null,
          detail: {
            price,
            lastNum,
            sku,
          },
        });
      }
    });

    if (check && hasError) {
      return null;
    }
    return tableData;
  };

  const handleSpecificationsParams = (specificationsList) => {
    const oldList = [];
    const newList = [];
    const deleteList = [];

    specificationsList.forEach((item) => {
      let addFlag = false;
      initSpecifications.forEach((exist) => {
        if (item.firstValue === exist.firstValue && item.secondValue === exist.secondValue) {
          exist.detail = { ...exist.detail, ...item.detail };
          oldList.push(exist);
          addFlag = true;
        }
      });
      if (!addFlag) {
        newList.push(item);
      }
    });

    initSpecifications.forEach((exist) => {
      let existFlag = false;
      specificationsList.forEach((item) => {
        if (item.firstValue === exist.firstValue && item.secondValue === exist.secondValue) {
          existFlag = true;
        }
      });
      if (!existFlag) {
        deleteList.push(exist);
      }
    });

    return {
      oldList,
      newList,
      deleteList,
    };
  };

  const onFinish = async (values) => {
    let specificationsList = [];
    if (specifications.length > 0) {
      specificationsList = getTableDataSource(true);
      if (specificationsList === null) {
        return;
      }
      specificationsList.forEach((item) => {
        item.detail.price = item.detail.price * 100;
      });
    }
    if (typeof values.id === 'undefined') {
      const params = {
        currencyCode: 'CNY',
        productId: values.productId,
        price: values.price * 100,
        expressPrice: values.expressPrice * 100,
        lastNum: values.lastNum,
        specifications: specificationsList,
      };
      const res = await createStockInfo(params);
      if (isSuccess(res)) {
        message.success('保存成功');
      }
    } else {
      const spec = handleSpecificationsParams(specificationsList);
      const params = {
        id: values.id,
        currencyCode: 'CNY',
        productId: values.productId,
        price: values.price * 100,
        expressPrice: values.expressPrice * 100,
        lastNum: values.lastNum,
        specifications: spec.oldList,
        newSpecifications: spec.newList,
        deleteSpecifications: spec.deleteList,
      };

      const res = await updateStockInfo(params);
      if (isSuccess(res)) {
        message.success('保存成功');
      }
    }
    history.push(`/product/list`);
  };

  const handleSpecificationChange = (value, name) => {
    // console.log(value, name);
    selectDict[name] = value;
    // console.log(selectDict);

    setTableDataSource(getTableDataSource(false));
  };

  const handlePrice = (firstTitle, secondTitle, firstValue, secondValue, value) => {
    if (secondValue != null) {
      priceDict[`${firstValue}_${secondValue}`] = value;
    } else {
      priceDict[`${firstValue}`] = value;
    }
  };

  const handleLastNum = (firstTitle, secondTitle, firstValue, secondValue, value) => {
    if (secondValue != null) {
      lastNumDict[`${firstValue}_${secondValue}`] = value;
    } else {
      lastNumDict[`${firstValue}`] = value;
    }
  };
  const handleSku = (firstTitle, secondTitle, firstValue, secondValue, value) => {
    if (secondValue != null) {
      skuDict[`${firstValue}_${secondValue}`] = value;
    } else {
      skuDict[`${firstValue}`] = value;
    }
  };

  useEffect(() => {
    if (match.params.id) {
      let hasSpecifications = false;
      let dict = {};
      queryStockData().then((data) => {
        if (data == null) {
          form.setFieldsValue({ productId: match.params.id });
          return;
        }
        form.setFieldsValue({
          ...data,
          price: data.price / 100,
          expressPrice: data.expressPrice / 100,
        });
        const spec = data.specifications;
        setInitSpecifications(data.specifications);
        let tmpFirstName = null;
        let tmpSecondName = null;
        const tmpFirstSelected = new Set();
        const tmpSecondSelected = new Set();

        for (let i = 0; i < spec.length; i += 1) {
          if (i === 0) {
            setFirstName(spec[i].firstName);
            setSecondName(spec[i].secondName);
            tmpFirstName = spec[i].firstName;
            tmpSecondName = spec[i].secondName;
            hasSpecifications = true;
          }
          spec[i].detail.price = spec[i].detail.price / 100;

          if (spec[i].secondValue != null) {
            priceDict[`${spec[i].firstValue}_${spec[i].secondValue}`] = spec[i].detail.price;
            lastNumDict[`${spec[i].firstValue}_${spec[i].secondValue}`] = spec[i].detail.lastNum;
            skuDict[`${spec[i].firstValue}_${spec[i].secondValue}`] = spec[i].detail.sku;
          } else {
            priceDict[`${spec[i].firstValue}`] = spec[i].detail.price;
            lastNumDict[`${spec[i].firstValue}`] = spec[i].detail.lastNum;
            skuDict[`${spec[i].firstValue}`] = spec[i].detail.sku;
          }
          tmpFirstSelected.add(spec[i].firstValue);
          tmpSecondSelected.add(spec[i].secondValue);
        }
        form.setFieldsValue({
          [`specification_${tmpFirstName}`]: Array.from(tmpFirstSelected),
          [`specification_${tmpSecondName}`]: Array.from(tmpSecondSelected),
        });
        dict = {
          [tmpFirstName]: Array.from(tmpFirstSelected),
          [tmpSecondName]: Array.from(tmpSecondSelected),
        };
        setSelectedDict(dict);
        setTableDataSource(spec);
      });
      querySpecifications(match.params.id).then((data) => {
        setSpecifications(data);
        if (!hasSpecifications) {
          for (let i = 0; i < data.length; i += 1) {
            if (i === 0) {
              setFirstName(data[i].name);
            } else {
              setSecondName(data[i].name);
            }
            dict = { ...dict, [data[i].name]: [] };
          }
          setSelectedDict(dict);
        }
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
        >
          <FormItem hidden name="id" label="id">
            <input />
          </FormItem>
          <FormItem hidden name="productId" label="productId">
            <input />
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
            <InputNumber min={0} precision={2} placeholder="请输入价格" />
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
            <InputNumber min={0} precision={2} placeholder="请输入邮费" />
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
            <InputNumber min={0} precision={0} placeholder="请输入库存数量" />
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
                    >
                      <Select
                        mode="multiple"
                        onChange={(value) => handleSpecificationChange(value, specification.name)}
                      >
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

          {firstName ? (
            <FormItem {...formItemLayout} label="规格详情" name="Specifications">
              <SpecificationTable
                key="SpecificationTable"
                firstTitle={firstName}
                secondTitle={secondName}
                dataSource={tableDataSource}
                handlePrice={handlePrice}
                handleLastNum={handleLastNum}
                handleSku={handleSku}
              />
            </FormItem>
          ) : null}

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

export default connect(({ loading }) => ({
  submitting: loading.effects['productAndStock/submitRegularForm'],
}))(Stock);
