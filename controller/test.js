// const mongoose = require("mongoose")
const movieTable = require("../model/movieTable")

const saveMovie = async(req,res) =>{
    const {movie_name, genre, cinema} = req.body;
    let existingMovie;
    try{
        existingMovie = await movieTable.findOne({movie_name: movie_name});
    }catch(err){
        console.log(err)
    }
    if(existingMovie){
        return res.status(400).json({message: "Movie already exists"})
    }

    const Movie = new movieTable({
        movie_name,
        genre,
        cinema
    });

    try{
        await Movie.save();
        return res.status(200).json({ message: "Movie saved successfully"})
    }catch(err){
        console.log(err)
    }
}

const updateMovie = async(req,res) => {
    const { movie_name, genre, cinema} = req.body;

    try{
        const updatedMovie = await movieTable.findByIdAndUpdate(
            id, 
            {movie_name, genre, cinema},
            {new: true}
        );
        if(!updatedMovie){
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json({message: "Movie Updated Successfully", movie:updatedMovie})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    saveMovie,
    updateMovie 
}