const express = require("express")
const router = express.Router()
const { User } = require("../models")

const authController = require('../controllers/authController');

router.post("/login", authController.login)
router.post("/register", authController.register)
router.get("/logout", authController.logout)

module.exports = router