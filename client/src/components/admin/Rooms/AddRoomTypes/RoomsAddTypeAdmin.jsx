import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import AddTypeCSS from '../../../../styles/admin/roomsAddTypeAdmin.module.css';
import { useNavigate } from 'react-router-dom';

const RoomTypeForm = () => {
  const navigate = useNavigate();

  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState(false);

  const initialValues = {
    typeName: '',
    typeDescription: ''
  };

  const validationSchema = Yup.object().shape({
    typeName: Yup.string().required('Type Name is required'),
    typeDescription: Yup.string().required('Type Description is required')
  });

  const onSubmit = async values => {
    console.log('submit');
    try {
      console.log('submit');
      const response = await axios.post(
        'http://localhost:3001/roomType',
        values,
        { headers: { accessToken: sessionStorage.getItem('accessToken') } }
      );
      console.log('Room Type Added:', response.data);
      // Additional success handling (e.g., notification or redirect)

      setAddSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Error handling (e.g., displaying error message)

      setAddError(true);
    }
  };

  const handleSuccessfulAlertClose = () => {
    //close the alert component
    setAddSuccess(false);

    // Navigate to another module
    let url = '/admin/rooms';
    console.log(url);
    navigate(url);
  };

  return (
    <div>
      <NavBarDashboard />

      <div className={AddTypeCSS.addContainer}>
        <div className={AddTypeCSS.cardContainer}>
          <Card>
            <div className={AddTypeCSS.cardDetails}>
              {/* Conditionally render the Alert component */}
              {addSuccess && (
                <Alert severity='success' onClose={handleSuccessfulAlertClose}>
                  <AlertTitle>
                    <strong>Room type added successfully</strong>
                  </AlertTitle>
                </Alert>
              )}

              {addError && (
                <Alert severity='error' onClose={() => setAddError(false)}>
                  <AlertTitle>
                    <strong>Failed to add room type. Please try again.</strong>
                  </AlertTitle>
                </Alert>
              )}

              <h1>ADD ROOM TYPE</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {formik => (
                  <Form>
                    <div className={AddTypeCSS.formDetails}>
                      <div className={AddTypeCSS.formRow}>
                        <div className={AddTypeCSS.formInput}>
                          <label htmlFor='typeName'>Type Name</label>
                          <Field
                            id='typeName'
                            name='typeName'
                            className={
                              formik.errors.typeName
                                ? AddTypeCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.typeName ? (
                            <div className={AddTypeCSS.error}>
                              {formik.errors.typeName}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className={AddTypeCSS.formInputDescription}>
                        <label htmlFor='typeDescription'>Description</label>
                        <Field
                          id='typeDescription'
                          name='typeDescription'
                          as='textarea'
                          className={
                            formik.errors.typeDescription
                              ? AddTypeCSS.errorInput
                              : ''
                          }
                        />
                        {formik.errors.typeDescription ? (
                          <div className={AddTypeCSS.error}>
                            {formik.errors.typeDescription}
                          </div>
                        ) : null}
                      </div>

                      <div className={AddTypeCSS.formButtonContainer}>
                        <button type='submit' id={AddTypeCSS.formButton}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeForm;
