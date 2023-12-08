import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

const ReviewForm = ({ bookingIdProp }) => {
  const { bookingIdParam } = useParams(); // Get bookingId from URL parameters
  const [reviewData, setReviewData] = useState({
    bookingId: '',
    message: '',
    rating: 1,
  });

  useEffect(() => {
    // Set bookingId from props or URL parameters
    setReviewData((prevData) => ({
      ...prevData,
      bookingId: bookingIdProp || bookingIdParam,
    }));
  }, [bookingIdProp, bookingIdParam]);

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(reviewData)
      const response = await Axios.post('http://localhost:3001/review/', reviewData);
      console.log('Review submitted:', response.data);
      // Handle the response or redirect the user
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <textarea name="message" value={reviewData.message} onChange={handleChange} required />
      </label>

      <label>
        Rating:
        <select name="rating" value={reviewData.rating} onChange={handleChange} required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
