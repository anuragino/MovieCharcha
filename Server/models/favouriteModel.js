const mongoose = require('mongoose')

// Schema
const favouriteSchema = mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        require:true
    },
    imdbID:{
        type : String,
        require:true
    },
    year:{
        type:String,
    },
    poster:{
        type:String,
    },
    title:{
        type:String,
    },
});

// Model
const favouriteModel  = mongoose.model('favourites',favouriteSchema);

module.exports = favouriteModel;