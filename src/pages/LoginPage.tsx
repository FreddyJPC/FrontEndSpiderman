import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import api from '../api/api';

const LoginPage = ({ history }) => {
  const [form] = Form.useForm();
  
  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      // Aquí puedes agregar la lógica de autenticación
      history.push('/films');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form form={form} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        <Button type="primary" onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
