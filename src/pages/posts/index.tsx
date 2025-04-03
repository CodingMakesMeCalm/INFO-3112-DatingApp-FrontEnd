import React, { useEffect, useState } from 'react';
import {
  Row,
  Typography,
  Space,
  Button,
  Spin,
  Modal,
  PageHeader,
  Form,
  Input,
  List,
  Descriptions,
  Skeleton,
} from 'antd';
import { connect, Dispatch, useSelector } from 'umi';
import { ConnectState } from '@/layouts/connect';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MainCard from '@/components/card';
import { PostState } from './model';

const { Text } = Typography;

interface Prop {
  posts: PostState;
  dispatch: Dispatch;
  loading: boolean;
}

const PostPage: React.FC<Prop> = (props) => {
  const {
    posts: { posts },
    dispatch,
    loading,
  } = props;

  const userInfo = useSelector((state: ConnectState) => state.user.userInfo);
  const userPosts = useSelector((state: ConnectState) => state.user.posts);

  const [form] = Form.useForm();

  const [messageModalVisible, setMessageModalVisible] =
    useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [messageContent, setMessageContent] = useState<string>('');

  useEffect(() => {
    dispatch({
      type: 'posts/fetchPosts',
    });
  }, []);

  useEffect(() => {
    if (userPosts.length > 0) {
      dispatch({
        type: 'posts/queryPosts',
        payload: userPosts,
      });
    }
  }, [userPosts]);

  return (
    <>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title="&nbsp;&nbsp;All Posts"
        style={{ padding: window.innerWidth > 1024 ? 16 : 0 }}
      />
      <MainCard>
        <Spin spinning={loading}>
          <List
            loading={loading}
            itemLayout="vertical"
            style={{ overflowY: 'auto', maxHeight: '65vh' }}
            dataSource={posts}
            pagination={{
              pageSize: 10,
            }}
            renderItem={(item: any) => (
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    title={
                      <>
                        <span>{item.title}</span>
                      </>
                    }
                  />
                  <Descriptions.Item className="labelText" label="Post Content">
                    <Text>{item.content}</Text>
                  </Descriptions.Item>
                  <Row justify="space-between">
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: '0.9vw',
                        paddingTop: '0.9vh',
                      }}
                    >
                      By{' '}
                      {userInfo && item.author_id == userInfo.id
                        ? 'You'
                        : item.author_name}
                    </Text>
                    <Button
                      type="link"
                      onClick={() => {
                        setCurrentPost(item);
                        setMessageModalVisible(true);
                      }}
                      disabled={!userInfo || userInfo.id == item.author_id}
                    >
                      {userInfo && userInfo.id == item.author_id
                        ? ''
                        : 'Send Message'}
                    </Button>
                  </Row>
                </Skeleton>
              </List.Item>
            )}
          />
        </Spin>
      </MainCard>
      <Modal
        title="Reply Message"
        visible={messageModalVisible}
        onOk={() => {
          dispatch({
            type: 'posts/sendMessage',
            payload: {
              send_from: userInfo.id,
              send_from_name: userInfo.name,
              send_to: currentPost.author_id,
              send_to_name: currentPost.author_name,
              message: messageContent,
            },
          });
          setMessageContent('');
          setCurrentPost(null);
          setMessageModalVisible(false);
          dispatch({
            type: 'user/getMessage',
            payload: {
              userId: userInfo.id,
            },
          });
        }}
        onCancel={() => setMessageModalVisible(false)}
      >
        <Input.TextArea
          rows={3}
          //value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default connect(({ posts, loading }: ConnectState) => ({
  posts,
  loading: loading.models.posts || false,
}))(PostPage);
