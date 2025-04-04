import { Effect, Reducer } from 'umi';
import {
  requestToGetAllUsers,
  requestToLogin,
  requestToRegister,
  requestToAddNewPost,
  requestToGetPersonalMessage,
  requestToSetMessageRead,
  requestToUpdateUserProfile,
} from './service';
import { UserInfo, PersonalMessage } from './user.d';
import { Post } from '../posts/data.d';
import { notification } from 'antd';

export interface UserState {
  userInfo: UserInfo | null;
  messages: PersonalMessage[];
  posts: Post[];
}

export interface ModelType {
  namespace: string;
  state: UserState;
  effects: {
    //fetchAllUsers: Effect;
    login: Effect;
    register: Effect;
    updateUserProfile: Effect;
    newPost: Effect;
    getMessage: Effect;
    readMessage: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer;
    queryMessage: Reducer;
    queryPost: Reducer;
  };
}

const model: ModelType = {
  namespace: 'user',
  state: {
    userInfo: null,
    messages: [],
    posts: [],
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response: ResponseData = yield call(requestToLogin, payload);
      if (!response || !response.success) {
        notification.error({
          message: 'Login failed. Please try again.',
        });
        return;
      } else {
        notification.success({
          message: 'Login successful.',
        });
      }

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *register({ payload }, { call, put }) {
      const response: ResponseData = yield call(requestToRegister, payload);
      if (!response || !response.success) {
        notification.error({
          message: 'Registration failed. Please try again.',
        });
        return;
      } else {
        notification.success({
          message: 'Registration successful.',
        });
      }

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *updateUserProfile({ payload }, { call, put }) {
      const response: ResponseData = yield call(
        requestToUpdateUserProfile,
        payload,
      );
      if (!response || !response.success) {
        notification.error({
          message: 'Update failed. Please try again.',
        });
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *newPost({ payload }, { call, put }) {
      const response: ResponseData = yield call(requestToAddNewPost, payload);
      if (!response || !response.success) {
        notification.error({
          message: 'Post failed. Please try again.',
        });
        return;
      } else {
        notification.success({
          message: 'Post successful.',
        });
      }

      const posts: Post[] = response.data;
      const sortedPosts = posts.sort((a, b) => {
        return b.id - a.id;
      });
      yield put({
        type: 'queryPost',
        payload: sortedPosts,
      });
    },
    *getMessage({ payload }, { call, put }) {
      const response: ResponseData = yield call(
        requestToGetPersonalMessage,
        payload,
      );
      if (!response || !response.success) {
        notification.error({
          message: 'Failed to get messages. Please try again.',
        });
        return;
      }

      const messages: PersonalMessage[] = response.data;
      const sortedMessages = messages.sort((a, b) => {
        return b.id - a.id;
      });
      yield put({
        type: 'queryMessage',
        payload: sortedMessages,
      });
    },
    *readMessage({ payload }, { call, put }) {
      const response: ResponseData = yield call(
        requestToSetMessageRead,
        payload,
      );
      if (!response || !response.success) {
        notification.error({
          message: 'Failed to set message read. Please try again.',
        });
        return;
      }

      const messages: PersonalMessage[] = response.data;
      const sortedMessages = messages.sort((a, b) => {
        return b.id - a.id;
      });
      yield put({
        type: 'queryMessage',
        payload: sortedMessages,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    queryMessage(state, action) {
      return {
        ...state,
        messages: action.payload,
      };
    },
    queryPost(state, action) {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
};
export default model;
