const router = require("express").Router();
const { response } = require("express");
const { Plant, User, Diary } = require("../models");
const axios = require('axios'); // import axios

// Render dashboard page for all users
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

// Dashabord render for logged in user - WORK ON THIS WHEN AUTH GETS WORKING
// router.get('/', async (req, res) => {
//   try {
//     // Check if the user is logged in
//     if (!req.session.user_id) {
//       res.redirect('/');
//       return;
//     }

//     // Fetch the data for the logged-in user
//     const userData = await User.findOne({
//       where: { id: req.session.user_id },
//       include: [{ model: Plant }, { model: Diary }],
//     });

//     // If the user was not found (this should not happen if they are logged in)
//     if (!userData) {
//       res.status(404).json({ message: 'No user found with this id' });
//       return;
//     }

//     const user = userData.get({ plain: true });

//     res.render('dashboard', { user }); // pass the user to the template
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });




module.exports = router;