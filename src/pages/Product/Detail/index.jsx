import {Button, Card, Input, Form, Radio, Select, Upload, message} from 'antd';
import {connect, history} from 'umi';
import React, {useState, useEffect} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {queryProductCategory} from '@/pages/Product/Category/service';
import {isSuccess} from '@/utils/utils';
import {queryProductCategoryAttribute} from '@/pages/Product/Category/Attribute/service';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {queryProductDetails} from "@/pages/Product/Images/service";
import {createProduct, updateProduct} from "@/pages/Product/Detail/service";
import ReactPlayer from 'react-player';
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

const Detail = (props) => {
  const {match} = props;
  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [productId, setProductId] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [stockType, setStockType] = useState(null);
  const [mode, setMode] = useState(null);

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

  const handleVideoChange = (info) => {
    if (info.file.status === 'uploading') {
      setVideoLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setVideoLoading(false);
      const res = info.file.response;
      if (isSuccess(res)) {
        setVideoUrl(res.data.url);
        setVideoPath(res.data.path);
      }
    }
  };

  const beforeVideoUpload = (file) =>{
    const isMp4 = file.type === 'video/mp4';
    if (!isMp4) {
      message.error('请上传mp4格式文件');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('视频必须小于20MB!');
    }
    return isMp4 && isLt20M;
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

  const uploadVideoButton = (
    <div>
      {videoLoading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );

  const queryCategory = async (params) => {
    const res = await queryProductCategory(params);
    if (isSuccess(res)) {
      return res.data.categories;
    }
    return [];
  };

  const queryProductInfo = async () => {
    const res = await queryProductDetails(match.params.id);
    if (isSuccess(res)) {
      return res.data.detail;
    }
    return {};
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

  const onFinish = async (values) => {
    const params = {};
    Object.keys(values).forEach((key) => {
      if (key.startsWith('attribute_')) {
        const name = key.split('_')[1];
        const content = values[key];
        if (!params.hasOwnProperty('attributes')) {
          params.attributes = [];
        }
        params.attributes.push({name, content});
      } else {
        params[key] = values[key];
      }
    });
    if (imagePath === null) {
      return;
    }
    params.coverUrl = imagePath;
    if(videoPath !== null){
      params.videoUrl = videoPath;
    }
    if (productId) {
      params.id = productId;
      const res = await updateProduct(params);
      if (isSuccess(res)) {
        message.success("保存成功");
      }
    } else {
      const res = await createProduct(params);
      if (isSuccess(res)) {
        history.push(`/product/${res.data.id}/images`);
      }
    }
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
      return res.data.attributes;
    }
    return null;
  };

  const handleStatusTypeChange = (e) => {
    form.setFieldsValue({statusType: e.target.value});
    setStatusType(e.target.value);
    return e.target.value;
  };

  const handleStockTypeChange = (e) => {
    form.setFieldsValue({stockType: e.target.value});
    setStockType(e.target.value);
    return e.target.value;
  };

  const handleModeTypeChange = (e) => {
    form.setFieldsValue({mode: e.target.value});
    setMode(e.target.value);
    return e.target.value;
  };

  useEffect(() => {
    queryCategory().then((data) => setCategories(data)); // 获取类目属性数据
    if (match.params.id) {
      setProductId(match.params.id);
      queryProductInfo().then((data) => {
        form.setFieldsValue({...data});
        setImageUrl(data.coverUrl);
        setImagePath(data.coverPath);
        setVideoUrl(data.videoUrl);
        setVideoPath(data.videoPath);
        const initFile = [
          {
            uid: '-1',
            name: data.coverUrl,
            status: 'done',
            url: data.coverUrl,
          },
        ];
        form.setFieldsValue({covers: initFile});
        setStatusType(data.statusType);
        setStockType(data.stockType);
        setMode(data.mode);
        handleCategoryChange(data.categoryId).then(() => {
          data.attributes.forEach(item => {
            form.setFieldsValue({[`attribute_${item.name}`]: item.content});
          })
        });
      })
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
          <FormItem
            {...formItemLayout}
            label="类目"
            name="categoryId"
            rules={[
              {
                required: true,
                message: '请选择一个类目',
              },
            ]}
          >
            <Select onChange={handleCategoryChange} disabled={!!productId}>
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
            <Input placeholder="请输入商品标题,在50字以内"/>
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
            name="videos"
            label="视频"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/files/media/localUpload"
              beforeUpload={beforeVideoUpload}
              onChange={(info) => handleVideoChange(info)}
            >
              {uploadVideoButton}

            </Upload>
            {videoUrl ? (
              <ReactPlayer url={videoUrl}  controls={true} width={300} height={300}/>
            ) : (
              null
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="售卖模式" name="mode"
                    rules={[
                      {
                        required: true,
                        message: '请选择一个售卖模式',
                      },
                    ]}>
            <div>
              <Radio.Group value={mode} onChange={handleModeTypeChange}>
                <Radio value={1}>正常售卖</Radio>
                <Radio value={2}>预售</Radio>
              </Radio.Group>
            </div>
          </FormItem>

          <FormItem {...formItemLayout} label="库存类型" name="stockType"
                    rules={[
                      {
                        required: true,
                        message: '请选择一个库存类型',
                      },
                    ]}>
            <div>
              <Radio.Group value={stockType} onChange={handleStockTypeChange}>
                <Radio value={1}>拍下减库存</Radio>
                <Radio value={2}>付款减库存</Radio>
              </Radio.Group>
            </div>
          </FormItem>

          <FormItem {...formItemLayout} label="状态" name="statusType" rules={[
            {
              required: true,
              message: '请选择一个商品状态',
            },
          ]}>
            <div>
              <Radio.Group value={statusType} onChange={handleStatusTypeChange}>
                <Radio value={1}>上架</Radio>
                <Radio value={2}>下架</Radio>
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
            {productId ?
              <div>
              <Button type="primary" htmlType="submit">
              保存
            </Button> <Button type="primary" onClick={()=>{
                history.push(`/product/${productId}/images`)
              }}>
              编辑图片信息
              </Button> </div>: <Button type="primary" htmlType="submit">
              创建并完善描述
            </Button>}

          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({loading}) => ({
  submitting: loading.effects['productAndDetail/submitRegularForm'],
}))(Detail);
