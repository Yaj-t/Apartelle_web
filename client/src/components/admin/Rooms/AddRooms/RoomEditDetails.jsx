import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RoomsDetailsCSS from '../../../../styles/admin/roomsEditDetailsAdmin.module.css';
import { Card, Alert, AlertTitle } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const schema = Yup.object().shape({
  roomTypeId: Yup.number().required('Room type is required'),
  price: Yup.number().required('Price is required'),
  roomNumber: Yup.string().required('Room number is required'),
  capacity: Yup.number().required('Capacity is required'),
  description: Yup.string().required('Room description is required')
});

const fetchRoomTypes = async () => {
  try {
    const response = await axios.get('http://localhost:3001/roomType/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching room types:', error);
    // Handle the error appropriately
  }
};

const RoomsEditDetailsAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
 
  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/room/${id}`);
        // console.log(response.data);
        setRoom(response.data);
      } catch (err) {
        console.error('Error fetching room type', err);
      }
    };

    if (id) {
      fetchRoom();
    }
    console.log(room);
  }, [id]);
  useEffect(() => {
    fetchRoomTypes().then(types => setRoomTypes(types));
  }, []);

  // useEffect(() => {
  //   console.log(room);
  // }, [room])

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      await axios.put(`http://localhost:3001/room/${id}`, values, {
        headers: { accessToken: sessionStorage.getItem('accessToken') }
      });
      console.log('Room added successfully');
      setAddSuccess(true);
    } catch (error) {
      console.error('Error adding room:', error);
      setAddError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessfulAlertClose = () => {
    setAddSuccess(false);
    let url = '/admin/rooms';
    console.log(url);
    navigate(url);
  };

  
  return (
    <div>
      <NavBarDashboard />

      <div
        id={RoomsDetailsCSS.backRooms}
        onClick={() => navigate('/admin/rooms/showAllRooms')}>
        <ArrowBackIosNewIcon fontSize='small' />
        Back to Rooms
      </div>
      {room && (
        <div className={RoomsDetailsCSS.formContainer}>
        <Card>
          <div className={RoomsDetailsCSS.cardDetails}>
            {addSuccess && (
              <Alert severity='success' onClose={handleSuccessfulAlertClose}>
                <AlertTitle>
                  <strong>Room added successfully</strong>
                </AlertTitle>
              </Alert>
            )}

            {addError && (
              <Alert severity='error' onClose={() => setAddError(false)}>
                <AlertTitle>
                  <strong>Failed to add room. Please try again.</strong>
                </AlertTitle>
              </Alert>
            )}

            <div className={RoomsDetailsCSS.formHeader}>
              <h1>ADD ROOM</h1>
              <h3>Fill up the form below to add a room</h3>
            </div>

            <div className={RoomsDetailsCSS.formDetails}>
              <Formik
                initialValues={{
                  roomTypeId: room?.roomTypeId || -1,
                  price: room?.price || '',
                  roomNumber: room?.roomNumber || '',
                  capacity: room?.capacity || '',
                  description: room?.description || ''
                }}
                validationSchema={schema}
                onSubmit={handleSubmit}>
                {formik => (
                  <Form>
                    <div className={RoomsDetailsCSS.arrange}>
                      <div className={RoomsDetailsCSS.formRoom}>
                        <div className={RoomsDetailsCSS.formInputContainer}>
                          <div className={RoomsDetailsCSS.formInput}>
                            <label htmlFor='roomTypeId'>Room Type</label>
                            <Field as='select' name='roomTypeId'>
                              <option value={-1}>Not Set</option>
                              {roomTypes.map(roomType => (
                                <option
                                  key={roomType.roomTypeId}
                                  value={roomType.roomTypeId}>
                                  {roomType.typeName}
                                </option>
                              ))}
                            </Field>
                            {formik.errors.roomTypeId && (
                              <p className={RoomsDetailsCSS.error}>
                                {formik.errors.roomTypeId}
                              </p>
                            )}
                          </div>

                          <div className={RoomsDetailsCSS.formInput}>
                            <label htmlFor='roomNumber'>Room Number</label>
                            <Field type='text' name='roomNumber' />
                            {formik.errors.roomNumber && (
                              <p className={RoomsDetailsCSS.error}>
                                {formik.errors.roomNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className={RoomsDetailsCSS.formInputContainer}>
                          <div className={RoomsDetailsCSS.formInput}>
                            <label htmlFor='capacity'>Capacity</label>
                            <Field
                              type='number'
                              name='capacity'
                              placeholder='0'
                              maxLength='2'
                            />
                            {formik.errors.capacity && (
                              <p className={RoomsDetailsCSS.error}>
                                {formik.errors.capacity}
                              </p>
                            )}
                          </div>

                          <div className={RoomsDetailsCSS.formInput}>
                            <label htmlFor='price'>Price</label>
                            <Field
                              type='number'
                              name='price'
                              placeholder='0'
                              maxLength='2'
                            />
                            {formik.errors.price && (
                              <p className={RoomsDetailsCSS.error}>
                                {formik.errors.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={RoomsDetailsCSS.formInputAbout}>
                        <label htmlFor='description'>Room Description</label>
                        <Field
                          type='text'
                          name='description'
                          as='textarea'
                          rows={5}
                          cols={33}
                        />
                        {formik.errors.description && (
                          <p className={RoomsDetailsCSS.error}>
                            {formik.errors.description}
                          </p>
                        )}
                      </div>
                      <div id={RoomsDetailsCSS.formBtn}>
                        <input type='submit' value='SUBMIT' />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </div>
      )}
      
    </div>
  );
};

export default RoomsEditDetailsAdmin;
