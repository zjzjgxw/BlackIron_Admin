import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, List, Row, Select, Tag} from 'antd';
import {LoadingOutlined, StarOutlined, LikeOutlined, MessageOutlined} from '@ant-design/icons';
import {connect} from 'umi';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import {isSuccess} from "@/utils/utils";
import {searchOwns} from "@/pages/Article/ListSearchArticles/service";

const {Option} = Select;
const FormItem = Form.Item;
const pageSize = 5;

const ListSearchArticles = ({dispatch, articleAndListSearchArticles: {list, tags, owners}, loading}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'articleAndListSearchArticles/fetch',
      payload: {
        count: 5,
      },
    });

    dispatch({
      type: 'articleAndListSearchArticles/fetchTags',
      payload: {},
    });
  }, []);

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const fetchMore = () => {
    dispatch({
      type: 'articleAndListSearchArticles/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  const handleSearch = async (value) => {
      dispatch({
        type: 'articleAndListSearchArticles/searchOwner',
        payload: {
          name: value,
        },
      });
    };

    const IconText = ({type, text}) => {
      switch (type) {
        case 'star-o':
          return (
            <span>
            <StarOutlined
              style={{
                marginRight: 8,
              }}
            />
              {text}
          </span>
          );

        case 'like-o':
          return (
            <span>
            <LikeOutlined
              style={{
                marginRight: 8,
              }}
            />
              {text}
          </span>
          );

        case 'message':
          return (
            <span>
            <MessageOutlined
              style={{
                marginRight: 8,
              }}
            />
              {text}
          </span>
          );

        default:
          return null;
      }
    };

    const formItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 24,
        },
        md: {
          span: 12,
        },
      },
    };
    const loadMore = list.length > 0 && (
      <div
        style={{
          textAlign: 'center',
          marginTop: 16,
        }}
      >
        <Button
          onClick={fetchMore}
          style={{
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          {loading ? (
            <span>
            <LoadingOutlined/> 加载中...
          </span>
          ) : (
            '加载更多'
          )}
        </Button>
      </div>
    );

    const options = owners.map(owner => (
      <Option key={owner.id} value={owner.id}>
        {owner.name}
      </Option>
    ));
    return (
      <>
        <Card bordered={false}>

          <Form
            layout="inline"
            form={form}
            initialValues={{
              owner: ['wjh', 'zxx'],
            }}
            onValuesChange={(fields) => {
              console.log(fields);
              dispatch({
                type: 'articleAndListSearchArticles/fetch',
                payload: {
                  count: 8,
                },
              });
            }}
          >
            <StandardFormRow
              title="所属类目"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem name="tags">
                <TagSelect expandable>
                  {tags && tags.length > 0 && tags.map((item) => {
                    return <TagSelect.Option key={item.id}  value={item.id}>{item.name}</TagSelect.Option>;
                  })}
                </TagSelect>
              </FormItem>
            </StandardFormRow>

            <StandardFormRow>
              <FormItem name="作者">
                <Select  placeholder="选择作者"
                         showSearch
                         onSearch={handleSearch}
                         mode="multiple"
                         filterOption={false}

                >
                  {options}
                </Select>
              </FormItem>
            </StandardFormRow>
            {/*<StandardFormRow title="owner" grid>*/}
            {/*  <FormItem name="owner" noStyle>*/}
            {/*    <Select mode="multiple" placeholder="选择 owner">*/}
            {/*      {options}*/}
            {/*    </Select>*/}
            {/*  </FormItem>*/}
            {/*  <a className={styles.selfTrigger} onClick={setOwner}>*/}
            {/*    只看自己的*/}
            {/*  </a>*/}
            {/*</StandardFormRow>*/}
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="活跃用户" name="user">
                    <Select
                      placeholder="不限"
                      style={{
                        maxWidth: 200,
                        width: '100%',
                      }}
                    >
                      <Option value="lisa">李三</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="好评度" name="rate">
                    <Select
                      placeholder="不限"
                      style={{
                        maxWidth: 200,
                        width: '100%',
                      }}
                    >
                      <Option value="good">优秀</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{
            marginTop: 24,
          }}
          bordered={false}
          bodyStyle={{
            padding: '8px 32px 32px 32px',
          }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText key="star" type="star-o" text={item.star}/>,
                  <IconText key="like" type="like-o" text={item.like}/>,
                  <IconText key="message" type="message" text={item.message}/>,
                ]}
                extra={<div className={styles.listItemExtra}/>}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                    <Tag>Ant Design</Tag>
                    <Tag>设计语言</Tag>
                    <Tag>蚂蚁金服</Tag>
                  </span>
                  }
                />
                <ArticleListContent data={item}/>
              </List.Item>
            )}
          />
        </Card>
      </>
    );
  };

  export default connect(({articleAndListSearchArticles, loading}) => ({
    articleAndListSearchArticles,
    loading: loading.models.articleAndListSearchArticles,
  }))(ListSearchArticles);
