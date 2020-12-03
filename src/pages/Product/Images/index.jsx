import {Button, Card, Divider, message, Modal, Space, Upload} from 'antd';
import {connect, history} from 'umi';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {isSuccess} from '@/utils/utils';
import {
  DeleteFilled,
  DownCircleFilled,
  LoadingOutlined,
  PlusOutlined,
  UpCircleFilled,
} from '@ant-design/icons';
import {createProductImages, queryProductDetails} from '@/pages/Product/Images/service';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const compareImage = function (obj1, obj2) {
  const val1 = obj1.indexNo;
  const val2 = obj2.indexNo;
  if (val1 < val2) {
    return -1;
  }
  if (val1 > val2) {
    return 1;
  }
  return 0;
};

const ProductImages = (props) => {
  const {match} = props;

  const [loading, setLoading] = useState(false);
  const [detailloading, setDetailLoading] = useState(false);
  const [mainImageList, setMainImageList] = useState([]);
  const [detailImageList, setDetailImageList] = useState([]);
  const [requestData, setRequestData] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const queryProductInfo = async () => {
    const res = await queryProductDetails(match.params.id);
    if (isSuccess(res)) {
      return res.data.detail;
    }
    return [];
  };

  useEffect(() => {
    queryProductInfo().then((detail) => {
      const fileList = [];
      console.log(detail);
      detail.mainImages.forEach((item, index) => {
        fileList.push({
          uid: -index,
          name: item.imgUrl,
          url: item.imgUrl,
          status: 'done',
          indexNo: item.indexNo,
        });
        item.imgUrl = item.imgPath;

      });
      const detailList = [];
      detail.detailImages.forEach((item) => {
        item.previewUrl = item.imgUrl;
        item.imgUrl = item.imgPath;
        detailList.push(item);
      });
      // 排序
      fileList.sort(compareImage);
      detailList.sort(compareImage);
      setRequestData(detail);
      setMainImageList(fileList);
      setDetailImageList(detailList);
    }); // 获取类目属性数据
  }, []);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const res = info.file.response;
      if (isSuccess(res)) {
        if (!requestData.hasOwnProperty('mainImages')) {
          requestData.mainImages = [];
        }
        requestData.mainImages.push({
          imgUrl: res.data.path,
          indexNo: info.fileList.length,
        });
        setMainImageList(info.fileList);
      }
    }
    if (info.file.status === 'removed') {
      requestData.mainImages = requestData.mainImages.filter(
        (current) => current.indexNo !== info.file.indexNo,
      );
      setMainImageList(info.fileList);
    }
  };

  const handleDetailImageChange = async (info) => {
    if (info.file.status === 'uploading') {
      setDetailLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setDetailLoading(false);
      const res = info.file.response;
      if (isSuccess(res)) {
        if (!requestData.hasOwnProperty('detailImages')) {
          requestData.detailImages = [];
        }
        requestData.detailImages.push({
          imgUrl: res.data.path,
          indexNo: detailImageList.length + 1,
        });

        const preview = await getBase64(info.file.originFileObj);
        detailImageList.push({
          imgUrl: res.data.path,
          previewUrl: preview,
          indexNo: detailImageList.length + 1,
        });
        detailImageList.sort(compareImage);
        const lists = detailImageList.concat();
        lists.splice(0, 0);
        setDetailImageList(lists);
      }
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );
  const detailUploadButton = (
    <div>
      {detailloading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>上传</div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const onSave = async () => {
    console.log(requestData);
    if (requestData.mainImages.length === 0) {
      message.error("请选择主图");
      return;
    }
    if (requestData.detailImages.length === 0) {
      message.error("请选择商品详情描述");
      return;
    }
    const res = await createProductImages(requestData);
    if(isSuccess(res)){
      message.success("保存成功");
    }
  };

  const removeDetailImage = (item) => {
    const tempList = detailImageList.filter((current) => current.indexNo !== item.indexNo);
    requestData.detailImages = tempList;
    setDetailImageList(tempList);
  };

  const moveUpDetailImage = (item) => {
    for (let i = 0; i < detailImageList.length; i += 1) {
      if (item.indexNo === detailImageList[i].indexNo && item.indexNo > 0 && i > 0) {
        const lists = detailImageList.concat();
        lists.splice(0, 0);
        lists[i].indexNo -= 1;
        lists[i - 1].indexNo += 1;
        lists.sort(compareImage);

        requestData.detailImages = lists;
        setDetailImageList(lists);
        break;
      }
    }
  };

  const moveDownDetailImage = (item) => {
    for (let i = 0; i < detailImageList.length; i += 1) {
      if (
        item.indexNo === detailImageList[i].indexNo &&
        item.indexNo > 0 &&
        i !== detailImageList.length - 1
      ) {
        const lists = detailImageList.concat();
        lists.splice(0, 0);
        lists[i].indexNo += 1;
        lists[i + 1].indexNo -= 1;
        lists.sort(compareImage);

        requestData.detailImages = lists;
        setDetailImageList(lists);
        break;
      }
    }
  };

  return (
    <PageContainer>
      <Card bordered={false}>
        <div>
          <p>主图：(建议尺寸：800*800像素)</p>
          <Divider/>

          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            fileList={mainImageList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            action="/api/files/images/localUpload"
            onChange={(info) => handleChange(info)}
          >
            {mainImageList.length >= 4 ? null : uploadButton}
          </Upload>

          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
        </div>
        <Divider/>

        <div>
          <p>商品图：(建议尺寸：800*800像素)</p>
          <Divider/>

          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            action="/api/files/images/localUpload"
            onChange={(info) => handleDetailImageChange(info)}
          >
            {detailUploadButton}
          </Upload>
          <Card bordered={false} style={{width: '800px'}}>
            {detailImageList &&
            detailImageList.map((item) => {
              return (
                <div style={{display: 'flex'}} key={item.indexNo}>
                  <div
                    style={{
                      position: 'absolute',
                      right: '20px',
                      background: '#ffffff',
                    }}
                  >
                    <Space size="small">
                      <UpCircleFilled onClick={() => moveUpDetailImage(item)}/>
                      <DownCircleFilled onClick={() => moveDownDetailImage(item)}/>
                      <DeleteFilled
                        onClick={() => removeDetailImage(item)}
                        style={{fontSize: '20px'}}
                      />
                    </Space>
                  </div>

                  <img
                    alt="example"
                    key={item.indexNo}
                    style={{width: '100%'}}
                    src={item.previewUrl}
                  />
                </div>
              );
            })}
          </Card>
        </div>

        <Space size="large">
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
          <Button type="primary" onClick={() => history.push(`/product/${match.params.id}/stock`)}>
            库存设置
          </Button>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default connect(() => ({}))(ProductImages);
