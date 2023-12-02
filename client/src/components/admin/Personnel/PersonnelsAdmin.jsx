import React from 'react';
import { Link } from 'react-router-dom';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonnelsCSS from '../../../styles/admin/personnelsAdmin.module.css';

function PersonnelsAdmin() {
  return (
    <div>
      <NavBarDashboard />

      <div className={PersonnelsCSS.personnelContainer}>
        <div className={PersonnelsCSS.contents}>
          <div className={PersonnelsCSS.filterContainer}>
            <form action='' method='' className={PersonnelsCSS.searchBar}>
              <input type='text' placeholder='Search...' />
              <button className={PersonnelsCSS.searchBtn}>
                <SearchIcon fontSize='small' />
              </button>
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
                <th> Name </th>
                <th> Type </th>
                <th> Date Created </th>
                <th> Last Login </th>
                <th> Status </th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <CheckBoxOutlineBlankIcon fontSize='very small' />
                </td>
                <td>
                  <Link to='/admin/personnel/personnelDetails'>
                    Macel Galanido
                  </Link>
                </td>
                <td> Admin </td>
                <td> 11/13/2023 </td>
                <td> 11/23/2023 7:08 AM </td>
                <td> Active </td>
                <td>
                  <MoreHorizIcon fontSize='small' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonnelsAdmin;
