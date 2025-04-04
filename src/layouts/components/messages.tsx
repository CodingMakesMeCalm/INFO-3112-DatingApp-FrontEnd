import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Card,
  Descriptions,
  Dropdown,
  List,
  Typography,
  Skeleton,
  Modal,
  Input,
  Row,
  Button,
} from 'antd';
import { history, useSelector, useDispatch } from 'umi';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { ConnectState } from '../connect';
import { BellOutlined } from '@ant-design/icons';
import styles from '../layout.less';

const { Text } = Typography;

const Messages: React.FC = () => {
  const messages = useSelector((state: ConnectState) => state.user.messages);
  const userInfo = useSelector((state: ConnectState) => state.user.userInfo);
  const loading = useSelector(
    (state: ConnectState) => state.loading.models && state.loading.models.user,
  );

  const dispatch = useDispatch();

  const [replyModalVisible, setReplyModalVisible] = useState<boolean>(false);
  const [visible, setVisible] = useMergedState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<any>(null);
  const [messageContent, setMessageContent] = useState<string>('');

  useEffect(() => {
    if (userInfo && userInfo.id > 0) {
      dispatch({
        type: 'user/getMessage',
        payload: {
          userId: userInfo.id,
        },
      });
    }
  }, [userInfo]);

  const handleReadMessages = (messageId: any) => () => {
    dispatch({
      type: 'user/readMessage',
      payload: {
        userId: userInfo.id,
        messageId: messageId,
      },
    });
  };

  const menu: JSX.Element = (
    <Card style={{ width: '30vw', padding: 10, maxHeight: '80vh' }}>
      {!userInfo ? (
        <Text>Please login to view messages.</Text>
      ) : messages && messages.length > 0 ? (
        <List
          loading={loading}
          itemLayout="vertical"
          style={{ overflowY: 'auto', maxHeight: '65vh' }}
          dataSource={messages}
          pagination={{
            pageSize: 5,
          }}
          renderItem={(item: any) => (
            <div
              className={styles.notificationCell}
              onClick={handleReadMessages(item.id)}
            >
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta title={<span>{item.send_from_name}</span>} />
                  <Descriptions.Item
                    className="labelText"
                    label="Message Content"
                  >
                    <Text>{item.message}</Text>
                  </Descriptions.Item>
                  <Row justify="space-between">
                    {item.is_read ? (
                      <Text
                        style={{
                          color: 'gray',
                          fontSize: '0.9vw',
                          paddingTop: '1vh',
                        }}
                      >
                        Read
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: 'gray',
                          fontSize: '0.9vw',
                          paddingTop: '1vh',
                        }}
                      >
                        Unread
                      </Text>
                    )}
                    <Button
                      type="link"
                      onClick={() => {
                        setCurrentMessage(item);
                        setReplyModalVisible(true);
                      }}
                      disabled={!userInfo}
                    >
                      Reply
                    </Button>
                  </Row>
                </Skeleton>
              </List.Item>
            </div>
          )}
        />
      ) : (
        <Text>No message.</Text>
      )}
    </Card>
  );

  return (
    <div style={{ paddingRight: 15, cursor: 'pointer' }}>
      <Dropdown
        overlay={menu}
        visible={visible}
        trigger={['click']}
        onVisibleChange={() => setVisible(!visible)}
      >
        <Badge count={messages ? messages.length : 0}>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<BellOutlined />}
          />
        </Badge>
      </Dropdown>
      <Modal
        title="Reply Message"
        visible={replyModalVisible}
        onOk={() => {
          dispatch({
            type: 'posts/sendMessage',
            payload: {
              send_from: currentMessage.send_to,
              send_from_name: currentMessage.send_to_name,
              send_to: currentMessage.send_from,
              send_to_name: currentMessage.send_from_name,
              message: messageContent,
            },
          });
          setMessageContent('');
          setCurrentMessage(null);
          setReplyModalVisible(false);
        }}
        onCancel={() => setReplyModalVisible(false)}
      >
        <Input.TextArea
          rows={3}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
      </Modal>
    </div>
  );
};
export default Messages;
