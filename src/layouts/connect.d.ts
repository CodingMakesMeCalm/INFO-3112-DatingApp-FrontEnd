import { UserState } from '@/pages/user/model';
import { PostState } from '@/pages/posts/model';
import { SearchState } from '@/pages/searching/model';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    user?: boolean;
    posts?: boolean;
    searching?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  user: UserState;
  posts: PostState;
  searching: SearchState;
}
