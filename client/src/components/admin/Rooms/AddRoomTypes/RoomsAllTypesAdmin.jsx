import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import AllTypesCSS from '../../../../styles/admin/roomsAllTypesAdmin.module.css';

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState(' '); // 'asc' for ascending, 'desc' for descending, 'original' for original order
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

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

  const handleSort = () => {
    // If sortOrder is 'asc', change it to 'desc'
    // If sortOrder is 'desc', change it to 'original' (no sorting)
    // If sortOrder is 'original', change it to 'asc'
    setSortOrder(prevSortOrder =>
      prevSortOrder === 'asc'
        ? 'desc'
        : prevSortOrder === 'desc'
        ? 'original'
        : 'asc'
    );
  };

  const getSortedRoomTypes = () => {
    let sortedRoomTypes = [...roomTypes];

    // Apply search filter
    if (searchQuery) {
      sortedRoomTypes = sortedRoomTypes.filter(roomType => {
        const searchableProperties = [
          roomType.typeName,
          roomType.typeDescription
        ];

        // Check if any of the properties includes the search query
        return searchableProperties
          .map(property => property.toLowerCase())
          .some(property => property.includes(searchQuery.toLowerCase()));
      });
    }

    //Apply Sorting
    if (sortOrder !== 'original') {
      sortedRoomTypes.sort((a, b) => {
        const compareValueA = a.typeName.toLowerCase();
        const compareValueB = b.typeName.toLowerCase();

        if (compareValueA < compareValueB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (compareValueA > compareValueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedRoomTypes;
  };

  const handleCheckboxChange = roomTypeId => {
    setSelectedRoomTypes(prevSelectedRoomTypes => {
      if (prevSelectedRoomTypes.includes(roomTypeId)) {
        // Remove room type from selection if already selected
        return prevSelectedRoomTypes.filter(id => id !== roomTypeId);
      } else {
        // Add room type to selection if not already selected
        return [...prevSelectedRoomTypes, roomTypeId];
      }
    });
  };

  const handleBatchDelete = async () => {
    try {
      const deletePromises = selectedRoomTypes.map(roomTypeId => {
        const url = `http://localhost:3001/roomType/${roomTypeId}`;
        return axios.delete(url, {
          headers: { accessToken: sessionStorage.getItem('accessToken') }
        });
      });

      await Promise.all(deletePromises);

      // Update the front-end state after successful deletion
      setRoomTypes(prevRoomTypes =>
        prevRoomTypes.filter(rt => !selectedRoomTypes.includes(rt.roomTypeId))
      );

      // Clear the selected room types after deletion
      setSelectedRoomTypes([]);
    } catch (error) {
      // Handle error appropriately
    }
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <NavBarDashboard />

      <div className={AllTypesCSS.tableContainer}>
        <div className={AllTypesCSS.tableHeaderContainer}>
          <div className={AllTypesCSS.tableHeader}>
            {error && <p>{error}</p>}
            <form action='' method='' className={AllTypesCSS.searchBar}>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearch}
              />
            </form>
          </div>

          <div className={AllTypesCSS.tableHeader}>
            <div className={AllTypesCSS.btnContainer}>
              <button
                id={AllTypesCSS.addRoomTypes}
                onClick={handleBatchDelete}
                disabled={selectedRoomTypes.length === 0}>
                Delete Room Types
              </button>

              <button
                id={AllTypesCSS.addRoomTypes}
                onClick={() => navigatePath('addRoomType')}>
                Add Room Types
              </button>
            </div>
          </div>
        </div>

        <div className={AllTypesCSS.roomTableContainer}>
          <table>
            <thead>
              <tr>
                <th>
                  <CheckBoxIcon fontSize='small' />
                </th>
                <th onClick={handleSort}>
                  <div id={AllTypesCSS.tableHeader}>
                    <p>Type Name </p>
                    <p>
                      {sortOrder !== 'original' && (
                        <span>
                          {sortOrder === 'asc'
                            ? '▲'
                            : sortOrder === 'desc'
                            ? '▼'
                            : ''}
                        </span>
                      )}
                    </p>
                  </div>
                </th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {getSortedRoomTypes().map(roomType => (
                <tr key={roomType.roomTypeId}>
                  <td>
                    <input
                      type='checkbox'
                      id={AllTypesCSS.checkbox}
                      checked={selectedRoomTypes.includes(roomType.roomTypeId)}
                      onChange={() => handleCheckboxChange(roomType.roomTypeId)}
                    />
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
