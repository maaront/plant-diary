const router = require("express").Router();
const { Plant } = require("../models");

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

// GET edit plant
router.get("/plant/edit/:id", async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id);
    const plant = plantData.get({ plain: true });
    res.render("edit-plant", { plant, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET add plant
router.get("/add-plant", async (req, res) => {
  try {
    res.render("add-plant", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
