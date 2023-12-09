import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components";
import RoomDetails from "./components/RoomDetails";
import AllRooms from "./components/AllRooms";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ReservationAdmin from "./components/admin/Reservation/ReservationAdmin";
import ReservationDetails from "./components/admin/Reservation/ReservationDetails";
import RoomsAdmin from "./components/admin/Rooms/AddRooms/RoomsAdmin";
import RoomsFormAdmin from "./components/admin/Rooms/AddRooms/RoomsFormAdmin";
import RoomsAllAdmin from "./components/admin/Rooms/AddRooms/RoomsAllAdmin";
import RoomsEditDetailsAdmin from "./components/admin/Rooms/AddRooms/RoomEditDetails";
import PersonnelsAdmin from "./components/admin/Personnel/PersonnelsAdmin";
import PersonnelDetailsAdmin from "./components/admin/Personnel/PersonnelDetailsAdmin";
import MainPageAdmin from "./components/admin/MainPageAdmin";
import EditRoomType from "./components/admin/Rooms/AddRoomTypes/RoomEditType";
import RoomTypeForm from "./components/admin/Rooms/AddRoomTypes/RoomsAddTypeAdmin";
import RoomTypes from "./components/admin/Rooms/AddRoomTypes/RoomsAllTypesAdmin";
import UserProfile from "./components/settings/user/UserProfile";
import UpdateUserProfile from "./components/settings/user/UpdateProfile";
import "./App.css";
import AccountSettings from "./components/settings/AccountSettings";
import Security from "./components/settings/SecuritySettings";
import ReservationsSettings from "./components/settings/ReservationsSettings";
import PersonalDetails from "./PersonalDetails";
// import RoomDetail from './components/01test/RoomDetail
import ProtectedRoutes from "./components/ProtectedRoute";
import UnauthorizeError from "./components/errorpages/UnauthorizeError";
import AvailableRooms from "./components/01test/AvailableRooms";
import BookRoom from "./components/01test/BookRoom";
import AddReview from "./components/01test/AddReview";
import UserBookings from "./components/01test/UserBookings";
import UserReviews from "./components/01test/UserReviews";
import UpdateReview from "./components/01test/UpdateReview";
import BookingsList from "./components/01test/BookingList";
import BookingAnalytics from "./components/01test/BookingAnalytics";

function App() {
  return (
    <>
      <Routes>

        <Route path="/admin/booking-analytics" element={<BookingAnalytics/>} />
        <Route
          path="/available-rooms"
          element={<AvailableRooms></AvailableRooms>}
        />
        <Route
          path="/book-room/:roomId"
          element={<BookRoom></BookRoom>}
        ></Route>
        <Route path="/user-bookings" element={<UserBookings></UserBookings>} />

        <Route path="/booking-list" element={<BookingsList />}></Route>
        <Route
          path="/update-review/:reviewIdParam"
          element={<UpdateReview />}
        />
        <Route path="/user-reviews/:userIdParam" element={<UserReviews />} />
        <Route path="/addReview/:bookingIdParam" element={<AddReview />} />
        <Route
          path="/available-rooms"
          element={<AvailableRooms></AvailableRooms>}
        />
        <Route
          path="/book-room/:roomId"
          element={<BookRoom></BookRoom>}
        ></Route>
      </Routes>

      {/* For the admin index modules */}
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<MainPageAdmin />} />
          <Route path="/admin/reservation" element={<ReservationAdmin />} />
          <Route path="/admin/rooms" element={<RoomsAdmin />} />
          <Route path="/admin/personnel" element={<PersonnelsAdmin />} />

          {/* For the admin room type modules */}
          <Route
            path="/admin/rooms/showRoomTypes/editRoomType/:id"
            element={<EditRoomType />}
          />
          <Route path="/admin/rooms/addRoomType" element={<RoomTypeForm />} />
          <Route path="/admin/rooms/showRoomTypes" element={<RoomTypes />} />

          {/* For the admin rooms modules */}
          <Route path="/admin/rooms/addRooms" element={<RoomsFormAdmin />} />
          <Route path="/admin/rooms/showAllRooms" element={<RoomsAllAdmin />} />
          <Route
            //   path="/admin/rooms/showAllRooms/roomDetails"
            //   element={<RoomsDetailsAdmin />}
            // />
            // <Route
            path="/admin/rooms/showAllRooms/editRoom/:id"
            element={<RoomsEditDetailsAdmin />}
          />

          {/* For the admin reservation modules */}
          <Route
            path="/admin/reservation/details"
            element={<ReservationDetails />}
          />

          {/* For the admin personnel modules */}
          <Route
            path="/admin/personnel/personnelDetails"
            element={<PersonnelDetailsAdmin />}
          />
        </Route>
      </Routes>

      {/* For the user modules */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/allRooms" element={<AllRooms />} />
        <Route path="/roomDetails/:roomId" element={<RoomDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* For the settings module */}
      <Routes>
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/manage-account" element={<UserProfile />} />
        <Route
          path="/settings/manage-account/update"
          element={<UpdateUserProfile />}
        />
        {/* userprofile in progress*/}
        <Route
          path="/settings/reservation"
          element={<ReservationsSettings />}
        />
      </Routes>

      <Routes>
        <Route path="/unauthorized" element={<UnauthorizeError />} />
      </Routes>

      {/* For the user profile modules */}
      {/* <Routes>
        <Route path='/myProfile' element={<UserProfile />} />
        <Route path='/myProfile/update' element={<UpdateUserProfile />} />
      </Routes> */}
    </>
  );
}

export default App;
