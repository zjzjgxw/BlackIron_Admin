import {GridContent} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Card, Col, Row} from 'antd';
import {Column, Line} from '@ant-design/charts';
import styles from './index.less';
import {queryAccessStat, queryNewUserStat, queryOrderStatTime, queryOrderToday} from "@/pages/Home/Index/service";
import {getFormatTime, isSuccess} from "@/utils/utils";

export default () => {

  const [todayInfo, setTodayInfo] = useState({});
  const [yesterdayInfo, setYesterdayInfo] = useState({});
  const [orderStat, setOrderStat] = useState([]);
  const [accessStat, setAccessStat] = useState([]);
  const [newUserStat, setNewUserStat] = useState([]);

  const getTodayInfo = async () => {
    const res = await queryOrderToday();
    if (isSuccess(res)) {
      setTodayInfo(res.data.today);
      setYesterdayInfo(res.data.yesterday);
    }
  };
  const getOrderStat = async () => {
    const curTime = new Date();
    const startTime = new Date();
    startTime.setDate(curTime.getDate() - 6);
    const res = await queryOrderStatTime(getFormatTime(startTime), getFormatTime(curTime));
    if (isSuccess(res)) {
      return res.data.stats;
    }
    return [];
  };

  //获取访问统计信息
  const getAccessStat = async () => {
    const curTime = new Date();
    const startTime = new Date();
    startTime.setDate(curTime.getDate() - 6);
    const res = await queryAccessStat(getFormatTime(startTime), getFormatTime(curTime));
    if (isSuccess(res)) {
      return res.data.stats;
    }
    return [];
  };

  const getNewUserStat = async () => {
    const curTime = new Date();
    const startTime = new Date();
    startTime.setDate(curTime.getDate() - 6);
    const res = await queryNewUserStat(getFormatTime(startTime), getFormatTime(curTime));
    if(isSuccess(res)){
      return res.data.stats;
    }
    return [];
  };

  useEffect(() => {
    getTodayInfo();
    getOrderStat().then(datas => {
      setOrderStat(datas);
    });
    getAccessStat().then(datas => {
      setAccessStat(datas);
    })

    getNewUserStat().then(datas=>{
      setNewUserStat(datas);
    })

  }, []);

  const Info = ({title, value, bordered}) => (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em/>}
    </div>
  );

  const pvConfig = {
    data: accessStat,
    padding: 'auto',
    xField: 'time',
    yField: 'pv',
    xAxis: {
      type: 'timeCat',
      tickCount: 5,
    },
  };
  const uvConfig = {
    data: accessStat,
    padding: 'auto',
    xField: 'time',
    yField: 'uv',
    xAxis: {
      type: 'timeCat',
      tickCount: 5,
    },
  };


  const newUserConfig = {
    data: newUserStat,
    isGroup: true,
    xField: 'time',
    yField: 'newNum',
    meta: {
      newNum: { alias: '新增用户数' }
    },
    label: {
      position: 'middle',
      layout: [
        {type: 'interval-adjust-position'},
        {type: 'interval-hide-overlap'},
        {type: 'adjust-color'}
      ]
    }
  };

  const orderNumConfig = {
    data: orderStat,
    isGroup: true,
    xField: 'time',
    yField: 'paidNum',
    meta: {
      paidNum: { alias: '订单数' }
    },
    label: {
      position: 'middle',
      layout: [
        {type: 'interval-adjust-position'},
        {type: 'interval-hide-overlap'},
        {type: 'adjust-color'}
      ]
    }
  };
  const orderPriceConfig = {
    data: orderStat,
    isGroup: true,
    xField: 'time',
    yField: 'paidPrice',
    meta: {
      paidPrice: { alias: '销售额' }
    },
    label: {
      position: 'middle',
      layout: [
        {type: 'interval-adjust-position'},
        {type: 'interval-hide-overlap'},
        {type: 'adjust-color'}
      ]
    }
  };


  return (
    <GridContent>
      <div>
        <Card bordered={false}>
          <Row>
            <Col sm={6} xs={24}>
              <Info title="今日订单数" value={todayInfo.paidNum} bordered/>
            </Col>
            <Col sm={6} xs={24}>
              <Info title="今日订单金额" value={todayInfo.paidPrice} bordered/>
            </Col>
            <Col sm={6} xs={24}>
              <Info title="昨日订单数" value={yesterdayInfo.paidNum}/>
            </Col>
            <Col sm={6} xs={24}>
              <Info title="昨日订单金额" value={yesterdayInfo.paidPrice}/>
            </Col>
          </Row>
        </Card>
      </div>
      <div>
        <Row>
          <Col sm={12} xs={24}>
            <Card title="近七日订单数">
              <Column {...orderNumConfig}/>
            </Card>
          </Col>
          <Col sm={12} xs={24}>
            <Card title="近七日销售额">
              <Column {...orderPriceConfig}/>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={12} xs={24}>
            <Card title="近七日PV">
              <Line {...pvConfig}/>
            </Card>
          </Col>
          <Col sm={12} xs={24}>
            <Card title="近七日UV">
              <Line {...uvConfig}/>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={24} xs={24}>
            <Card title="近七日用户增长数">
              <Column {...newUserConfig}/>
            </Card>
          </Col>
        </Row>



      </div>

    </GridContent>
  );
};
