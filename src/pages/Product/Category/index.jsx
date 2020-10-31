import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Tag, Button} from 'antd';
import styles from './index.less';
import {connect} from 'umi';


const ProductCategory = ({dispatch, category}) => {


  useEffect(() => {
    dispatch({
      type: 'category/fetch',
      payload: {}
    });
  }, []);


  return (
    <PageContainer className={styles.main}>
      <div
        style={{padding: '0px 0px 50px 0px'}}
      >
        {category.list.map((item) => {
          return <Tag key={item.id} closable> {item.name}</Tag>
        })}

        <Button type="primary" size={"small"}>添加类目</Button>

      </div>
    </PageContainer>
  );
};


export default connect(({category}) => ({
  category,
}))(ProductCategory);
