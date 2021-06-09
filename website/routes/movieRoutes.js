const express = require("express");
const movieController = require("../controllers/movieController");
const createUpdateFormValidator = require("../middlewares/createFormMiddleware")

const router = express.Router();

router.get("/create", movieController.create);

router.post("/create",createUpdateFormValidator, movieController.storage);

router.get("/update/:id", movieController.update);

router.post("/update/:id",createUpdateFormValidator, movieController.processUpdate);


router.get("/:id", movieController.detail);

router.delete("/:id", movieController.delete);

module.exports = router;