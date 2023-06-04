const router = require("express").Router();
const { response } = require("express");
const { Plant, User } = require("../models");
const axios = require('axios'); // import axios

// Render dashboard page
router.get('/', async (req, res) => {
  try {
      res.render('dashboard');
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;