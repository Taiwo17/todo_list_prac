const express = require('express');
const mongoose = require('mongoose') // Also require mongoose
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Import the model file
const User = require('../models/users.model');
// const { createIndexes } = require('../models/users.model');

// To Get all the database information into the home page
router.get('/', (req, res, next) => {
    User.find().exec()
    .then(doc => {console.log(doc)
        res.status(200)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

// Post a new data to the Database using hash password and check if a user already exist;
router.post('/signup', (req, res) => {
    User.find({email: req.body.email}).exec().then(user =>{
        if (user.length >= 1) {
            res.status(409).json({
                message: 'Email already exist'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                     })
                     user.save().then(result => {
                         console.log(result)
                         res.status(201).json({
                            message: 'User Created'
                        })
                    })
                    .catch(err => {console.log(err)
                    res.status(500).json({
                    error: err
                        })
                    })
                }
            });
        }
    } );
});

// Fetch a data from the database
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id).exec().then(doc => {
        console.log("From the database", doc);
        if (doc) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({message: "No entry found for the userId"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
})

// Updating a data from the database
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({_id: id}, { $set: updateOps }).exec().then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

// Login using the existing data from the database

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email}).exec().then(
        user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, "ademideShobo", 
                    { 
                        expiresIn: "1hr"
                    })
                    return res.status(200).json({
                        message: 'Auth Successfully',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        }
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})
// Deleting an assign value in the Database;
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    User.deleteOne({_id: id}).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})
module.exports = router;
