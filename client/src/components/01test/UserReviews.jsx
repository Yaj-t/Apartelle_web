import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook if you're using React Router

const UserReviews = ({ userIdProp }) => {
  const [reviews, setReviews] = useState([]);
  const { userIdParam } = useParams(); // Get userId from URL parameters
  const userId = userIdProp || userIdParam; // Use prop or URL param
  
  useEffect(() => {
    if (userId) {
      fetchUserReviews(userId);
    }
  }, [userId]);

  const fetchUserReviews = async (userId) => {
    try {
      const response = await Axios.get(`http://localhost:3001/review/user/${userId}`);
      setReviews(response.data);
      console.log(response.data )
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      // Handle the error appropriately
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await Axios.delete(`http://localhost:3001/review/${reviewId}`);
      // Remove the review from the state to update the UI
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdate = (reviewId) => {
    // Redirect to update page or show update form
    // history.push(`/update-review/${reviewId}`);
  };

  return (
    <div>
      <h2>User Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>Message: {review.message}</p>
            <p>Is visible: {review.isVisible? 'True': 'False'}</p>
            <p>Created at: {review.createdAt}</p>
            <p>Room ID: {review.Booking.roomId}</p>
            <p>Last Updated at: {review.updatedAt}</p>
            <button onClick={() => handleUpdate(review.reviewId)}>Update</button>
            <button onClick={() => handleDelete(review.reviewId)}>Delete</button>
            {/* Add more review details as needed */}
          </div>
        ))
      ) : (
        <p>No reviews found for this user.</p>
      )}
    </div>
  );
};

export default UserReviews;
