import React, { useEffect, useState } from 'react';
import {
  Row,
  Typography,
  Button,
  Spin,
  Modal,
  PageHeader,
  Col,
  Select,
  Space,
  Input,
} from 'antd';
import { connect, Dispatch, Link } from 'umi';
import { ConnectState } from '@/layouts/connect';
import MainCard from '../../components/card/index';
import { UserState } from '../user/model';
import { SearchState } from './model';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { CITY_LIST } from '@/helper/constants';

const { Text } = Typography;

interface Prop {
  user: UserState;
  searching: SearchState;
  dispatch: Dispatch;
  loading: boolean;
}

const ClientDashboard: React.FC<Prop> = (props) => {
  const {
    user: { userInfo },
    searching: { userList },
    dispatch,
    loading,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<any>({
    city: 'London',
    province: 'ON',
    lat: 42.9828,
    lon: -81.24,
  });

  const [choosedUser, setChoosedUser] = useState<any>(null);
  const [messageContent, setMessageContent] = useState<string>('');

  useEffect(() => {
    if (userInfo && userInfo.id > 0) {
      dispatch({
        type: 'searching/fetchUsersByCity',
        payload: {
          city: userInfo.city,
        },
      });
      const currentCity = CITY_LIST.find(
        (i) => i.city === userInfo.city && i.province === userInfo.province,
      );
      setCurrentCity(currentCity);
    }
  }, [userInfo]);

  const handleMarkerClick = (user: any) => {
    setChoosedUser(user);
    setIsModalVisible(true);
  };

  return (
    <>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title="Searching"
        style={{ padding: window.innerWidth > 1024 ? 16 : 0 }}
      />
      <MainCard>
        <Row justify="start" style={{ paddingBottom: '1vh' }}>
          <Select
            optionFilterProp="children"
            defaultValue={currentCity.city + ', ' + currentCity.province}
            onChange={(value: any) => {
              const city = CITY_LIST.find(
                (i) => i.city + ', ' + i.province === value,
              );
              setCurrentCity(city);
              dispatch({
                type: 'searching/fetchUsersByCity',
                payload: {
                  city: city.city,
                },
              });
            }}
          >
            {CITY_LIST.map((item: any, index: number) => (
              <Select.Option
                key={`city_${index}`}
                value={item.city + ', ' + item.province}
              >
                {item.city + ', ' + item.province}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Spin spinning={loading}>
          <Row>
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
              <GoogleMap
                mapContainerStyle={{
                  height: '60vh',
                  width: '100%',
                }}
                center={{ lat: currentCity.lat, lng: currentCity.lon }}
                zoom={12}
              >
                {userList.map((user) => (
                  <Marker
                    key={user.id}
                    position={{ lat: user.lat, lng: user.lng }}
                    onClick={() => handleMarkerClick(user)}
                  />
                ))}
              </GoogleMap>
              <Modal
                visible={isModalVisible}
                title="User Details"
                forceRender
                width={'21vw'}
                footer={null}
                closable={false}
                destroyOnClose={true}
              >
                <Row justify="center">
                  <Col span={24}>
                    Name:{' '}
                    <Text strong style={{ fontSize: '1.2vw' }}>
                      {choosedUser ? choosedUser.name : ''}
                    </Text>
                  </Col>
                  <Col span={24}>
                    Gender:{' '}
                    <Text strong style={{ fontSize: '1.2vw' }}>
                      {choosedUser ? choosedUser.gender : ''}
                    </Text>
                  </Col>
                  <Col span={24}>
                    Email:{' '}
                    <Text strong style={{ fontSize: '1.2vw' }}>
                      {choosedUser ? choosedUser.email : ''}
                    </Text>
                  </Col>
                </Row>
                <Row justify="center">
                  <Input.TextArea
                    placeholder="Write a message..."
                    rows={4}
                    style={{ marginTop: '1vh' }}
                    onChange={(e) => {
                      setMessageContent(e.target.value);
                    }}
                  />
                </Row>
                <Row justify="end" style={{ paddingTop: '1vh' }}>
                  <Space>
                    <Button
                      onClick={() => {
                        setIsModalVisible(false);
                        setChoosedUser(null);
                        setMessageContent('');
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        dispatch({
                          type: 'searching/sendMessage',
                          payload: {
                            send_from: userInfo.id,
                            send_from_name: userInfo.name,
                            send_to: choosedUser.id,
                            send_to_name: choosedUser.name,
                            message: messageContent,
                          },
                        });
                        setIsModalVisible(false);
                        setChoosedUser(null);
                        setMessageContent('');
                      }}
                    >
                      Send Message
                    </Button>
                  </Space>
                </Row>
              </Modal>
            </LoadScript>
          </Row>
        </Spin>
      </MainCard>
    </>
  );
};
export default connect(({ user, searching, loading }: ConnectState) => ({
  user: user,
  searching: searching,
  loading: loading.models.user || false,
}))(ClientDashboard);
