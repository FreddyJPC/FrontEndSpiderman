import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Character } from '../interfaces/models';

interface AddCharacterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (character: Character) => void;
  character?: Character | null;
}

const AddCharacterModal: React.FC<AddCharacterModalProps> = ({ visible, onClose, onSave, character }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (character) {
      form.setFieldsValue(character);
    } else {
      form.resetFields();
    }
  }, [character, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...values, id: character?.id }); // Use existing id if editing
      onClose();
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };

  return (
    <Modal visible={visible} onCancel={onClose} onOk={handleSave} title={character ? "Edit Character" : "Add Character"}>
      <Form form={form} layout="vertical">
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="cost" label="Cost">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="stock" label="Stock">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="scene_id" label="Scene ID" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCharacterModal;
