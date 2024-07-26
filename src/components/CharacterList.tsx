import React, { useState, useEffect } from 'react';
import { List, Button, Modal, Form, Input } from 'antd';
import api from '../api/api';
import AddCharacterModal from './AddCharacterModal';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const response = await api.get('/characters');
    setCharacters(response.data);
  };

  const handleAddCharacter = async (character) => {
    const characterData = {
      ...character,
      scene_id: character.scene?.id // asumiendo que el modal te da un objeto scene
    };
    await api.post('/characters', characterData);
    fetchCharacters();
    setIsModalVisible(false); // Close modal after saving
  };

  const handleDeleteCharacter = async (id) => {
    await api.delete(`/characters/${id}`);
    fetchCharacters();
  };

  const handleEditCharacter = (character) => {
    setEditingCharacter(character);
    setIsModalVisible(true);
  };

  const handleSaveCharacter = async (character) => {
    const characterData = {
      ...character,
      scene_id: character.scene?.id // asumiendo que el modal te da un objeto scene
    };

    if (editingCharacter) {
      await api.put(`/characters/${editingCharacter.id}`, characterData);
    } else {
      await handleAddCharacter(character);
    }

    fetchCharacters();
    setEditingCharacter(null); // Reset editing state after saving
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Character
      </Button>
      <List
        dataSource={characters}
        renderItem={(character) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEditCharacter(character)}>Edit</Button>,
              <Button type="link" onClick={() => handleDeleteCharacter(character.id)}>Delete</Button>
            ]}
          >
            {character.description}
          </List.Item>
        )}
      />
      <AddCharacterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveCharacter}
        character={editingCharacter}
      />
    </div>
  );
};

export default CharacterList;
