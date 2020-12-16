import {queryBusinessInfo, queryProvince} from './service';
import {isSuccess} from "@/utils/utils";

const Model = {
  namespace: 'storeAndDetail',
  state: {
    info: {},
    provinces:[],
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryBusinessInfo, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'setInfo',
          payload: {info: response.data.business},
        });
      }
    },
    *getProvinces({payload}, {call, put}) {
      const response = yield call(queryProvince, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'setProvinces',
          payload: {provinces: response.data.provinces},
        });
      }
    },
  },
  reducers: {
    setInfo(state, action) {
      return {...state, info: action.payload.info};
    },
    setProvinces(state, action) {
      return {...state, provinces: action.payload.provinces};
    },
  }
};
export default Model;
