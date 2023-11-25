const express = require("express")
const router = express.Router()
const { requireAuth, authRole } = require('../middleware/authMiddleware');

const authController = require('../controllers/authController');

router.post("/login", authController.login)
router.post("/signup", authController.register)
router.get("/logout", authController.logout)

module.exports = router