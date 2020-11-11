import {addFakeList, queryExpress, queryOrders, removeFakeList, updateFakeList} from './service';
import {isSuccess} from "@/utils/utils";

const Model = {
  namespace: 'orderAndIndex',
  state: {
    list: [],
    total: 0,
    expresses:[]
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrders, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'queryList',
          payload: {
            list:response.data.rows,
            total:response.data.total
          },
        });
      }

    },

    *fetchExpress({ payload }, { call, put }) {
      const response = yield call(queryExpress, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'queryExpress',
          payload: {
            expresses:response.data.express,
          },
        });
      }
    },

    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, ...action.payload };
    },
    queryExpress(state,action){
      return { ...state, ...action.payload };
    },

    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
