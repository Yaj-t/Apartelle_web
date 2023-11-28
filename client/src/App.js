import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountSettings from './AccountSettings.jsx';
import PersonalDetails from './PersonalDetails.jsx';
import Security from './Security.jsx';
import Bookings from './Bookings.jsx';
import Sidebar from './Sidebar.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Sidebar/>
      <Routes>
        <Route path="/" element={<AccountSettings/>} />
        <Route path="/PersonalDetails" element={<PersonalDetails/>} />
        <Route path="/Security" element={<Security/>} />
        <Route path="/Bookings" element={<Bookings/>} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
