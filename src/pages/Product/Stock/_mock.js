// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'GET /api/stock':{
    "msg": "操作成功",
    "code": 200,
    "data": {
      "info": {
        "id": 13,
        "productId": 13,
        "currencyCode": "CNY",
        "price": 10000,
        "expressPrice": 0,
        "lastNum": 13,
        "saleNum": 25,
        "createTime": "2020-10-19 22:20:26",
        "specifications": [
          {
            "id": 12,
            "stockInfoId": 13,
            "firstName": "颜色",
            "firstValue": "红色",
            "secondName": "尺寸",
            "secondValue": "小",
            "detail": {
              "id": 11,
              "stockSpecificationId": 12,
              "price": 10000,
              "lastNum": 10,
              "sku": "ddsw"
            }
          },
          {
            "id": 18,
            "stockInfoId": 13,
            "firstName": "颜色",
            "firstValue": "绿色",
            "secondName": "尺寸",
            "secondValue": "大",
            "detail": {
              "id": 17,
              "stockSpecificationId": 18,
              "price": 11000,
              "lastNum": 8,
              "sku": "23"
            }
          },
          {
            "id": 13,
            "stockInfoId": 13,
            "firstName": "颜色",
            "firstValue": "黑色",
            "secondName": "尺寸",
            "secondValue": "中",
            "detail": {
              "id": 12,
              "stockSpecificationId": 13,
              "price": 12000,
              "lastNum": 90,
              "sku": "dd"
            }
          },
          {
            "id": 19,
            "stockInfoId": 13,
            "firstName": "颜色",
            "firstValue": "黑色",
            "secondName": "尺寸",
            "secondValue": "大",
            "detail": {
              "id": 18,
              "stockSpecificationId": 19,
              "price": 13000,
              "lastNum": 10,
              "sku": "34"
            }
          }
        ]
      }
    }
  }
};
