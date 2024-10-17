const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// const isAuthenicatedMiddleware = require('../middleware/isAuthenicatedMiddleware');
const AuthController = require("../controllers/AuthorizationController");
const FavouriveController = require('../controllers/FavouritesController');
const AuthenicateMiddleware = require('../middleware/isAuthenicatedMiddleware');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get("/user/favourites",[AuthenicateMiddleware.isAuthenticatedMiddleware], [FavouriveController.getFavouriteWebToons]);
router.post("/user/addFavourites",[AuthenicateMiddleware.isAuthenticatedMiddleware], [FavouriveController.addFavouriteWebToon]);



module.exports = router;
