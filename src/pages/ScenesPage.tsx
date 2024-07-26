import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import AddSceneModal from '../components/AddSceneModal';
import { Scene } from '../interfaces/models';

const ScenesPage: React.FC = () => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingScene, setEditingScene] = useState<Scene | null>(null);

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    const response = await axios.get('http://localhost:8082/scene');
    setScenes(response.data);
  };

  const handleAddScene = async (scene: Scene) => {
    try {
      await axios.post('http://localhost:8082/scene', scene);
      fetchScenes();
      setModalVisible(false); // Close modal after saving
    } catch (error) {
      console.error('Error adding scene:', error);
    }
  };

  const handleDeleteScene = async (id: number) => {
    await axios.delete(`http://localhost:8082/scene/${id}`);
    fetchScenes();
  };

  const handleEditScene = async (scene: Scene) => {
    try {
      if (scene.id) {
        await axios.put(`http://localhost:8082/scene/${scene.id}`, scene);
        fetchScenes();
        setModalVisible(false); // Close modal after saving
      }
    } catch (error) {
      console.error('Error editing scene:', error);
    }
  };

  const handleSaveScene = (scene: Scene) => {
    if (scene.id) {
      handleEditScene(scene);
    } else {
      handleAddScene(scene);
    }
  };

  const columns = [
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Budget', dataIndex: 'budget', key: 'budget' },
    { title: 'Minutes', dataIndex: 'minutes', key: 'minutes' },
    { title: 'Film ID', dataIndex: 'filmId', key: 'filmId' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Scene) => (
        <div>
          <Button onClick={() => {
            setEditingScene(record);
            setModalVisible(true);
          }}>Edit</Button>
          <Button onClick={() => handleDeleteScene(record.id!)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => {
        setEditingScene(null); // Clear editing state
        setModalVisible(true);
      }}>Add Scene</Button>
      <Table columns={columns} dataSource={scenes} rowKey="id" />
      <AddSceneModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveScene}
        scene={editingScene}
      />
    </div>
  );
};

export default ScenesPage;
