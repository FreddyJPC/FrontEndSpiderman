import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import AddCharacterModal from '../components/AddCharacterModal';
import { Character } from '../interfaces/models';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const response = await axios.get('http://localhost:8082/characters');
    setCharacters(response.data);
  };

  const handleAddCharacter = async (character: Character) => {
    try {
      const characterData = {
        description: character.description,
        cost: character.cost,
        stock: character.stock,
        scene_id: character.scene_id
      };
      await axios.post('http://localhost:8082/characters', characterData);
      fetchCharacters();
      setModalVisible(false); // Close modal after saving
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  const handleEditCharacter = async (character: Character) => {
    try {
      const characterData = {
        description: character.description,
        cost: character.cost,
        stock: character.stock,
        scene_id: character.scene_id
      };
      if (character.id) {
        await axios.put(`http://localhost:8082/characters/${character.id}`, characterData);
      }
      fetchCharacters();
      setModalVisible(false); // Close modal after saving
    } catch (error) {
      console.error('Error editing character:', error);
    }
  };

  const handleSaveCharacter = (character: Character) => {
    if (character.id) {
      handleEditCharacter(character);
    } else {
      handleAddCharacter(character);
    }
  };

  const columns = [
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Cost', dataIndex: 'cost', key: 'cost' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Scene ID', dataIndex: 'scene_id', key: 'scene_id' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Character) => (
        <div>
          <Button onClick={() => {
            setEditingCharacter(record);
            setModalVisible(true);
          }}>Edit</Button>
          <Button onClick={() => handleEditCharacter(record.id!)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => {
        setEditingCharacter(null); // Clear editing state
        setModalVisible(true);
      }}>Add Character</Button>
      <Table columns={columns} dataSource={characters} rowKey="id" />
      <AddCharacterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCharacter}
        character={editingCharacter}
      />
    </div>
  );
};

export default CharactersPage;
