import React from 'react';
import { Select, Form } from 'antd';

interface Prop {
  loading?: boolean;
  name: string | string[];
  initialValue: string;
  label: string;
}

const ProvinceSelector: React.FC<Prop> = (props) => {
  const { loading, label, name, initialValue } = props;

  const PROVINCE_LIST: string[] = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
  ];

  return (
    <Form.Item label={label} name={name} initialValue={initialValue}>
      <Select optionFilterProp="children" showSearch>
        {PROVINCE_LIST.map((item: string, index: number) => (
          <Select.Option key={`item${index}`} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
export default ProvinceSelector;
