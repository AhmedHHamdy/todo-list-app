const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const { ensureGuest } = require('../middleware/auth')

// routes

router.get('/', ensureGuest, homeController.getIndex)
router.get('/public/assets/listify.png', ensureGuest, homeController.getImage)
router.get('/login', ensureGuest, authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/signup', ensureGuest, authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/logout', authController.logout)

module.exports = router