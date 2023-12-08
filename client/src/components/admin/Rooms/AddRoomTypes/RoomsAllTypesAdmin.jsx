import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import AllTypesCSS from '../../../../styles/admin/roomsAllTypesAdmin.module.css';

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const navigatePath = path => {
    navigate(`/admin/rooms/${path}`, { replace: true });
  };

  useEffect(() => {
    fetchRoomTypes();
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

  const handleDelete = async roomTypeId => {
    console.log('Delete Room Type:', roomTypeId);
    try {
      const url = `http://localhost:3001/roomType/${roomTypeId}`;
      const response = await axios.delete(url, {
        headers: { accessToken: sessionStorage.getItem('accessToken') }
      });
      setRoomTypes(prevRoomTypes =>
        prevRoomTypes.filter(rt => rt.roomTypeId !== roomTypeId)
      );
    } catch (error) {}
  };

  const handleEdit = roomTypeId => {
    console.log('Edit Room Type:', roomTypeId);
    let currentpath = window.location.pathname;
    const url = `${currentpath}/editRoomType/${roomTypeId}`;
    console.log(url);
    navigate(url);
  };

  return (
    <div>
      <NavBarDashboard />

      <div className={AllTypesCSS.tableContainer}>
        <div className={AllTypesCSS.tableHeaderContainer}>
          <div className={AllTypesCSS.tableHeader}>
            <h1>Room Types</h1>
            {error && <p>{error}</p>}
          </div>

          <div className={AllTypesCSS.tableHeader}>
            <button
              id={AllTypesCSS.addRoomTypes}
              onClick={() => navigatePath('addRoomType')}>
              Add Rooms
            </button>
          </div>
        </div>

        <div className={AllTypesCSS.roomTableContainer}>
          <table>
            <thead>
              <tr>
                <th>
                  <CheckBoxIcon fontSize='small' />
                </th>
                <th>Type Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomTypes.map(roomType => (
                <tr key={roomType.roomTypeId}>
                  <td>
                    <input type="checkbox" id={AllTypesCSS.checkbox}/>
                  </td>
                  <td>{roomType.typeName}</td>
                  <td>{roomType.typeDescription}</td>
                  <td className={AllTypesCSS.roomTableButtons}>
                    <button onClick={() => handleEdit(roomType.roomTypeId)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(roomType.roomTypeId)}>
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
};

export default RoomTypes;
