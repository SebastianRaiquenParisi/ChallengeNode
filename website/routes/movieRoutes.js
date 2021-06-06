const express = require("express");
const movieController = require("../controllers/movieController");
const createUpdateFormValidator = require("../middlewares/createFormMiddleware")

const router = express.Router();

router.get("/create", movieController.create);

router.post("/create",createUpdateFormValidator, movieController.storage);


router.get("/:id", movieController.detail);

module.exports = router;