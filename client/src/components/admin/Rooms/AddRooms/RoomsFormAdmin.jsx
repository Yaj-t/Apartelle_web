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
                    roomTypeId: 0,
                    price: 0.00,
                    roomNumber: '',
                    capacity: 0,
                    description: '',
                  }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    console.log(values)
                    axios.post('http://localhost:3001/room', values,
                    {headers: { accessToken: sessionStorage.getItem('accessToken') }},
                    )
                      .then(() => {
                        // Handle successful submission
                        console.log('Room added successfully');
                        // Reset the form
                        formik.resetForm();
                      })
                      .catch((error) => {
                        console.error('Error adding room:', error);
                      });
                  }}
                  
                >
                  {(formik) => (
                    <Form>
                      <div className={RoomsFormCSS.arrange}>
                        <div className={RoomsFormCSS.formRoom}>
                          <div className={RoomsFormCSS.formInput}>
                            <label htmlFor='roomTypeId'>Room Type</label>
                            <Field as='select' name='roomTypeId'>
                              {roomTypes.map((roomType) => (
                                <option key={roomType.roomTypeID} value={roomType.roomTypeID}>
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

