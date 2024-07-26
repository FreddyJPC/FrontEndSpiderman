import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Film } from '../interfaces/models';

interface AddFilmModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (film: Film) => void;
  film?: Film | null;
}

const AddFilmModal: React.FC<AddFilmModalProps> = ({ visible, onClose, onSave, film }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (film) {
      form.setFieldsValue(film);
    } else {
      form.resetFields();
    }
  }, [film, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...film, ...values });
      onClose();
    } catch (error) {
      console.error('Error saving film:', error);
    }
  };

  return (
    <Modal visible={visible} onCancel={onClose} onOk={handleSave} title="Film">
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="director" label="Director">
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFilmModal;
