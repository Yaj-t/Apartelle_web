const express = require('express');
const router = express.Router();
const userAnalyticsRouter = require('./analytics/userAnalytics');
// const bookingAnalyticsRouter = require('./analytics/bookingAnalytics');
// Other analytics routers can be included here

router.use('/users', userAnalyticsRouter);
// router.use('/bookings', bookingAnalyticsRouter);
// Use other analytics routers here

module.exports = router;
