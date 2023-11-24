const express = require("express")
const router = express.Router()
const { requireAuth, authRole } = require('../middleware/authMiddleware');

const authController = require('../controllers/authController');

router.post("/login", requireAuth, authController.login)
router.post("/register", authController.register)
router.get("/logout", authController.logout)

module.exports = router