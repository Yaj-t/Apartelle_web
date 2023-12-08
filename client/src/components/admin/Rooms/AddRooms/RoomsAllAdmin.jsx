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
  const [roomTypes, setRoomTypes] = useState([]);

  const navigate = useNavigate();

  const navigateAddRoom = path => {
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

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/roomType/');
      setRoomTypes(response.data);
    } catch (err) {
      setError('Error fetching room types');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const getRoomTypeName = roomTypeId => {
    const roomType = roomTypes.find(type => type.roomTypeId === roomTypeId);
    return roomType ? roomType.typeName : 'Unknown Room Type';
  };

  const handleDelete = async roomId => {
    console.log('Delete Room:', roomId);
    try {
      const url = `http://localhost:3001/room/${roomId}`;
      const response = await axios.delete(url, {
        headers: { accessToken: sessionStorage.getItem('accessToken') }
      });
      setRooms(prevRooms => prevRooms.filter(r => r.roomId !== roomId));
    } catch (error) {}
  };

  const handleEdit = roomId => {
    console.log('Edit Room:', roomId);
    let currentpath = window.location.pathname;
    const url = `${currentpath}/editRoom/${roomId}`;
    console.log(url);
    navigate(url);
  };

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
            <button
              id={RoomsAllCSS.addRooms}
              onClick={() => navigateAddRoom('addRooms')}>
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
                <tr key={room.roomId}>
                  <td>
                    <input type='checkbox' id={RoomsAllCSS.checkbox} />
                  </td>
                  <td>{room.roomNumber}</td>
                  <td>{getRoomTypeName(room.roomTypeId)}</td>
                  <td>{room.description}</td>
                  <td>{room.capacity}</td>
                  <td className={RoomsAllCSS.roomTableButtons}>
                    <button onClick={() => handleEdit(room.roomId)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(room.roomId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomsAllAdmin;
