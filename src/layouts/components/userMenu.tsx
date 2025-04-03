import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  Button,
  Col,
  Row,
  Space,
  Select,
} from 'antd';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '../connect';
import { UserState } from '../../pages/user/model';
import { UserOutlined } from '@ant-design/icons';

const GENDERS = ['Male', 'Female', 'Other'];
const PROVINCES = [
  'ON',
  'QC',
  'BC',
  'AB',
  'MB',
  'SK',
  'NS',
  'NB',
  'NL',
  'PE',
  'NT',
  'YT',
  'NU',
];

interface Prop {
  user: UserState;
  loading: boolean;
  dispatch: Dispatch;
}

const UserMenu: React.FC<Prop> = (props) => {
  const {
    user: { userInfo },
    loading,
    dispatch,
  } = props;

  const [registerForm] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [newPostForm] = Form.useForm();

  const [userInfoModalVisible, setUserInfoModalVisible] =
    useState<boolean>(false);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [newPostModalVisible, setNewPostModalVisible] =
    useState<boolean>(false);

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      localStorage.removeItem('currentUser');
      dispatch({
        type: 'user/saveCurrentUser',
        payload: null,
      });
      dispatch({
        type: 'user/queryMessage',
        payload: [],
      });
      dispatch({
        type: 'searching/queryUsers',
        payload: [],
      });
    }
    if (e.key === 'editProfile') {
      registerForm.resetFields();
      setUserInfoModalVisible(true);
    }
    if (e.key === 'newPost') {
      setNewPostModalVisible(true);
    }
    if (e.key === 'login') {
      setLoginModalVisible(true);
    }
    if (e.key === 'register') {
      registerForm.resetFields();
      setUserInfoModalVisible(true);
    }
  };

  const handleProfileSubmit = (formData: any) => {
    if (!userInfo) {
      dispatch({
        type: 'user/register',
        payload: {
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          province: formData.province,
        },
      });
    } else {
      dispatch({
        type: 'user/updateUserProfile',
        payload: {
          id: userInfo.id,
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          province: formData.province,
        },
      });
    }

    setUserInfoModalVisible(false);
  };

  const handleLogin = (formData: any) => {
    dispatch({
      type: 'user/login',
      payload: {
        username: formData.username,
        password: formData.password,
      },
    });

    setLoginModalVisible(false);
  };

  const handleNewPost = (formData: any) => {
    if (userInfo) {
      dispatch({
        type: 'user/newPost',
        payload: {
          author_id: userInfo.id,
          author_name: userInfo.name,
          title: formData.title,
          content: formData.content,
        },
      });
    }

    dispatch({
      type: 'posts/fetchPosts',
    });

    setNewPostModalVisible(false);
  };

  const menu: JSX.Element = !userInfo ? (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="login">Login</Menu.Item>
      <Menu.Item key="register">Register</Menu.Item>
    </Menu>
  ) : (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="editProfile">Edit Profile</Menu.Item>
      <Menu.Item key="newPost">New Post</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </a>
      </Dropdown>

      <Modal
        visible={userInfoModalVisible}
        title="User Profile"
        forceRender
        width={'25vw'}
        footer={null}
        closable={false}
        destroyOnClose={true}
      >
        <Form
          form={registerForm}
          onFinish={handleProfileSubmit}
          layout="vertical"
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Account Name:"
                name="username"
                initialValue={userInfo ? userInfo.username : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={11}>
              <Form.Item
                label="Password:"
                name="password"
                initialValue={userInfo ? userInfo.password : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="User Full Name:"
                name="name"
                initialValue={userInfo ? userInfo.name : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={11}>
              <Form.Item
                label="Email:"
                name="email"
                initialValue={userInfo ? userInfo.email : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Gender:"
                name="gender"
                initialValue={userInfo ? userInfo.gender : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Select optionFilterProp="children" value={'Genders'}>
                  {GENDERS.map((item: any, index: number) => (
                    <Select.Option key={`gender_${index}`} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col offset={1} span={11}>
              <Form.Item
                label="Address:"
                name="address"
                initialValue={userInfo ? userInfo.address : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="City:"
                name="city"
                initialValue={userInfo ? userInfo.city : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={11}>
              <Form.Item
                label="Province:"
                name="province"
                initialValue={userInfo ? userInfo.province : ''}
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Select optionFilterProp="children" value={'Provinces'}>
                  {PROVINCES.map((item: any, index: number) => (
                    <Select.Option key={`province_${index}`} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row justify="end">
                <Form.Item className="text-right">
                  <Space>
                    <Button
                      onClick={() => {
                        setUserInfoModalVisible(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        visible={loginModalVisible}
        title="Login"
        forceRender
        width={'13vw'}
        footer={null}
        closable={false}
        destroyOnClose={true}
      >
        <Form form={loginForm} onFinish={handleLogin} layout="vertical">
          <Row>
            <Form.Item
              label="Account Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please enter your account name',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Row>
          <Row justify="center">
            <Form.Item className="text-right">
              <Space>
                <Button
                  onClick={() => {
                    setLoginModalVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
      <Modal
        visible={newPostModalVisible}
        title="New Post"
        forceRender
        width={'13vw'}
        footer={null}
        closable={false}
        destroyOnClose={true}
      >
        <Form form={newPostForm} onFinish={handleNewPost} layout="vertical">
          <Row>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              <Input />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please enter content' }]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Row>
          <Row justify="end">
            <Form.Item className="text-right">
              <Space>
                <Button
                  onClick={() => {
                    setNewPostModalVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default connect(({ user, loading }: ConnectState) => ({
  user: user,
  loading: loading.models.user || false,
}))(UserMenu);
