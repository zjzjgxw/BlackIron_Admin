import {queryProductCategory} from './service';
import {isSuccess} from "@/utils/utils";

const Model = {
  namespace: 'category',
  state: {
    list: [],
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryProductCategory, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'queryList',
          payload: {list: response.data.list},
        });
      }
    },
  },
  reducers: {
    queryList(state, action) {
      return {...state, ...action.payload};
    },
  },
};
export default Model;
