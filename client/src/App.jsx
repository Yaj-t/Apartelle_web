import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components';
import RoomDetails from './components/RoomDetails';
import AllRooms from './components/AllRooms';
import Login from './components/Login';
import Signup from './components/Signup';
import ReservationAdmin from './components/admin/Reservation/ReservationAdmin';
import ReservationDetails from './components/admin/Reservation/ReservationDetails';
import RoomsAdmin from './components/admin/Rooms/AddRooms/RoomsAdmin';
import RoomsFormAdmin from './components/admin/Rooms/AddRooms/RoomsFormAdmin';
import RoomsAllAdmin from './components/admin/Rooms/AddRooms/RoomsAllAdmin';
import RoomsDetailsAdmin from './components/admin/Rooms/AddRooms/RoomsDetailsAdmin';
import PersonnelsAdmin from './components/admin/Personnel/PersonnelsAdmin';
import PersonnelDetailsAdmin from './components/admin/Personnel/PersonnelDetailsAdmin';
import MainPageAdmin from './components/admin/MainPageAdmin';
import EditRoomType from './components/admin/Rooms/AddRoomTypes/RoomEditType';
import RoomTypeForm from './components/admin/Rooms/AddRoomTypes/RoomsAddTypeAdmin';
import RoomTypes from './components/admin/Rooms/AddRoomTypes/RoomsAllTypesAdmin';
import UserProfile from './components/user/UserProfile';
import UpdateUserProfile from './components/user/UpdateProfile';
import './App.css';
import AccountSettings from './components/settings/AccountSettings';
import Security from './components/settings/SecuritySettings';
import ReservationsSettings from './components/settings/ReservationsSettings';
import PersonalDetails from './PersonalDetails';

function App() {
  return (
    <>
      {/* For the admin index modules */}
      <Routes>
        <Route path='/admin' element={<MainPageAdmin />} />
        <Route path='/admin/reservation' element={<ReservationAdmin />} />
        <Route path='/admin/rooms' element={<RoomsAdmin />} />
        <Route path='/admin/personnel' element={<PersonnelsAdmin />} />
      </Routes>

      {/* For the admin room type modules */}
      <Routes>
        <Route
          path='admin/rooms/showRoomTypes/editRoomType/:id'
          element={<EditRoomType />}
        />
        <Route path='admin/rooms/addRoomType' element={<RoomTypeForm />} />
        <Route path='admin/rooms/showRoomTypes' element={<RoomTypes />} />
      </Routes>

      {/* For the admin rooms modules */}
      <Routes>
        <Route path='/admin/rooms/addRooms' element={<RoomsFormAdmin />} />
        <Route path='/admin/rooms/showAllRooms' element={<RoomsAllAdmin />} />
        <Route
          path='/admin/rooms/showAllRooms/roomDetails'
          element={<RoomsDetailsAdmin />}
        />
      </Routes>

      {/* For the admin reservation modules */}
      <Routes>
        <Route
          path='/admin/reservation/details'
          element={<ReservationDetails />}
        />
      </Routes>

      {/* For the admin personnel modules */}
      <Routes>
        <Route
          path='/admin/personnel/personnelDetails'
          element={<PersonnelDetailsAdmin />}
        />
      </Routes>

      {/* For the user modules */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/allRooms' element={<AllRooms />} />
        <Route path='/roomDetails' element={<RoomDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      {/* For the settings module */}
      <Routes>
        <Route path='/settings' element={<AccountSettings />} />
        <Route path='/settings/security' element={<Security />} />
        <Route
          path='/settings/manage-account'
          element={<PersonalDetails />}
        />{' '}
        {/* userprofile in progress*/}
        <Route
          path='/settings/reservation'
          element={<ReservationsSettings />}
        />
      </Routes>

      {/* For the user profile modules */}
      <Routes>
        <Route path='/myProfile' element={<UserProfile />} />
        <Route path='/myProfile/update' element={<UpdateUserProfile />} />
      </Routes>
    </>
  );
}

export default App;
