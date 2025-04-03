import React from 'react';
import { Card, Skeleton } from 'antd';

interface Prop {
  loading?: boolean;
  hasBorder?: boolean;
}

const MainCard: React.FC<Prop> = (props) => {
  const width: number = window.innerWidth;
  const { loading, hasBorder } = props;

  return (
    <Card
      bordered={hasBorder || false}
      size={width > 1024 ? 'default' : 'small'}
    >
      <Skeleton loading={loading} avatar active>
        {props.children}
      </Skeleton>
    </Card>
  );
};
export default MainCard;
