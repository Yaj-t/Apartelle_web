import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import RoomsAllCSS from '../../../../styles/admin/roomsAllAdmin.module.css';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';

function RoomsAllAdmin() {
  const [rooms, setRooms] = useState([]); // State to store room data

  const navigate = useNavigate();

  const navigatePath = path => {
    navigate(`/admin/rooms/${path}`, { replace: true });
  };

  useEffect(() => {
    // Fetch room data from 'http://localhost:3001/room/'
    axios
      .get('http://localhost:3001/room/')
      .then(response => {
        setRooms(response.data); // Set the fetched data to the 'rooms' state
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
        // Handle the error appropriately
      });
  }, []);

  return (
    <div>
      <NavBarDashboard />

      <div className={RoomsAllCSS.roomContainer}>
        <div className={RoomsAllCSS.filterContainer}>
          <form action='' method='' className={RoomsAllCSS.searchBar}>
            <input type='text' placeholder='Search...' />
            <button className={RoomsAllCSS.searchBtn}>
              <SearchIcon fontSize='small' />
            </button>
          </form>

          <div className={RoomsAllCSS.btnContainer}>
            <button id={RoomsAllCSS.filterBtn}>
              <TuneIcon />
              Filters
            </button>

            <button
              id={RoomsAllCSS.addRooms}
              onClick={() => navigatePath('addRooms')}>
              Add Rooms
            </button>
          </div>
        </div>

        <div className={RoomsAllCSS.roomTableContainer}>
          <table>
            <thead>
              <tr>
                <th>
                  <CheckBoxIcon fontSize='small' />
                </th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Description</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <Link
                  to={`/admin/rooms/showAllRooms/roomDetails/${room.id}`}
                  key={room.roomId}>
                  <tr>
                    <td>
                      <input type='checkbox' id={RoomsAllCSS.checkbox} />
                    </td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomTypeId}</td>
                    <td>{room.description}</td>
                    <td>{room.capacity}</td>
                    <td>button</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomsAllAdmin;
