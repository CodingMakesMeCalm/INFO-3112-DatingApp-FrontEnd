import { Effect, Reducer, history, request } from 'umi';
import { UserInfo } from '../user/user.d';
import { requestToGetUsersByCity, requestToGetUsersByGender } from './service';
import { requestToSendMessage } from '../posts/service';
import { notification } from 'antd';

export interface SearchState {
  userList: UserInfo[];
}

export interface ModelType {
  namespace: string;
  state: SearchState;
  effects: {
    fetchUsersByCity: Effect;
    fetchUsersByGender: Effect;
    sendMessage: Effect;
  };
  reducers: {
    queryUsers: Reducer;
  };
}

const model: ModelType = {
  namespace: 'searching',
  state: {
    userList: [],
  },
  effects: {
    *fetchUsersByCity({ payload }, { call, put }) {
      const response: ResponseData = yield call(
        requestToGetUsersByCity,
        payload,
      );
      if (!response || !response.data) {
        notification.error({
          message: 'No users found in this city.',
        });
        return;
      }

      yield put({
        type: 'queryUsers',
        payload: response.data,
      });
    },
    *fetchUsersByGender({ payload }, { call, put }) {
      const response: ResponseData = yield call(
        requestToGetUsersByGender,
        payload,
      );
      if (!response || !response.data) {
        notification.error({
          message: 'No users found in this city.',
        });
        return;
      }

      yield put({
        type: 'queryUsers',
        payload: response.data,
      });
    },
    *sendMessage({ payload }, { call, put }) {
      const response: ResponseData = yield call(requestToSendMessage, payload);
      if (!response || !response.success) {
        notification.error({
          message: 'Failed to send message.',
        });
      } else {
        notification.success({
          message: 'Message sent successfully.',
        });
      }
    },
  },
  reducers: {
    queryUsers(state, action) {
      return {
        ...state,
        userList: action.payload,
      };
    },
  },
};
export default model;
