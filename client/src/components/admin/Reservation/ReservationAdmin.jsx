import React from 'react';
import { Link } from 'react-router-dom';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReserveCSS from '../../../styles/admin/reservationAdmin.module.css';

function ReservationAdmin() {
  return (
    <div>
      <div className={ReserveCSS.reservationContainer}>
        <NavBarDashboard />
        <div className={ReserveCSS.contents}>
          <div className={ReserveCSS.filterContainer}>
            <form action='' method='' className={ReserveCSS.searchBar}>
              <input type='text' placeholder='Search...' />
              <button className={ReserveCSS.searchBtn}>
                <SearchIcon fontSize='small' />
              </button>
            </form>

            <button id={ReserveCSS.dateFilter}>
              Nov 10 - Nov 13
              <DateRangeIcon />
            </button>
          </div>

          <div className={ReserveCSS.reservationTable}>
            <table>
              <thead>
                <tr>
                  <th>
                    <CheckBoxIcon fontSize='small' />
                  </th>
                  <th> Room </th>
                  <th> Room No. </th>
                  <th> Guest Name </th>
                  <th> No. of Guest </th>
                  <th> Reservation Date </th>
                  <th> Status </th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {/* <CheckBoxOutlineBlankIcon fontSize='very small' /> */}
                    <input type="checkbox" id={ReserveCSS.checkbox}/>
                  </td>
                  <td>
                    <Link to='/admin/reservation/details'>Standard Room</Link>
                  </td>
                  <td> 4 </td>
                  <td> Marc Nelson Ochavo </td>
                  <td> 3 children - 2 adults </td>
                  <th> October 10 </th>
                  <td> Not Checked-In </td>
                  <td>
                    <MoreHorizIcon fontSize='small' />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationAdmin;
