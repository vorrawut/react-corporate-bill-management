import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Button type="primary" onClick={() => navigate('/')}>Go to Home</Button>
    </div>
  );
};

export default NotFoundPage;
