import './App.css';
import Navbar from './components/navbar'
import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/home.page';
import AboutPage from './pages/about.page';
import VotingPage from './pages/voting.page';
import React, { useState } from 'react';
import LoginPage from './pages/login.page';

export const UserContext = React.createContext();

function App() {
  const [userId, setUserId] = useState(0);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="vote" element={<VotingPage />} />          
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
