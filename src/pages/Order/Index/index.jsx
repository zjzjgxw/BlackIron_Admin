import React, {useRef, useState, useEffect} from 'react';
import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Form
} from 'antd';
import {findDOMNode} from 'react-dom';
import {PageContainer} from '@ant-design/pro-layout';
import {connect, history} from 'umi';
import OperationModal from './components/OperationModal';
import styles from './style.less';
import OrderItem from "@/pages/Order/Index/components/OrderItem";
import ExpressModal from "@/pages/Order/Index/components/ExpressModal";


const Info = ({title, value, bordered}) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em/>}
  </div>
);


export const Index = (props) => {
  const addBtn = useRef(null);
  const [form] = Form.useForm();

  const {
    loading,
    dispatch,
    orderAndIndex: {list, total, expresses},
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [expressModalVisible, setExpressModalVisible] = useState(false);
  const [expressInfo, setExpressInfo] = useState({});

  useEffect(() => {
    dispatch({
      type: 'orderAndIndex/fetch',
      payload: {
        count: 5,
      },
    });
    //获取快递信息
    dispatch({
      type: 'orderAndIndex/fetchExpress',
      payload: {},
    });

  }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id) => {
    dispatch({
      type: 'orderAndIndex/submit',
      payload: {
        id,
      },
    });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const MoreBtn = ({item}) => (
    <Dropdown
      overlay={
        <Menu onClick={({key}) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined/>
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current);
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values) => {
    const id = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'orderAndIndex/submit',
      payload: {
        id,
        ...values,
      },
    });
  };

  const handleSearch = (values) => {
    console.log(values);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 1,
      },
      sm: {
        span: 1,
      },
    },
    wrapperCol: {
      xs: {
        span: 3,
      },
      sm: {
        span: 3,
      },
      md: {
        span: 3,
      },
    },
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered/>
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered/>
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务"/>
              </Col>
            </Row>
          </Card>
          <Card>
            <Form
              wrapperCol={{span: 6}}
              layout="horizontal"
              form={form}
              onFinish={handleSearch}
            >
              <Form.Item label="订单状态" name="status">
                <Radio.Group>
                  <Radio.Button value="0">全部</Radio.Button>
                  <Radio.Button value="1">待支付</Radio.Button>
                  <Radio.Button value="2">待发货</Radio.Button>
                  <Radio.Button value="3">已发货</Radio.Button>
                  <Radio.Button value="6">申请退款</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item {...formItemLayout} label="订单号" name="code">
                <Input/>
              </Form.Item>
              <Form.Item  {...formItemLayout} label="联系电话" name="telephone">
                <Input/>
              </Form.Item>
              <Form.Item {...formItemLayout} >
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="订单列表"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
          >
            <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8,
              }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined/>
              添加
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key={`send_${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setExpressModalVisible(true);
                        setExpressInfo({
                          orderId: item.id,
                          expressCode: item.expressCode,
                          expressId: item.expressId
                        })
                      }}
                    >
                      发货
                    </a>,
                    <a
                      key={`detail_${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/order/detail/${item.id}`)
                      }}
                    >
                      详情
                    </a>,
                  ]}
                >
                  <OrderItem key={`item_${item.id}`} order={item}/>

                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      {expressInfo && Object.keys(expressInfo).length ? (
        <ExpressModal
          modalVisible={expressModalVisible}
          onCancel={() => {
            setExpressModalVisible(false);
            setExpressInfo({});
          }}
          info={expressInfo}
          expresses={expresses}
          onSubmit={async (fields) => {
            console.log(fields)
            setExpressModalVisible(false);
            setExpressInfo({});
          }}
        />) : null}

    </div>
  );
};
export default connect(({orderAndIndex, loading}) => ({
  orderAndIndex,
  loading: loading.models.orderAndIndex,
}))(Index);
