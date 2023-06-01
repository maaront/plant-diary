const router = require("express").Router();

const diaryRoutes = require("./diary-route.js");
const plantRoutes = require("./plant-route.js");

router.use("/diary", diaryRoutes);
router.use("/plant", plantRoutes);

module.exports = router;
