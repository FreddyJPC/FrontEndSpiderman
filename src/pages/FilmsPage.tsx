import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import AddFilmModal from '../components/AddFilmModal';
import { Film } from '../interfaces/models';

const FilmsPage: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    const response = await axios.get('http://localhost:8082/film');
    setFilms(response.data);
  };

  const handleAddFilm = async (film: Film) => {
    try {
      await axios.post('http://localhost:8082/film', film);
      fetchFilms();
      setModalVisible(false); // Close modal after saving
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  const handleDeleteFilm = async (id: number) => {
    await axios.delete(`http://localhost:8082/film/${id}`);
    fetchFilms();
  };

  const handleEditFilm = async (film: Film) => {
    try {
      if (film.id) {
        await axios.put(`http://localhost:8082/film/${film.id}`, film);
        fetchFilms();
        setModalVisible(false); // Close modal after saving
      }
    } catch (error) {
      console.error('Error editing film:', error);
    }
  };

  const handleSaveFilm = (film: Film) => {
    if (film.id) {
      handleEditFilm(film);
    } else {
      handleAddFilm(film);
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Director', dataIndex: 'director', key: 'director' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Film) => (
        <div>
          <Button onClick={() => {
            setEditingFilm(record);
            setModalVisible(true);
          }}>Edit</Button>
          <Button onClick={() => handleDeleteFilm(record.id!)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => {
        setEditingFilm(null); // Clear editing state
        setModalVisible(true);
      }}>Add Film</Button>
      <Table columns={columns} dataSource={films} rowKey="id" />
      <AddFilmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveFilm}
        film={editingFilm}
      />
    </div>
  );
};

export default FilmsPage;
