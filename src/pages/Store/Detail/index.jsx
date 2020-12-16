import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Input, Form, Select, Upload, message} from 'antd';
import {connect} from 'umi';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {isSuccess} from "@/utils/utils";
import {
  queryBusinessInfo,
  queryCities,
  queryCounties,
  queryProvince,
  updateBusinessInfo
} from "@/pages/Store/Detail/service";

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

const Detail = props => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);
  const [imagePath, setImagePath] = useState(null);
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

  const onFinish = async values => {
    setSubmitting(true);
    let params = {};
    params.name = values.name;
    params.describe = values.describe;
    params.logoImg = imagePath;
    params.scale = values.scale;
    params.address = values.address;
    if (typeof values.province === 'number') {
      for (let i = 0; i < provinces.length; i += 1) {
        if (provinces[i].id === values.province) {
          params.province = provinces[i].name;
          break;
        }
      }
    } else {
      params.province = values.province;
    }
    if (typeof values.city === 'number') {
      for (let i = 0; i < cities.length; i += 1) {
        if (cities[i].id === values.city) {
          params.city = cities[i].name;
          break;
        }
      }
    } else {
      params.city = values.city;
    }
    if (typeof values.county === 'number') {
      for (let i = 0; i < counties.length; i += 1) {
        if (counties[i].id === values.county) {
          params.county = counties[i].name;
          break;
        }
      }
    } else {
      params.county = values.county;
    }
    const res = await updateBusinessInfo(params);
    if (isSuccess(res)) {
      message.success("保存成功");
      setSubmitting(false);
    }

  };

  const queryInfo = async () => {
    const res = await queryBusinessInfo();
    if (isSuccess(res)) {
      setInfo(res.data.business);
      return res.data.business;
    }
    return null;
  };

  const getProvinces = async () => {
    const res = await queryProvince();
    if (isSuccess(res)) {
      setProvinces(res.data.provinces);
      return res.data.provinces
    }
    return null;
  };

  useEffect(() => {
    queryInfo().then(item => {
      if (item) {
        form.setFieldsValue({
          name: item.name,
          describe: item.describe,
          scale: item.scale.index,
          province: item.province,
          city:item.city,
          county:item.county,
          address: item.address
        });

        setImageUrl(item.logoImg);
        setImagePath(item.logoPath);
        const initFile = [
          {
            uid: '-1',
            name: item.name,
            status: 'done',
            url: item.logoImg,
          },
        ];
        form.setFieldsValue({covers: initFile});
      }
    });
    getProvinces();
  }, []);

  const onFinishFailed = errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };


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
        setImageUrl(res.data.url);
        setImagePath(res.data.path);
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
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );

  const handleProvinceChange = async (item) => {
    const res = await queryCities(item);
    if (isSuccess(res)) {
      setCities(res.data.cities);
    }
  };

  const handleCityChange = async (item) => {
    const res = await queryCounties(item);
    if (isSuccess(res)) {
      setCounties(res.data.counties);
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...formItemLayout}
            label="商户名称"
            name="name"
            rules={[
              {
                required: true,
                message: '商户名称必须',
              },
            ]}
          >
            <Input placeholder="请输入商户名称"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="描述"
            name="describe"
            rules={[
              {
                required: true,
                message: '请描述商户经营内容',
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入商户经营内容"
              rows={4}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            name="covers"
            label="封面"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: '请选择图片',
              },
            ]}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/files/images/localUpload"
              onChange={(info) => handleChange(info)}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{width: '100%'}}/>
              ) : (
                uploadButton
              )}
            </Upload>
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="企业规模"
            name="scale"
          >
            <Select
              placeholder="请选择企业规模"
              style={{
                margin: '8px 0',
              }}
            >
              <Option value={0}>0-50人</Option>
              <Option value={1}>50-500人</Option>
              <Option value={2}>500以上</Option>
            </Select>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="地址"
            name="scale"
          >
            <div>
              <FormItem
                name="province"
              >
                <Select
                  placeholder="请选择省份"
                  style={{
                    margin: '8px 0',
                  }}
                  onChange={handleProvinceChange}
                >
                  {provinces.map(item => {
                    return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                  })}
                </Select>
              </FormItem>
              <FormItem
                name="city"
              >
                <Select
                  placeholder="城市"
                  style={{
                    margin: '8px 0',
                  }}
                  onChange={handleCityChange}
                >
                  {cities.map(item => {
                    return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                  })}
                </Select>
              </FormItem>
              <FormItem
                name="county"
              >
                <Select
                  placeholder="县/区"
                  style={{
                    margin: '8px 0',
                  }}
                >
                  {counties.map(item => {
                    return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                  })}
                </Select>
              </FormItem>
            </div>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="具体地址"
            name="address"
          >
            <Input placeholder="请输入具体地址"/>
          </FormItem>

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

export default connect(() => ({}))(Detail);
