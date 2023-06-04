const router = require("express").Router();
const { User, Plant, Diary } = require("../models");


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
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

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
    res.status(400).json(err);
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





// POST a new user
// router.post("/", async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     res.status(200).json(newUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // GET all users
// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [{ model: Plant }, { model: Diary }],
//     });
//     const users = userData.map((user) => user.get({ plain: true }));
//     res.json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET a single user
// router.get("/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [{ model: Plant }, { model: Diary }],
//     });
//     const user = userData.get({ plain: true });
//     console.log(user);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // POST login
// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       where: { email: req.body.email },
//     });
//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }
//     const validPassword = await userData.checkPassword(req.body.password);
//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // POST logout
// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// // PUT a user
// router.put("/:id", async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No user found with this id!" });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE a user
// router.delete("/:id", async (req, res) => {
//   try {
//     const userData = await User.destroy({
//       where: { id: req.params.id },
//     });
//     if (!userData) {
//       res.status(404).json({ message: "No user found with this id!" });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
