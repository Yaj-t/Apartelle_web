  import React from 'react';
  import NavBarDashboard from '../../../NavBars/NavBarDashboard';
  import Card from '@mui/material/Card';
  import { Formik, Form, Field, FieldArray } from 'formik';
  import * as Yup from 'yup';
  import axios from 'axios';
  import RoomsFormCSS from '../../../../styles/admin/roomsFormAdmin.module.css';

  const schema = Yup.object().shape({
    roomTypeId: Yup.number().required('Room type is required'),
    price: Yup.number().required('Price is required'),
    roomNumber: Yup.string().required('Room number is required'),
    capacity: Yup.number().required('Capacity is required'),
    description: Yup.string().required('Room description is required'),
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


  function RoomsFormAdmin() {
    const [roomTypes, setRoomTypes] = React.useState([]);

    React.useEffect(() => {
      fetchRoomTypes().then((types) => setRoomTypes(types));
    }, []);

    const handleSubmit = async (values) => {
      console.log(values);
      axios.post('http://localhost:3001/room', values, {
          headers: { accessToken: sessionStorage.getItem('accessToken') },
      })
      .then((response) => {
          console.log('Room added successfully', response.data);
          //add code to Reset the form

          // Optionally, display a success message to the user or redirect
          alert('Room added successfully');
          // If you have a navigation mechanism, you might want to redirect the user
          // navigate('/success-page'); // Assuming you're using something like React Router
      })
      .catch((error) => {
          console.error('Error adding room:', error);
          // Display an error message to the user
          alert('Failed to add room. Please try again.');
          // If the error is specific and you want to display it:
          // alert(`Error: ${error.response.data.message}`);
      });
  }
  

    return (
      <div>
        <NavBarDashboard />
        <div className={RoomsFormCSS.formContainer}>
          <Card>
            <div className={RoomsFormCSS.cardDetails}>
              <div className={RoomsFormCSS.formHeader}>
                <h1>ADD ROOM</h1>
                <h3>fill up the form below to add a room</h3>
              </div>

              <div className={RoomsFormCSS.formDetails}>
                <Formik
                  initialValues={{
                    roomTypeId: '',
                    price: 0.00,
                    roomNumber: '',
                    capacity: 0,
                    description: '',
                  }}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                  
                >
                  {(formik) => (
                    <Form>
                      <div className={RoomsFormCSS.arrange}>
                        <div className={RoomsFormCSS.formRoom}>
                          <div className={RoomsFormCSS.formInput}>
                            <label htmlFor='roomTypeId'>Room Type</label>
                            <Field as='select' name='roomTypeId'>
                              <option value={-1}>Not Set</option>
                              {roomTypes.map((roomType) => (
                                <option key={roomType.roomTypeId} value={roomType.roomTypeId}>
                                  {roomType.typeName}
                                </option>
                              ))}
                            </Field>
                            {formik.errors.roomTypeId && (
                              <p className={RoomsFormCSS.error}>{formik.errors.roomTypeId}</p>
                            )}
                          </div>

                          <div className={RoomsFormCSS.formInput}>
                            <label htmlFor='price'>Price</label>
                            <Field type='number' name='price' />
                            {formik.errors.price && (
                              <p className={RoomsFormCSS.error}>{formik.errors.price}</p>
                            )}
                          </div>

                          <div className={RoomsFormCSS.formInput}>
                            <label htmlFor='roomNumber'>Room Number</label>
                            <Field type ='text' name='roomNumber' />
                            {formik.errors.roomNumber && (
                              <p className={RoomsFormCSS.error}>{formik.errors.roomNumber}</p>
                            )}
                          </div>
                        </div>

                        <div className={RoomsFormCSS.formRoom}>
                          <div className={RoomsFormCSS.formInput}>
                            <label htmlFor='capacity'>Capacity</label>
                            <Field type='number' name='capacity' />
                            {formik.errors.capacity && (
                              <p className={RoomsFormCSS.error}>{formik.errors.capacity}</p>
                            )}
                          </div>
                        </div>

                        <div className={RoomsFormCSS.formInputAbout}>
                          <label htmlFor='description'>Room Description</label>
                          <Field type='text' name='description' as='textarea' rows={5} cols={33} />
                          {formik.errors.description && (
                            <p className={RoomsFormCSS.error}>{formik.errors.description}</p>
                          )}
                          <input type='submit'/>
                          <button type='submit'  style={{ backgroundColor: 'white' }}/>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  export default RoomsFormAdmin;

