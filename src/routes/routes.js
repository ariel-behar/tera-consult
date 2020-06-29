const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Начало',
        clients: '123456'

    });
});

router.get('/*', (req, res, next) => {
    res.render('404', {
        title: '404',
    });
});

module.exports = router;
