import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, Typography } from 'antd';
import { connect, Dispatch, history, Link } from 'umi';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BorderOuterOutlined,
} from '@ant-design/icons';
import UserMenu from './components/userMenu';
import moment from 'moment';
import { Footer } from 'antd/lib/layout/layout';
import { ConnectState } from './connect';
import Messages from './components/messages';
import styles from './layout.less';

interface Prop {
  dispatch: Dispatch;
}

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC<Prop> = (props) => {
  const { dispatch } = props;
  const [collapsedSideBar, toggleSideBar] = useState<boolean>(false);

  const handleMenuClick = (e: any) => {
    history.push(`${e.key}`);
  };

  return (
    <Layout>
      <Header>
        <div className={styles.topBarContent}>
          <Typography.Title
            level={5}
            style={{ color: '#fff', margin: 0, fontWeight: 200 }}
          >
            Let's Date
          </Typography.Title>
          <div className={styles.topBarRightCorner}>
            <Messages />
            <UserMenu />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={
            <Button
              type="link"
              onClick={() => toggleSideBar(!collapsedSideBar)}
              icon={
                collapsedSideBar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
            />
          }
          theme="light"
          collapsible
          collapsed={collapsedSideBar}
        >
          <Menu mode="inline" theme="light" onClick={handleMenuClick}>
            <Menu.Item key="/posts" icon={<UserOutlined />}>
              User Posts
            </Menu.Item>
            <Menu.Item key="/searching" icon={<BorderOuterOutlined />}>
              Dating Searching
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 16,
              backgroundColor: '#f0f2f5',
              width: '100%',
              minHeight: window.innerHeight - 50 - 84,
            }}
          >
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            &copy; Copyright {moment().format('YYYY')} Letsmeet
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default connect(({ loading }: ConnectState) => ({
  loading: loading.global ? loading.global : false,
}))(MainLayout);
