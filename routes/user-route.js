const express = require('express')
const { saveMovie, updateMovie } = require('../controller/test')
const { signUp, signIn, auth } = require('../controller/user')
const { authMiddleware } = require('../controller/authMiddleware')
// const { test } = require('../controller/test')

const router = express.Router()

// router.post("/test", test)
router.post("/add-movie", saveMovie)
router.put("/updateMovie", updateMovie)
router.post("/signup", signUp)
router.get("/signIn", signIn)
router.get("/index", authMiddleware, auth)

module.exports = router