import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';

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
        capacity: Yup.number().required('capacity is required').positive().integer(),
        bedCount: Yup.number().required('Bed count is required').positive().integer(),
    });
    
    const onSubmit = async (values) => {
      console.log('submit')
      try {
          console.log('submit')
          const response = await axios.post('http://localhost:3001/roomType', values);
          console.log('Room Type Added:', response.data);
          // Additional success handling (e.g., notification or redirect) 
      } catch (error) {
          console.error('Error submitting form:', error);
          // Error handling (e.g., displaying error message)
      }
    };

    return (
        <div>
            <h1>Add Room Type</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {formik => (
                    <Form>
                        <label htmlFor="typeName">Type Name</label>
                        <Field id="typeName" name="typeName" />
                        <ErrorMessage name="typeName" component="div" />

                        <label htmlFor="typeDescription">Description</label>
                        <Field id="typeDescription" name="typeDescription" as="textarea" />
                        <ErrorMessage name="typeDescription" component="div" />

                        <label htmlFor="price">Price</label>
                        <Field id="price" name="price" type="number" />
                        <ErrorMessage name="price" component="div" />

                        <label htmlFor="capacity">Capacity</label>
                        <Field id="capacity" name="capacity" type="number" />
                        <ErrorMessage name="capacity" component="div" />

                        <label htmlFor="bedCount">Bed Count</label>
                        <Field id="bedCount" name="bedCount" type="number" />
                        <ErrorMessage name="bedCount" component="div" />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RoomTypeForm;
