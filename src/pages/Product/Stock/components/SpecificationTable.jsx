import React from 'react';
import { Table, Input, InputNumber } from 'antd';

const SpecificationTable = (props) => {
  const { firstTitle, secondTitle, dataSource, handlePrice, handleLastNum, handleSku } = props;

  const columns = [
    {
      title: firstTitle,
      dataIndex: 'firstValue',
      key: 'firstValue',
    },
    {
      title: secondTitle,
      dataIndex: 'secondValue',
      key: 'secondValue',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (_, row) => {
        return (
          <InputNumber
            min={0}
            precision={2}
            key={`price_input_${row.firstValue}_${row.secondValue}`}
            name={`price_input_${row.firstValue}_${row.secondValue}`}
            defaultValue={row.detail.price}
            onChange={(value) =>
              handlePrice(firstTitle, secondTitle, row.firstValue, row.secondValue, value)
            }
          />
        );
      },
    },
    {
      title: '库存',
      dataIndex: 'lastNum',
      key: 'lastNum',
      render: (_, row) => {
        return (
          <InputNumber
            min={0}
            precision={0}
            defaultValue={row.detail.lastNum}
            key={`lastNum_input_${row.firstValue}_${row.secondValue}`}
            name={`lastNum_input_${row.firstValue}_${row.secondValue}`}
            onChange={(value) =>
              handleLastNum(firstTitle, secondTitle, row.firstValue, row.secondValue, value)
            }
          />
        );
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (_, row) => {
        return (
          <Input
            maxLength={25}
            defaultValue={row.detail.sku}
            key={`sku_input_${row.firstValue}_${row.secondValue}`}
            name={`sku_input_${row.firstValue}_${row.secondValue}`}
            onChange={(e) =>
              handleSku(firstTitle, secondTitle, row.firstValue, row.secondValue, e.target.value)
            }
          />
        );
      },
    },
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default SpecificationTable;
