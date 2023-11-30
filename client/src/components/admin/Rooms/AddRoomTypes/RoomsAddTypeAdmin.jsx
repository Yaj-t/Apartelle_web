import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import AddTypeCSS from '../../../../styles/admin/roomsAddTypeAdmin.module.css';

const RoomTypeForm = () => {
  const initialValues = {
    typeName: '',
    typeDescription: '',
    price: '',
    capacity: '',
    bedCount: ''
  };

  const validationSchema = Yup.object().shape({
    typeName: Yup.string().required('Type Name is required'),
    typeDescription: Yup.string().required('Type Description is required'),
    price: Yup.number().required('Price is required').positive(),
    capacity: Yup.number()
      .required('Capacity is required')
      .positive()
      .integer(),
    bedCount: Yup.number()
      .required('Bed count is required')
      .positive()
      .integer()
  });

  const onSubmit = async values => {
    console.log('submit');
    try {
      console.log('submit');
      const response = await axios.post(
        'http://localhost:3001/roomType',
        values
      );
      console.log('Room Type Added:', response.data);
      // Additional success handling (e.g., notification or redirect)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Error handling (e.g., displaying error message)
    }
  };

  return (
    <div>
      <NavBarDashboard />

      <div className={AddTypeCSS.addContainer}>
        <div className={AddTypeCSS.cardContainer}>
          <Card>
            <div className={AddTypeCSS.cardDetails}>
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

                        <div className={AddTypeCSS.formInput}>
                          <label htmlFor='price'>Price</label>
                          <Field
                            id='price'
                            name='price'
                            type='number'
                            className={
                              formik.errors.price ? AddTypeCSS.errorInput : ''
                            }
                          />
                          {formik.errors.price ? (
                            <div className={AddTypeCSS.error}>
                              {formik.errors.price}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className={AddTypeCSS.formRow}>
                        <div className={AddTypeCSS.formInput}>
                          <label htmlFor='capacity'>Capacity</label>
                          <Field
                            id='capacity'
                            name='capacity'
                            type='number'
                            className={
                              formik.errors.capacity
                                ? AddTypeCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.capacity ? (
                            <div className={AddTypeCSS.error}>
                              {formik.errors.capacity}
                            </div>
                          ) : null}
                        </div>

                        <div className={AddTypeCSS.formInput}>
                          <label htmlFor='bedCount'>Bed Count</label>
                          <Field
                            id='bedCount'
                            name='bedCount'
                            type='number'
                            className={
                              formik.errors.bedCount
                                ? AddTypeCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.bedCount ? (
                            <div className={AddTypeCSS.error}>
                              {formik.errors.bedCount}
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
