import { useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import LandingPage from './components'
import RoomDetails from './components/RoomDetails'
import AllRooms from './components/AllRooms'
import Login from './components/Login'
import Signup from './components/Signup'
import ReservationAdmin from './components/admin/Reservation/ReservationAdmin'
import ReservationDetails from './components/admin/Reservation/ReservationDetails'
import RoomsAdmin from './components/admin/Rooms/AddRooms/RoomsAdmin'
import RoomsFormAdmin from './components/admin/Rooms/AddRooms/RoomsFormAdmin'
import RoomsAllAdmin from './components/admin/Rooms/AddRooms/RoomsAllAdmin'
import RoomsDetailsAdmin from './components/admin/Rooms/AddRooms/RoomsDetailsAdmin'
import PersonnelsAdmin from './components/admin/Personnel/PersonnelsAdmin'
import PersonnelDetailsAdmin from './components/admin/Personnel/PersonnelDetailsAdmin'
import MainPageAdmin from './components/admin/MainPageAdmin'
import NavBarOnline from './components/NavBars/NavBarOnline'
import AddRoomType from './components/admin/Rooms/AddRoomTypes/RoomsAddTypeAdmin'
import ShowRoomTypes from './components/roomType/showRoomTypes'
import EditRoomType  from './components/roomType/EditRoomType'
import RoomTypeForm from './components/admin/Rooms/AddRoomTypes/RoomsAddTypeAdmin'
import RoomTypes from './components/admin/Rooms/AddRoomTypes/RoomsAllTypesAdmin'
import './App.css'


function App() {

  return (
    <>
    <Routes>
      <Route path='/addRoomType' element={<AddRoomType/>}/>
      <Route path='/showRoomTypes' element={<ShowRoomTypes/>}/>
      <Route path="/editRoomType/:id" element={<EditRoomType/>} />
      <Route path='admin/rooms/addRoomType' element={<RoomTypeForm/>}/>
      <Route path='admin/rooms/showRoomTypes' element={<RoomTypes/>}/>
    </Routes>


    {/* Uncomment this when using the user page */}
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/allRooms' element={<AllRooms />} />
      <Route path='/roomDetails' element={<RoomDetails/>} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup/>}/>
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
