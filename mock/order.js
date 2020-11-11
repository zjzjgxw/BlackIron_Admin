export default {
  'GET /api/expresses': {
    "msg": "操作成功",
    "code": 200,
    "data": {
      "express": [
        {
          "id": 1,
          "name": "顺丰",
          "word": "SF"
        },
        {
          "id": 2,
          "name": "圆通",
          "word": "YTO"
        },
        {
          "id": 3,
          "name": "申通",
          "word": "STO"
        },
        {
          "id": 4,
          "name": "韵达",
          "word": "YD"
        },
        {
          "id": 5,
          "name": "中通",
          "word": "ZTO"
        },
        {
          "id": 6,
          "name": "天天",
          "word": "HHTT"
        },
        {
          "id": 7,
          "name": "EMS",
          "word": "EMS"
        }
      ]
    }
  },
  'GET /api/orders/detail/16': {
    "msg": "操作成功",
    "code": 200,
    "data": {
      "info":
        {
          "id": 16,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 3,
          "code": "DlyA4k1603721238",
          "price": 40000,
          "originalPrice": 40000,
          "expressPrice": 0,
          "expressId": 1,
          "expressCode": "ddsf23341",
          "receiver": "gxw39",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-26 22:07:18",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 14,
              "orderId": 16,
              "name": "新商品555",
              "productId": 16,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 23,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "褐色",
              "secondSpecificationName": null,
              "secondSpecificationValue": null,
              "productSnap": null,
              "price": 40000,
              "originalPrice": 40000,
              "num": 2,
              "stockType": 2,
              "createTime": null
            }, {
              "id": 3,
              "orderId": 4,
              "name": "新商品2",
              "productId": 14,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 0,
              "firstSpecificationName": null,
              "firstSpecificationValue": null,
              "secondSpecificationName": null,
              "secondSpecificationValue": null,
              "productSnap": null,
              "price": 1968,
              "originalPrice": 1468,
              "num": 1,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
    }
  },
  'GET  /api/orders': {
    "msg": "操作成功",
    "code": 200,
    "data": {
      "total": 9,
      "rows": [
        {
          "id": 16,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 3,
          "code": "DlyA4k1603721238",
          "price": 40000,
          "originalPrice": 40000,
          "expressPrice": 0,
          "expressId": 1,
          "expressCode": "ddsf23341",
          "receiver": "gxw39",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-26 22:07:18",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 14,
              "orderId": 16,
              "name": "新商品555",
              "productId": 16,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 23,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "褐色",
              "secondSpecificationName": null,
              "secondSpecificationValue": null,
              "productSnap": null,
              "price": 40000,
              "originalPrice": 40000,
              "num": 2,
              "stockType": 2,
              "createTime": null
            }
          ]
        },
        {
          "id": 15,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 3,
          "code": "6O8Y3N1603720095",
          "price": 40000,
          "originalPrice": 40000,
          "expressPrice": 0,
          "expressId": 1,
          "expressCode": "12123",
          "receiver": "gxw39",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 5,
            "text": "已完成"
          },
          "createTime": "2020-10-26 21:48:15",
          "payTime": "2020-10-26 22:05:46",
          "sendTime": "2020-10-27 14:38:09",
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 13,
              "orderId": 15,
              "name": "新商品555",
              "productId": 16,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 23,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "褐色",
              "secondSpecificationName": null,
              "secondSpecificationValue": null,
              "productSnap": null,
              "price": 40000,
              "originalPrice": 40000,
              "num": 2,
              "stockType": 2,
              "createTime": null
            }
          ]
        },
        {
          "id": 14,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 3,
          "code": "LW4WWu1603696724",
          "price": 26500,
          "originalPrice": 26000,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw39",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-26 15:18:44",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 12,
              "orderId": 14,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 19,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "大",
              "productSnap": null,
              "price": 26500,
              "originalPrice": 26000,
              "num": 2,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
        {
          "id": 9,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 5,
          "code": "MdDQsh1603694875",
          "price": 24500,
          "originalPrice": 24000,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw36",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-26 14:47:57",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 8,
              "orderId": 9,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 13,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "中",
              "productSnap": null,
              "price": 24500,
              "originalPrice": 24000,
              "num": 2,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
        {
          "id": 8,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 5,
          "code": "8Hq19L1603694707",
          "price": 1940,
          "originalPrice": 24000,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw35",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-26 14:46:12",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 7,
              "orderId": 8,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "1235.jpg",
              "specificationId": 13,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "中",
              "productSnap": null,
              "price": 1940,
              "originalPrice": 24000,
              "num": 2,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
        {
          "id": 7,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 5,
          "code": "5qw71x1603694433",
          "price": 1220,
          "originalPrice": 12000,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw34",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-26 14:40:33",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 6,
              "orderId": 7,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "1235.jpg",
              "specificationId": 13,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "中",
              "productSnap": null,
              "price": 1220,
              "originalPrice": 12000,
              "num": 2,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
        {
          "id": 6,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 5,
          "code": "FVZmVn1603267452",
          "price": 1834,
          "originalPrice": 1334,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw2",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-21 16:04:12",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 5,
              "orderId": 6,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "1235.jpg",
              "specificationId": 13,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "中",
              "productSnap": null,
              "price": 1834,
              "originalPrice": 1334,
              "num": 5,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
        {
          "id": 5,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 5,
          "code": "Mtnt5f1603266781",
          "price": 1834,
          "originalPrice": 1334,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw2",
          "telphone": "123453323224",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-21 15:53:01",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 4,
              "orderId": 5,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "1235.jpg",
              "specificationId": 13,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "中",
              "productSnap": null,
              "price": 1834,
              "originalPrice": 1334,
              "num": 2,
              "stockType": 1,
              "createTime": null
            }
          ]
        },
        {
          "id": 4,
          "businessId": 2,
          "businessName": "商户1",
          "userId": 5,
          "code": "0bhqaJ1603266596",
          "price": 1968,
          "originalPrice": 1468,
          "expressPrice": 500,
          "expressId": 0,
          "expressCode": "",
          "receiver": "gxw",
          "telphone": "1234533234",
          "address": "上海市 浦东新区 阳光花园101",
          "status": {
            "index": 1,
            "text": "待支付"
          },
          "createTime": "2020-10-21 15:49:56",
          "payTime": null,
          "sendTime": null,
          "couponId": null,
          "remark": "",
          "items": [
            {
              "id": 1,
              "orderId": 4,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 13,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "黑色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "中",
              "productSnap": null,
              "price": 1968,
              "originalPrice": 1468,
              "num": 2,
              "stockType": 1,
              "createTime": null
            },
            {
              "id": 2,
              "orderId": 4,
              "name": "新商品1",
              "productId": 13,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 18,
              "firstSpecificationName": "颜色",
              "firstSpecificationValue": "绿色",
              "secondSpecificationName": "尺寸",
              "secondSpecificationValue": "大",
              "productSnap": null,
              "price": 1968,
              "originalPrice": 1468,
              "num": 2,
              "stockType": 1,
              "createTime": null
            },
            {
              "id": 3,
              "orderId": 4,
              "name": "新商品2",
              "productId": 14,
              "coverUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              "specificationId": 0,
              "firstSpecificationName": null,
              "firstSpecificationValue": null,
              "secondSpecificationName": null,
              "secondSpecificationValue": null,
              "productSnap": null,
              "price": 1968,
              "originalPrice": 1468,
              "num": 1,
              "stockType": 1,
              "createTime": null
            }
          ]
        }
      ]
    }
  }
};
