const mongoose = require('mongoose')

// Schema
const favouriteSchema = mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        require:true
    },
    imdbID:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'imdb',
        require:true
    },
    actors:{
        type:String,
    },
    director:{
        type:String,
    },
    writer:{
        type:String,
    },
    boxOffice:{
        type:String,
    },
    dvd:{
        type:String,
    },
    year:{
        type:String,
    },
    genre:{
        type:String,
    },
    language:{
        type:String,
    },
    plot:{
        type:String,
    },
    poster:{
        type:String,
    },
    title:{
        type:String,
    },
    rated:{
        type:String,
    },
    runtime:{
        type:String,
    },
    awards:{
        type:String,
    },
});

// Model
const favouriteModel  = mongoose.model('favourites',favouriteSchema);

module.exports = favouriteModel;