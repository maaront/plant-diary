const router = require("express").Router();

const diaryRoutes = require("./diary-route.js");
const plantRoutes = require("./plant-route.js");
const userRoutes = require("./user-route.js");
const homepageRoutes = require("./homepage-route.js");

router.use("/diary", diaryRoutes);
router.use("/plant", plantRoutes);
router.use("/users", userRoutes);
router.use("/", homepageRoutes);

module.exports = router;
