import { query as queryUsers } from '@/services/user';
import {currentStaff} from "@/services/login";
import {isSuccess} from "@/utils/utils";

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      if(isSuccess(response)){
        yield put({
          type: 'save',
          payload: response.data.staff,
        });
      }
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(currentStaff);
      if(isSuccess(response)){
        yield put({
          type: 'saveCurrentUser',
          payload: response.data.staff,
        });
      }

    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
