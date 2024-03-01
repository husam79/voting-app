import './App.css';
import Navbar from './components/navbar'
import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/home.page';
import AboutPage from './pages/about.page';
import VotingPage from './pages/voting.page';
import React, { useEffect, useState } from 'react';
import LoginPage from './pages/login.page';
import LogoutPage from './pages/logout.page';
import ResultsPage from './pages/results.page';

export const UserContext = React.createContext();

const usePersistentStorage = (init_value) => {
  const [data, setData] = useState(() => init_value === null ? JSON.parse(localStorage.getItem('session')) : init_value);

  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(data));
  }, [data]);

  return [data, setData]
}

function App() {

  const [user, setUser] = usePersistentStorage(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
          <Route path="vote" element={<VotingPage />} />
          <Route path="results" element={<ResultsPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
