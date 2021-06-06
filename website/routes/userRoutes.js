const express = require("express");
const userController = require("../controllers/userController");
const validateRegister = require("../middlewares/registerMiddleware")
const validateLogin = require("../middlewares/loginMiddleware")
const userLoggedNowMiddleware = require("../middlewares/userLoggedNowMiddleware")
const router = express.Router();

router.get("/login",userLoggedNowMiddleware, userController.login);
router.post("/login", validateLogin, userController.processLogin);

router.get("/register", userLoggedNowMiddleware, userController.register);
router.post("/register", validateRegister, userController.processRegister);
router.get("/logout", userController.logout);
module.exports = router;