import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Scene } from '../interfaces/models';

interface AddSceneModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (scene: Scene) => void;
  scene?: Scene | null;
}

const AddSceneModal: React.FC<AddSceneModalProps> = ({ visible, onClose, onSave, scene }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (scene) {
      form.setFieldsValue(scene);
    } else {
      form.resetFields();
    }
  }, [scene, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...values, id: scene?.id }); // Asegúrate de incluir todos los campos requeridos
      onClose();
    } catch (error) {
      console.error('Error saving scene:', error);
    }
  };

  return (
    <Modal visible={visible} onCancel={onClose} onOk={handleSave} title="Scene">
      <Form form={form} layout="vertical">
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="filmId" label="Film ID" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="budget" label="Budget" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="minutes" label="Minutes" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSceneModal;
