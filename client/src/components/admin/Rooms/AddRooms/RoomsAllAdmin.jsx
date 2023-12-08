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
  const [sortOrderRoomNumber, setSortOrderRoomNumber] = useState('original');
  const [sortOrderRoomType, setSortOrderRoomType] = useState('original');
  const [sortOrderCapacity, setSortOrderCapacity] = useState('original');
  const [error, setError] = useState('');

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
        setError('Error fetching room data');
        console.error('Error fetching room data:', error);
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

  const handleSortRoomNumber = () => {
    setSortOrderRoomNumber(prevSortOrder => {
      if (prevSortOrder === 'asc') return 'desc';
      if (prevSortOrder === 'desc') return 'original';
      return 'asc';
    });
  };

  const handleSortRoomType = () => {
    setSortOrderRoomType(prevSortOrder => {
      if (prevSortOrder === 'asc') return 'desc';
      if (prevSortOrder === 'desc') return 'original';
      return 'asc';
    });
  };

  const handleSortCapacity = () => {
    setSortOrderCapacity(prevSortOrder => {
      if (prevSortOrder === 'asc') return 'desc';
      if (prevSortOrder === 'desc') return 'original';
      return 'asc';
    });
  };

  const getSortedRooms = () => {
    let sortedRooms = [...rooms];

    if (sortOrderRoomNumber !== 'original') {
      sortedRooms.sort((a, b) => {
        const compareValueA =
          sortOrderRoomNumber === 'asc' ? a.roomNumber : b.roomNumber;
        const compareValueB =
          sortOrderRoomNumber === 'asc' ? b.roomNumber : a.roomNumber;

        return compareValueA.localeCompare(compareValueB);
      });
    }

    if (sortOrderRoomType !== 'original') {
      sortedRooms.sort((a, b) => {
        const compareValueA =
          sortOrderRoomType === 'asc' ? a.roomTypeId : b.roomTypeId;
        const compareValueB =
          sortOrderRoomType === 'asc' ? b.roomTypeId : a.roomTypeId;

        const roomTypeOrder = roomTypes.map(roomType => roomType.roomTypeId);

        return (
          roomTypeOrder.indexOf(compareValueA) -
          roomTypeOrder.indexOf(compareValueB)
        );
      });
    }

    if (sortOrderCapacity !== 'original') {
      sortedRooms.sort((a, b) => {
        const compareValueA =
          sortOrderCapacity === 'asc' ? a.capacity : b.capacity;
        const compareValueB =
          sortOrderCapacity === 'asc' ? b.capacity : a.capacity;

        return compareValueA - compareValueB;
      });
    }

    return sortedRooms;
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
            <button id={RoomsAllCSS.deleteRooms}>Delete Rooms</button>

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
                <th onClick={handleSortRoomNumber}>
                  <div id={RoomsAllCSS.tableHeader}>
                    <p>Room Number </p>
                    <p>
                      {sortOrderRoomNumber !== 'original' && (
                        <span>{sortOrderRoomNumber === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </p>
                  </div>
                </th>
                <th onClick={handleSortRoomType}>
                  <div id={RoomsAllCSS.tableHeader}>
                    <p>Room Type </p>
                    <p>
                      {sortOrderRoomType !== 'original' && (
                        <span>{sortOrderRoomType === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </p>
                  </div>
                </th>
                <th>Description</th>
                <th onClick={handleSortCapacity}>
                  <div id={RoomsAllCSS.tableHeader}>
                    <p>Capacity </p>
                    <p>
                      {sortOrderCapacity !== 'original' && (
                        <span>{sortOrderCapacity === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </p>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {getSortedRooms().map(room => (
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
