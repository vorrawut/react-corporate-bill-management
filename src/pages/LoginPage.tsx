// src/pages/LoginPage.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Login Success:', values);
    // Add login logic here, such as API calls
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
