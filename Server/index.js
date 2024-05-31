const express = require('express')
const mongoose = require('mongoose')
const bcrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')


// Importing Models 
const userModel = require('./models/userModel')
const verifyToken = require('./verifyToken')
const favouriteModel = require('./models/favouriteModel')

// To hide private Keys and urls
const dotEnv = require("dotenv");
dotEnv.config({path:"./config.env"});
const mongoUrl = process.env.mongoUrl;
const apiKey = process.env.apiKey;


// connection 
const connectToDatabase = async()=>{
    try {
        let connection = await mongoose.connect(mongoUrl);
        console.log("Successfully connected to DB");
    } catch (err) {
        console.error(err);
    }
}


connectToDatabase()

const app = express()


// Middleware
app.use(express.json())
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// endpoint for user registration
app.post('/register',(req,res)=>{
    let user = req.body;

    bcrpt.genSalt(10,(err,salt)=>{

        if(!err){
            bcrpt.hash(user.password,salt,async (err,hpass)=>{

                if(!err){  
                    user.password = hpass;
                    try{
                        let doc = await userModel.create(user)
                        res.status(201).send({message:"User Registered"})
                    }

                    catch(err){
                        console.log(err);
                        res.status(500).send({message:"Some Problem"})
                    }
                }
                else{
                    res.send({message:"Error while Hashing"})
                }
            })
        }
        else{
            res.send({message:"Error while generating Salt"})
        }
    })
})


// endpoint for login 
app.post('/login',async (req,res)=>{
    let userCred = req.body;

    try{
        const user = await userModel.findOne({ email: userCred.email });

        if(user!=null){
            bcrpt.compare(userCred.password,user.password, (err,success)=>{
                if(success==true){
                    
                    const secretKey = process.env.secretKey;
                    jwt.sign({email:userCred.email},secretKey,(err,token)=>{
                        
                        if(!err){
                            res.send({message:"Login Success",token:token,userid:user._id,name:user.name});

                        }
                        else{
                            res.send({message:"Invalid Token"})
                        }
                    })
                }
                else{
                    res.status(403).send({message:"Incorrect password"})
                }  
            })
        }
        else{
            res.status(404).send({message:"User not found"})
        }
    }

    
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some Problem while login"})
    }
    
})

// endpoint to get moives by name
app.get("/api/:word",verifyToken,async (req,res)=>{
    let word = req.params.word;
    const url = `https://www.omdbapi.com/?s=${word}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        res.send(responseData);
    }
    catch (error) {
        console.error("Failed to fetch movies:", error);
        res.status(500).send("Error fetching movie data");
    }
})

// endpoint to get moives by imdbID
app.get("/single/:id",verifyToken,async (req,res)=>{
    let id = req.params.id;
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        res.send(responseData);
    }
    catch (error) {
        console.error("Failed to fetch movies:", error);
        res.status(500).send("Error fetching movie data");
    }
})


// endpoint to track a movie
app.post("/track",verifyToken,async (req,res)=>{
    let favData = req.body;
    try{
        let data = await favouriteModel.create(favData);
        console.log(data)
        res.status(201).send({message:"Movie Added"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error while tracking"})
    }
})


// endpoint to fetch all fav movies
app.get("/track/:userId",verifyToken,async (req,res)=>{
    let user = req.params.userId;

    try{
        let movies = await favouriteModel.find({userId:user}).populate('userId').populate('foodId')
        res.send(movies);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error while tracking user data"})
    }
})

app.listen(3000,()=>{
    console.log("Connection Established")
})

app.get('/',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
})

module.exports = app;
