const router = require("express").Router();
const { User, Plant, Diary } = require("../models");
const bcrypt = require('bcrypt');


// Render create account page
router.get('/create-account', async (req, res) => {
  try {
      res.render('createaccount');
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

// POST for user to login
router.post('/login', async (req, res) => {
  console.log(`Username: ${req.body.user_name}`);
    console.log(`Password: ${req.body.user_password}`);
    
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    console.log(req.body.user_password, await bcrypt.hash(req.body.user_password, 10))
    const validPassword = await userData.checkPassword(req.body.user_password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err); // Log the error for debugging
    res.status(500).json({ message: err.message }); // Send back the error message
  }
});

// POST route for user to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Plant }, { model: Diary }],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post("/create-account", async (req, res) => {
  try {
    // Check if a user already exists with this username
    const existingUser = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this username already exists" });
    }

    // Create a new user
    const newUser = await User.create({
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      // add more fields here if necessary
    });

    // Save the user's id and logged_in status in session
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
