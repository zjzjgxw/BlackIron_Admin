import React from 'react';
import {Row, Col, Image, Divider, Tag} from 'antd';
import styles from '../style.less';
import {priceFormat} from "@/utils/utils";


const OrderItem = (props) => {

  const {order} = props;

  const tagColor = {
    待支付: 'red',
    待发货: 'gold',
    已发货: 'green',
    待评价: 'green',
    已完成: 'green',
    申请退款: 'volcano',
    同意退款: 'cyan',
    拒绝退款: 'orange'
  };

  const content = () => {
    return (<>
      {order && order.items.length > 0 ?
        order.items.map((item) => {
          return (<>
            <Row gutter={16} style={{height:'108px'}}>
              <Col span={12}>
                <Row gutter={16}>
                  <Col >
                    <Image
                      width={100}
                      src={item.coverUrl}
                    />
                  </Col>
                  <Col>
                    <label>{item.name}</label>
                  </Col>
                </Row>
                <Divider type="vertical" className={styles.verticalDivider}/>
              </Col>
              <Col span={6}>
                {item.firstSpecificationValue && item.firstSpecificationValue.length > 0 ?
                  <p>{item.firstSpecificationName}：{item.firstSpecificationValue}</p> : null}
                {item.secondSpecificationValue && item.secondSpecificationValue.length > 0 ?
                  <p>{item.secondSpecificationName}： {item.secondSpecificationValue}</p> : null}
                <Divider type="vertical" className={styles.verticalDivider}/>
              </Col>
              <Col span={6}>
                <p>单价：{priceFormat(item.price)}</p>
                <p>数量：<Tag color='red'>{item.num}</Tag></p>
              </Col>
              <Divider type="vertical" className={styles.verticalDivider}/>
            </Row>
            <Divider style={{margin: '0px'}} />
          </>)
        }) : null}

    </>)
  };

  return (
    <>
      <Row gutter={16} style={{
        width: '100%',
      }}>
        <Col span={4}>
          <p>订单号：{order.code}</p>
          <p>下单时间: {order.createTime}</p>
          <Divider type="vertical" className={styles.verticalDivider}/>
        </Col>
        <Col span={12}>
          {content()}
        </Col>
        <Col span={6}>
          <p>{order.receiver}</p>
          <p>{order.telphone}</p>
          <p>{order.address}</p>
          <Divider type="vertical" className={styles.verticalDivider}/>
        </Col>
        <Col span={2}>
          <p>实付：{priceFormat(order.price)}</p>
          <p>邮费：{priceFormat(order.expressPrice)}</p>
          <Tag color={tagColor[order.status.text]}>{order.status.text}</Tag>
          <Divider type="vertical" className={styles.verticalDivider}/>
        </Col>
        <Col span={24} style={{backgroundColor: '#fdfce7'}}>
          <p>备注: {order.remark}</p>
        </Col>
      </Row>
    </>

  );
};

export default OrderItem;
