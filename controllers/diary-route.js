const router = require("express").Router();
const { Diary } = require("../models");

// GET all diary entries for a user
router.get("/", async (req, res) => {
  try {
    const diaryData = await Diary.findAll({
      where: { user_id: req.session.user_id },
    });
    const diary = diaryData.map((diary) => diary.get({ plain: true }));
    res.render("all-diary", { diary, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one diary entry
router.get("/diary/:id", async (req, res) => {
  try {
    const diaryData = await Diary.findByPk(req.params.id);
    const diary = diaryData.get({ plain: true });
    res.render("diary", { diary, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET edit diary entry
router.get("/diary/edit/:id", async (req, res) => {
  try {
    const diaryData = await Diary.findByPk(req.params.id);
    const diary = diaryData.get({ plain: true });
    res.render("edit-diary", { diary, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET add diary entry
router.get("/add-diary", async (req, res) => {
  try {
    res.render("add-diary", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST add diary entry
router.post("/add-diary", async (req, res) => {
  try {
    const newDiary = await Diary.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newDiary);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT edit diary entry
router.put("/diary/edit/:id", async (req, res) => {
  try {
    const diaryData = await Diary.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(diaryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE diary entry
router.delete("/diary/:id", async (req, res) => {
  try {
    const diaryData = await Diary.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(diaryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
