import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import AllTypesCSS from '../../../../styles/admin/roomsAllTypesAdmin.module.css'

const RoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

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

    const handleDelete = async (roomTypeID) => {
        console.log('Delete Room Type:', roomTypeID);
        try {
            const url = `http://localhost:3001/roomType/${roomTypeID}`;
            const response = await axios.delete(url);
            setRoomTypes(prevRoomTypes => prevRoomTypes.filter(rt => rt.roomTypeID !== roomTypeID));
        } catch (error) {
            
        }
    };

    const handleEdit = (roomTypeID) => {
        console.log('Edit Room Type:', roomTypeID);
        // Add logic to navigate to the edit page or open an edit modal
    };

    return (
        <div>
            <NavBarDashboard />
            
            <div className={AllTypesCSS.tableContainer}>
                <h1>Room Types</h1>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Type Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Bed Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomTypes.map(roomType => (
                            <tr key={roomType.roomTypeID}>
                                <td>{roomType.typeName}</td>
                                <td>{roomType.typeDescription}</td>
                                <td>{roomType.price}</td>
                                <td>{roomType.capacity}</td>
                                <td>{roomType.bedCount}</td>
                                <td>
                                    <button onClick={() => handleEdit(roomType.roomTypeID)}>Edit</button>
                                    <button onClick={() => handleDelete(roomType.roomTypeID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomTypes;