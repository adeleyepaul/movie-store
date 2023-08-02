const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movie_name:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    cinema:{
        type:String,
    }
})

module.exports = mongoose.model("Movies", movieSchema)