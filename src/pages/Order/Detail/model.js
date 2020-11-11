import {queryOrderDetail} from './service';
import {isSuccess} from "@/utils/utils";

const Model = {
  namespace: 'orderAndDetail',
  state: {
    detail: {},
  },
  effects: {
    * fetchBasic({payload}, {call, put}) {
      const response = yield call(queryOrderDetail, payload.id);
      if (isSuccess(response)) {
        yield put({
          type: 'show',
          payload: {
            detail: response.data.info
          },
        });
      }
    },
  },
  reducers: {
    show(state, {payload}) {
      return {...state, ...payload};
    },
  },
};
export default Model;
