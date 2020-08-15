const express = require('express');
const mongoose = require('mongoose') // Also require mongoose
const router = express.Router();

// This is imported from the models folder
// const List = require('../models/list.model')
router.get('/', (req, res, next ) => {
    res.status(200).json({
        message: "Ademide is here"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Adefowope is oluwaseyi friend"
    });
});

router.get('/:id', (req, res, next) => {
    res.send({
        message: "Oluwaseyi is here"
    });
});

router.post('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'boye'){
        res.send({
            message: "This is my boss",
            id: id
        })
    } else {
        res.send({
            message: 'Oluwaseyi, thanks for accepting me back',
            id:id
        })
    }
})

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.send({
        message: "The system is updated",
        id:id
    });
});

router.delete('/:id', (req, res, next) => {
    res.send({
        message: "This message is deleted"
    })
})

module.exports = router;