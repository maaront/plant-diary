const router = require("express").Router();
const { response } = require("express");
const withAuth = require('../utils/auth.js');


// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    // If the user is logged in, redirect them to the dashboard
    // if (req.session.logged_in) {
      // res.redirect('/dashboard');
      // return;
    // }

    // Render the 'homepage' template
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});



// OLD CODE DOWN BELOW!!
// // Render homepage
// router.get('/', async (req, res) => {
//     try {
//         res.render('homepage');
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Route 1: GET '/'
// router.get('/', withAuth, async (req, res) => {
//     try {
//       // Fetch user data from the database using the User model
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] }, // Exclude the 'password' field from the fetched data
//         order: [['user_name', 'ASC']], // Order the fetched data by the 'name' field in ascending order
//       });
//       console.log(userData);
//       // Map the fetched data to a new array, excluding any model-related metadata
//       const users = userData.map((project) => project.get({ plain: true }));
  
//       // Render the 'dashboard' template, passing the 'users' array and the 'logged_in' flag from the session
//       res.render('dashboard', { 
//         users,
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       // If an error occurs during the database operation, send a JSON response with a 500 status code
//       res.status(500).json(err);
//     }
//   });
  
//   // Route 2: GET '/login'
//   router.get('/', (req, res) => {
//     if (req.session.logged_in) {
//     // Check if the user is already logged in by checking the 'logged_in' flag in the session
//       // If the user is logged in, redirect them to the dashboard
//       res.redirect('/dashboard'); 
//       return;
//     }
  
//     // If the user is not logged in, render the 'homepage' template
//     res.render('homepage');
//   });
  


module.exports = router;