import React, {useEffect, useState} from 'react';
import {Modal, Row, Col, Input, Card} from 'antd';
import {queryProducts} from '@/pages/Product/List/service';
import {isSuccess} from '@/utils/utils';
import {CheckCircleOutlined} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import style from './style.less';

const {Search} = Input;
const {Meta} = Card;

const SearchModal = (props) => {
  const {modalVisible, onCancel, onSubmit} = props;

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 6;

  const onSearch = async (value) => {
    setHasMore(false);
    const res = await queryProducts({name: value, pageNum: 1, pageSize});
    if (isSuccess(res)) {
      setProducts(res.data.rows);
      setSearchText(value);
    }
  };

  const loadMore = async (page) => {
    if (!hasMore) {
      return;
    }
    const res = await queryProducts({name: searchText, pageNum: page, pageSize});
    if (isSuccess(res)) {
      if (res.data.rows.length < pageSize) {
        setHasMore(false);
      }
      setProducts(products.concat(res.data.rows));
    }
  };

  const handleCardClicked = (id) => {
    const obj = document.getElementById(`CheckCircleOutlined_${id}`);
    if (obj.style.color === 'rgb(82, 196, 26)') {
      obj.style.color = '';
      const tmp = selected.filter((item) => item !== id);
      setSelected(tmp);
    } else {
      obj.style.color = '#52c41a';
      selected.push(id);
    }
  };


  useEffect(() => {
    onSearch('');
    setSelected([]);
  }, [modalVisible]);

  return (
    <Modal
      width={850}
      destroyOnClose
      title="选择商品"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onSubmit(selected)}
    >
      <>
        <Row>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{width: 200}}
          />
        </Row>
        <div className={style.scrollDiv}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={loadMore}
            hasMore={hasMore}
            useWindow={false}
          >
            <Row gutter={16}>
              {products && products.length > 0
                ? products.map((item) => {
                  return (
                    <Col span={8}>
                      <Card
                        key={`product_card_${item.id}`}
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src={item.coverUrl}/>}
                        onClick={() => handleCardClicked(item.id)}
                        actions={[
                          <CheckCircleOutlined
                            id={`CheckCircleOutlined_${item.id}`}
                            style={{fontSize: '16px'}}
                            class={style.unSelected}
                          />,
                        ]}
                      >
                        <Meta title={item.name} description={item.description}/>
                      </Card>
                      ,
                    </Col>
                  );
                })
                : null}
            </Row>
          </InfiniteScroll>
        </div>
      </>
    </Modal>
  );
};

export default SearchModal;
