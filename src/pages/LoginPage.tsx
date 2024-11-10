import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Spin, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './LoginPage.css'; // Import the CSS file for styling

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Login Success:', values);
    setLoading(true);
    message.loading({ content: 'Logging in...', key: 'login' });

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      message.success({ content: 'Login successful!', key: 'login', duration: 2 });
      // Add actual login logic here, such as API calls
    }, 2000);
  };

  return (
    <div className="login-container">
      <Card
        style={{
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          Login
        </Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { validator: (_: any, value: string) => /^[a-zA-Z0-9]+$/.test(value) ? Promise.resolve() : Promise.reject('Username should only contain letters and numbers.') },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your username" aria-label="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: (_: any, value: string) => {
                if (!value) return Promise.reject('Please input your password!');
                if (value.length < 6) return Promise.reject('Password must be at least 6 characters long.');
                if (!/[A-Z]/.test(value)) return Promise.reject('Password must include at least one uppercase letter.');
                if (!/[0-9]/.test(value)) return Promise.reject('Password must include at least one number.');
                return Promise.resolve();
              }},
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              aria-label="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? <Spin size="small" /> : 'Log In'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
