import { Effect, Reducer, history } from 'umi';
import { Post } from './data';
import { requestToGetAllPosts, requestToSendMessage } from './service';
import { notification } from 'antd';

export interface PostState {
  posts: Post[];
}

export interface ModelType {
  namespace: string;
  state: PostState;
  effects: {
    fetchPosts: Effect;
    sendMessage: Effect;
  };
  reducers: {
    queryPosts: Reducer;
  };
}

const model: ModelType = {
  namespace: 'posts',
  state: {
    posts: [],
  },
  effects: {
    *fetchPosts(_, { call, put }) {
      const response: ResponseData = yield call(requestToGetAllPosts);
      if (!response || !response.data) {
        notification.error({
          message: 'Failed to fetch posts.',
        });
        return;
      }
      const posts: Post[] = response.data;
      const sortedPosts = posts.sort((a, b) => {
        return b.id - a.id;
      });
      yield put({
        type: 'queryPosts',
        payload: sortedPosts,
      });
    },
    *sendMessage({ payload }, { call, put }) {
      const response: ResponseData = yield call(requestToSendMessage, payload);
      if (!response || !response.data) {
        notification.error({
          message: 'Failed to send message.',
        });
        return;
      } else {
        notification.success({
          message: 'Message sent successfully.',
        });
      }
    },
  },
  reducers: {
    queryPosts(state, action) {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
};
export default model;
