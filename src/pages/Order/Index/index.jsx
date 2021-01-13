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
  Radio,
  Row,
  Form,
  message
} from 'antd';
import {findDOMNode} from 'react-dom';
import {PageContainer} from '@ant-design/pro-layout';
import {connect, history} from 'umi';
import OperationModal from './components/OperationModal';
import styles from './style.less';
import OrderItem from "@/pages/Order/Index/components/OrderItem";
import ExpressModal from "@/pages/Order/Index/components/ExpressModal";
import {sendOrder} from "@/pages/Order/Index/service";
import {isSuccess} from "@/utils/utils";


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
    orderAndIndex: {list, total, expresses, stat},
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [expressModalVisible, setExpressModalVisible] = useState(false);
  const [expressInfo, setExpressInfo] = useState({});
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    dispatch({
      type: 'orderAndIndex/fetch',
      payload: {
        pageNum: 0,
        pageSize: 10,
      },
    });

    dispatch({
      type: 'orderAndIndex/fetchExpress',
      payload: {},
    });

    dispatch({
      type: 'orderAndIndex/fetchStat',
      payload: {},
    });

  }, [1]);
  const paginationProps = {
    showQuickJumper: true,
    pageSize: 10,
    total,
    onChange: (page, pageSize) => {

      if (searchParams !== null) {
        dispatch({
          type: 'orderAndIndex/fetch',
          payload: {
            statuses: (searchParams.status === 0 ? null : searchParams.status),
            code: (typeof (searchParams.code) === 'string' ? searchParams.code.trim() : searchParams.code),
            telephone: (typeof (searchParams.telephone) === 'string' ? searchParams.telephone.trim() : searchParams.telephone),
            pageNum: page,
            pageSize: pageSize,
          },
        });
      } else {
        dispatch({
          type: 'orderAndIndex/fetch',
          payload: {
            pageNum: page,
            pageSize: pageSize,
          },
        });
      }

    },
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
    setSearchParams(values);
    dispatch({
      type: 'orderAndIndex/fetch',
      payload: {
        statuses: (values.status === 0 ? null : values.status),
        code: (typeof (values.code) === 'string' ? values.code.trim() : values.code),
        telephone: (typeof (values.telephone) === 'string' ? values.telephone.trim() : values.telephone),
        pageNum: 1,
        pageSize: 10,
      },
    });
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
              <Col sm={6} xs={24}>
                <Info title="总订单数" value={stat.totalNum} bordered/>
              </Col>
              <Col sm={6} xs={24}>
                <Info title="待付款订单" value={stat.unPaidNum} bordered/>
              </Col>
              <Col sm={6} xs={24}>
                <Info title="待发货订单" value={stat.waitSendNum}/>
              </Col>
              <Col sm={6} xs={24}>
                <Info title="申请退款订单" value={stat.refundNum}/>
              </Col>
            </Row>
          </Card>
          <Card>
            <Form
              wrapperCol={{span: 12}}
              layout="horizontal"
              form={form}
              onFinish={handleSearch}
            >
              <Form.Item label="订单状态" name="status">
                <Radio.Group>
                  <Radio.Button value={0}>全部</Radio.Button>
                  <Radio.Button value={1}>待支付</Radio.Button>
                  <Radio.Button value={2}>待发货</Radio.Button>
                  <Radio.Button value={3}>已发货</Radio.Button>
                  <Radio.Button value={5}>已完成</Radio.Button>
                  <Radio.Button value={6}>申请退款</Radio.Button>
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
                      {item.status.index === 2 ? '发货' : null}
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
            const res = await sendOrder(fields);
            if (isSuccess(res)) {
              setExpressModalVisible(false);
              setExpressInfo({});
              message.success("发货成功");
            }
          }}
        />) : null}

    </div>
  );
};
export default connect(({orderAndIndex, loading}) => ({
  orderAndIndex,
  loading: loading.models.orderAndIndex,
}))(Index);
