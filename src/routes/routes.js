const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();

//Dotenv used to hide email and password credentials
dotenv.config();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Начало',
        clients: '123456',
        API: process.env.API

    });
});

router.get('/*', (req, res, next) => {
    res.render('404', {
        title: '404',
    });
});

module.exports = router;
