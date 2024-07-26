import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilmsPage from './src/pages/FilmsPage';
import CharactersPage from './src/pages/CharactersPage';
import ScenesPage from './src/pages/ScenesPage';
import LoginPage from './src/pages/LoginPage';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/scenes" element={<ScenesPage />} />
        <Route path="/" element={<LoginPage history={history} />} />
      </Routes>
    </Router>
  );
};

export default App;
