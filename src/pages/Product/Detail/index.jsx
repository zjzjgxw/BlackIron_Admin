import { Button, Card, Input, Form, Radio, Select, Upload } from 'antd';
import { connect, history } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { queryProductCategory } from '@/pages/Product/Category/service';
import { isSuccess } from '@/utils/utils';
import { queryProductCategoryAttribute } from '@/pages/Product/Category/Attribute/service';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const Detail = () => {
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
      const res = info.file.response;
      if (isSuccess(res)) {
        setImageUrl(res.data.filePath);
      }
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const queryCategory = async (params) => {
    const res = await queryProductCategory(params);
    if (isSuccess(res)) {
      return res.data.categories;
    }
    return [];
  };

  useEffect(() => {
    queryCategory().then((data) => setCategories(data)); // 获取类目属性数据
  }, []);

  const [form] = Form.useForm();
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
        span: 12,
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

  const onFinish = (values) => {
    const params = {};
    Object.keys(values).forEach((key) => {
      if (key.startsWith('attribute_')) {
        const name = key.split('_')[1];
        const content = values[key];
        if (!params.hasOwnProperty('attributes')) {
          params.attributes = [];
        }
        params.attributes.push({ name, content });
      } else {
        params[key] = values[key];
      }
    });
    console.log(params);
    history.push(`/product/17/images`);
  };

  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.log(errorInfo);
  };

  // 商品类目改变时
  const handleCategoryChange = async (categoryId) => {
    const res = await queryProductCategoryAttribute(categoryId);
    if (isSuccess(res)) {
      setAttributes(res.data.attributes);
    }
  };

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
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...formItemLayout}
            label="类目"
            name="category"
            rules={[
              {
                required: true,
                message: '请选择一个类目',
              },
            ]}
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

          <FormItem
            {...formItemLayout}
            label="商品标题"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入商品标题,在50字以内',
                max: 50,
              },
            ]}
          >
            <Input placeholder="请输入商品标题,在50字以内" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="商品简介"
            name="description"
            rules={[
              {
                required: true,
                message: '请输入商品简介，控制在200字以内',
                max: 200,
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入商品简介，控制在200字以内"
              rows={4}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            name="coverUrl"
            label="封面"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload/img"
              onChange={(info) => handleChange(info)}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </FormItem>

          <FormItem {...formItemLayout} label="库存类型" name="stockType">
            <div>
              <Radio.Group>
                <Radio value="1">拍下减库存</Radio>
                <Radio value="2">付款减库存</Radio>
              </Radio.Group>
            </div>
          </FormItem>

          <FormItem {...formItemLayout} label="状态" name="statusType">
            <div>
              <Radio.Group>
                <Radio value="1">上架</Radio>
                <Radio value="2">下架</Radio>
              </Radio.Group>
            </div>
          </FormItem>

          {attributes && Object.keys(attributes).length
            ? attributes.map((attribute) => {
                if (attribute.options.length > 0) {
                  return (
                    <FormItem
                      {...formItemLayout}
                      label={attribute.name}
                      name={`attribute_${attribute.name}`}
                      key={`${attribute.id}`}
                      rules={[
                        {
                          required: true,
                          message: '请选择一个选项',
                        },
                      ]}
                    >
                      <Select>
                        {attribute.options.map((option) => {
                          return (
                            <Option value={option.content} key={`${attribute.id}_${option.id}`}>
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

          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit">
              创建并完善描述
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['productAndDetail/submitRegularForm'],
}))(Detail);
