const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Importing Models 
const userModel = require('./models/userModel');
const verifyToken = require('./verifyToken');
const favouriteModel = require('./models/favouriteModel');

// To hide private Keys and urls
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });
const mongoUrl = process.env.mongoUrl;
const apiKey = process.env.apiKey;

// connection 
const connectToDatabase = async () => {
    try {
        let connection = await mongoose.connect(mongoUrl);
        console.log("Successfully connected to DB");
    } catch (err) {
        console.error(err);
    }
};

connectToDatabase();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // CORS middleware

// endpoint for user registration
app.post('/register', (req, res) => {
    let user = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, async (err, hpass) => {
                if (!err) {
                    user.password = hpass;
                    try {
                        let doc = await userModel.create(user);
                        res.status(201).send({ message: "User Registered" });
                    } catch (err) {
                        console.log(err);
                        res.status(500).send({ message: "Some Problem" });
                    }
                } else {
                    res.send({ message: "Error while Hashing" });
                }
            });
        } else {
            res.send({ message: "Error while generating Salt" });
        }
    });
});

// endpoint for login 
app.post('/login', async (req, res) => {
    let userCred = req.body;

    try {
        const user = await userModel.findOne({ email: userCred.email });

        if (user != null) {
            bcrypt.compare(userCred.password, user.password, (err, success) => {
                if (success == true) {
                    const secretKey = process.env.secretKey;
                    jwt.sign({ email: userCred.email }, secretKey, (err, token) => {
                        if (!err) {
                            res.send({ message: "Login Success", token: token, userid: user._id, name: user.name });
                        } else {
                            res.send({ message: "Invalid Token" });
                        }
                    });
                } else {
                    res.status(403).send({ message: "Incorrect password" });
                }
            });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Some Problem while login" });
    }
});

// endpoint to get movies by name
app.get("/api/:word", verifyToken, async (req, res) => {
    let word = req.params.word;
    const url = `https://www.omdbapi.com/?s=${word}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const responseData = await response.json();
        res.send(responseData);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        res.status(500).send("Error fetching movie data");
    }
});

// endpoint to get movies by imdbID
app.get("/single/:id", verifyToken, async (req, res) => {
    let id = req.params.id;
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const responseData = await response.json();
        res.send(responseData);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        res.status(500).send("Error fetching movie data");
    }
});

// endpoint to track a movie
app.post("/favourite", verifyToken, async (req, res) => {
    let favData = req.body;
    try {
        let data = await favouriteModel.create(favData);
        console.log(data);
        res.status(201).send({ message: "Movie Added" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error while tracking" });
    }
});

// endpoint to remove from favourite
app.delete("/favourite/:userId/:imdbID", verifyToken, async (req, res) => {
    const { imdbID } = req.params;
    let user = req.params.userId;

    try {
        const result = await favouriteModel.findOneAndDelete({ imdbID: imdbID, userId: user });
        if (!result) {
            return res.status(404).send({ message: "Movie not found in favorites" });
        }
        res.status(200).send({ message: "Movie removed from favorites" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error while removing movie from favorites" });
    }
});

// endpoint to fetch all fav movies
app.get("/favourite/:userId", verifyToken, async (req, res) => {
    const user = req.params.userId;

    try {
        const movies = await favouriteModel.find({ userId: user });

        if (!movies) {
            return res.status(404).send({ message: "No favorite movies found for this user" });
        }

        res.status(200).send(movies);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error while fetching user's favorite movies" });
    }
});

app.listen(3000, () => {
    console.log("Connection Established");
});

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'bad request'
    });
});

module.exports = app;
