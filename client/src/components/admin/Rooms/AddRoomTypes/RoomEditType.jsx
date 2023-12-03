import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import EditTypeCSS from '../../../../styles/admin/roomsEditType.module.css';

const RoomTypeForm = () => {
  const [roomType, setRoomType] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/roomType/${id}`
        );
        setRoomType(response.data);
      } catch (err) {
        console.error('Error fetching room type', err);
      }
    };

    if (id) {
      fetchRoomType();
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    typeName: Yup.string().required('Type Name is required'),
    typeDescription: Yup.string().required('Type Description is required'),
  });

  const onSubmit = async values => {
    try {
      const response = await axios.put(
        `http://localhost:3001/roomType/${id}`,
        values,
        {headers: { accessToken: sessionStorage.getItem('accessToken') }},
      );
      console.log('Room Type Updated:', response.data);
      // Redirect or handle success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display error message or notification
    }
  };

  // If roomType is null (e.g., not fetched yet or creating new), set initialValues to empty
  const initialValues = roomType || {
    typeName: '',
    typeDescription: '',
  };

  return (
    <div>
      <NavBarDashboard />

      <div className={EditTypeCSS.editContainer}>
        <div className={EditTypeCSS.cardContainer}>
          <Card>
            <div className={EditTypeCSS.cardDetails}>
              <h1>{id ? `EDIT ROOM TYPE ${id}` : 'ADD NEW ROOM TYPE'}</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize>
                {formik => (
                  <Form>
                    <div className={EditTypeCSS.formEditDetails}>
                      <div className={EditTypeCSS.formEditRow}>
                        <div className={EditTypeCSS.formEditInput}>
                          <label htmlFor='typeName'>Type Name</label>
                          <Field
                            id='typeName'
                            name='typeName'
                            className={
                              formik.errors.typeName
                                ? EditTypeCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.typeName ? (
                            <div className={EditTypeCSS.error}>
                              {formik.errors.typeName}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className={EditTypeCSS.formEditInputDescription}>
                        <label htmlFor='typeDescription'>Description</label>
                        <Field
                          id='typeDescription'
                          name='typeDescription'
                          as='textarea'
                          className={
                            formik.errors.typeDescription
                              ? EditTypeCSS.errorInput
                              : ''
                          }
                        />
                        {formik.errors.typeDescription ? (
                          <div className={EditTypeCSS.error}>
                            {formik.errors.typeDescription}
                          </div>
                        ) : null}
                      </div>

                      <button type='submit' id={EditTypeCSS.formSaveButton}>
                        SAVE
                      </button>
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
