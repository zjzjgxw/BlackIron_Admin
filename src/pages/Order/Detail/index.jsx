import {Card, Descriptions, Divider, Table, Row, Col, Image} from 'antd';
import React, {Component} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {connect} from 'umi';
import styles from './style.less';
import {priceFormat} from "@/utils/utils";


class Detail extends Component {

  componentDidMount() {
    const {dispatch, match} = this.props;
    dispatch({
      type: 'orderAndDetail/fetchBasic',
      payload: {
        id: match.params.id
      }
    });
  }

  render() {
    const {orderAndDetail, loading} = this.props;
    const {detail} = orderAndDetail;


    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'productId',
        key: 'productId',
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: (_, row) => {
          return (<Row gutter={16}>
            <Col>
              <Image
                width={100}
                src={row.coverUrl}
              />
            </Col>
            <Col>
              <label>{row.name}</label>
            </Col>
          </Row>)
        }
      },
      {
        title: '商品规格',
        dataIndex: 'firstSpecificationName',
        key: 'firstSpecificationName',
        render: (_, row) => {
          return (<Row>
            <Col>
              {row.firstSpecificationValue && row.firstSpecificationValue.length > 0 ?
                <p>{row.firstSpecificationName}：{row.firstSpecificationValue}</p> : null}
              {row.secondSpecificationValue && row.secondSpecificationValue.length > 0 ?
                <p>{row.secondSpecificationName}： {row.secondSpecificationValue}</p> : null}
            </Col>
          </Row>)
        },
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        render: (_, row) => {
          return (<Row>
            <Col>
              <p>单价：￥{row.price}</p>
              <p>数量：{row.num}</p>
            </Col>
          </Row>)
        },
      }
    ];


    return (
      <PageContainer>
        <Card bordered={false}>
          <Descriptions
            title="订单详情"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="订单号">{detail.code}</Descriptions.Item>
            <Descriptions.Item
              label="状态">{detail && Object.keys(detail).length > 0 ? detail.status.text : '-'}</Descriptions.Item>
            <Descriptions.Item label="实付金额">{priceFormat(detail.price) }</Descriptions.Item>
            <Descriptions.Item label="创建时间">{detail.createTime}</Descriptions.Item>
            <Descriptions.Item label="支付时间">{detail.payTime ? detail.payTime : '-'}</Descriptions.Item>
            <Descriptions.Item label="发货时间">{detail.sendTime ? detail.sendTime : '-'}</Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <Descriptions
            title="收件人信息"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="姓名">{detail.receiver}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{detail.telphone}</Descriptions.Item>
            <Descriptions.Item label="地址">{detail.province + detail.city+ detail.county+ detail.address}</Descriptions.Item>
            <Descriptions.Item label="备注">无</Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className={styles.title}>商品信息</div>
          <Table
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            loading={loading}
            dataSource={detail.items}
            columns={goodsColumns}
            rowKey="id"
          />
        </Card>
      </PageContainer>
    );
  }
}

export default connect(({orderAndDetail, loading}) => ({
  orderAndDetail,
  loading: loading.effects['orderAndDetail/fetchBasic'],
}))(Detail);
