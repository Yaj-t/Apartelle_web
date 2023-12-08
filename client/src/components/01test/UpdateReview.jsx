import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UpdateReviewSchema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
  rating: Yup.number().min(1).max(5).required("Rating is required"),
});

const UpdateReview = ({ reviewIdProp }) => {
    const [reviewData, setReviewData] = useState({ message: '', rating: 1 });
    const { reviewIdParam } = useParams();
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const reviewId = reviewIdProp || reviewIdParam;

  useEffect(() => {
    if (reviewId) {
      fetchReviewData(reviewId);
    }
  }, [reviewId]);

  const fetchReviewData = async (reviewId) => {
    try {
        console.log(reviewId)
      const response = await Axios.get(`http://localhost:3001/review/${reviewId}`);
      setReviewData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await Axios.put(`http://localhost:3001/review/${reviewId}`, values);
      navigate(`/user-reviews/${reviewData.Booking.userId}`); // Use navigate for redirection
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div>
      <h2>Update Review</h2>
      <Formik   
        initialValues={reviewData}
        validationSchema={UpdateReviewSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="message">Message</label>
          <Field name="message" as="textarea" />
          <ErrorMessage name="message" component="div" />

          <label htmlFor="rating">Rating</label>
          <Field name="rating" as="select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <ErrorMessage name="rating" component="div" />

          <button type="submit">Update Review</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateReview;
