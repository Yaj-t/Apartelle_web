import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountSettings from './AccountSettings';
import PersonalDetails from './PersonalDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={AccountSettings} />
        <Route path="/personal-details" component={PersonalDetails} />
      </Routes>
    </Router>
  );
};

export default App;
