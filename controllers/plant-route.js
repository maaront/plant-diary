const router = require("express").Router();
const { response } = require("express");
const { Plant } = require("../models");
const axios = require('axios'); // import axios

//GET all plants from Trefle API. This one works for a static HTML page
// router.get('/:plantName', async (req, res) => {
  
//   const plantName = req.params.plantName;
//   const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU';

//   try {
//       axios.get(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`)
//         .then( response => {
//           console.log(response.data)
//           res.json(response.data);
//           // res.render('plant-search', { plant: response.data });
//         })
      
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//   }
// });



//GET all plants from Trefle API. This one is for the handlebars page NOT WORKING
// router.get('/:plantName', async (req, res) => {
  
//   const plantName = req.params.plantName;
//   const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU';

//   try {
//       axios.get(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`)
//         .then( response => {
//           console.log(response.data)
//           const data = {
//             plants: plants.map(plant => {
//               return {
//                 common_name: plant.common_name,
//               }
//             })
//           }
//           res.render('searchplants', data);
//         })
      
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//   }
// });

//Take 3 to get handlebars to work
router.get('/search', (req, res) => {
  res.render('searchplants');
});

router.post('/search', async (req, res) => {
  const plantName = req.body.plantName;
  const token = const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU';
  try {
      const response = await axios.get(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`)
      const data = {
        plants: response.data.data.map(plant => {
          return {
            common_name: plant.common_name,
          }
        })
      }
      res.json(data);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });  
  }
});


// GET one plant
router.get("/plant/:id", async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id);
    const plant = plantData.get({ plain: true });
    res.render("plant", { plant, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET all plants for a user
router.get("/", async (req, res) => {
  try {
    const plantData = await Plant.findAll({
      where: { user_id: req.session.user_id },
    });
    const plants = plantData.map((plant) => plant.get({ plain: true }));
    res.render("all-plants", { plants, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});



// // GET edit plant
// router.get("/plant/edit/:id", async (req, res) => {
//   try {
//     const plantData = await Plant.findByPk(req.params.id);
//     const plant = plantData.get({ plain: true });
//     res.render("edit-plant", { plant, logged_in: req.session.logged_in });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET add plant
// router.get("/add-plant", async (req, res) => {
//   try {
//     res.render("add-plant", { logged_in: req.session.logged_in });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// POST add plant
router.post("/add-plant", async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPlant);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT edit plant
router.put("/plant/edit/:id", async (req, res) => {
  try {
    const plantData = await Plant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(plantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE plant
router.delete("/plant/:id", async (req, res) => {
  try {
    const plantData = await Plant.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(plantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
