import React from 'react';
import NavBarDashboard from '../NavBars/NavBarDashboard';
import AllRooms from '../AllRooms';
import BookingAnalytics from '../01test/BookingAnalytics';

function PersonnelDetailsAdmin() {
  return (
    <div>
      <div>
      <NavBarDashboard />
      </div>
      <div>
        <BookingAnalytics></BookingAnalytics>
      </div>
      
    </div>
  );
}

export default PersonnelDetailsAdmin;
