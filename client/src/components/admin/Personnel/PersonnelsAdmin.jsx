import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isValid } from 'date-fns';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonnelsCSS from '../../../styles/admin/personnelsAdmin.module.css';
import axios from 'axios';

function PersonnelsAdmin() {
  const [users, setUsers] = useState([]);

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
    } catch (err) {
      console.error(err);
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
                <th> Last Login </th>
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
                  <td> Last Login</td>
                  <td>{user.isActive ? 'Active' : 'Not Active'}</td>
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
