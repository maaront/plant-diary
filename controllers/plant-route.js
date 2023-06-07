const router = require("express").Router();
const { response } = require("express");
const { Plant } = require("../models");
const axios = require("axios"); // import axios

router.get('/search',  async (req, res) => {
  try {
      res.render('searchplants', { loggedIn: req.session.logged_in});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Post all searched for plants from API to a page
router.post('/search', async (req, res) => {
  const plantName = req.body.plantName;
  const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU';
  try {
      const response = await axios.get(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`)
      const data = {
        plants: response.data.data.map(plant => {
          return {
            common_name: plant.common_name,
            scientific_name: plant.scientific_name,
            image_url: plant.image_url,
          }
        })
      }
      res.json(data);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });  
  }
});


// Post one plant from search to a page
router.get("/:plantName", async (req, res) => {
  const plantName = req.params.plantName;

  const token = "t_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU";
  try {
    const response = await axios.get(
      `https://trefle.io/api/v1/plants?token=${token}&filter[common_name]=${plantName}`
    );
    const plants = response.data.data;

    res.render("plant", plants[0]); // Render the plant handlebars page



  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST add plant
router.post("/add", async (req, res) => {
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

module.exports = router;
