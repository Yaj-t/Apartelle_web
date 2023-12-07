
# User Analytics API

This document outlines the Express.js routes for the user analytics in the application. Each route provides specific analytics data based on admin requirements.

## Routes

1. **Active Users**
   - **Endpoint:** `GET //analytics/active-users`
   - **Query Parameters:** `startDate`, `endDate`
   - **Functionality:** Calculates the number of active users within the specified time frame.

2. **User Growth**
   - **Endpoint:** `GET /api/analytics/user-growth`
   - **Query Parameters:** `startDate`, `endDate`
   - **Functionality:** Computes the growth in the number of new users over the specified time period.

<!-- 3. **Retention and Churn**
   - **Endpoint:** `GET /api/analytics/retention-churn`
   - **Functionality:** Estimates user retention and churn rates. -->

4. **Recent Users**
   - **Endpoint:** `GET /api/analytics/recent-users`
   - **Query Parameters:** `days`
   - **Functionality:** Identifies users who have recently joined or been active, based on the specified number of days.

5. **High Rating Users**
   - **Endpoint:** `GET /api/analytics/high-rating-users`
   - **Query Parameters:** `startDate`, `endDate`, `ratingThreshold`
   - **Functionality:** Segments users who frequently give high ratings in their reviews within the specified time frame and above the rating threshold.

6. **High Spending Users**
   - **Endpoint:** `GET /api/analytics/high-spending-users`
   - **Query Parameters:** `startDate`, `endDate`, `spendingThreshold`
   - **Functionality:** Identifies users who have spent above a certain amount in total bookings during the specified time frame.

7. **Frequent Cancelers**
   - **Endpoint:** `GET /api/analytics/frequent-cancelers`
   - **Query Parameters:** `startDate`, `endDate`, `cancellationThreshold`
   - **Functionality:** Segments users who have a high rate of booking cancellations within the given time period.

## Usage

To query these endpoints, an admin can send HTTP GET requests with the appropriate query parameters.

For example, to get the number of active users between two dates:
```
GET /api/analytics/active-users?startDate=2023-01-01&endDate=2023-01-31
```

## Security

Ensure that these routes are secured and accessible only by authorized personnel.

## Error Handling and Validation

Properly handle errors and validate query parameters to avoid issues such as invalid date formats.

## Optimization

Depending on the size of your user base and the complexity of queries, consider optimizing your database queries for performance.
