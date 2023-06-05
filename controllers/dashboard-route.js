const router = require("express").Router();
const { response } = require("express");
const { Plant, User, Diary } = require("../models");
const axios = require('axios'); // import axios

// Render dashboard page
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Plant }, { model: Diary }],
    });
    const users = userData.map((user) => user.get({ plain: true }));

    res.render('dashboard', { users }); // pass the users to the template
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;