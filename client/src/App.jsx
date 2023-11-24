import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components'
import RoomDetails from './components/RoomDetails'
import AllRooms from './components/AllRooms'
import ReservationAdmin from './components/admin/ReservationAdmin'
import ReservationDetails from './components/admin/ReservationDetails'
import RoomsAdmin from './components/admin/RoomsAdmin'
import RoomsFormAdmin from './components/admin/RoomsFormAdmin'
import RoomsAllAdmin from './components/admin/RoomsAllAdmin'
import RoomsDetailsAdmin from './components/admin/RoomsDetailsAdmin'
import PersonnelsAdmin from './components/admin/PersonnelsAdmin'
import PersonnelDetailsAdmin from './components/admin/PersonnelDetailsAdmin'
import MainPageAdmin from './components/admin/MainPageAdmin'
import NavBarOnline from './components/NavBars/NavBarOnline'
import LoginPage from './components/auth/LogIn'
import SignUpPage from './components/auth/SignUp'
import './App.css'

function App() {

  return (
    <>
      {/* <PersonnelDetailsAdmin /> */}

    {/* Auth */}
    <Routes>
      <Route path='/Login' element={<LoginPage/>}/>
      <Route path='/SignUp' element={<SignUpPage/>}/>
    </Routes>

    {/* Uncomment this when using the user page */}
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/allRooms' element={<AllRooms />} />
      <Route path='/roomDetails' element={<RoomDetails/>} />
    </Routes>

    {/* Uncomment this when using the admin pages */}
    <Routes>
      <Route path='/admin' element={<MainPageAdmin/>}/>
      <Route path='/admin/reservation' element={<ReservationAdmin/>}/>
      <Route path='/admin/rooms' element={<RoomsAdmin/>}/>
      <Route path='/admin/personnel' element={<PersonnelsAdmin/>}/>
      <Route path='/admin/reservation/details' element={<ReservationDetails/>}/>
      <Route path='/admin/rooms/addRooms' element={<RoomsFormAdmin/>}/>
      <Route path='/admin/rooms/showAllRooms' element={<RoomsAllAdmin/>}/>
      <Route path='/admin/rooms/showAllRooms/roomDetails' element={<RoomsDetailsAdmin/>}/>
      <Route path='/admin/personnel/personnelDetails' element={<PersonnelDetailsAdmin/>}/>
    </Routes> 
    </>
  )
}

export default App
