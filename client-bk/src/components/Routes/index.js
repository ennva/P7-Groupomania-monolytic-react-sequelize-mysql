import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/profil" exact={true} element={<Profil />} />
        <Route path="/trending" exact={true} element={<Trending />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;

/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/welcome" element={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
*/
