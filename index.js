const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/user-route')
const app = express()

// app.use(cors())
app.use(express.json())
app.use('/api', router)
mongoose
    .connect(`mongodb+srv://root:Password123@movies.jtgjdin.mongodb.net/`)
    .then(()=> {
        app.listen(8000)
        console.log("Database is running on port on 8000")
    }).catch((err)=>{
        console.error('Error connecting database', err)
    })