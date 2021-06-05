const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/create", movieController.create);

router.get("/:id", movieController.detail);



module.exports = router;