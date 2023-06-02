const router = require("express").Router();
const { response } = require("express");
const { Plant } = require("../models");
const axios = require('axios'); // import axios

const renderHomepage = async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

router.get('/', renderHomepage);

module.exports = router;