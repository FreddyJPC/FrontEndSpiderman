import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import api from '../api/api';
import AddSceneModal from './AddSceneModal';

const SceneList = () => {
  const [scenes, setScenes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingScene, setEditingScene] = useState(null);

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    const response = await api.get('/scene');
    setScenes(response.data);
  };

  const handleAddScene = (scene) => {
    setScenes([...scenes, scene]);
  };

  const handleDeleteScene = async (id) => {
    await api.delete(`/scene/${id}`);
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const handleEditScene = (scene) => {
    setEditingScene(scene);
    setIsModalVisible(true);
  };

  const handleSaveScene = async (scene) => {
    if (editingScene) {
      await api.put(`/scene/${editingScene.id}`, scene);
      setScenes(scenes.map(s => (s.id === editingScene.id ? scene : s)));
    } else {
      await api.post('/scene', scene);  // Cambiado a post para agregar nuevas escenas
      fetchScenes();
    }
    setEditingScene(null);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Scene
      </Button>
      <List
        dataSource={scenes}
        renderItem={(scene) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEditScene(scene)}>Edit</Button>,
              <Button type="link" onClick={() => handleDeleteScene(scene.id)}>Delete</Button>
            ]}
          >
            {scene.description}
          </List.Item>
        )}
      />
      <AddSceneModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveScene}
        scene={editingScene}
      />
    </div>
  );
};

export default SceneList;
