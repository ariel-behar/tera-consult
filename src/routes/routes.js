const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'main', //This also serves as the guide to which JS file to use on each page
    });
});

router.get('/*', (req, res, next) => {
    res.render('404', {
        title: '404',
    });
});

module.exports = router;
