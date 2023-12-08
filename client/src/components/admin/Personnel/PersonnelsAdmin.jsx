import React, { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonnelsCSS from '../../../styles/admin/personnelsAdmin.module.css';
import axios from 'axios';

function PersonnelsAdmin() {
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/users', {
        headers: { accessToken: sessionStorage.getItem('accessToken') }
      });
      console.log('users:', response.data);
      setUsers(response.data.users);

      // Initialize selectedStatus based on the isActive field
      const initialSelectedStatus = {};
      response.data.users.forEach(user => {
        initialSelectedStatus[user.userId] = user.isActive
          ? 'active'
          : 'inactive';
        console.log(user.isActive);
      });
      setSelectedStatus(initialSelectedStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (userId, value) => {
    try {
      // Make a PUT request to update the active status
      await axios.put(
        `http://localhost:3001/user/profile/${userId}`,
        { isActive: value === 'active' },
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

  return (
    <div>
      <NavBarDashboard />

      <div className={PersonnelsCSS.personnelContainer}>
        <div className={PersonnelsCSS.contents}>
          <div className={PersonnelsCSS.filterContainer}>
            <form action='' method='' className={PersonnelsCSS.searchBar}>
              <input type='text' placeholder='Search...' />
            </form>
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
                {/* <th> </th> */}
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>
                    <input type='checkbox' id={PersonnelsCSS.checkbox} />
                  </td>
                  <td>{user.userType}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.contactNumber}</td>
                  <td>
                    {isValid(new Date(user.createdAt))
                      ? format(new Date(user.createdAt), 'MM/dd/yyyy HH:mm:ss')
                      : 'Invalid Date'}
                  </td>
                  <td>
                    <select
                      value={selectedStatus[user.userId]}
                      onChange={e =>
                        handleStatusChange(user.userId, e.target.value)
                      }>
                      <option value='active'>Active</option>
                      <option value='inactive'>Not Active</option>
                    </select>
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

export default PersonnelsAdmin;
