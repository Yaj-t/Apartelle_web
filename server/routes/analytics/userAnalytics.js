const express = require('express');
const router = express.Router();
const {
    calculateActiveUsers,
    calculateUserGrowth,
    calculateRetentionAndChurn,
    segmentRecentUsers,
    segmentHighRatingUsers,
    segmentHighSpendingUsers,
    segmentFrequentCancelers
} = require('../../controllers/userAnalyticsController');

// Route for Active Users
router.get('/active-users', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const data = await calculateActiveUsers(startDate, endDate);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for User Growth
router.get('/user-growth', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const data = await calculateUserGrowth(startDate, endDate);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for Retention and Churn
// router.get('/retention-churn', async (req, res) => {
//     try {
//         const data = await calculateRetentionAndChurn(); // Modify as needed to accept parameters
//         res.json(data);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// Route for Recent Users
router.get('/recent-users', async (req, res) => {
    const { days } = req.query;
    try {
        const data = await segmentRecentUsers(days);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for High Rating Users
router.get('/high-rating-users', async (req, res) => {
    const { startDate, endDate, ratingThreshold } = req.query;
    try {
        const data = await segmentHighRatingUsers(startDate, endDate, ratingThreshold);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for High Spending Users
router.get('/high-spending-users', async (req, res) => {
    const { startDate, endDate, spendingThreshold } = req.query;
    try {
        const data = await segmentHighSpendingUsers(startDate, endDate, spendingThreshold);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for Frequent Cancelers
router.get('/frequent-cancelers', async (req, res) => {
    const { startDate, endDate, cancellationThreshold } = req.query;
    try {
        const data = await segmentFrequentCancelers(startDate, endDate, cancellationThreshold);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
