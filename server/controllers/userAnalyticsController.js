// Example implementation
// You'll need to adjust these based on your actual database schema and logic

const { User, Booking } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

exports.calculateActiveUsers = async (startDate, endDate) => {
    // Validate or set default dates
    const start = startDate ? moment(startDate) : moment().subtract(1, 'months');
    const end = endDate ? moment(endDate) : moment();

    const conditions = {
        updatedAt: {
            [Op.gte]: start.startOf('day').toDate(),
            [Op.lte]: end.endOf('day').toDate()
        }
    };

    const activeUsers = await User.count({ where: conditions });
    return { activeUsers };
};

exports.calculateUserGrowth = async (startDate, endDate) => {
    const start = startDate ? moment(startDate) : moment().subtract(1, 'months');
    const end = endDate ? moment(endDate) : moment();

    const newUsers = await User.count({
        where: {
            createdAt: {
                [Op.gte]: start.startOf('day').toDate(),
                [Op.lte]: end.endOf('day').toDate()
            }
        }
    });

    return { newUsers };
};


exports.calculateRetentionAndChurn = async () => {
    // Implement the logic for calculating retention and churn
    // This is more complex and requires tracking user logins or actions over time
    // You'll likely need to maintain a separate log or record of user activity

    // Simplified example: Calculate retention as users active in the last two months
    // and churn as users not active in the last month but active the month before.

    // ...logic to calculate retention and churn...

    return { retentionRate, churnRate };
};

exports.segmentRecentUsers = async (days) => {
    // Implement the logic for recent users segmentation
    const recentDuration = days; // days
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - recentDuration);

    const recentUsers = await User.findAll({
        where: {
            createdAt: {
                [Op.gte]: recentDate
            }
        }
    });

    return recentUsers;
};

exports.segmentHighRatingUsers = async () => {
    // Implement the logic for high-rating users segmentation
    const highRatingThreshold = 4; // Assuming a rating scale of 1-5

    const highRatingUsers = await User.findAll({
        include: [{
            model: Review,
            where: {
                rating: {
                    [Op.gte]: highRatingThreshold
                }
            },
            required: true
        }],
        group: ['User.userId']
    });

    return highRatingUsers;
};

exports.segmentHighSpendingUsers = async () => {
    // Implement the logic for high-spending users segmentation
    const spendingThreshold = 1000; // Example threshold in your currency

    const highSpendingUsers = await User.findAll({
        include: [{
            model: Booking,
            attributes: [],
            where: {
                amount: {
                    [Op.gte]: spendingThreshold
                }
            },
            required: true
        }],
        group: ['User.userId'],
        having: Sequelize.literal(`SUM(Booking.amount) >= ${spendingThreshold}`)
    });

    return highSpendingUsers;
};

exports.segmentFrequentCancelers = async () => {
    // Implement the logic for frequent cancelers segmentation
    const cancellationThreshold = 3; // Number of cancellations to qualify

    const frequentCancelers = await User.findAll({
        include: [{
            model: Booking,
            where: {
                isCancelled: true
            },
            required: true
        }],
        group: ['User.userId'],
        having: Sequelize.literal(`COUNT(Booking.id) >= ${cancellationThreshold}`)
    });

    return frequentCancelers;
};

exports.segmentHighRatingUsers = async (startDate, endDate, ratingThreshold = 4) => {
    const start = startDate ? moment(startDate) : moment().subtract(1, 'years');
    const end = endDate ? moment(endDate) : moment();

    const highRatingUsers = await User.findAll({
        include: [{
            model: Review,
            where: {
                rating: {
                    [Op.gte]: ratingThreshold
                },
                reviewDate: {
                    [Op.gte]: start.startOf('day').toDate(),
                    [Op.lte]: end.endOf('day').toDate()
                }
            },
            required: true
        }],
        group: ['User.userId']
    });

    return highRatingUsers;
};

exports.segmentHighSpendingUsers = async (startDate, endDate, spendingThreshold = 1000) => {
    const start = startDate ? moment(startDate) : moment().subtract(1, 'years');
    const end = endDate ? moment(endDate) : moment();

    const highSpendingUsers = await User.findAll({
        include: [{
            model: Booking,
            attributes: [],
            where: {
                amount: {
                    [Op.gte]: spendingThreshold
                },
                dateStart: {
                    [Op.gte]: start.startOf('day').toDate(),
                    [Op.lte]: end.endOf('day').toDate()
                }
            },
            required: true
        }],
        group: ['User.userId'],
        having: Sequelize.literal(`SUM(Booking.amount) >= ${spendingThreshold}`)
    });

    return highSpendingUsers;
};

exports.segmentFrequentCancelers = async (startDate, endDate, cancellationThreshold = 3) => {
    const start = startDate ? moment(startDate) : moment().subtract(1, 'years');
    const end = endDate ? moment(endDate) : moment();

    const frequentCancelers = await User.findAll({
        include: [{
            model: Booking,
            where: {
                isCancelled: true,
                dateStart: {
                    [Op.gte]: start.startOf('day').toDate(),
                    [Op.lte]: end.endOf('day').toDate()
                }
            },
            required: true
        }],
        group: ['User.userId'],
        having: Sequelize.literal(`COUNT(Booking.id) >= ${cancellationThreshold}`)
    });

    return frequentCancelers;
};