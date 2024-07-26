import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import api from '../api/api';
import AddFilmModal from './AddFilmModal';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFilm, setEditingFilm] = useState(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    const response = await api.get('/film');
    setFilms(response.data);
  };

  const handleAddFilm = (film) => {
    setFilms([...films, film]);
  };

  const handleDeleteFilm = async (id) => {
    await api.delete(`/film/${id}`);
    setFilms(films.filter(film => film.id !== id));
  };

  const handleEditFilm = (film) => {
    setEditingFilm(film);
    setIsModalVisible(true);
  };

  const handleSaveFilm = async (film) => {
    if (editingFilm) {
      await api.put(`/film/${editingFilm.id}`, film);
      setFilms(films.map(f => (f.id === editingFilm.id ? film : f)));
    } else {
      handleAddFilm(film);
    }
    setEditingFilm(null);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Film
      </Button>
      <List
        dataSource={films}
        renderItem={(film) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEditFilm(film)}>Edit</Button>,
              <Button type="link" onClick={() => handleDeleteFilm(film.id)}>Delete</Button>
            ]}
          >
            {film.title}
          </List.Item>
        )}
      />
      <AddFilmModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveFilm}
        film={editingFilm}
      />
    </div>
  );
};

export default FilmList;
