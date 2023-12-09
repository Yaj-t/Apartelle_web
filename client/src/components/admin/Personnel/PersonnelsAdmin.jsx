import React, { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonnelsCSS from '../../../styles/admin/personnelsAdmin.module.css';
import axios from 'axios';

function PersonnelsAdmin() {
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedUsersForDeletion, setSelectedUsersForDeletion] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/users', {
        headers: { accessToken: sessionStorage.getItem('accessToken') },
        params: { search: searchQuery } // Pass the search query as a parameter
      });

      setUsers(response.data.users);

      // Initialize selectedStatus based on the isActive field
      const initialSelectedStatus = {};
      response.data.users.forEach(user => {
        initialSelectedStatus[user.userId] = user.isActive ? '1' : '0';
      });
      setSelectedStatus(initialSelectedStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (userId, value) => {
    console.log('Request Payload:', { isActive: value });
    console.log(userId);

    try {
      // Make a PUT request to update the active status
      await axios.put(
        `http://localhost:3001/user/profile/${userId}`,
        { isActive: value },
        {
          headers: {
            accessToken: sessionStorage.getItem('accessToken')
          }
        }
      );

      // Update the local state with the new active status
      setSelectedStatus(prevStatus => ({
        ...prevStatus,
        [userId]: value
      }));
    } catch (error) {
      console.error(error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const handleCheckboxChange = userId => {
    setSelectedUsersForDeletion(prevSelectedUsers => {
      const updatedSelectedUsers = prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter(id => id !== userId)
        : [...prevSelectedUsers, userId];
      return updatedSelectedUsers;
    });
  };

  const handleBatchDelete = async () => {
    try {
      const deletePromises = selectedUsersForDeletion.map(userId => {
        const url = `http://localhost:3001/user/profile/${userId}`;
        return axios.delete(url, {
          headers: { accessToken: sessionStorage.getItem('accessToken') }
        });
      });

      await Promise.all(deletePromises);

      // Update the front-end state after successful deletion
      setUsers(prevUsers =>
        prevUsers.filter(
          user => !selectedUsersForDeletion.includes(user.userId)
        )
      );

      // Clear the selected users after deletion
      setSelectedUsersForDeletion([]);
    } catch (error) {
      // Handle error appropriately
    }
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <NavBarDashboard />

      <div className={PersonnelsCSS.personnelContainer}>
        <div className={PersonnelsCSS.contents}>
          <div className={PersonnelsCSS.filterContainer}>
            <form action='' method='' className={PersonnelsCSS.searchBar}>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          <div>
            <button id={PersonnelsCSS.deleteUser} onClick={handleBatchDelete}>
              Delete Rooms
            </button>
          </div>
        </div>

        <div className={PersonnelsCSS.personnelTable}>
          <table>
            <thead>
              <tr>
                <th>
                  <CheckBoxIcon fontSize='small' />
                </th>
                <th> Type </th>
                <th> Name </th>
                <th> Email </th>
                <th> Contact Number </th>
                <th> Date Created </th>
                <th> Status </th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter(
                  user =>
                    user.userType !== 'ADMIN' &&
                    (user.firstName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                      user.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      user.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      user.contactNumber.includes(searchQuery) ||
                      (isValid(new Date(user.createdAt)) &&
                        format(new Date(user.createdAt), 'MM/dd/yyyy HH:mm:ss')
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())))
                )
                .map(
                  user =>
                    // Check if the user type is not ADMIN before rendering the row
                    user.userType !== 'ADMIN' && (
                      <tr key={user.userId}>
                        <td>
                          <input
                            type='checkbox'
                            id={PersonnelsCSS.checkbox}
                            checked={selectedUsersForDeletion.includes(
                              user.userId
                            )}
                            onChange={() => handleCheckboxChange(user.userId)}
                          />
                        </td>
                        <td>{user.userType}</td>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.contactNumber}</td>
                        <td>
                          {isValid(new Date(user.createdAt))
                            ? format(
                                new Date(user.createdAt),
                                'MM/dd/yyyy HH:mm:ss'
                              )
                            : 'Invalid Date'}
                        </td>
                        <td>
                          <select
                            value={selectedStatus[user.userId]}
                            onChange={e =>
                              handleStatusChange(user.userId, e.target.value)
                            }
                            id={
                              selectedStatus[user.userId] === '1'
                                ? PersonnelsCSS.active
                                : PersonnelsCSS.notActive
                            }>
                            <option value='1' id={PersonnelsCSS.options}>
                              Active
                            </option>
                            <option value='0' id={PersonnelsCSS.options}>
                              Not Active
                            </option>
                          </select>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonnelsAdmin;
