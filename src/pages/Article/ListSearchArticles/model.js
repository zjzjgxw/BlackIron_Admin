import {queryFakeList, queryTags, searchOwns} from './service';
import {isSuccess} from "@/utils/utils";

const Model = {
  namespace: 'articleAndListSearchArticles',
  state: {
    list: [],
    tags: [],
    owners: [],
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    * fetchTags({payload}, {call, put}) {
      const response = yield call(queryTags, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'setTags',
          payload: {tags: response.data.tags},
        });
      }
    },

    * searchOwner({payload}, {call, put}) {
      const response = yield call(searchOwns, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'setOwners',
          payload: {owners: response.data.rows},
        });
      }

    },

    * appendFetch({payload}, {call, put}) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return {...state, list: action.payload};
    },
    setTags(state, {payload}) {
      return {...state, tags: payload.tags};
    },
    setOwners(state, {payload}) {
      return {...state, owners: payload.owners};
    },
    appendList(state, action) {
      return {...state, list: state.list.concat(action.payload)};
    },
  },
};
export default Model;
